# TechSubs Frontend - Subscription Management Client

React client application for the TechSubs subscription management system.

## Project Overview

TechSubs Frontend provides a complete React-based interface for managing digital service subscriptions through the TechSubs REST API. The application offers a responsive user experience with authentication, CRUD operations, and reporting features.

## Implementation Details

This README provides a overview of the system and installation. For a detailed technical breakdown of the implementation, including component architecture, state management, and development decisions, see:

Implementation details:
• [docs/Sprint 5 Front/README_implem_react.md](docs/Sprint%205%20Front/README_implem_react.md)

Frontend documentation:
• [docs/Sprint 5 Front/front_infos.md](docs/Sprint%205%20Front/front_infos.md)

The `docs/` folder contains additional documentation for each feature, component structure, and development process.

## Installation Instructions

### Prerequisites

Before installing TechSubs Frontend, choose your preferred development environment:

Option 1: Docker (Recommended)
• Docker Desktop 4.0+
• TechSubs API running (Sprint 5 backend)

Option 2: Traditional Setup
• Node.js 20+ with npm 10+
• TechSubs API running (Sprint 5 backend)
• Modern web browser with JavaScript enabled

### Installed Dependencies

Frontend Core:
• React 19 (UI library)
• React Router v7 (navigation and routing)
• React Hook Form 7.x (form handling and validation)
• Axios 1.x (HTTP client for API communication)

Styling and UI:
• Tailwind CSS v4 (utility-first CSS framework)
• CSS3 with custom properties and glassmorphism effects
• Responsive design system with mobile-first approach

Development and Testing:
• React Testing Library (component testing)
• Jest (testing framework)
• Create React App (build tooling)
• ESLint and Prettier (code quality)

## Quick Start

For immediate setup with minimal configuration, use Docker:

```bash
git clone https://github.com/leandrodsg/fullstackphp-S5-Frontend.git
cd fullstackphp-S5-Frontend
cp .env.example .env
docker-compose up -d
```

Access the application at `http://localhost:3000` and login with:
• Email: `user@example.com`
• Password: `UserPassword@123`

### Installation

#### Option 1: Docker Setup (Recommended)

Prerequisites: Docker and Docker Compose installed on your system.

1. Clone the Repository
   ```bash
   git clone https://github.com/leandrodsg/fullstackphp-S5-Frontend.git
   cd fullstackphp-S5-Frontend
   ```

2. Environment Configuration
   ```bash
   cp .env.example .env
   ```
   The `.env.example` file is pre-configured with production API endpoints.

3. Start Docker Services
   ```bash
   docker-compose up -d
   ```
   This starts the React development server with hot reload in the background.

4. Install Dependencies (if needed)
   ```bash
   docker-compose exec frontend npm install
   ```
   Downloads and installs all React packages and dependencies.

5. Build for Production (optional)
   ```bash
   docker-compose exec frontend npm run build
   ```
   Creates optimized production build in the `build/` directory.

The application will be available at `http://localhost:3000`

#### Option 2: Traditional Setup

Prerequisites: Node.js 20+, npm 10+, and TechSubs API running.

1. Clone the Repository
   ```bash
   git clone https://github.com/leandrodsg/fullstackphp-S5-Frontend.git
   cd fullstackphp-S5-Frontend
   ```

2. Install Dependencies
   ```bash
   npm ci --no-audit --no-fund
   ```
   Downloads and installs all React packages and dependencies.

3. Environment Configuration
   ```bash
   cp .env.example .env
   ```
   Creates your environment file with API configuration.

4. Start Development Server
   ```bash
   npm start
   ```
   Starts the React development server with hot reload.

5. Build for Production (optional)
   ```bash
   npm run build
   ```
   Creates optimized production build for deployment.

The application will be available at `http://localhost:3000`

#### Option 3: Vercel Deployment

Prerequisites: Vercel account and GitHub repository connected.

1. Connect Repository to Vercel
   - Login to Vercel dashboard
   - Import your GitHub repository
   - Configure project settings

