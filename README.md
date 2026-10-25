# DevOps Task 2: Simple Jenkins Pipeline for CI/CD

A beginner-friendly DevOps project that automates the build, testing, publishing, and deployment of a Node.js web application using **Jenkins, Docker, GitHub, Docker Hub, and AWS EC2**.

## Project Links

| Resource | Link |
|---|---|
| GitHub Repository | https://github.com/varshith-017/devops-task-02 |
| Jenkins Dashboard | http://13.126.152.147:8080/ |
| Jenkins Pipeline Job | http://13.126.152.147:8080/job/devops-CICD-Pipeline/ |
| Docker Hub Repository | https://hub.docker.com/r/varshithap123/devops-task-2-web-app |
| Docker Image (`latest`) | `varshithap123/devops-task-2-web-app:latest` |
| Deployed Web Application | http://13.126.152.147:3000 |

> **Note:** The Jenkins and application URLs require the EC2 server to be running and the appropriate inbound ports to be allowed. The application URL should be verified after deployment.

## 1. Project Overview

The purpose of this project is to implement a basic Continuous Integration and Continuous Deployment (CI/CD) pipeline.

Whenever the pipeline is executed, Jenkins retrieves the source code from GitHub, builds a Docker image, runs application tests during the Docker build, pushes the image to Docker Hub, and deploys the application as a Docker container on the EC2 instance.

This project demonstrates how DevOps tools work together to automate software delivery.

## 2. Objectives

- Understand the fundamentals of CI/CD.
- Integrate Jenkins with GitHub.
- Build a Docker image for a Node.js application.
- Execute automated tests during the image build.
- Push Docker images to Docker Hub.
- Deploy a containerized application on AWS EC2.
- Monitor pipeline results using Jenkins Console Output.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Git and GitHub | Source code management |
| Jenkins | CI/CD pipeline automation |
| Docker | Application containerization |
| Docker Hub | Docker image registry |
| AWS EC2 | Cloud server for Jenkins and application deployment |
| Ubuntu | Server operating system |
| Node.js | Application runtime |
| npm | Dependency and script management |
| Node.js Test Runner | Automated application testing |
| Groovy | Jenkins Pipeline syntax |

## 4. System Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    v
Jenkins Pipeline
    |
    v
Checkout Source Code
    |
    v
Build Docker Image
    |
    v
Run Automated Tests
    |
    v
Login to Docker Hub
    |
    v
Push Image to Docker Hub
    |
    v
Deploy Container on AWS EC2
    |
    v
Access Web Application
```

## 5. Project Workflow

### Step 1: Source Code Management

The application source code and configuration files are stored in GitHub.

Repository: https://github.com/varshith-017/devops-task-02

### Step 2: Jenkins Pipeline

Jenkins automates the project workflow through a pipeline job named `devops-CICD-Pipeline`.

Jenkins Dashboard: http://13.126.152.147:8080/

Pipeline Job: http://13.126.152.147:8080/job/devops-CICD-Pipeline/

### Step 3: Build Docker Image

Jenkins uses the Dockerfile to create an image containing the Node.js application and its required files.

Image name:

`varshithap123/devops-task-2-web-app:latest`

During the Docker build, the Dockerfile runs the application's automated tests using `npm test`. If the tests fail, the image build fails and the subsequent pipeline stages do not execute.

### Step 4: Push Image to Docker Hub

Jenkins authenticates with Docker Hub using a Jenkins-managed username/password credential. The password field contains a Docker Hub access token.

Docker Hub Repository: https://hub.docker.com/r/varshithap123/devops-task-2-web-app

### Step 5: Deploy Application

Jenkins removes the previous container, if present, and starts a new container using the published Docker image.

Container name:

`devops-task-2-web-app`

Port mapping:

`3000:3000`

### Step 6: Access the Application

The intended application URL is:

http://13.126.152.147:3000

The application must be running, and the EC2 security group must allow the necessary inbound traffic for external access.

## 6. Project Files

```text
devops-task-02/
├── Jenkinsfile
├── Dockerfile
├── package.json
├── app.js
├── app.test.js
├── .gitignore
└── README.md
```

- **Jenkinsfile:** Defines the CI/CD pipeline stages.
- **Dockerfile:** Builds the application image and runs tests.
- **package.json:** Defines the Node.js project and npm scripts.
- **app.js:** Contains the web application.
- **app.test.js:** Contains automated tests.
- **.gitignore:** Specifies files Git should ignore.
- **README.md:** Documents the project and setup.

## 7. Jenkins Pipeline Stages

The pipeline contains the following stages:

1. **Checkout GitHub:** Retrieves the application source code from the `main` branch.
2. **Build Docker Image:** Builds the application image and runs tests through the Dockerfile.
3. **Login to Docker Hub:** Authenticates using Jenkins credentials.
4. **Push Docker Image:** Publishes the image to Docker Hub.
5. **Deploy Application:** Starts the application container on the EC2 server.

The pipeline also reports success or failure in the Jenkins build output.

## 8. Testing

The project uses the Node.js built-in test runner.

Run the tests inside the project directory:

```bash
npm test
```

The project includes tests for:

- The home page displaying the expected DevOpsFlow content.
- The health endpoint returning a healthy status.

The expected result for the current test suite is **2 tests passed and 0 failed**.

To run the tests using the published Docker image on the EC2 server:

```bash
sudo docker run --rm \
  varshithap123/devops-task-2-web-app:latest npm test
