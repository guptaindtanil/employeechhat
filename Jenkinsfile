pipeline {
  agent any

  environment {
      NODE_ENV='dev'
      NODE_PORT='4000'
      API_KEY='8qz5gaEXqqH98&Q5USDNHm$uHUq*xADs&Z*9Hxfq$6vE!&$p'
      MONGO_HOST='cluster0.h7j4eqi.mongodb.net'
      MONGO_PORT='27017'
      MONGO_DATABASE='employeechat'
      MONGO_USERNAME='indranilgupta'
      MONGO_PASSWORD='9iVarwVL3L0XmjV9'
      PASSWORD_SALT_ROUND='10'
      USER_ACCESS_TOKEN_SECRET='4s@U3N@@dgD6k9CwK8^j'
      ACCESS_TOKEN_EXPIRED='3600'
  }
  stages {
    stage('Deploy to AWS') {
      steps {
        sshagent(credentials: ['ssh-key']) {
            sh "ssh -o StrictHostKeyChecking=no -l ubuntu 16.16.199.187 ls"
        }
      }
    }
  }
}