pipeline {
    environment {
        backend = 'backend' 
        frontend = 'frontend' 
        mongoImage = 'mongo:latest' 
        mongoContainerName = 'mongodb' 
        MONGO_PORT = '27017'
        docker_image = ''
    }
    
    agent any

    stages {
        
        stage('Stage 1: Pull MongoDB') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker.image("${mongoImage}").pull()
                    }
                }
            }
        }
        
        stage('Stage 2: Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/mayankchadha16/SPE-Major-Project'
            }
        }

        stage('Stage 3: Testing') {
            steps {
                dir('backend')
                {
                    sh "docker build -t menkchad/backend ."
                }
            }
        }
        
        stage('Stage 4: Build Frontend and Backend') {
            steps {
                dir('backend')
                {
                    sh "docker build -t menkchad/backend ."
                }
                dir('frontend') 
                {
                    sh "docker build -t menkchad/frontend ."
                }
            }
        }

        stage('Stage 5: Push Backend and Frontend to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push menkchad/backend'
                        sh 'docker push menkchad/frontend'
                    }
                }
            }
        }

        stage('Stage 6: Clean') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                    sh 'if [ -n "$(docker ps -aq)" ]; then docker rm -f $(docker ps -aq); fi'
                    // sh 'if [ -n "$(docker images -aq)" ]; then docker rmi -f $(docker images -aq); fi'
                }
            }
        }

        stage('Stage 7: Ansible Deployment') {
            steps {
                ansiblePlaybook(
                    becomeUser: null,
                    credentialsId: 'localhost',
                    installation: 'Ansible',
                    inventory: 'inventory',
                    playbook: 'deploy.yml'
                )
            }
        }
    }
}
