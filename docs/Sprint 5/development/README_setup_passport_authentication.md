# README setup/passport-authentication

This document describes the configurations and implementations made in the setup/passport-authentication branch of Sprint 5.

## Objective

Configure API authentication using Laravel Passport, ensuring that the system accepts token authentication for the next stages of the project.

## Steps performed

1. Installation of the Laravel Passport package via Composer
   - Command executed:
     composer require laravel/passport

2. Installation and initial configuration of Passport
   - Command executed:
     php artisan install:api --passport

3. Update of the User model
   - File changed: app/Models/User.php
   - Changes:
     - Added the OAuthenticatable interface in the class declaration.
     - Added the HasApiTokens trait in the traits block.
   - Allows the user to use Passport token authentication.

4. Configuration of the api guard
   - File changed: config/auth.php
   - Changes:
     - Added the 'api' guard with the 'passport' driver.
   - Defines that routes protected by the 'api' guard use Passport authentication.

5. Creation of automated test
   - File created: tests/Feature/PassportAuthTest.php
   - Tests if a user authenticated with Passport can access a protected route (/api/user).

6. Generation of the application key (APP_KEY)
   - Command executed:
     php artisan key:generate
   - Generates the encryption key used by Laravel for data security.

## Automated test

The created test is located at tests/Feature/PassportAuthTest.php 
It checks if a user authenticated with Passport can access the /api/user route.

## Known Issues and Resolutions

### OAuth Migration Issues (October 2025)

During post-implementation testing, several OAuth installation issues were identified and resolved:

#### 1. Installation Sequence Problems
**Problem**: Users experienced failures when running `php artisan install:api --passport` on fresh installations.

**Root Cause**: The installation sequence in the documentation was incorrect, causing conflicts during OAuth setup.

**Resolution**: Updated installation procedure:
1. Run `php artisan migrate` first to create base tables
2. Then run `php artisan install:api --passport` 
3. Clear configuration cache with `php artisan config:cache`

#### 2. Session Storage Conflicts
**Problem**: Local development environments had session path conflicts between Docker and traditional setups.

**Resolution**: Added environment-specific session configuration guidance in the main README.

#### 3. Documentation Inconsistencies  
**Problem**: API response format examples across documentation files were inconsistent.

**Resolution**: Standardized all authentication examples to use the correct response format with `response.data.token`.

### Best Practices Learned

1. **Always test OAuth installation on fresh environments** before deployment
2. **Document the correct installation sequence** for different environments
3. **Include troubleshooting steps** for common OAuth setup issues
4. **Maintain consistency** in API response format documentation

These corrections ensure that new installations follow the correct OAuth setup sequence without conflicts.