```

## 9. Useful Docker Commands

Check running containers:

```bash
sudo docker ps
```

Check all containers, including stopped ones:

```bash
sudo docker ps -a
```

View application logs:

```bash
sudo docker logs devops-task-2-web-app
```

Check the local application response:

```bash
curl -i http://localhost:3000/
```

Check the health endpoint if it is configured in the application:

```bash
curl -i http://localhost:3000/health
```

Restart the application container:

```bash
sudo docker restart devops-task-2-web-app
```

Pull the latest published image:

```bash
sudo docker pull \
  varshithap123/devops-task-2-web-app:latest
```

## 10. Deployment Configuration

The deployment uses the following configuration:

| Setting | Value |
|---|---|
| Cloud platform | AWS EC2 |
| Operating system | Ubuntu |
| CI/CD tool | Jenkins |
| Container runtime | Docker |
| Application runtime | Node.js |
| Application port | 3000 |
| Docker Hub username | `varshithap123` |
| Docker image | `varshithap123/devops-task-2-web-app:latest` |
| Container name | `devops-task-2-web-app` |
| Jenkins credential ID | `dockerhub-credentials` |

**Security note:** Never commit Docker Hub access tokens, passwords, private keys, or other secrets to GitHub. Store credentials in Jenkins Credentials and restrict inbound EC2 access to trusted sources wherever possible.

## 11. Screenshots for Project Submission

Capture the following screenshots as evidence of your implementation:

1. Jenkins pipeline showing a successful build.
2. GitHub repository showing the project files.
3. Docker image build output.
4. Automated test results showing 2 passed and 0 failed.
5. Docker Hub repository showing the `latest` image tag.
6. EC2 terminal showing the running container and port mapping.
7. Browser showing the deployed web application.

Only include screenshots that show the actual results from your environment.

## 12. Challenges Faced and Solutions

### Docker Hub Authentication

**Challenge:** Docker Hub rejected the initial login attempt.

**Solution:** Updated the Jenkins credential with the correct Docker Hub username and access token.

### Jenkins Temporary Disk Space

**Challenge:** Jenkins experienced temporary-directory space issues, causing an agent availability problem.

**Solution:** Increased the available temporary-directory space and checked Jenkins agent availability.

### Docker Build Cache

**Challenge:** Cached Docker layers did not display the full test output in every build.

**Solution:** Executed the test command separately inside the published Docker image to verify the test results.

### Application Accessibility

**Challenge:** The application URL returned `{"error":"Route not found"}`.

**Troubleshooting:** Checked the application's root route, container logs, local HTTP response, and EC2 inbound rules to identify whether the issue was related to application routing or external connectivity.

## 13. Results

The Jenkins pipeline completed successfully in the recorded run. The source code was checked out, the Docker image was built, authentication to Docker Hub succeeded, the image was pushed, and the deployment command started the application container.

The recorded Jenkins build ended with:

`Finished: SUCCESS`

External application accessibility and the homepage response should be verified separately before claiming that the web application is fully working.

## 14. Future Enhancements

- Trigger builds automatically using GitHub webhooks.
- Add a separate test stage with visible test reports.
- Use unique Docker image tags instead of relying only on `latest`.
- Add a staging environment before production deployment.
- Add application monitoring and centralized logging.
- Configure HTTPS using a domain name and reverse proxy.
- Add rollback functionality for failed deployments.
- Use a more secure credential and deployment strategy.

## 15. Conclusion

This project demonstrates a basic end-to-end CI/CD workflow using Jenkins, GitHub, Docker, Docker Hub, and AWS EC2. It automates source code checkout, Docker image creation, application testing, image publishing, and container deployment.

The project provides practical experience with CI/CD automation, containerization, cloud deployment, and troubleshooting—important foundational skills for a DevOps engineer.

---

**Project:** DevOps Task 2 — Simple Jenkins Pipeline for CI/CD  
**GitHub:** https://github.com/varshith-017/devops-task-02  
**Docker Hub:** https://hub.docker.com/r/varshithap123/devops-task-2-web-app
