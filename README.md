# TechSubs Frontend

React client application for the TechSubs subscription management system.

## Description

Frontend client built with React to consume the TechSubs REST API. Provides a complete interface for managing technology subscriptions with authentication, CRUD operations, and reporting features.

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
- Dashboard with subscription overview
- Services management (CRUD)
- Subscriptions management (CRUD)
- Expense reports with CSV export
- User profile management
- Responsive design
- Role-based access control

## Technology Stack

- React 18
- React Router v6
- Tailwind CSS
- Axios
- React Hook Form
- React Testing Library

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── services/       # API configuration
└── utils/          # Helper functions
```

## API Integration

Integrates with TechSubs Laravel API endpoints:

- Authentication (login, register, logout)
- Services management
- Subscriptions management
- Reports and data export
- User profile management

## Documentation

Technical implementation details are available in the docs/ folder:

- README_implem_react.md - Complete implementation documentation
- Development branch documentation in docs/Sprint 5 Front/development/
- Wireframes and UI specifications in docs/Sprint 5 Front/Wireframe/