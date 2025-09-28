# TechSubs - Digital Subscription Management System

## Overview

This document provides a detailed record of the implementation process for the TechSubs system, describing the technical decisions, improvements, and features developed in each branch throughout the project. It serves as a technical continuation of the main README, focusing on the evolution of the codebase, architectural changes, and the rationale behind each major development step. For a general introduction and system presentation, please refer to the main README file.

## Initial Version of the Project

The first delivery of TechSubs consisted of a Laravel application with a basic structure for managing digital subscriptions. The focus was on implementing the essential functionality of the system without advanced refinements.

Main deliveries:
- Configuration of the Laravel environment and MySQL database
- Creation of migrations and tables for users, services, and subscriptions
- Implementation of the Service, Subscription, and User models with basic relationships
- Definition of routes and controllers for CRUD operations on services and subscriptions
- Development of views with Blade for a functional interface
- Structuring of the main layout and simple navigation
- Implementation of the authentication system with Laravel Breeze
- Data isolation by logged-in user

After evaluating the project, the following limitations were identified:
- Commits were not detailed and grouped, not strictly following Gitflow
- Lack of automated tests and seeders
- Basic password validation and security
- Generic visual style, without customization
- Controller methods with embedded validation logic, without using Form Requests
- Installation documentation was not detailed

The mentor's feedback highlighted the need to improve the use of Gitflow, provide more detailed commits, add seeders, enhance security and validation, and invest in tests and documentation. Based on these observations, an improvement plan was developed for the next module of the course.

# Improvement Plan and Preparation for Evolution - Sprint 4

Planned branches for internal improvements in Sprint 4 to facilitate migration to a REST API:

## 1. Branch refactor/form-requests

In the refactor/form-requests branch, the focus was on improving the project structure by removing validations from controllers and centralizing them in specific Form Requests for each context (Service, Subscription, Register). This change followed Laravel's best practices, making validation rules clearer, easier to maintain, and ready for future evolutions. The decision to separate validation logic was reinforced by the mentor's advice on simplifying controllers and properly using the framework's resources.

Dedicated files were created for both creation and update validations, and controllers were updated to handle only business logic, becoming more streamlined and organized. Additionally, the project gained support for factories for the Service model, facilitating data generation and automated testing, which now covers error and success scenarios in the creation of services and subscriptions.

More details: [README_refactor_form_requests.md](../Sprint%204/refactorAPI/README_refactor_form_requests.md)

## 2. Branch refactor/domain-model-methods

In the refactor/domain-model-methods branch, the goal was to improve the organization and reuse of code in the system's main models. Specific methods were implemented in the Service, Subscription, and User models to centralize business rules, facilitate recurring queries, and ensure safer operations. The concern with relationship integrity and reducing logic duplication was motivated by the mentor's observations about code clarity and maintainability.

Custom methods were created for filters, scopes, and calculations directly in the models. Auxiliary methods were implemented for accessing related data, avoiding logic duplication in controllers. The use of Eloquent Scopes was standardized for clearer and reusable queries. Adjustments were made to relationships to ensure integrity and facilitate navigation between entities.

More details: [README_refactor_domain_model_methods.md](../Sprint%204/refactorAPI/README_refactor_domain_model_methods.md)

## 3. Branch chore/api-resources-stubs

With the implementation of the chore/api-resources-stubs branch, the focus was on preparing the project for migration to a REST API by creating initial files (stubs) for Laravel API Resources. Resources were generated for the system's main entities, such as Service, Subscription, and User, allowing for standardized JSON responses and facilitating the development of API controllers. The standardization and control of exposed data were designed considering the mentor's recommendations on clarity and security in presenting information.

API Resource files were created for Service, Subscription, and User, with the initial structure of returned data aligned with the essential fields of each entity. The resources were organized in the folder recommended by Laravel, following the framework's conventions. At this stage, no advanced logic was implemented, only the necessary base for future API use and evolution.

More details: [README_chore_api_resources_stubs.md](../Sprint%204/refactorAPI/README_chore_api_resources_stubs.md)

## 4. Branch feat/password-policy

The goal of the feat/password-policy branch was to enhance password security during user registration, addressing the mentor's feedback on minimum criteria. A custom strong password rule was created, requiring at least 12 characters, one uppercase letter, one lowercase letter, one number, and one special character. This rule was integrated into user registration validation, with clear error messages for each criterion.

Additionally, automated tests were implemented to ensure the rule's functionality, including unit tests for each criterion and integration tests in the registration flow.

More details: [README_feat_password_policy.md](../Sprint%204/refactorAPI/README_feat_password_policy.md)

## 5. Branch feat/email-verification

For the feat/email-verification branch, the email verification infrastructure for new users was activated without drastically altering the user experience. The MustVerifyEmail interface was enabled in the User model, leveraging the existing routes and controllers from Laravel Breeze. The system automatically sends the verification email after registration, allowing the user to confirm the address at their convenience. The decision to implement this feature was influenced by the mentor's suggestion on the importance of confirming the user's address during the registration process. The current configuration saves emails in logs to facilitate local testing and prepares the project for using the verified middleware in future API routes.

