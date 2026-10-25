
pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'varshithap123'
        APP_IMAGE = 'varshithap123/devops-task-2-web-app:latest'
        APP_CONTAINER = 'devops-task-2-web-app'
    }

    stages {
        stage('Checkout GitHub') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/varshith-017/devops-task-02.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t "$APP_IMAGE" .'
            }
        }

        stage('Test Application') {
            steps {
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
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push "$APP_IMAGE"'
            }
        }

        stage('Deploy Application') {
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
    success {
        echo 'CI/CD pipeline completed successfully!'
    }
    failure {
        echo 'Pipeline failed. Check Console Output.'
    }
        }
    }
}
