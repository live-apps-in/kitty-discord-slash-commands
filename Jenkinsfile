pipeline {
    agent any

    stages {
        stage('Install required packages') {
            steps {
                echo 'npm i'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kitty-slash-commands --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 5002:5000 -d --name kitty-chan kitty-chan'
            }
        }
    }
}