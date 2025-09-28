# README setup/react-project-base

This document describes the configurations and implementations made in the setup/react-project-base branch of Sprint 5 Frontend.

## Objective

Configure React project with essential dependencies and establish the base structure for developing a frontend client to consume the TechSubs API developed in Sprint 5.

## Steps performed

1. Creation of React project using Create React App
   - Command executed: npx create-react-app techsubs-frontend
   - React 18 project initialized with default configuration

2. Installation of essential dependencies
   - react-router-dom: Client-side routing for SPA navigation
   - axios: HTTP client for API requests
   - react-hook-form: Form handling and validation library
   - Command executed: npm install react-router-dom axios react-hook-form

3. Configuration of project folder structure
   - Created src/components/ for reusable UI components
   - Created src/pages/ for page-level components
   - Created src/services/ for API configurations and service calls
   - Created src/utils/ for helper functions and utilities

4. Tailwind CSS configuration via CDN
   - File changed: public/index.html
   - Added Tailwind CSS CDN script tag
   - Configured custom theme with project colors (purple-600: #7C3AED, orange-500: #F97316)
   - Simplified approach using CDN instead of build-time compilation

5. Environment variables configuration
   - File created: .env
   - Added REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
   - Configured API base URL for backend integration

6. Axios configuration setup
   - File created: src/services/api.js
   - Configured axios instance with base URL from environment variables
   - Implemented request interceptor for automatic token attachment
   - Implemented response interceptor for 401 error handling and automatic logout

7. Utility functions implementation
   - File created: src/utils/helpers.js
   - Implemented formatCurrency() for monetary value display
   - Implemented formatDate() for date formatting
   - Implemented getInitials() for avatar generation

8. Application component update
   - File changed: src/App.js
   - Updated to use Tailwind CSS classes
   - Added project branding and visual feedback for successful setup

9. CSS cleanup and optimization
   - File changed: src/index.css
   - Removed custom utility classes (replaced by Tailwind CDN)
   - Kept only essential body styles

10. Documentation update
    - File changed: README.md
    - Updated project description and setup instructions
    - Added technology stack and project structure information

## Automated tests

Created a test suite covering all configuration aspects:

1. tests/api.test.js - API configuration validation
2. tests/setup.test.js - Project structure verification
3. tests/helpers.test.js - Utility functions testing
4. Updated App.test.js - Application component testing