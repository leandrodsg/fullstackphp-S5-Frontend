# README setup/react-project-base

This document describes the configurations and implementations made in the setup/react-project-base branch of Sprint 5 Frontend.

## Objective

Set up the React project base with essential dependencies and folder structure for the TechSubs frontend application.

## Configuration Details

### Project Setup
- Created React 18 project with Create React App
- Installed dependencies: react-router-dom, axios, react-hook-form

### Tailwind CSS
- Added via CDN in public/index.html
- Custom theme with purple (#7C3AED) and orange (#F97316) colors
- CDN approach to avoid build complexity

### API Configuration
- Environment variable: REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
- Axios instance in src/services/api.js with:
  - Automatic token attachment
  - 401 error handling
  - Base URL configuration

### Utility Functions
- formatCurrency() for money display
- formatDate() for date formatting  
- getInitials() for user avatars
   - File changed: src/App.js
   - Updated to use Tailwind CSS classes
   - Added project branding and visual feedback for successful setup

### Testing

Test files created:
- tests/api.test.js - API configuration validation
- tests/setup.test.js - Project structure verification  
- tests/helpers.test.js - Utility functions testing
- App.test.js - Basic application rendering