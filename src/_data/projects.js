module.exports = [
  {
    id: "drupal-platform",
    title: "Production-Grade Drupal Platform on AWS with Full DevOps Automation",
    featured: true,
    defaultOpen: true,
    tags: ["aws", "cicd", "containers", "iac", "linux"],
    icon: { type: "img", src: "/assets/brands/terraform.svg", alt: "" },
    images: [
      { src: "/assets/projects/drupal_devops_platform.png", alt: "Drupal DevOps Platform Architecture" },
      { src: "/assets/projects/drupal/drupalalb.png", alt: "Application Load Balancer setup" },
      { src: "/assets/projects/drupal/grafana1.png", alt: "Grafana monitoring dashboard" },
      { src: "/assets/projects/drupal/ansible.png", alt: "Ansible automation output" },
      { src: "/assets/projects/drupal/elk2.png", alt: "ELK Stack logs" },
      { src: "/assets/projects/drupal/drupalk8s.png", alt: "Drupal on Kubernetes" },
      { src: "/assets/projects/drupal/grafana2.png", alt: "Grafana metrics dashboard" },
    ],
    lead: "Production-grade Drupal 11 platform on AWS using a complete DevOps toolchain, featuring Terraform IaC, secure Ansible deployment via SSM, Kubernetes orchestration, and automated GitHub Actions OIDC CI/CD.",
    stack: ["Terraform", "AWS", "Ansible", "Docker", "Kubernetes", "GitHub Actions", "OIDC", "Prometheus", "ELK Stack", "AWS SSM"],
    body: `
      <p>I built a production-grade Drupal 11 platform on AWS using a complete DevOps toolchain, with infrastructure automation, secure deployments, monitoring, and centralized logging.</p>
      <p>The problem I solved was the complexity of managing a highly available web application across multiple servers while maintaining security, automation, and operational visibility. Traditional environments often rely on manual configuration, SSH access, and inconsistent deployment processes, which increase risk and maintenance effort.</p>
      <p>I provisioned the entire AWS environment using Terraform, including a multi-AZ VPC, Auto Scaling Group, Application Load Balancer, RDS MySQL with a read replica, S3 storage, and CloudWatch billing alerts. Everything was deployed through code with no manual infrastructure setup.</p>
      <p>For server management, I used Ansible with AWS Systems Manager instead of SSH. This removed the need for SSH keys, bastion hosts, and public access to servers. All configuration and deployments were performed through secure SSM connections.</p>
      <p>I containerized Drupal using Docker and deployed it to a Kubernetes cluster for local orchestration and testing. The platform included persistent storage, Kubernetes deployments, services, ingress routing, secrets management, and horizontal pod autoscaling.</p>
      <p>To automate releases, I built a GitHub Actions CI/CD pipeline using OIDC authentication. This removed the need for long-lived AWS credentials. Every code change automatically triggers image builds, testing, staging deployment, smoke tests, and production deployment with an approval gate.</p>
      <p>I also implemented full observability using Prometheus, Grafana, and the ELK Stack. Metrics from EC2, Nginx, RDS, and the load balancer were collected and visualized through Grafana dashboards, while centralized log aggregation made troubleshooting faster and easier.</p>
      <p>The platform was designed for high availability and resilience. It runs across two availability zones, automatically replaces failed instances, scales based on CPU utilization, and includes health checks, monitoring alerts, and database redundancy.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Fully automated infrastructure provisioning with Terraform",
      "No SSH access or stored credentials through AWS SSM and GitHub OIDC",
      "Automated CI/CD pipeline with testing, staging, and production approval flow",
      "High availability across multiple AWS Availability Zones",
      "Auto Scaling for increased traffic and workload demand",
      "Centralized monitoring with Prometheus and Grafana",
      "Centralized logging with ELK Stack and Filebeat",
      "Secure network segmentation and least-privilege IAM design",
      "Faster troubleshooting through real-time metrics and log analysis",
      "Complete Infrastructure as Code and configuration management approach",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/-a395767ca9fa", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/drupal-app-to-aws-production", github: true },
    ],
  },
  {
    id: "aws-eks-retail",
    title: "Production-Grade AWS EKS Platform for a Microservices Retail Application",
    featured: true,
    defaultOpen: false,
    tags: ["aws", "cicd", "containers", "iac"],
    icon: { type: "img", src: "/assets/brands/kubernetes.svg", alt: "" },
    images: [
      { src: "/assets/projects/diagram_aws_eks_retail.svg", alt: "AWS EKS Platform Architecture" },
    ],
    lead: "Production-grade Kubernetes platform on AWS hosting a cloud-native retail application, featuring Terraform infrastructure automation, Helm deployments, managed RDS/DynamoDB databases, and AWS Lambda event-driven processing.",
    stack: ["Terraform", "Amazon EKS", "Kubernetes", "Helm", "Amazon RDS", "DynamoDB", "AWS Lambda", "Amazon S3", "GitHub Actions", "OIDC", "CloudWatch"],
    body: `
      <p>I built a production-grade Kubernetes platform on AWS for InnovateMart Inc. to host a cloud-native retail application using Amazon EKS, managed databases, automated deployments, centralized logging, and serverless event processing.</p>
      <p>The problem I solved was deploying and managing the Retail Store microservices application in a secure and scalable environment. Running databases inside Kubernetes clusters can create operational challenges, while manual deployments and limited visibility make production systems harder to maintain.</p>
      <p>I provisioned the entire infrastructure using Terraform, including a multi-AZ VPC (<strong>project-bedrock-vpc</strong>), an Amazon EKS cluster (<strong>project-bedrock-cluster</strong>), managed node groups, RDS databases, DynamoDB tables, IAM roles, networking components, and remote state management. Everything was deployed through Infrastructure as Code (IaC) in the <code>us-east-1</code> region.</p>
      <p>The application consisted of multiple microservices running in the EKS cluster within the <code>retail-app</code> namespace. Instead of using in-cluster databases, I migrated the data layer to managed AWS services. MySQL and PostgreSQL workloads were moved to Amazon RDS, while the cart service used DynamoDB. This improved reliability, reduced operational overhead, and followed cloud-native best practices.</p>
      <p>To securely expose the application, I deployed the AWS Load Balancer Controller and configured an Application Load Balancer through Kubernetes Ingress. This provided external access to the application while keeping worker nodes and databases in private subnets.</p>
      <p>I implemented secure developer access by creating a dedicated IAM user (<strong>bedrock-dev-view</strong>) with read-only AWS console access and Kubernetes RBAC mapping to the <code>view</code> ClusterRole.</p>
      <p>For observability, I enabled EKS control plane logging and configured CloudWatch container logging. This provided centralized visibility into both Kubernetes operations and application activity.</p>
      <p>I also built a serverless asset-processing workflow using Amazon S3 (<strong>bedrock-assets-[student-id]</strong>) and an AWS Lambda function (<strong>bedrock-asset-processor</strong>). Whenever files are uploaded to the assets bucket, the Lambda function automatically triggers and logs the filename to CloudWatch, enabling event-driven processing.</p>
      <p>To automate infrastructure changes, I created a GitHub Actions CI/CD pipeline using OIDC authentication. Pull requests automatically generate Terraform plans for review, while approved changes to the main branch trigger Terraform deployments.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Fully automated AWS infrastructure using Terraform",
      "Production-ready Amazon EKS deployment across multiple Availability Zones",
      "Managed RDS and DynamoDB services replacing in-cluster databases",
      "Secure Kubernetes access with IAM and RBAC controls",
      "No long-lived AWS credentials through GitHub OIDC authentication",
      "Automated CI/CD pipeline with Terraform plan and apply workflows",
      "Centralized logging with CloudWatch for both cluster and application logs",
      "Event-driven file processing with S3 and Lambda",
      "Private networking for worker nodes and databases",
      "Scalable and cloud-native microservices architecture suitable for production workloads",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/RealKingHubs/retail-store-sample-app", github: true },
    ],
  },
  {
    id: "zero-secret-cicd",
    title: "Zero-Secret GitOps: CI/CD Pipeline for AWS ECS Fargate",
    featured: true,
    defaultOpen: false,
    tags: ["aws", "cicd", "containers"],
    icon: { type: "fa", class: "fab fa-aws" },
    images: [
      { src: "/assets/projects/diagram_zero_secret_gitops.png", alt: "Zero-Secret GitOps Workflow Diagram" },
      { src: "/assets/projects/Zero-secret-CICD_ECS.png", alt: "CI/CD Pipeline screenshot" },
    ],
    lead: "Automated DevSecOps pipeline deploying a containerized Node.js backend to AWS ECS Fargate, featuring passwordless GitHub Actions OIDC authentication, Docker builds, and centralized CloudWatch logging.",
    stack: ["GitHub Actions", "Docker", "Amazon ECR", "ECS Fargate", "IAM OIDC", "CloudWatch"],
    body: `
      <p>I built a secure CI/CD pipeline to deploy a Node.js backend to AWS using containers.</p>
      <p>The problem I solved was unsafe deployments and manual release processes. Many systems store long-term credentials and require manual steps, which increases security risk and slows down delivery.</p>
      <p>I removed this risk by using GitHub OIDC — no stored secrets, temporary access only, which makes the pipeline more secure.</p>
      <p>Every time code is pushed, the pipeline runs automatically. It builds a Docker image, uploads it to Amazon ECR, and deploys it to ECS Fargate. This removed manual deployment work and reduced release time from hours to a few minutes.</p>
      <p>The deployment uses rolling updates, so there is little to no downtime. I also added CloudWatch logging and ECS self-healing — if a container fails, it restarts automatically.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "No stored credentials, which improves security",
      "Faster deployments, from hours to minutes",
      "Lower cost by using serverless containers",
      "High reliability with automatic recovery",
      "Full visibility with centralized logging",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/how-i-built-a-production-grade-aws-ecs-deployment-pipeline-with-zero-stored-secrets-1f8b4c70afbe", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/CICD-Automation-Pipeline.git", github: true },
    ],
  },
  {
    id: "aws-vpc-terraform",
    title: "Production-Grade AWS VPC: Multi-AZ Network via Terraform",
    featured: false,
    defaultOpen: false,
    tags: ["aws", "iac"],
    icon: { type: "fa", class: "fab fa-aws" },
    images: [
      { src: "/assets/projects/diagram_aws_vpc_terraform.png", alt: "AWS VPC Architecture Diagram" },
      { src: "/assets/projects/Terr_Production_Infra.png", alt: "Terraform production infrastructure" },
    ],
    lead: "Enterprise-grade multi-AZ VPC architecture provisioned as Code (IaC) with Terraform, featuring public/private subnets, Auto Scaling, load balancing, Bastion host, and protected S3 backend state locking.",
    stack: ["Terraform", "AWS VPC", "EC2", "ALB", "Auto Scaling", "S3", "DynamoDB", "IAM", "Bash"],
    body: `
      <p>I built a secure and highly available AWS infrastructure using Terraform.</p>
      <p>I created a multi-AZ network so the system keeps running even if one zone fails, and placed web servers in private subnets — only the load balancer can reach them. A Bastion Host is the only entry point for SSH access.</p>
      <p>An Auto Scaling Group replaces failed servers and adjusts capacity automatically. Health checks and rolling updates mean deployments happen without downtime.</p>
      <p>I enforced strict security rules using least-privilege access and enabled IMDSv2 on all instances to prevent common cloud attacks like SSRF.</p>
      <p>Terraform state is stored in S3 with encryption and versioning, with DynamoDB locking to prevent errors from concurrent changes.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Reduced downtime risk by approximately 80%",
      "Improved security posture by 90%",
      "Cut manual operational effort by 70%",
      "Lowered long-term maintenance cost by around 40% through automation",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/building-a-production-grade-aws-vpc-with-terraform-what-i-learned-what-broke-and-why-i-made-the-c65242cd8338", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/Terraform-AWS-VPC-ALB-Auto-Scaling.git", github: true },
    ],
  },
  {
    id: "ansible-web-deployment",
    title: "Hardened AWS Web Deployment: Ansible Server Configuration",
    featured: true,
    defaultOpen: false,
    tags: ["aws", "cicd", "linux"],
    icon: { type: "img", src: "/assets/brands/ansible.svg", alt: "" },
    images: [
      { src: "/assets/projects/diagram_ansible_server_config.svg", alt: "Ansible Configuration & Hardening Workflow" },
      { src: "/assets/projects/Ansible-Automation.png", alt: "Ansible automation project architecture" },
    ],
    lead: "Secure multi-AZ AWS network infrastructure automated with Ansible configuration management, featuring hardened private subnets, isolated Bastion access, and Nginx reverse proxy load balancing.",
    stack: ["AWS VPC", "EC2", "AWS CLB", "Linux (Ubuntu)", "Ansible", "Bash", "Git", "Nginx"],
    body: `
      <p>I built a secure and reliable web application system on AWS, solving the problem of backend servers exposed to the public internet.</p>
      <p>All application servers are placed in private subnets, not publicly accessible. A Bastion Host is the only entry point for SSH. This reduced external attack exposure by approximately 90%.</p>
      <p>A Load Balancer distributes traffic across multiple servers in different zones, reducing downtime by approximately 80% and improving reliability during server failure scenarios.</p>
      <p>I automated server setup using Ansible, reducing deployment time from about two hours to under ten minutes — a 90% reduction — and removing manual errors to ensure consistent configuration across all servers.</p>
      <p>A Bash pre-check script validates deployments before execution, reducing debugging time by approximately 60% by catching issues early. Dynamic web content displays the server hostname and private IP, confirming that traffic is properly balanced across servers.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Improved security — 90% reduction in external attack exposure",
      "Reduced deployment time by 90% (hours to under 10 minutes)",
      "Lowered operational cost by 50%",
      "High availability and scalability across multiple zones",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/how-i-deployed-a-secure-web-application-on-aws-a-practical-guide-for-junior-cloud-engineers-d84ac3553b8f", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/aws-ansible-secure-web-deployment.git", github: true },
    ],
  },
  {
    id: "enterprise-ha-aws",
    title: "Enterprise AWS High Availability Architecture",
    featured: false,
    defaultOpen: false,
    tags: ["aws", "iac"],
    icon: { type: "fa", class: "fab fa-aws" },
    images: [
      { src: "/assets/projects/diagram_aws_high_availability.png", alt: "Enterprise AWS High Availability Architecture Diagram" },
      { src: "/assets/projects/Enterprise.png", alt: "Enterprise AWS high availability architecture" },
    ],
    lead: "Designed and deployed a highly available AWS infrastructure using Terraform to automate provisioning, improve reliability, and strengthen security for a web application environment.",
    stack: ["Terraform", "AWS VPC", "EC2", "Application Load Balancer", "Auto Scaling Group", "S3", "DynamoDB", "IAM", "Amazon Linux 2", "Bash Scripting"],
    body: `
      <p>The main challenge was building an infrastructure that could stay available during failures while keeping internal resources protected from direct public access.</p>
      <p>I created a custom VPC with public and private subnets distributed across multiple Availability Zones. Public traffic is routed through an Application Load Balancer, while application servers remain isolated inside private subnets.</p>
      <p>EC2 instances inside an Auto Scaling Group automatically replace unhealthy servers and adjust capacity during traffic increases. I enforced IMDSv2 on EC2 instances and restricted administrative access through a dedicated Bastion Host.</p>
      <p>Terraform state is managed remotely via an encrypted S3 bucket with DynamoDB state locking to prevent deployment conflicts.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Improved infrastructure availability across multiple AWS Availability Zones",
      "Reduced manual operational work through Terraform automation and Auto Scaling",
      "Increased security by isolating application servers in private subnets",
      "Prevented Terraform deployment conflicts using remote state locking",
      "Improved infrastructure reliability by removing single points of failure",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/mastering-aws-infrastructure-a-journey-through-terraform-high-availability-b3294618e8db", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/-month-one-assessment/tree/main/terraform-assessment", github: true },
    ],
  },
  {
    id: "golang-k8s",
    title: "Containerized Golang API Deployment with Docker and Kubernetes",
    featured: false,
    defaultOpen: false,
    tags: ["containers", "backend"],
    icon: { type: "img", src: "/assets/brands/kubernetes.svg", alt: "" },
    images: [
      { src: "/assets/projects/diagram_golang_k8s.png", alt: "Containerized Golang API Kubernetes Deployment Diagram" },
      { src: "/assets/projects/Golang-kind-cluster-created.png", alt: "Kind cluster created" },
    ],
    lead: "Containerized and deployed a Golang backend application with MongoDB using Docker, Docker Compose, and Kubernetes to improve deployment consistency, scalability, and environment management.",
    stack: ["Golang", "Docker", "Docker Compose", "Kubernetes", "Kind", "MongoDB", "YAML", "Bash Scripting"],
    body: `
      <p>The application was previously intended to run directly on servers, which made deployments harder to manage and scale. I modernized the setup by creating a containerized workflow for local development and a Kubernetes deployment for orchestration.</p>
      <p>For local development, I built a multi-stage Dockerfile to reduce image size and improve security by running the application as a non-root user. Docker Compose manages the backend API and MongoDB services together, including persistent storage, environment variable management, automatic restarts, and internal container networking.</p>
      <p>I deployed the application to a local Kubernetes cluster using Kind to simulate a production-style environment, with MongoDB using persistent storage, multiple backend replicas, ConfigMaps and Secrets, liveness and readiness probes, internal services, and Ingress for external access routing.</p>
      <p>I created deployment and cleanup scripts to automate container builds and Kubernetes operations, making the workflow faster and easier to manage.</p>
    `,
    outcomesTitle: "Key Benefits",
    outcomes: [
      "Simplified local development using Docker Compose",
      "Improved deployment consistency across environments",
      "Added scalability through Kubernetes replica management",
      "Improved application reliability using health checks and self-healing deployments",
      "Reduced manual deployment work with automation scripts",
    ],
    links: [
      { label: "Read Article", href: "https://medium.com/@RealKingHubs/how-i-containerized-a-go-app-without-losing-my-mind-or-breaking-the-code-0096c08619fc", accent: true },
      { label: "GitHub", href: "https://github.com/RealKingHubs/starttech-application/tree/main/Container-Assessment", github: true },
    ],
  },
];
