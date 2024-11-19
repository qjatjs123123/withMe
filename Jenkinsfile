pipeline {
    agent any
    
    environment {
        FRONT_ROOT = './frontend'
        BACK_ROOT = './backend'

        frontChanged = true
        backChanged = true

        myEndpoint = 'https://meeting.ssafy.com/hooks/b6gea4i7t3ytim3zei9atukfqy'
        myChannel = '507jo'
    }

    stages {
        stage('Get branch name') {
            steps {
                script {
                    branchName = env.gitlabBranch
                    echo "branch name : ${branchName}"
    
                    if (branchName == 'frontend/develop') {
                        backChanged = false
                    }
                        
                        
                    if (branchName == 'backend/develop') {
                        frontChanged = false
                    }
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: branchName]],
                    userRemoteConfigs: [[credentialsId: 'withme-gitlab',
                    url: 'https://lab.ssafy.com/s11-final/S11P31A507.git']])
            }
        }
        
        stage('Build') {
            steps {
                script {
                    if(backChanged) {
                        dir(BACK_ROOT) {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
                    if(frontChanged) {
                        echo 'frontend build will be performed by Docker'
                    }
                }
            }
            
            post {
                success { 
                    script {
                        def message = "Build succeeded."
                        if (backChanged) {
                            message += " Backend was changed."
                        }
                        if (frontChanged) {
                            message += " Frontend was changed."
                        }
                        echo message
                    }
                }
                failure {
                    echo 'Failed to Build...'
                }
            }
        }
        
        stage('Generate Docker Image') {
            steps {
                script {
                    if(backChanged) {
                        dir(BACK_ROOT) {
                            script {
                                sh 'docker build -t taegun1011/withme_backend .'
                            }
                        }
                    }
                    if(frontChanged) {
                        withCredentials([string(credentialsId: 'LIVEBLOCKS_SECRET_KEY', variable: 'LB_KEY')]) {
                            withEnv(["NEXT_PUBLIC_BACKEND_URL=https://k11a507.p.ssafy.io", "NEXT_PUBLIC_BACKEND_URL_D=https://www.withme.my"]) {
                                dir(FRONT_ROOT) {
                                    script {
                                        sh '''
                                            docker build \
                                                -t taegun1011/withme_frontend --no-cache --progress=plain\
                                                --build-arg LIVEBLOCKS_SECRET_KEY=$LB_KEY \
                                                --build-arg NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL \
                                                --build-arg NEXT_PUBLIC_BACKEND_URL_D=$NEXT_PUBLIC_BACKEND_URL_D \
                                                .
                                            '''
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            post {
                success { 
                    script {
                        def message = "New docker image generated :"
                        if (backChanged) {
                            message += " Backend"
                        }
                        if (frontChanged) {
                            message += " Frontend"
                        }
                        echo message
                    }
                }
                failure {
                    echo 'Failed to generate docker image...'
                }
            }
        }
    }

    post {
        success {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "${Author_ID}(${Author_Name})의 빌드 #${env.BUILD_NUMBER} 성공!!!", 
                endpoint: myEndpoint, 
                channel: myChannel
                )
            }
        }
        failure {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "${Author_ID}(${Author_Name})의 빌드 #${env.BUILD_NUMBER} 실패;;;",  
                endpoint: myEndpoint, 
                channel: myChannel
                )
            }
        }
    }
}
