# Backend API Diagnostics - Sprint 5

## ❌ Current Issue: Backend Returns 500 Error

Your **frontend is working correctly**! The issue is on the backend API server.

### 🔍 Error Details from Browser Console:

```
POST https://fullstackphp-sprint5-api.onrender.com/api/v1/login
Status: 500 (Internal Server Error)
Response: {message: 'Server Error'}
```

---

## 🧪 Quick Backend Tests

Run these commands in PowerShell to diagnose the backend:

### Test 1: Check if backend is awake
```powershell
Invoke-RestMethod -Uri 'https://fullstackphp-sprint5-api.onrender.com' -Method GET
```
✅ **Result:** Returns HTML (backend is awake)

### Test 2: Test login endpoint
```powershell
$headers = @{
    'Content-Type'='application/json'
    'Accept'='application/json'
}
$body = @{
    email = 'user@example.com'
    password = 'UserPassword@123'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'https://fullstackphp-sprint5-api.onrender.com/api/v1/login' -Method POST -Body $body -Headers $headers
```
❌ **Result:** 500 Internal Server Error

### Test 3: Test categories endpoint (no auth required)
```powershell
Invoke-RestMethod -Uri 'https://fullstackphp-sprint5-api.onrender.com/api/v1/categories' -Method GET -Headers @{'Accept'='application/json'}
```

---

## 🔧 Possible Backend Issues:

### 1. **Database Connection (Neon PostgreSQL)**
- ❌ Database credentials expired
- ❌ Neon database paused/deleted
- ❌ Connection string not configured in Render

### 2. **Laravel Passport (OAuth2)**
- ❌ Passport keys not installed: `php artisan passport:keys`
- ❌ Passport not configured: `php artisan passport:install`
- ❌ OAuth keys missing from Render environment

### 3. **Environment Variables in Render**
Missing or incorrect:
- `DB_CONNECTION`
- `DB_HOST`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_KEY`

### 4. **Laravel Application**
- ❌ Storage folder permissions
- ❌ Cache issues: needs `php artisan config:clear`
- ❌ Migration issues: database tables not created

---

## ✅ What to Check in Render Dashboard:

1. **Go to:** https://dashboard.render.com
2. **Select:** fullstackphp-sprint5-api service
3. **Check:**
   - ✅ Service is deployed and running
   - ✅ Logs show no errors
   - ✅ Environment variables are set
   - ✅ Build completed successfully

### Check Recent Logs:
In Render dashboard, look for errors like:
```
- SQLSTATE[HY000] [2002] Connection refused
- Illuminate\Database\QueryException
- Laravel Passport not installed
- Class 'Laravel\Passport\...' not found
```

---

## 🚀 Quick Fixes to Try on Backend:

### If you have access to backend terminal:

```bash
# 1. Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# 2. Check database connection
php artisan migrate:status

# 3. Install/reinstall Passport
php artisan passport:install --force

# 4. Check if tables exist
php artisan tinker
>>> DB::connection()->getPdo()
>>> User::count()
```

---

## 📝 Frontend Status: ✅ WORKING

Your React frontend code is correct and aligned with the API documentation:
- ✅ Request format is correct
- ✅ Headers are correct
- ✅ Response handling is correct
- ✅ Error handling is working properly

The frontend is properly showing: 
> "Backend API error (500). The server may be starting up or experiencing issues."

---

## 🎯 Next Steps:

1. **Check Render backend logs** for specific error
2. **Verify Neon database** is active and accessible
3. **Check environment variables** in Render dashboard
4. **Verify Passport installation** on the backend
5. **Run migrations** if needed

---

## 🧪 Alternative: Test with Local Backend

If you have the backend code locally:

```powershell
# Navigate to backend folder
cd C:\xampp\htdocs\fullstackphp-sprint5\TechSubs_BackEnd

# Start local server
php artisan serve

# Update frontend .env.local
# REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

Then your frontend will work with the local backend.

---

## 📞 Summary

**Problem:** Backend API returning 500 error  
**Location:** https://fullstackphp-sprint5-api.onrender.com/api/v1/login  
**Frontend Status:** ✅ Working correctly  
**Backend Status:** ❌ Needs investigation  

**Most likely cause:** Database connection or Passport configuration issue on Render.
