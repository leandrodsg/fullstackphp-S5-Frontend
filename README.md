# TechSubs Frontend

React client application for the TechSubs subscription management system.

## Description

Frontend client built with React to consume the TechSubs REST API. Provides a complete interface for managing technology subscriptions with authentication, CRUD operations, and reporting features.

The complete system includes user authentication, subscription management, service catalog, expense reporting with data export capabilities, and a responsive user interface.

## Requirements

- Node.js 20+
- npm
- TechSubs API running (Sprint 5 backend)

## Installation

### Standard Installation

Clone the repository and install dependencies:

```bash
npm ci --no-audit --no-fund
```

Configure environment variables by creating a .env file:

```
REACT_APP_API_URL=https://fullstackphp-sprint5-api.onrender.com
REACT_APP_API_VERSION=v1
```

### Docker Installation

The application can also be run using Docker:

```bash
# Build and start the container
docker-compose up -d

# For development with hot reload
docker-compose up -d frontend-dev
```

### Vercel Deployment

For Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `REACT_APP_API_URL=https://fullstackphp-sprint5-api.onrender.com`
   - `REACT_APP_API_VERSION=v1`
3. Or use the `vercel.json` file already configured in the project

## Usage

### Standard Usage

Start the development server:

```bash
npm start
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

### Docker Usage

Access the application:
- Production build: http://localhost:3000
- Development server with hot reload: http://localhost:3001

View logs:
```bash
# Production container
docker logs techsubs-frontend

# Development container
docker logs techsubs-frontend-dev
```

Stop containers:
```bash
docker-compose down
```

### Vercel Usage

After deployment, the application will be available at the URL provided by Vercel.
To update the application, simply push to the connected repository.

## Security

This project follows 2025 security best practices:
- Node.js 20 with latest security updates
- Security configurations for Vercel and Docker
- Configured security headers
- Input validation on all forms
- Secure token storage

## Features

- JWT authentication with Laravel Passport
- Dashboard with subscription overview and analytics
- Services management (CRUD) with detailed views
- Subscriptions management (CRUD) with status tracking
- Expense reports with filters and CSV/Excel export
- User profile management with avatar and settings
- Responsive design with mobile-friendly navigation
- Real-time form validation and feedback

## Technology Stack

- React 19
- React Router v7
- Tailwind CSS v4
- Axios
- React Hook Form
- React Testing Library

## Implementation Details

For complete technical documentation and detailed implementation information, see: [README_implem_react.md](docs/Sprint%205%20Front/README_implem_react.md)

### Core Setup
Established solid React project foundation with Create React App, Tailwind CSS configuration via CDN, organized folder structure, and initial axios integration for API communication. Includes environment variables configuration and testing setup with React Testing Library.

### Authentication System
Complete JWT authentication system implemented with React Context API for global state management. Includes login/registration pages with real-time validation using React Hook Form, protected routes with automatic redirection, token persistence in localStorage, and responsive landing page with glassmorphism design.

### Dashboard and Navigation
Main dashboard with summary cards showing monthly totals and subscription counters, recent subscriptions table with service details, responsive layout following wireframes, and functional mobile sidebar navigation. Complete integration with subscriptions and profile API endpoints.

### CRUD Operations
Services Management: Complete interface for technology services management with creation, editing, paginated listing, and detailed visualization. Includes form validation system, REST API integration, performance optimizations with React.memo and hooks, and comprehensive test coverage.

Subscriptions Management: Subscription lifecycle management system with complete CRUD operations, dynamic service selection, status management (Active, Expiring, Cancelled), billing cycle calculations, and cancellation/reactivation actions.

### Reporting and Analytics
Reports system with subscription data visualization, date range filters, specific service selection, status filters, paginated table with service avatars, colored status badges, and CSV and Excel export functionality maintaining applied filter state.

### User Interface and Profile
Complete user profile management with account information display, editable name and email fields, secure password change system, avatar with initials, and UX improvements throughout the application. Includes consistent color scheme, improved visual hierarchy, responsive design, and real-time form validation.

## API Integration

Integrates with TechSubs Laravel API endpoints:

- Authentication (login, register, logout, profile)
- Services management (create, read, update, delete)
- Subscriptions management (create, read, update, delete)
- Reports and data export (CSV/Excel formats)
- User profile management (update profile, avatar)
- Dashboard analytics and statistics

## Testing

The project includes test coverage for:

- Component rendering and interactions
- API service calls and error handling
- Authentication flows and protected routes
- Form validation and user input handling