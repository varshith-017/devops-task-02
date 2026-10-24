
# DevOpsFlow - Task 2

## Objective
Create a Jenkins CI/CD pipeline to build, test and deploy a Node.js web application.

## Technologies
- Node.js
- Jenkins
- Docker
- GitHub
- AWS EC2 with Ubuntu

## Run locally

```bash
npm test
npm start
```

Open http://localhost:3000

Health endpoint:
http://localhost:3000/api/health

## CI/CD pipeline stages

1. Build: Build the Docker image.
2. Test: Run automated application tests.
3. Deploy: Run the application in a Docker container.

## Jenkins configuration

Create a Jenkins Pipeline job connected to this GitHub repository.

Choose Pipeline script from SCM and set the script path to:

Jenkinsfile

## Expected outcome

Automated application build, testing and deployment using Jenkins and Docker.
"# devops-task-02" 
