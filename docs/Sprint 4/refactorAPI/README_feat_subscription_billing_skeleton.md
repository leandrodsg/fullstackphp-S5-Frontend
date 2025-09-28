# Branch: feat/subscription-billing-skeleton

## Objective
Create a skeleton for the billing logic to allow future evolution without changing current functionality.

## What was implemented

### advanceOneCycle() Method
The `advanceOneCycle()` method was created in the Subscription model (`app/Models/Subscription.php`). This method advances the subscription's billing date, automatically identifying whether the plan is monthly or annual. If the plan name contains “Annual” or “Yearly”, it adds 1 year to the billing date; for other plans, it adds 1 month. This facilitates future automations and maintains compatibility with the existing code.

### SubscriptionBillingAdvanced Event
The `SubscriptionBillingAdvanced` event was created in `app/Events/SubscriptionBillingAdvanced.php`. This event is triggered every time the `advanceOneCycle()` method is called and a billing cycle is advanced. The event carries a reference to the updated subscription.

### LogSubscriptionBillingAdvance Listener
The `LogSubscriptionBillingAdvance` listener was created in `app/Listeners/LogSubscriptionBillingAdvance.php`. This listener logs to the system every time the `SubscriptionBillingAdvanced` event is triggered, saving information such as subscription_id, user_id, service name, and the new billing date. The listener is registered in the `AppServiceProvider` (`app/Providers/AppServiceProvider.php`) to listen for the event.

### Listener Registration
The listener was registered in the `boot()` method of `AppServiceProvider` to ensure it listens for the event whenever it is triggered. Look for the code that links the event and the listener, usually using `Event::listen(SubscriptionBillingAdvanced::class, LogSubscriptionBillingAdvance::class);`

### Generated Log
Every time the billing cycle is advanced, the listener logs the subscription data in `storage/logs/laravel.log`. Just advance a billing cycle and check the log file to see the recorded information.

## How it works
1. Call subscription.advanceOneCycle()
2. The billing date advances based on the plan:
   - "Basic Annual", "Premium Yearly": +1 year
   - "Basic", "Premium", "Pro": +1 month (default)
3. The event is triggered automatically
4. The log is recorded in storage/logs/laravel.log

## Usage examples
```php
// Monthly plan - advances 1 month
$subscription = new Subscription(['plan' => 'Basic']);
$subscription->advanceOneCycle();

// Annual plan - advances 1 year
$subscription = new Subscription(['plan' => 'Premium Annual']);
$subscription->advanceOneCycle();
```