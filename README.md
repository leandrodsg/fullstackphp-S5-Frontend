# TechSubs Frontend

React client application for the TechSubs subscription management system.

## Description

Frontend client built with React to consume the TechSubs REST API. Provides a complete interface for managing technology subscriptions with authentication, CRUD operations, and reporting features.

The complete system includes user authentication, subscription management, service catalog, expense reporting with data export capabilities, and a responsive user interface.

## Requirements

- Node.js 14+
- npm
- TechSubs API running (Sprint 5 backend)

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Configure environment variables by creating a .env file:

```
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

## Usage

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