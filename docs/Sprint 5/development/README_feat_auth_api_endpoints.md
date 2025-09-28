# README feat/auth-api-endpoints

This document describes the implementations carried out in the feat/auth-api-endpoints branch of Sprint 5.

## Objective

Implement API authentication endpoints as per the approved documentation, allowing registration, login, logout, and profile management via access tokens.

## Steps performed

1. Creation of automated tests for authentication endpoints
   - File: tests/Feature/AuthApiEndpointsTest.php
   - Tests all authentication and profile endpoints.

2. Implementation of AuthController
   - File: app/Http/Controllers/Api/AuthController.php
   - Methods implemented:
     - register(): POST /api/v1/register (user registration with validation)
     - login(): POST /api/v1/login (authentication with token generation)
     - logout(): POST /api/v1/logout (revocation of user tokens)

3. Implementation of ProfileController
   - File: app/Http/Controllers/Api/ProfileController.php
   - Methods implemented:
     - profile(): GET /api/v1/profile (authenticated user data)
     - changePassword(): PUT /api/v1/change-password (password change)

4. Configuration of API routes
   - File: routes/api.php
   - Public routes: register and login
   - Protected routes: profile, change-password, and logout (auth:api middleware)
   - Rate limiting applied to sensitive endpoints (throttle:api)

5. Authentication middleware
   - Applied auth:api middleware to all protected routes
   - Ensures only authenticated users access protected resources

6. Validation and error handling
   - Input data validation on all endpoints
   - Standardized JSON responses for success and error
   - Appropriate HTTP status codes (200, 201, 401, 422)

7. Rate limiting for security
   - Configured throttle:api for login and change-password endpoints
   - Protection against brute force attacks

## Automated test

The test is located at tests/Feature/AuthApiEndpointsTest.php and covers:
- User registration with valid data
- Failure on registration with duplicate email
- Login with valid credentials
- Failure on login with invalid credentials
- Access to profile with valid token
- Blocked access to profile without token
- Password change with valid data
- Failure on password change with incorrect current password
- Logout with token revocation

## Known issue in logout

The `token()->revoke()` method of Laravel Passport has limitations in the testing environment.

References to the problem:
- https://stackoverflow.com/questions/65853851/laravel-passport-unit-test-for-logout-revoking-token
- https://github.com/laravel/passport/issues/446
- https://stackoverflow.com/questions/43318310/how-to-logout-a-user-from-api-using-laravel-passport
- https://laracasts.com/discuss/channels/laravel/passport-how-can-i-manually-revoke-access-token

Command: php artisan test --filter=AuthApiEndpointsTest

## Corrections of auxiliary tests

During development, 4 issues were identified and fixed, which were causing test failures:

### 1. Handler.php - Error "Undefined method 'getStatusCode'"
Problem: Code was trying to call `getStatusCode()` on any exception without type checking
Solution: Complete refactoring of the `render()` method in `app/Exceptions/Handler.php`
- Added correct imports: `HttpException` and `Throwable`
- Replaced `method_exists` check with `instanceof HttpException`
- Implemented type-safe logic to obtain status code
- Maintains standardized JSON return: `{"success": false, "message": "..."}`

### 2. API Fallback Route without standardized structure
Problem: Fallback route was returning only `{'message': 'Not Found'}` 
Solution: Corrected fallback route in `routes/api.php`
- Changed return to `{'success': false, 'message': 'Not Found'}`
- Maintains consistency with API response standard

### 3. PassportAuthTest with incorrect route
Problem: Test was calling `/api/user` but route was at `/api/v1/user`
Solution: Corrected route in `PassportAuthTest.php`
- Changed from `/api/user` to `/api/v1/user`
- Maintains consistency with versioned route structure

### 4. RegistrationTest with inadequate password
Problem: Test was using password "password" which did not meet `StrongPassword` requirements
Solution: Updated password in `RegistrationTest.php`
- Changed from "password" to "Password123!"
- Meets all criteria: 12+ characters, uppercase, lowercase, number, and special character