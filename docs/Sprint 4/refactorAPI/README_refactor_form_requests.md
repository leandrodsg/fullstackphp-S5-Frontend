# Branch: refactor/form-requests

## Objective
This branch moves all validation rules from controllers into dedicated Form Request classes. The goal is to make the code easier to maintain, improve test coverage, and get ready for future API changes.

## Main Changes
Before this refactor, validation logic was written directly inside controller methods. This made the code harder to read and update. By using Form Requests, validation rules are kept in one place, so it is easier to change or add new rules. This also helps keep controllers focused only on business logic.

- Added Form Requests:
	- `app/Http/Requests/ServiceStoreRequest.php` and `ServiceUpdateRequest.php`: 
		These files contain validation rules for creating and updating Service records. This helps keep validation logic out of controllers and makes it easier to update rules in one place.
	- `app/Http/Requests/SubscriptionStoreRequest.php` and `SubscriptionUpdateRequest.php`: 
		Similar to Service, these files handle validation for Subscription creation and updates, improving code organization and reusability.
	- `app/Http/Requests/Auth/RegisterUserRequest.php`: 
		This file manages validation for user registration, including checks for email format, uniqueness, and password confirmation.

- Updated Controllers:
	- `ServiceController@store` / `update`
	- `SubscriptionController@store` / `update`
	- `RegisteredUserController@store`
	All these controller methods were changed to use the new Form Requests. This means controllers now only handle business logic, while validation is done before the method runs.

- Added Factory Support for Service:
	- `HasFactory` in the Service model
		This allows using Laravel’s factory system to quickly create Service records for testing or seeding the database.
	- `database/factories/ServiceFactory.php`
		The factory file defines how fake Service data should be generated, making it easier to write tests and seeders.

- Created Validation Test:
	- `tests/Feature/RefactorFormRequestsTest.php`
		This test checks if validation works as expected when creating Services and Subscriptions. It covers both error cases (missing required fields) and success cases (valid data).

## Validation Rules

Service:
- `name`: required, string, max 255
- `category`: required, string, max 100
- `description`: optional, string
- `website_url`: optional, must be a valid URL

Subscription:
- `service_id`: required, must exist in services table
- `plan`: required, string, max 100
- `price`: required, numeric, min 0
- `currency`: required, string, max 3
- `next_billing_date`: required, date
- `status`: required, must be active or cancelled

Register User:
- `name`: required, string, max 255
- `email`: required, must be unique in users table
- `password`: required, confirmed

## Tests

File: `tests/Feature/RefactorFormRequestsTest.php`
Covers:
- Error when required fields are missing for Service or Subscription
- Success when all required fields are present