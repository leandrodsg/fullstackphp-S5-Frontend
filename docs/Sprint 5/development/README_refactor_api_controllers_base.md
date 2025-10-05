# README refactor/api-controllers-base

This document describes the implementations carried out in the refactor/api-controllers-base branch of Sprint 5.

## Objective

Create the foundation for a versioned API (v1) by replacing the MVC layer focused on views with controllers that return standardized JSON.

## Steps performed

1. Creation of the versioned API route structure
   - File: `routes/api.php`
   - Added the base route under the `/api/v1` prefix.
   - Included a simple endpoint `/api/v1/test-base-response` to validate the structure.
   - Added a JSON fallback for non-existent routes within `v1` returning `{ success: false, message: 'Not Found' }`.

2. Creation of BaseController for standardized responses
   - File: `app/Http/Controllers/Api/BaseController.php`
   - Simple methods for success/error (or direct use of `response()->json()`).

3. Conversion of ServiceController to API
   - New file: `app/Http/Controllers/Api/ServiceController.php`
   - Removed dependency on views/redirects.
   - Current endpoints focused on basic JSON return.

4. Conversion of SubscriptionController to API
   - New file: `app/Http/Controllers/Api/SubscriptionController.php`
   - Same simple pattern applied to the subscriptions controller.

5. Minimal protected routes
   - Group protected with `auth:api` for `/services` and `/subscriptions` (index method at this stage).
   - Ensures proper 401 response when unauthenticated.

6. Standardization of basic error responses
   - 404: via specific `Route::fallback()` within the `v1` prefix.
   - 401: standard response from the Passport guard (accepted by the test).

7. Cleanup of previous view logic
   - Old web-layer controllers are no longer used in the API route.
   - No redirects remain in the API flow.

8. Automated test of the base structure
   - File: `tests/Feature/ApiBaseStructureTest.php`
     - Standardized JSON success response (`/api/v1/test-base-response`).
     - Standardized 404 response for non-existent route.
     - Protection (401) when accessing a protected route without a token.
   - Execution: `php artisan test --filter=ApiBaseStructureTest`

9. Decision on API Resources (POSTPONED)
   - Although there are stubs/mentions of `ServiceResource`, `SubscriptionResource`, and `UserResource`
   - Resources will be introduced in the `feat/services-api-endpoints` and `feat/subscriptions-api-endpoints` branches

## Exception Handler Status

- 404 handled via fallback; 401 handled by the guard.

## Current endpoints exposed at this stage

Textual list (no table to facilitate export/diffs):

- GET `/api/v1/test-base-response`
	- Public (does not require token)
	- Quickly validate that the base structure of the API is functional
	- `{ success: true, message: 'API base structure working', data: null }`

- GET `/api/v1/services`
	- Protected (`auth:api`)
	- Will be expanded in `feat/services-api-endpoints` (full CRUD + filters + Resources)

- GET `/api/v1/subscriptions`
	- Protected (`auth:api`)
	- Will be expanded in `feat/subscriptions-api-endpoints` (CRUD, cancel/reactivate, filters, Resources)

- Fallback `/api/v1/*` (any non-existent route within the prefix)
	- Return: `{ success: false, message: 'Not Found' }` with HTTP 404
	- Ensures basic error consistency without needing to customize Handler now