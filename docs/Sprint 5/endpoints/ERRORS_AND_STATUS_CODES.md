# Error Handling and Status Codes

The API uses standard HTTP status codes and returns errors in a consistent JSON format.

## Error Response Format

{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}

## Common Status Codes

- 200 OK: Successful request
- 201 Created: Resource created
- 400 Bad Request: Invalid input
- 401 Unauthorized: Authentication required or failed
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource does not exist
- 422 Unprocessable Entity: Validation error
- 500 Internal Server Error: Unexpected error

## Example

{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
