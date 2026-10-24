pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        DOCKERHUB_USERNAME = 'varshithap123'
        APP_IMAGE = "${DOCKERHUB_USERNAME}/devops-task-2-web-app:latest"
        APP_CONTAINER = 'devops-task-2-web-app'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t "$APP_IMAGE" .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'docker run --rm "$APP_IMAGE" npm test'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push "$APP_IMAGE"'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f "$APP_CONTAINER" 2>/dev/null || true
                    docker run -d \
                        --restart unless-stopped \
                        --name "$APP_CONTAINER" \
                        -p 3000:3000 \
                        "$APP_IMAGE"
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo 'Build, test, push and deployment succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}