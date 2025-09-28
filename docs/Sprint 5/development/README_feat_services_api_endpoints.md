# README feat/services-api-endpoints

This document describes the implementations carried out in the feat/services-api-endpoints branch of Sprint 5.

## Objective

Implement the complete CRUD for Services via API, leveraging the groundwork prepared in Sprint 4 with API Resources, Form Requests, and already structured domain methods.

## Important context

This implementation was facilitated by the preparatory work carried out in Sprint 4, where the following were created:
   - API Resources (ServiceResource) for standardized serialization
   - Form Requests (ServiceStoreRequest, ServiceUpdateRequest) for validation
   - Domain methods like forUser() for user-specific filters
   - Test base with functional factories

## Steps performed

1. Verification of the existing implementation
   - File: app/Http/Controllers/Api/ServiceController.php
   - Confirmed that all CRUD methods were already implemented
   - Available methods: index, store, show, update, partialUpdate, destroy

2. Configuration of complete routes
   - File: routes/api.php
   - Added all CRUD routes for services
   - Implemented GET /api/v1/categories endpoint to list unique categories
   - Routes protected with auth:api middleware (Passport)

3. Validation of Passport authentication
   - Confirmed that the api guard was configured with the passport driver
   - Verified that Passport was installed and configured correctly
   - AppServiceProvider with token expiration settings

4. Creation of comprehensive tests
   - File: tests/Feature/ServiceApiEndpointsTest.php
   - 14 tests covering all scenarios:
     - Listing services with filters by name and category
     - Creating services with data validation
     - Viewing individual service
     - Full and partial updates of services
     - Deletion of services
     - Listing categories
     - Protection against unauthenticated access
     - Data isolation between users

5. Correction of test configuration
   - Adjusted use of Laravel Passport instead of Sanctum in tests
   - Correct import: use Laravel\Passport\Passport
   - Authentication method: Passport::actingAs($user)

## Implemented endpoints

GET /api/v1/services - List authenticated user's services
POST /api/v1/services - Create new service
GET /api/v1/services/{id} - View specific service
PUT /api/v1/services/{id} - Fully update service
PATCH /api/v1/services/{id} - Partially update service
DELETE /api/v1/services/{id} - Remove service
GET /api/v1/categories - List unique service categories

## Available filters

name - Filters services by name (partial search)
category - Filters services by exact category

## Automated test

All 14 tests passed validating:
	- Complete CRUD functionality
	- Authentication via Passport
	- Data isolation by user
	- Input data validation
	- Standardized JSON response structure