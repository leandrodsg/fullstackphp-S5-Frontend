# README feat/subscriptions-api-endpoints

This document describes the implementations carried out in the feat/subscriptions-api-endpoints branch of Sprint 5.

## Objective

Implement the complete CRUD for Subscriptions via API, including specific features like cancellation and reactivation of subscriptions, leveraging the groundwork prepared in Sprint 4.

## Important context

This implementation was facilitated by the preparatory work carried out in Sprint 4, where the following were created:
   - Migration of the subscriptions table with a complete structure
   - Subscription model with relationships and domain methods
   - Factory for generating test data
   - Test base with functional structure

## Steps performed

1. Implementation of the API controller
   - File: app/Http/Controllers/Api/SubscriptionController.php
   - Created controller inheriting from BaseController
   - Fully implemented CRUD methods: index, store, show, update, destroy
   - Added specific methods: cancel, reactivate
   - Configured authentication and authorization per user with forUser()

2. Configuration of API routes
   - File: routes/api.php
   - Added RESTful routes for subscriptions
   - Implemented specific routes for cancellation and reactivation
   - Routes protected with auth:api middleware (Passport)

3. Data validation
   - Created SubscriptionStoreRequest and SubscriptionUpdateRequest classes
   - Implemented inline validations in the controller
   - Configured rules for service_id, plan, price, currency, next_billing_date, status
   - Corrected validations to use next_billing_date instead of start_date

4. Correction of inconsistencies
   - Adjusted validations in the controller to use next_billing_date
   - Corrected factories to generate consistent data
   - Synchronized tests with the controller's validations
   - Ensured referential integrity with service_id

5. Creation of comprehensive tests
   - File: tests/Feature/SubscriptionApiEndpointsTest.php
   - 12 tests covering all scenarios:
     - Listing authenticated user's subscriptions
     - Creating subscriptions with data validation
     - Viewing individual subscription
     - Updating subscriptions
     - Deleting subscriptions
     - Canceling and reactivating subscriptions
     - Protection against unauthenticated access
     - Data isolation between users

## Implemented endpoints

GET /api/v1/subscriptions - List authenticated user's subscriptions
POST /api/v1/subscriptions - Create new subscription
GET /api/v1/subscriptions/{id} - View specific subscription
PUT /api/v1/subscriptions/{id} - Update subscription
DELETE /api/v1/subscriptions/{id} - Remove subscription
PATCH /api/v1/subscriptions/{id}/cancel - Cancel subscription
PATCH /api/v1/subscriptions/{id}/reactivate - Reactivate subscription

## Required fields

Creation: service_id, plan, price, currency, next_billing_date, status
Update: plan, price, currency, next_billing_date, status

## Automated test

All 12 tests passed successfully, validating:
	- Complete CRUD functionality
	- Specific functionalities for cancellation and reactivation
	- Authentication via Passport
	- Data isolation by user
	- Input data validation
	- Standardized JSON response structure