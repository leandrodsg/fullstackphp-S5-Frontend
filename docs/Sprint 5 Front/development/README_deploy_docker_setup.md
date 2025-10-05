# README deploy/docker-setup

This document describes the Docker deployment configuration and setup instructions for the TechSubs frontend React application.

## Objective

Provide complete Docker deployment setup for the TechSubs frontend application with production-ready configuration and development environment support.

## Configuration Details

### Docker Configuration Files

#### Dockerfile
Multi-stage build configuration for production deployment:
- Build stage: Uses node:20-alpine for dependency installation and React build
- Production stage: Uses nginx:alpine for serving static files
- Custom nginx configuration for SPA routing support
- Optimized for production with minimal image size

#### docker-compose.yml
Two service configurations:
- frontend: Production build with nginx serving on port 3000
- frontend-dev: Development environment with hot reload on port 3001

#### nginx/nginx.conf
Custom nginx configuration:
- SPA routing support with try_files directive
- Static file serving optimization
- Gzip compression enabled
- Security headers configuration

### Environment Configuration

#### .env.docker
Production environment variables:
- REACT_APP_API_URL=https://fullstackphp-sprint5-api.onrender.com
- REACT_APP_API_VERSION=v1

#### .dockerignore
Optimized build context excluding:
- node_modules
- .git
- README files
- Test files
- Development configuration files

## Installation Instructions

### Prerequisites
- Docker installed on your system
- Docker Compose installed
- Git for cloning the repository

### Step 1: Clone Repository
```
git clone <repository-url>
cd TechSubs_FrontEnd
```

### Step 2: Environment Setup
Copy the Docker environment file:
```
copy .env.docker .env
```

### Step 3: Build Docker Image
Build the production Docker image:
```
docker-compose build frontend
```

### Step 4: Start Application
Start the application in production mode:
```
docker-compose up frontend
```

The application will be available at http://localhost:3000

### Development Environment Setup

For development with hot reload:
```
docker-compose up frontend-dev
```

The development server will be available at http://localhost:3001

### Stopping the Application
To stop the running containers:
```
docker-compose down
```

### Rebuilding After Changes
To rebuild the image after code changes:
```
docker-compose build --no-cache frontend
docker-compose up frontend
```

## Production Deployment

### Vercel Deployment
The application is configured for Vercel deployment with vercel.json:
- Static build configuration using @vercel/static-build
- Environment variables for API integration
- Security headers configuration
- SPA routing support

### Environment Variables
Required environment variables for production:
- REACT_APP_API_URL: Backend API URL
- REACT_APP_API_VERSION: API version (v1)

## Technical Implementation

### Build Process
1. Install dependencies using npm install
2. Build React application using npm run build
3. Copy build files to nginx container
4. Configure nginx for SPA routing
5. Serve application on port 80 (mapped to host port 3000)

### Container Architecture
- Base image: node:20-alpine for build, nginx:alpine for production
- Multi-stage build for optimized image size
- Custom nginx configuration for React SPA support
- Environment variable injection at build time

### Security Considerations
- Non-root user execution in containers
- Minimal base images for reduced attack surface
- Environment variable management for sensitive configuration
- Security headers configured in nginx

### Performance Optimizations
- Multi-stage Docker build for smaller production images
- Nginx gzip compression for faster loading
- Static file caching configuration
- Optimized nginx configuration for SPA applications