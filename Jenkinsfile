
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t kitty-discord-slash-commands .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kitty-discord-slash-commands --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -d --restart always --name kitty-discord-slash-commands kitty-discord-slash-commands'
            }
        }
    }
}