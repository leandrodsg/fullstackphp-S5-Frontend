# Branch: chore/api-resources-stubs

## Objective
Create basic API Resources to prepare for the future migration to API REST in Sprint 5.

## Changes Made

### 1. ServiceResource (`app/Http/Resources/ServiceResource.php`)
- Resource to serialize data from the Service model
- Fields: id, name, category, description, website_url, created_at, updated_at
- Standardizes response format for future APIs

### 2. SubscriptionResource (`app/Http/Resources/SubscriptionResource.php`)
- Resource to serialize data from the Subscription model
- Fields: id, plan, price, currency, status, next_billing_date, created_at, updated_at
- Controls which subscription data is exposed via API

### 3. UserResource (`app/Http/Resources/UserResource.php`)
- Resource to serialize data from the User model
- Fields: id, name, email, email_verified_at, created_at, updated_at
- Ensures sensitive data (password, tokens) is not exposed

### 4. Tests (`tests/Feature/ApiResourcesTest.php`)
- Tests to validate the structure of the Resources
- Coverage: Required fields, security (data not exposed)
- Ensures serialization works correctly

## Modified Files
- `app/Http/Resources/ServiceResource.php` (new)
- `app/Http/Resources/SubscriptionResource.php` (new)
- `app/Http/Resources/UserResource.php` (new)
- `tests/Feature/ApiResourcesTest.php` (new)

## How to Test
```bash
php artisan test tests/Feature/ApiResourcesTest.php
```