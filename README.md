# TechSubs Frontend - Subscription Management Client

React client application for the TechSubs subscription management system.

## Project Overview

TechSubs Frontend provides a complete React-based interface for managing digital service subscriptions through the TechSubs REST API. The application offers a responsive user experience with authentication, CRUD operations, and reporting features.

## Prerequisites

Before installing, ensure you have:

- Node.js 20+ and npm 10+
- The TechSubs API backend running locally on `http://127.0.0.1:8000`. Please follow the setup instructions in the backend repository to get it running.
- A modern web browser with JavaScript enabled.

For Docker setup:
- Docker Desktop 4.0+
- Docker Compose

## Installation

> **Important:** This frontend requires the TechSubs API backend to be running. Before proceeding, make sure you have cloned, installed, and started the backend service.

### Local Setup

This is the recommended method for development and testing.

1. Clone the repository

```bash
git clone https://github.com/leandrodsg/fullstackphp-S5-Frontend.git
cd fullstackphp-S5-Frontend
```

2. Install dependencies

```bash
npm ci --no-audit --no-fund
```

3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API URL to your local backend:

```
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

4. Verify backend is running

Before starting the frontend, ensure the backend API is accessible:

```bash
curl http://127.0.0.1:8000/api/v1/categories
```

If this command fails, start the backend first.

5. Start development server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`.

### Docker Setup

Alternative setup using Docker Compose.

1. Clone the repository

```bash
git clone https://github.com/leandrodsg/fullstackphp-S5-Frontend.git
cd fullstackphp-S5-Frontend
```

2. Start Docker services

```bash
docker-compose up -d
```

3. Access the application

The application will be available at `http://localhost:3000`.

## Test Accounts

Use these credentials to log in after installation:

**USER account** (regular user with sample data):
- **Email:** `user@example.com`
- **Password:** `UserPassword@123`

**ADMIN account** (administrator with an empty profile):
- **Email:** `admin@example.com`
- **Password:** `AdminPassword@123`

## Testing the Application

1. Access `http://localhost:3000`.
2. Click **Login**.
3. Enter the test credentials.
4. Navigate through the dashboard.

Main routes:
- `/` - Landing page
- `/login` - Authentication
- `/register` - User registration
- `/dashboard` - Main dashboard (requires login)
- `/services` - Service management
- `/subscriptions` - Subscription management
- `/reports` - Expense reports
- `/profile` - User profile

## Troubleshooting

### Cannot start development server

Check if port 3000 is already in use:

```bash
# For Windows
netstat -ano | findstr :3000

# For macOS/Linux
lsof -i :3000
```

Clear npm cache and reinstall:

```bash
# Note: These commands are for a bash-like shell (e.g., Git Bash on Windows).
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Cannot connect to API

Verify the backend is running:

```bash
curl http://127.0.0.1:8000/api/v1/categories
```

Check `.env.local` has the correct API URL:

```bash
cat .env.local
```

Should contain:
```
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

### Authentication errors

Clear browser `localStorage` and cookies. Open the browser console (F12) and run:

```javascript
localStorage.clear();
```

Then, log out and log in again.

### Docker issues

Check container status:

```bash
docker-compose ps
```

View logs:

```bash
docker-compose logs frontend
```

Restart services:

```bash
docker-compose down
docker-compose up -d
```

## API Integration

This frontend integrates with the TechSubs Laravel API. Main endpoints:

Authentication:
- `POST /api/v1/login`
- `POST /api/v1/register`
- `POST /api/v1/logout`
- `GET /api/v1/profile`

Services:
- `GET /api/v1/services`
- `POST /api/v1/services`
- `GET /api/v1/services/{id}`
- `PUT /api/v1/services/{id}`
- `DELETE /api/v1/services/{id}`

Subscriptions:
- `GET /api/v1/subscriptions`
- `POST /api/v1/subscriptions`
- `GET /api/v1/subscriptions/{id}`
- `PUT /api/v1/subscriptions/{id}`
- `PATCH /api/v1/subscriptions/{id}/cancel`
- `PATCH /api/v1/subscriptions/{id}/reactivate`
- `DELETE /api/v1/subscriptions/{id}`

Reports:
- `GET /api/v1/reports/my-expenses`
- `GET /api/v1/reports/my-expenses/export`

Categories:
- `GET /api/v1/categories`

For complete API documentation, see the [backend repository](https://github.com/leandrodsg/fullstackphp-sprint5).

## Technology Stack

- React 19 with Hooks and Context API
- React Router v7 for navigation
- React Hook Form 7.x for form handling
- Axios 1.x for HTTP requests
- Tailwind CSS v4 for styling
- Jest and React Testing Library for testing
- Docker and Docker Compose for containerization

## Running Tests

Run all tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

Test files are located in src/tests/ directory.