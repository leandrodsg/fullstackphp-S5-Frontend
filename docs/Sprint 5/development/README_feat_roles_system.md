# README feat/roles-system

This document describes the implementations carried out in the feat/roles-system branch of Sprint 5.

## Objective

Add a simple roles system (user/admin) for users, allowing permission differentiation in the system.

## Steps performed

1. Created automated test for roles
	- File: tests/Feature/UserRoleTest.php

2. Migration for 'role' column in users table
	- Command: php artisan make:migration add_role_to_users_table --table=users
	- Adds the 'role' column (string, default 'user') to the users table.

3. Defined role constants in User
	- File: app/Models/User.php
	- Adds the ROLE_USER and ROLE_ADMIN constants to standardize possible values.

4. Implemented hasRole() method in User
	- File: app/Models/User.php
	- Simple method that returns true if the user has the given role.

5. Created CheckRole middleware
	- Command: php artisan make:middleware CheckRole
	- File: app/Http/Middleware/CheckRole.php
	- Protects routes by requiring the authenticated user to have the specified role.

6. Updated UserFactory for roles
	- File: database/factories/UserFactory.php
	- Allows creation of users with role user or admin, default 'user'.

7. Updated DatabaseSeeder
	- File: database/seeders/DatabaseSeeder.php
	- Creates a default admin (admin@example.com, password admin123) and three regular users for testing.

8. Automated tests
	- Command: php artisan test --filter=UserRoleTest
	- Ensures everything is working correctly.

## Automated test

The test is located at tests/Feature/UserRoleTest.php and covers:
- User has 'user' role by default
- Can create admin user
- hasRole() method works correctly