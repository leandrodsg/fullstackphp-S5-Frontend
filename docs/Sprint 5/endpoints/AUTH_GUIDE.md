# Authentication Guide

This guide explains how to authenticate with the TechSubs API using OAuth2 (Laravel Passport).

## Register

POST /api/v1/register

Request body:
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "StrongPassword@123",
  "password_confirmation": "StrongPassword@123"
}

Response:
{
  "success": true,
  "message": "Registered",
  "data": {
    "user": {
      "id": 3,
      "name": "New User",
      "email": "newuser@example.com"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."
  }
}

## Login

POST /api/v1/login

Request body:
{
  "email": "user@example.com",
  "password": "UserPassword@123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 2,
      "name": "Test User",
      "email": "user@example.com"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."
  }
}

## Using the Token

Include the token in the Authorization header for all protected requests:

Authorization: Bearer {token_from_data_field}

## Logout

POST /api/v1/logout

Response:
{
  "success": true,
  "message": "Logged out",
  "data": null
}

## Profile

GET /api/v1/profile

Response:
{
  "success": true,
  "message": "User profile",
  "data": {
    "id": 1,
    "name": "User Name",
    "email": "user@email.com",
    "role": "user"
  }
}

## Change Password

PUT /api/v1/change-password

Request body:
{
  "current_password": "OldPassword@123",
  "password": "NewPassword@123",
  "password_confirmation": "NewPassword@123"
}