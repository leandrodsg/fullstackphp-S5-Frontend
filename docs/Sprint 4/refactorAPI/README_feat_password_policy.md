# Branch: feat/password-policy

## Objective
Strengthen password security during user registration, following the professor's feedback, by requiring clear and didactic minimum criteria.

## What was implemented
- Custom strong password rule (`app/Rules/StrongPassword.php`):
  - Minimum of 12 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%&*)
- Integration of the rule in user registration validation (`RegisterUserRequest`).
- Clear and didactic error messages for each criterion.
- Automated tests:
  - Unit tests for each rule criterion
  - Integration test in the registration flow

## How to test
1. Run the feature tests:
   ```bash
   php artisan test --filter=StrongPasswordTest
   ```
2. Try to register a user with a weak password and check the error message.
3. Try to register with a strong password and confirm success.