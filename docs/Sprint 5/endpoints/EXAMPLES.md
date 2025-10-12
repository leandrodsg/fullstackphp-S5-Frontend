# API Request and Response Examples

## Authentication

### Register

POST /api/v1/register
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "TestPassword@123",
  "password_confirmation": "TestPassword@123"
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

### Login

POST /api/v1/login
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

## Services

### List Services

GET /api/v1/services

Response:
{
  "success": true,
  "message": "Service list",
  "data": [
    {
      "id": 1,
      "name": "Netflix",
      "category": "Streaming",
      "description": "Video streaming service",
      "website_url": "https://netflix.com",
      "user_id": 1
    }
  ]
}

### Create Service

POST /api/v1/services
{
  "name": "Spotify",
  "category": "Music",
  "description": "Music streaming service",
  "website_url": "https://spotify.com"
}

Response:
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "id": 2,
    "name": "Spotify",
    "category": "Music",
    "description": "Music streaming service",
    "website_url": "https://spotify.com",
    "user_id": 1
  }
}

## Subscriptions

### List Subscriptions

GET /api/v1/subscriptions

Response:
{
  "success": true,
  "message": "Subscription list",
  "data": [
    {
      "id": 1,
      "service_id": 1,
      "plan": "Premium",
      "price": "15.99",
      "currency": "USD",
      "next_billing_date": "2024-12-01",
      "status": "active",
      "billing_cycle": "monthly",
      "service": {
        "id": 1,
        "name": "Netflix"
      }
    }
  ]
}

### Create Subscription

POST /api/v1/subscriptions
{
  "service_id": 1,
  "plan": "Premium Plan",
  "price": 15.99,
  "currency": "USD",
  "next_billing_date": "2024-12-01",
  "status": "active"
}

Response:
{
  "success": true,
  "message": "Subscription created",
  "data": {
    "id": 1,
    "service_id": 1,
    "plan": "Premium Plan",
    "price": "15.99",
    "currency": "USD",
    "next_billing_date": "2024-12-01",
    "status": "active",
    "billing_cycle": "monthly"
  }
}

## Categories

### List Categories

GET /api/v1/categories

Response:
{
  "success": true,
  "message": "Categories list",
  "data": [
    "Streaming",
    "Music",
    "Gaming",
    "Productivity",
    "Cloud Storage",
    "News",
    "Education",
    "Finance"
  ]
}

## Reports

### My Expenses

GET /api/v1/reports/my-expenses

Response:
{
  "success": true,
  "message": "Expense report",
  "data": {
    "total_monthly": "45.97",
    "total_annual": "551.64",
    "subscriptions": [
      {
        "service_name": "Netflix",
        "plan": "Premium",
        "price": "15.99",
        "currency": "USD",
        "billing_cycle": "monthly"
      }
    ]
  }
}

## Error Examples

### Validation Error

{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": ["The email has already been taken."],
    "password": ["The password confirmation does not match."]
  }
}

### Unauthorized Error

{
  "success": false,
  "message": "Unauthenticated",
  "data": null
}

### Not Found Error

{
  "success": false,
  "message": "Service not found",
  "data": null
}