2. Environment Variables Configuration
   ```
   REACT_APP_API_URL=https://fullstackphp-sprint5-api.onrender.com
   REACT_APP_API_VERSION=v1
   ```

3. Deploy
   ```bash
   # Manual deployment
   vercel --prod
   
   # Or automatic deployment via GitHub integration
   git push origin main
   ```

The application will be available at your Vercel domain.

## Test Accounts

The system integrates with TechSubs API test accounts for different testing scenarios:

### USER Account (Complete Test Data)
• Email: `user@example.com`
• Password: `UserPassword@123`
• Role: Regular User
• Immediate demonstration of system capabilities with sample data

### ADMIN Account (Empty Profile - Testing from Scratch)
• Email: `admin@example.com`
• Password: `AdminPassword@123`
• Role: Administrator
• Clean slate for testing all functionalities

### Web Interface Access
1. Landing Page: `http://localhost:3000/`
2. Login Page: `http://localhost:3000/login`
3. Dashboard: `http://localhost:3000/dashboard` (after login)
4. Services: `http://localhost:3000/services`
5. Subscriptions: `http://localhost:3000/subscriptions`
6. Reports: `http://localhost:3000/reports`
7. Profile: `http://localhost:3000/profile`

Note: For Vercel deployment, replace `localhost:3000` with your Vercel domain.

### Frontend Testing

#### Login and Navigate
1. Access the application at `http://localhost:3000`
2. Click "Login" or "Get Started"
3. Use test credentials: `user@example.com` / `UserPassword@123`
4. Explore dashboard with sample data

#### Create a Service
1. Navigate to Services section
2. Click "Add New Service"
3. Fill form with service details
4. Submit and verify creation

#### Create a Subscription
1. Navigate to Subscriptions section
2. Click "Add New Subscription"
3. Select service from dropdown
4. Set billing details and submit

#### Generate Reports
1. Navigate to Reports section
2. Set date range filters
3. Apply service/status filters
4. Export data as CSV or Excel

## Docker Environment

### Docker Architecture
• **React Development Server**: Runs on port 3000 with hot reload
• **Production Build**: Nginx serving static files on port 3000
• **Volume Mounting**: Source code mounted for development
• **Environment Variables**: Configured via .env file

### Docker Commands
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs frontend

# Execute commands in container
docker-compose exec frontend npm install
docker-compose exec frontend npm run build

# Stop containers
docker-compose down
```

## Troubleshooting

### React Development Issues

Development server won't start:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port availability
netstat -ano | findstr :3000
```

API connection issues:
```bash
# Verify API URL in .env
cat .env | grep REACT_APP_API_URL

# Test API connectivity
curl -X GET http://localhost:8001/api/v1/health
```

Authentication token issues:
```bash
# Clear browser localStorage
# Open browser console and run:
localStorage.clear()

# Or check Application tab in DevTools
```

### Docker Issues

Container won't start:
```bash
# Check container status
docker-compose ps

# View detailed logs
docker-compose logs frontend

# Restart services
docker-compose down && docker-compose up -d
```

Port conflicts:
• If port 3000 is in use, modify `docker-compose.yml` to use a different port
• Check what's using the port: `netstat -ano | findstr :3000`

Build issues:
```bash
# Clean Docker build cache
docker system prune -f

# Rebuild without cache
docker-compose build --no-cache frontend
```

### Vercel Deployment Issues

Build failures:
• Check environment variables are properly configured
• Verify React build process with `npm run build` locally
• Review Vercel build logs for specific errors

API connectivity:
• Ensure `REACT_APP_API_URL` points to production API
• Verify CORS settings on backend API
• Check API endpoints are accessible from Vercel servers

## API Integration

Integrates with TechSubs Laravel API endpoints for complete functionality:

### Authentication Endpoints
• `POST /api/v1/login` — User authentication with JWT token
• `POST /api/v1/register` — New user registration
• `POST /api/v1/logout` — User logout and token invalidation
• `GET /api/v1/user` — Get authenticated user profile

