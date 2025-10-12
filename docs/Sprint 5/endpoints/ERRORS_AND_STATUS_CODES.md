# Error Handling and Status Codes

The API uses standard HTTP status codes and returns errors in a consistent JSON format.

## Error Response Format

All API responses follow this structure:

{
  "success": true/false,
  "message": "Description of the result",
  "data": {} or null
}

### Error Response Example

{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": ["The email has already been taken."],
    "password": ["The password field is required."]
  }
}

## Common Status Codes

- 200 OK: Successful request
- 201 Created: Resource created successfully
- 400 Bad Request: Invalid input or malformed request
- 401 Unauthorized: Authentication required or failed
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource does not exist
- 422 Unprocessable Entity: Validation error
- 500 Internal Server Error: Unexpected server error

## Specific Error Examples

### Authentication Error
{
  "success": false,
  "message": "Unauthenticated",
  "data": null
}

### Validation Error
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "name": ["The name field is required."],
    "email": ["The email has already been taken."],
    "password": ["The password confirmation does not match."]
  }
}

### Resource Not Found
{
  "success": false,
  "message": "Service not found",
  "data": null
}

### Insufficient Permissions
{
  "success": false,
  "message": "Access denied",
  "data": null
}
