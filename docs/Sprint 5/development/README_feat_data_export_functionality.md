# README feat/data-export-functionality

This document describes the implementations carried out in the feat/data-export-functionality branch of Sprint 5.

## Objective

Implement functionality to export expense report data in CSV format, allowing users to download their data for external analysis or backup.

## Steps performed

1. Implementation of the CSV export endpoint
   - File: app/Http/Controllers/Api/ReportController.php
   - Method implemented:
     - exportMyExpenses(): GET /api/v1/reports/my-expenses/export (CSV export of expenses)

2. Configuration of the export route
   - File: routes/api.php
   - Protected route: /api/v1/reports/my-expenses/export (auth:api middleware)
   - Support for the same filters as the report (status via query parameter)

3. CSV export features
   - Generation of a CSV file with user subscription data
   - Exported columns:
     - Service Name
     - Plan
     - Price
     - Currency
     - Status (active/canceled)
     - Next Billing Date
   - Automatic file naming: expenses_YYYY_MM_DD.csv
   - Proper HTTP headers for file download
   - UTF-8 encoding for special character support

4. Filters and security
   - Application of the same filters available in the report
   - Filter by status (?status=active|cancelled)
   - Data isolation per user (each user exports only their own subscriptions)
   - Mandatory authentication via auth:api middleware

5. Technical implementation
   - Native CSV generation using Laravel's Response
   - Headers Content-Type: text/csv; charset=UTF-8
   - Content-Disposition header to force download
   - Reused query logic from the existing report method

6. Comprehensive automated tests
   - File: tests/Feature/ReportApiEndpointsTest.php
   - 4 specific tests for export:
     - Complete data export in CSV
     - Export with applied filters
     - Protection against unauthenticated access
     - Data isolation between users

## Structure of the generated CSV file

```csv
Service Name,Plan,Price,Currency,Status,Next Billing Date
Netflix,Premium,15.99,USD,active,2024-12-01
Spotify,Individual,9.99,USD,cancelled,2024-11-15
```

## Implemented endpoints

### GET /api/v1/reports/my-expenses/export
- Authentication: Required (Bearer Token)
- Optional parameters**:
  - `status`: Filter by status (active|cancelled)
- Response: CSV file for download
- Response headers:
  - Content-Type: text/csv; charset=UTF-8
  - Content-Disposition: attachment; filename="expenses_YYYY_MM_DD.csv"

## Validation and quality

- Automated tests covering all usage scenarios
- Validation of correct HTTP headers
- Verification of generated CSV content
- Test of data isolation between users
- Validation of filters applied in the export