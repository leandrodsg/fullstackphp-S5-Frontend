# Roles and Permissions

The TechSubs API uses a role-based access control system.

## Roles

- user: Default role for all users. Can manage their own services and subscriptions.
- admin: Has access to all user data and can perform administrative actions.

## Middleware

Routes can be protected using the CheckRole middleware. Only users with the required role can access certain endpoints.

## Example

To restrict an endpoint to admin only:

Route::middleware(['auth:api', 'role:admin'])->get('/admin', ...);

## Policies

Policies are used to enforce ownership and permissions at the model level. Users can only access or modify their own data unless they are admin.