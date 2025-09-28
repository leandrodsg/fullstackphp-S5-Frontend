# README feat/reports-expenses-logic

This document describes the implementations carried out in the feat/reports-expenses-logic branch of Sprint 5.

## Objective

Implement a user expense report with their subscriptions, allowing visualization and analysis of monthly costs in an organized and filtered manner.

## Steps performed

1. Creation of automated tests for the report endpoint
   - File: tests/Feature/ReportApiEndpointsTest.php
   - Tests all scenarios of the expense report endpoint

2. Implementation of ReportController
   - File: app/Http/Controllers/Api/ReportController.php
   - Method implemented:
     - myExpenses(): GET /api/v1/reports/my-expenses (personal expense report)

3. Configuration of API routes
   - File: routes/api.php
   - Protected route: /api/v1/reports/my-expenses (auth:api middleware)
   - Support for status filtering via query parameter

4. Report features
   - Listing of the logged-in user's subscriptions
   - Displayed data:
     - Service name
     - Subscription plan
     - Monthly value
     - Currency
     - Status (active/canceled)
     - Next billing date
   - Automatic calculation of total monthly expenses
   - Filter by status (?status=active|cancelled)
   - Data isolation per user (each user sees only their own subscriptions)

5. Validation and security
   - Mandatory authentication via auth:api middleware
   - Data isolation per user
   - Validation of filter parameters
   - Standardized JSON responses

6. JSON response structure
   - Standardized format: {"success": true, "message": "...", "data": {...}}
   - User data: name, total subscriptions, total expenses
   - Detailed list of subscriptions with complete information

## Automated test

The test is located at tests/Feature/ReportApiEndpointsTest.php and covers:
- Access to the report with an authenticated user
- Report filtering by status (active/cancelled)
- Blocked access without authentication
- Data isolation between users
- Validation of the JSON response structure
- Correct calculation of expense totals

## Improvements to the base system

During development, important improvements were made to the system:

### 1. Strengthening password policy (StrongPassword.php)
- Implementation of robust password validation
- Requirements: minimum 10 characters, uppercase, lowercase, number, and special character
- Clear and specific error messages

### 2. Enhancement of exception handling (Handler.php)
- Refactoring of the render() method for better error handling
- Implementation of type-safe for HttpException
- Standardized JSON responses for all exceptions

### 3. Update of factories for testing
- UserFactory.php: passwords compatible with StrongPassword
- SubscriptionFactory.php: more realistic data for testing

### 4. Fixes in existing tests
- Update of passwords in all tests to meet the new requirements
- Correction of routes and response structures
- Improvement in the coverage of authentication tests

Command: php artisan test --filter=ReportApiEndpointsTest

## Report data structure

```json
{
  "success": true,
  "message": "Expense report generated successfully",
  "data": {
    "user_name": "User's Name",
    "total_subscriptions": 2,
    "total_expenses": 16.98,
    "currency": "USD",
    "subscriptions": [
      {
        "id": 1,
        "service_name": "Netflix",
        "plan": "Premium",
        "price": 10.99,
        "currency": "USD",
        "status": "active",
        "next_billing_date": "2025-02-20"
      }
    ]
  }
}
```

## Available filters

- `?status=active` - Only active subscriptions
- `?status=cancelled` - Only cancelled subscriptions
- No filter - All user subscriptions