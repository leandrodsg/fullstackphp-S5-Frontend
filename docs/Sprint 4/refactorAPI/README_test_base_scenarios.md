# Branch: test/base-scenarios

## Objective
Establish a test base for future expansion (API/TDD) and identify validation gaps.

## Implemented Tests

### Feature Tests - Service Creation
- Creation of service with valid data
- Failure when required fields are missing
- Fixed: Invalid category is rejected in validation
- Fixed: Name must be unique per user
- Different users can have services with the same name
- Unauthenticated user is rejected

### Feature Tests - Subscription Creation
- Creation of monthly and annual subscription
- Failure with invalid service and missing fields
- Fixed: Invalid currency is rejected in validation
- Failure with invalid price (minimum 0.01)
- Fixed: User cannot use another user's service
- Unauthenticated user is rejected

### Unit Tests - Billing Cycle
- advanceOneCycle() adds 1 month for monthly plans
- advanceOneCycle() adds 1 year for plans with "Annual"/"Yearly"
- Case-insensitive detection of annual plans
- Plans without "Annual"/"Yearly" default to monthly
- advanceBillingDate() maintains compatibility (always +1 month)
- SubscriptionBillingAdvanced event is triggered

### Feature Tests - User Data Isolation
- Users see only their own services/subscriptions
- Users cannot view details of other users
- Users cannot edit/delete resources of others
- Model scopes work correctly

### 5. Additional Improvements
- Minimum price of 0.01 (prevents zero values)
- Billing date must be in the future
- Security by obscurity (404 instead of 403)

## How to run

```bash
php artisan test --filter="ServiceCreationTest|SubscriptionCreationTest|SubscriptionBillingCycleTest|UserDataIsolationTest"
```