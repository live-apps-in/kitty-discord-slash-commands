pipeline {
    agent any

    stages {
        stage('Install required packages') {
            steps {
                sh 'docker build -t kitty-slash-commands .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kitty-slash-commands --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 5002:5000 -d --name kitty-slash-commands kitty-slash-commands'
            }
        }
    }
}