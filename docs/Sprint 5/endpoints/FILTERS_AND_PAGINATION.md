# Filters and Pagination

The API supports filtering and pagination on list endpoints.

## Filtering

You can filter results using query parameters:

- /api/v1/services?name=netflix&category=streaming
- /api/v1/subscriptions?status=active&service_id=1
- /api/v1/reports/my-expenses?period=2025-08&status=active

## Pagination

Paginated endpoints accept:

- page: The page number
- per_page: Number of items per page

Example:

/api/v1/services?page=2&per_page=10

The response includes pagination metadata.

## Sorting

Some endpoints support sorting by fields using:

- sort_by: Field to sort
- sort_order: asc or desc

Example:

/api/v1/services?sort_by=name&sort_order=asc
