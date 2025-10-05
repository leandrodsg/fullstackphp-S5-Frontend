# API Endpoints Documentation – TechSubs (Sprint 5)

This documentation describes the current REST API endpoints for the TechSubs system, reflecting all changes and improvements made in Sprint 5. For reference, the original pre-project API documentation is preserved in the file `ENDPOINTS_API_PREPROJECT.md` in this folder.

## Contents

- Overview
- Authentication
- Services
- Categories
- Subscriptions
- Reports
- Data Export
- Roles and Permissions
- Filters and Pagination
- Error Handling and Status Codes
- Examples
- Postman Collection

## Overview

The TechSubs API is organized according to REST principles and uses OAuth2 authentication (Laravel Passport). All endpoints require authentication unless otherwise noted. Data access is always scoped to the authenticated user, except for admin endpoints.

## Authentication

Endpoints for user registration, login, logout, and profile management. All authentication uses Bearer tokens.

POST /api/v1/register
POST /api/v1/login
POST /api/v1/logout
GET /api/v1/profile
PUT /api/v1/change-password

See AUTH_GUIDE.md for details and examples.

## Services

Endpoints for managing user services.

GET /api/v1/services
POST /api/v1/services
GET /api/v1/services/{id}
PUT /api/v1/services/{id}
PATCH /api/v1/services/{id}
DELETE /api/v1/services/{id}

## Categories

GET /api/v1/categories

## Subscriptions

Endpoints for managing user subscriptions.

GET /api/v1/subscriptions
POST /api/v1/subscriptions
GET /api/v1/subscriptions/{id}
PUT /api/v1/subscriptions/{id}
PATCH /api/v1/subscriptions/{id}
PATCH /api/v1/subscriptions/{id}/cancel
PATCH /api/v1/subscriptions/{id}/reactivate
DELETE /api/v1/subscriptions/{id}

## Reports

GET /api/v1/reports/my-expenses

## Data Export

GET /api/v1/reports/my-expenses/export

## Roles and Permissions

See ROLES_AND_POLICIES.md for details on user and admin roles, permission checks, and middleware usage.

## Filters and Pagination

See FILTERS_AND_PAGINATION.md for supported query parameters, filtering options, and pagination usage.

## Error Handling and Status Codes

See ERRORS_AND_STATUS_CODES.md for the API's error response format and status code conventions.

## Examples

See EXAMPLES.md for request and response samples for all endpoints.

## Postman Collection

The file POSTMAN_COLLECTION.json contains a ready-to-import collection for testing all endpoints.

---