pipeline {
    agent any

    environment {
        RECIPIENTS = 'vrinda.khemka21@st.niituniversity.in,syed.anser21@st.niituniversity.in,dhruv.singh21@st.niituniversity.in'
        SUBJECT = 'Jenkins Build Failure Notification'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/your-repo/react-app.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        // Build and run the application using Docker Compose
                        bat 'docker-compose up --build -d'  // For Linux/MacOS
                        // For Windows, replace sh with bat
                    } catch (Exception e) {
                        // Mark build as failed and re-throw the exception
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }

    post {
        failure {
            script {
                // Send email if the pipeline fails
                emailext(
                    subject: "${SUBJECT}",
                    body: "The Jenkins build has failed. Please check the logs for more details.",
                    to: "${RECIPIENTS}"
                )
            }
        }
    }
}
