pipeline {
    agent any

    stages {
        stage('Install required packages') {
            steps {
                sh 'npm i'
            }
        }
        stage('Restart PM2 Instance') {
            steps {
                sh 'pm2 restart all'
            }
        }
    }
}