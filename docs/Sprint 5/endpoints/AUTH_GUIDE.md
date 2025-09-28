# Authentication Guide

This guide explains how to authenticate with the TechSubs API using OAuth2 (Laravel Passport).

## Register

POST /api/v1/register

Request body:
{
  "name": "User Name",
  "email": "user@email.com",
  "password": "StrongPassword@123"
}

## Login

POST /api/v1/login

Request body:
{
  "email": "user@email.com",
  "password": "StrongPassword@123"
}

Response:
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3600
}

## Using the Token

Include the token in the Authorization header for all protected requests:

Authorization: Bearer {access_token}

## Logout

POST /api/v1/logout

## Profile

GET /api/v1/profile

## Change Password

PUT /api/v1/change-password