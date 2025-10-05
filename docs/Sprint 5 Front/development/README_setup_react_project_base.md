# README setup/react-project-base

This document describes the configurations and implementations made in the setup/react-project-base branch of Sprint 5 Frontend.

## Objective

Set up the React project base with essential dependencies and folder structure for the TechSubs frontend application.

## Configuration Details

### Project Setup
- Created React 19.1.1 project with Create React App
- Installed dependencies: react-router, axios, react-hook-form

### Project Structure
The project includes the following organized structure:
- components/: Reusable UI components (AppLayout, Navigation, Footer, HeroSection, FeaturesSection, ProtectedRoute)
- pages/: Application pages (Dashboard, Login, Register, MyProfile, MyServices, MySubscriptions, Reports, etc.)
- contexts/: React contexts (AuthContext for authentication management)
- services/: API service layer with axios configuration
- utils/: Utility functions and helper modules (helpers.js, billingCycleUtils.js, mockData.js)
- tests/: Comprehensive test suite covering all major components and functionality

### Tailwind CSS
- Added via CDN in public/index.html
- Custom theme with pastel-purple and pastel-salmon color palettes
- CDN approach to avoid build complexity

### API Configuration
- Environment variable: REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/v1
- Axios instance in src/services/api.js with:
  - Automatic token attachment via request interceptors
  - 401 error handling with automatic logout and redirect
  - Base URL configuration from environment variables

### Utility Functions
- helpers.js: Core utility functions
  - formatCurrency() for money display with Intl.NumberFormat
  - formatDate() for date formatting with localization
  - getInitials() for user avatars from names
  - calculateDaysUntilNextBilling() for subscription management
  - isSubscriptionExpired() for status validation
  - formatPriceWithCurrency() for price display
- billingCycleUtils.js: Specialized billing cycle calculations
- mockData.js: Mock data for development and testing

### Authentication System
- AuthContext implementation for state management
- ProtectedRoute component for route protection
- Login/Register pages with form validation

### Testing

Comprehensive test suite created:
- tests/api.test.js - API configuration validation and module import testing
- tests/setup.test.js - Project structure verification and environment variables validation
- tests/helpers.test.js - Utility functions testing (formatCurrency, formatDate, getInitials)
- tests/dashboard.test.js - Dashboard component testing
- tests/landing.test.js - Landing page functionality testing
- tests/login.test.js - Login component and authentication testing
- tests/register.test.js - Registration component testing
- tests/profile.test.js - User profile management testing
- tests/services.test.js - Service management testing
- tests/subscription.test.js - Subscription management testing
- tests/reports.test.js - Reports functionality testing
- App.test.js - Application rendering verification