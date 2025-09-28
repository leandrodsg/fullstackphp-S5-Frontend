# API Request and Response Examples

## Register

POST /api/v1/register
{
  "name": "User Name",
  "email": "user@email.com",
  "password": "StrongPassword@123"
}

## Login

POST /api/v1/login
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

## List Services

GET /api/v1/services
Response:
[
  {
    "id": 1,
    "name": "Netflix",
    "category": "Streaming",
    "user_id": 2
  }
]

## Error Example

{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