### Services Management
• `GET /api/v1/services` — List user services with pagination
• `POST /api/v1/services` — Create new service with validation
• `GET /api/v1/services/{id}` — Get specific service details
• `PUT /api/v1/services/{id}` — Update service information
• `DELETE /api/v1/services/{id}` — Delete service and dependencies

### Subscriptions Management
• `GET /api/v1/subscriptions` — List user subscriptions with status
• `POST /api/v1/subscriptions` — Create new subscription
• `GET /api/v1/subscriptions/{id}` — Get subscription details
• `PUT /api/v1/subscriptions/{id}` — Update subscription
• `DELETE /api/v1/subscriptions/{id}` — Cancel subscription

### Reports and Analytics
• `GET /api/v1/reports/my-expenses` — Get expense reports with filters
• `GET /api/v1/reports/my-expenses/export` — Export data as CSV
• `GET /api/v1/dashboard/stats` — Dashboard statistics and analytics

### User Profile Management
• `PUT /api/v1/user/profile` — Update user profile information
• `PUT /api/v1/user/password` — Change user password
• `POST /api/v1/user/avatar` — Upload user avatar image

## Security Features

• **JWT Authentication**: Secure token-based authentication with Laravel Passport
• **Protected Routes**: Route-level authentication guards and redirects
• **Token Management**: Automatic token refresh and secure storage in localStorage
• **Input Validation**: Client-side validation with React Hook Form
• **CORS Configuration**: Proper cross-origin resource sharing setup
• **XSS Protection**: Sanitized data rendering and secure API communication
• **HTTPS Enforcement**: SSL/TLS encryption for production deployments

## Technology Stack

Frontend Core:
• React 19 (component-based UI library)
• React Router v7 (client-side routing and navigation)
• React Hook Form 7.x (form handling and validation)
• React Context API (global state management)

Styling and Design:
• Tailwind CSS v4 (utility-first CSS framework)
• Custom CSS3 with glassmorphism effects
• Responsive design system with mobile-first approach
• CSS Grid and Flexbox for layout management

HTTP and API:
• Axios 1.x (HTTP client with interceptors)
• JWT token management and automatic headers
• Request/response interceptors for error handling
• RESTful API integration with Laravel backend

Development Tools:
• Create React App (build tooling and development server)
• React Testing Library (component testing utilities)
• Jest (testing framework with coverage reporting)
• ESLint and Prettier (code quality and formatting)

Deployment and DevOps:
• Docker and Docker Compose (containerization)
• Vercel integration (serverless deployment)
• Nginx (production web server)
• Environment variable management

## Testing

The project includes comprehensive test coverage using React Testing Library and Jest:

### Test Categories

Component Testing:
• Authentication components (Login, Register, Protected Routes)
• Dashboard components and analytics display
• CRUD forms (Services, Subscriptions, Profile)
• Navigation and routing components
• UI feedback and error handling

API Integration Testing:
• Service calls with mocked responses
• Authentication flows and token management
• Error handling and network failures
• Data transformation and validation

User Interaction Testing:
• Form submissions and validation
• Button clicks and navigation
• Input field behavior and feedback
• Responsive design and mobile interactions

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test src/tests/login.test.js
```

### Test Files Structure
```
src/tests/
├── api.test.js           # API service testing
├── dashboard.test.js     # Dashboard component tests
├── helpers.test.js       # Utility functions tests
├── landing.test.js       # Landing page tests
├── login.test.js         # Authentication tests
├── profile.test.js       # Profile management tests
├── register.test.js      # Registration tests
├── reports.test.js       # Reports and export tests
├── services.test.js      # Services CRUD tests
├── setup.test.js         # Test environment setup
└── subscription.test.js  # Subscriptions CRUD tests
```

### Test Coverage Goals
• Components: 90%+ coverage
• API services: 100% coverage
• Critical user flows: 100% coverage
• Error scenarios: 85%+ coverage