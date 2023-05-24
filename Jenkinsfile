pipeline {
    agent any
    stages {
        stage('Clean Workspace Directory') {
            agent any
            steps{
                script{
                    echo "Cleaning Workspace"
                    cleanWs notFailBuild: true
                }
            }
        }
        stage('Install Dependency Package') {
            steps {
                echo "Installing Dependency For SonarQube"
                sh 'npm install'
                echo "Package Isatallation Complete"
            }
        }
        stage('Run Unit Test Case') {
            
            environment {
                ENV_PATH = credentials('session-2--test-env-tes')
            }
            steps { 
                // Copy Environment Variable File
                sh """
                    cat $ENV_PATH > ".env"
                """
                // Run Test
                sh """
                    npm test
                """
            }
        }
        // stage('SonarQube Quality Analysis') {
        //     environment {
        //         scannerHome = tool 'Dev'
        //     }
        //     steps {
        //         echo "Start SonarQube Quality Analysis"
        //         withSonarQubeEnv('Dev') {
        //             sh "${scannerHome}/bin/sonar-scanner"
        //         }
        //     }
        // }
        // stage('Wait For Quality Gate Report') {
        //     steps {
        //         echo "Wait For Quality Gate Report"
        //         timeout(time: 10, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }

        //     }
        // }
        stage('Delete Dependency Packages') {
            steps {
                // Delete dependency From workspace folder
                sh 'rm -rf node_modules'
            }
        }
        stage('Deploy to the development') {
            // Trigger only for the development branch
            // when {
            //     branch 'development'
            // }
            // Set reqiured variables
            environment {
                ENV_PATH = credentials('session-2-env-test')
                WORKING_DIR='/home/ubuntu/employeechat'
            }
            steps {
                // Create folder
                sh "mkdir -p $WORKING_DIR"
                // Copy all the codes to the working directory
                sh "rsync -av --delete  --exclude=.git --exclude=.scannerwork --exclude=Jenkinsfile --exclude=sonar-project.properties ./ $WORKING_DIR"
                // switch to work dir and start the process
                dir("$WORKING_DIR") {
                    sh """
                        cat $ENV_PATH > ".env"
                    """
                    sh "npm install"
                    sh """
                        if [ \$(PM2_HOME=/home/ubuntu/.pm2 pm2 pid employeechat) ]; then PM2_HOME=/home/ubuntu/.pm2 pm2 delete employeechat; fi
                    """
                    sh "PM2_HOME=/home/ubuntu/.pm2 BUILD_ID=dontkill pm2 start npm --name employeechat -- start"
                }
           }
        }
    }
    //  post {
    //    always {
    //         echo 'Send Email Notification'
    //         // junit(testResults: 'test-results.xml', allowEmptyResults : true)
    //         emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
    //         to: 'arup.das@indusnet.co.in',
    //         subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"                      
    //     }
    // }
}