More details: [README_feat_email_verification.md](../Sprint%204/refactorAPI/README_feat_email_verification.md)

## 6. Branch feat/subscription-billing-skeleton

In the most complex branch of the improvement process, the feat/subscription-billing-skeleton branch was prepared to structure the base for subscription billing logic, preparing the system for future evolutions without altering the current functionality. The advanceOneCycle() method was implemented in the Subscription model, capable of automatically identifying monthly and annual plans, adjusting the billing date according to the plan type. For plans with “Annual” or “Yearly” in the name, the date advances by one year; for others, it advances by one month. The automation of subscription payment dates was inspired by the mentor's comments on improving this flow.

Additionally, the SubscriptionBillingAdvanced event was created, triggered whenever a billing cycle is advanced, and the LogSubscriptionBillingAdvance listener, which logs relevant information in the system log. This structure allows tracking changes and facilitates the expansion of billing logic in the future while maintaining compatibility with existing code.

References used for this implementation:

Attendize: https://github.com/Attendize/Attendize
Laravel Cashier: https://github.com/laravel/cashier
Cachet: https://github.com/CachetHQ/Cachet

YouTube videos:

Laravel Events and Listeners Tutorial: https://www.youtube.com/watch?v=bRRE2sAfv-U&t=1s
Laravel Recurring Payments with Cashier: https://www.youtube.com/watch?v=2_BsWO5WRmU

More details: [README_feat_subscription_billing_skeleton.md](../Sprint%204/refactorAPI/README_feat_subscription_billing_skeleton.md)

## 7. Branch test/base-scenarios

The test/base-scenarios branch was developed to establish a testing base to facilitate future expansions (API/TDD) and identify possible validation failures. The expansion of tests and validations was carried out to meet the mentor's demand for greater coverage and to identify possible gaps in the system. Tests were implemented for creating services and subscriptions, billing cycle tests, data isolation between users, and validation improvements, ensuring that the main business rules are covered and functioning correctly.

More details: [README_test_base_scenarios.md](../Sprint%204/refactorAPI/README_test_base_scenarios.md)

## Evolution to Sprint 5

With the improvements and refactorings carried out in Sprint 4, the project was prepared to advance to a more robust and scalable REST API architecture. In Sprint 5, the focus shifted to implementing the main API features, token-based authentication, role system, detailed documentation, and preparation for production deployment, following the identified needs and the mentor's recommendations.

The following describes the branches and features developed in this stage, detailing the technical decisions and advances made to consolidate TechSubs as a complete solution for managing digital subscriptions.

## Organization by Levels

### LEVEL 1
## 1. Branch setup/passport-authentication

The setup/passport-authentication branch integrated Laravel Passport for API authentication via OAuth2. The package was installed via Composer and initialized with the command `php artisan install:api --passport`, configuring the necessary migrations and keys. The `User` model was adapted for OAuth authentication, implementing the `OAuthenticatable` interface and using the `HasApiTokens` trait, as required by Passport.

In the `auth.php` configuration file, the `api` guard was set to use the `passport` driver, directing token-authenticated requests to the Passport flow. An automated test (`tests/Feature/PassportAuthTest.php`) was created to validate authenticated access to the `/api/user` route, ensuring that only token-authenticated users receive an authorized response. The application key (`APP_KEY`) was generated to ensure the environment's cryptographic security.

More details: [README_setup_passport_authentication.md](../Sprint%205/development/README_setup_passport_authentication.md)

## 2. Branch feat/roles-system  

The feat/roles-system branch implemented a role-based permission control system (user/admin) for application users. A migration was created to add the `role` column to the users table, with a default value of `user`, and the `User` model was updated with constants for role types and the `hasRole()` method, allowing centralized permission checks.

Additionally, a custom middleware (`CheckRole`) was developed to protect routes requiring specific permissions, ensuring that only users with the appropriate role can access certain endpoints. The seeder was adjusted to create a default admin user and multiple regular users, facilitating testing and validation of the permission flow. Automated tests cover role assignment, middleware functionality, and permission integrity in real-world scenarios.

More details: [README_feat_roles_system.md](../Sprint%205/development/README_feat_roles_system.md)

## 3. Branch refactor/api-controllers-base

The refactor/api-controllers-base branch established the foundation for a versioned API (v1), replacing the previous MVC layer with controllers that return standardized JSON responses.

- Creation of versioned API routes in `routes/api.php` with the `/api/v1` prefix and a fallback for 404 errors returning a JSON structure.
- Implementation of a `BaseController` (`app/Http/Controllers/Api/BaseController.php`) to centralize success and error responses.
- Refactoring of `ServiceController` and `SubscriptionController` to new API versions (`app/Http/Controllers/Api/ServiceController.php` and `SubscriptionController.php`), removing dependencies on views and redirects.
- Protection of service and subscription routes with the `auth:api` middleware, ensuring proper 401 responses for unauthenticated access.
- Standardization of error responses and removal of legacy web logic from API flows.

