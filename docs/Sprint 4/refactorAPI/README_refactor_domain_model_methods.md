# Branch: refactor/domain-model-methods

## Objective
Encapsulate domain logic in the models to reduce code repetition and create a more consistent base for future API migration.

## Changes Made

### 1. Service Model (`app/Models/Service.php`)
- Added: `scopeForUser()` – scope to filter services by the logged-in or specific user
- Eliminates repetition of `where('user_id', Auth::id())` in controllers

### 2. Subscription Model (`app/Models/Subscription.php`)
- Added: `scopeForUser()` – scope to filter subscriptions by the logged-in or specific user
- Added: `isDue()` – method to check if the subscription is overdue (past billing date)
- Added: `advanceBillingDate()` – method to advance the billing date by one month
- Encapsulates domain logic in the model, preparing for future automations

### 3. ServiceController (`app/Http/Controllers/ServiceController.php`)
- Refactored: All methods now use `Service::forUser()` instead of `where('user_id', Auth::id())`
- Methods changed: `index()`, `show()`, `edit()`, `update()`, `destroy()`
- Cleaner and less repetitive code

### 4. SubscriptionController (`app/Http/Controllers/SubscriptionController.php`)
- Refactored: All methods now use `Subscription::forUser()` instead of `where('user_id', Auth::id())`
- Refactored: `create()` and `edit()` methods now show only services of the logged-in user
- Methods changed: `index()`, `create()`, `show()`, `edit()`, `update()`, `destroy()`
- Cleaner and safer code (user only sees their own services)

### 5. Tests (`tests/Feature/DomainModelMethodsTest.php`)
- Created: Tests to validate the functioning of scopes and domain methods
- Coverage: `scopeForUser` in both models, `isDue()` and `advanceBillingDate()`
- Ensures that the refactor does not break functionalities

## Modified Files
- `app/Models/Service.php`
- `app/Models/Subscription.php`
- `app/Http/Controllers/ServiceController.php`
- `app/Http/Controllers/SubscriptionController.php`
- `tests/Feature/DomainModelMethodsTest.php` (new)

## How to Test
```bash
php artisan test tests/Feature/DomainModelMethodsTest.php
```