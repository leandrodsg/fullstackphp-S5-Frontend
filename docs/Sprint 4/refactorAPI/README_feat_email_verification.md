# Branch: feat/email-verification

## Objective
Enable email verification infrastructure without drastically changing the user experience.

## What was implemented
- Enabled MustVerifyEmail on the User model:
  - Interface implemented to enable email verification

- Existing routes (Laravel Breeze):
  - /verify-email - verification prompt
  - /email/verification-notification - resend email
  - Controllers and middleware already configured

## How it works
1. Registration flow remains the same - user logs in directly
2. Verification email is sent automatically after registration
3. Verification is optional - user can click the link whenever they want
4. Ready for API - verified middleware available for future routes

## How to test locally
1. Set MAIL_MAILER=log in .env (already configured)
2. Register a new user
3. Check the email in storage/logs/laravel.log
4. Access the link to verify the email

## Current configuration
- Emails saved in log (MAIL_MAILER=log)
- Sender configured (noreply@techsubs.com)