More details: [README_refactor_api_controllers_base.md](../Sprint%205/development/README_refactor_api_controllers_base.md)

## 4. Branch feat/auth-api-endpoints

The feat/auth-api-endpoints branch implemented the main authentication endpoints for the API, following the approved documentation. The endpoints include user registration (`register`), login (`login`), logout (`logout`), and profile management, all using access tokens.

- Automated tests for all authentication and profile endpoints (`tests/Feature/AuthApiEndpointsTest.php`).
- Implementation of `AuthController` (`app/Http/Controllers/Api/AuthController.php`) with methods for register, login, and logout.
- Implementation of `ProfileController` (`app/Http/Controllers/Api/ProfileController.php`) with methods for profile retrieval and password change.
- API routes configured in `routes/api.php`, with public and protected routes, and rate limiting on sensitive endpoints.
- Use of `auth:api` middleware for protected routes, and standardized JSON responses for all outcomes.

More details: [README_feat_auth_api_endpoints.md](../Sprint%205/development/README_feat_auth_api_endpoints.md)

## 5. Branch feat/services-api-endpoints

The feat/services-api-endpoints branch delivered the complete CRUD for the Service entity via API, leveraging the groundwork from Sprint 4 (API Resources, Form Requests, and domain methods).

- All CRUD methods implemented in `app/Http/Controllers/Api/ServiceController.php` (index, store, show, update, partialUpdate, destroy).
- API routes for all CRUD operations and a category listing endpoint (`GET /api/v1/categories`) in `routes/api.php`, all protected by `auth:api` middleware.
- Validation centralized in `ServiceStoreRequest` and `ServiceUpdateRequest`.
- User-level data isolation enforced using domain methods like `forUser()`.
- Automated tests in `tests/Feature/ServiceApiEndpointsTest.php` covering listing, creation, validation, and access control.

More details: [README_feat_services_api_endpoints.md](../Sprint%205/development/README_feat_services_api_endpoints.md)

## 6. Branch feat/subscriptions-api-endpoints

The feat/subscriptions-api-endpoints branch implemented the full CRUD for Subscriptions via API, including specific features like cancellation and reactivation. The implementation was based on the Sprint 4 groundwork (migrations, model methods, factories, and test base).

- `app/Http/Controllers/Api/SubscriptionController.php` with all CRUD methods (index, store, show, update, destroy) and custom methods for cancel and reactivate.
- RESTful and custom routes in `routes/api.php`, all protected by `auth:api` middleware.
- Validation using `SubscriptionStoreRequest` and `SubscriptionUpdateRequest`, with business rules for service_id, plan, price, currency, next_billing_date, and status.
- Data isolation and authorization using `forUser()` methods.
- Automated tests in `tests/Feature/SubscriptionApiEndpointsTest.php` (not shown above, but referenced in the README) covering all main and edge cases.

More details: [README_feat_subscriptions_api_endpoints.md](../Sprint%205/development/README_feat_subscriptions_api_endpoints.md)

## 7. Branch feat/reports-expenses-logic

The feat/reports-expenses-logic branch added endpoints and logic for generating user expense reports, allowing users to view and analyze their monthly costs in an organized and filtered way.

- Automated tests for the report endpoint in `tests/Feature/ReportApiEndpointsTest.php`.
- Implementation of `ReportController` (`app/Http/Controllers/Api/ReportController.php`) with the `myExpenses()` method (`GET /api/v1/reports/my-expenses`).
- Protected route in `routes/api.php` with support for status filtering via query parameter.
- Report features: listing of user subscriptions, service name, plan, monthly value, currency, status, next billing date, and automatic calculation of total monthly expenses.
- Data isolation and security enforced by `auth:api` middleware.

More details: [README_feat_reports_expenses_logic.md](../Sprint%205/development/README_feat_reports_expenses_logic.md)

## 8. Branch feat/data-export-functionality

The feat/data-export-functionality branch implemented endpoints for exporting user expense report data in CSV format, allowing users to download their data for external analysis or backup.

Technical details:
- Export endpoint in `app/Http/Controllers/Api/ReportController.php` (`exportMyExpenses()` method, `GET /api/v1/reports/my-expenses/export`).
- Protected route in `routes/api.php`, supporting the same filters as the report endpoint.
- CSV export features: service name, plan, price, currency, status, next billing date, automatic file naming, proper HTTP headers, and UTF-8 encoding.
- Data isolation and security enforced by `auth:api` middleware.
- Automated tests to ensure data integrity and security.

More details: [README_feat_data_export_functionality.md](../Sprint%205/development/README_feat_data_export_functionality.md)

### LEVEL 2 (API Documentation)
- 9. Branch docs/api-documentation

### LEVEL 3 (Deployment)
- 10. Branch deploy/production-setup