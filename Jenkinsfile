
pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        APP_IMAGE = 'devops-task-2-web-app:latest'
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

        stage('Deploy') {
            steps {
                echo 'Deploying web application...'
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
            echo 'Build, test and deployment succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins Console Output.'
        }
    }
}
