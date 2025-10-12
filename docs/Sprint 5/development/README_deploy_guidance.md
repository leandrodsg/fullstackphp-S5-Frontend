# Deploy Guide - TechSubs Laravel

## Part 1: Run the Project Locally

### Step 1: Get the code
```
git clone [YOUR_REPOSITORY_URL]
cd TechSubs_API
```

### Step 2: Configure environment
```
copy .env.example .env
```

### Step 3: Start with Docker
```
docker-compose up -d
```

Wait a few minutes for Docker to download and configure everything.

### Step 4: Install dependencies
```
docker-compose exec app composer install
```

### Step 5: Configure database
```
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate:fresh --seed
```

### Step 6: Test application
Open your browser and access: http://localhost:8001

Login credentials:
- Email: admin@example.com
- Password: password

## Part 2: Prepare for Production

### Step 7: Test production build
```
docker build -t techsubs-api .
```

### Step 8: Generate production key
```
docker run --rm techsubs-api php artisan key:generate --show
```

Note down the generated key (example: base64:abc123...).

### Step 9: Test production container
```
docker run -p 8080:8080 --env APP_KEY=[YOUR_KEY_HERE] techsubs-api
```

Access http://localhost:8080 to verify it works.

## Part 3: Deploy to the Internet

### Step 10: Create Render account
1. Go to https://render.com
2. Create free account
3. Connect your GitHub account

### Step 11: Create PostgreSQL database on Neon
1. Go to https://neon.tech
2. Create free account
3. Create new project
4. Note down the connection credentials:
   - Host
   - Database
   - Username
   - Password

### Step 12: Configure deployment on Render
1. In Render, click "New" > "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: techsubs-api
   - Environment: Docker
   - Region: Europe (Frankfurt)
   - Branch: main

### Step 13: Configure environment variables
In Render, add these variables:

```
APP_NAME=TechSubs
APP_ENV=production
APP_DEBUG=false
APP_KEY=[YOUR_KEY_FROM_STEP_8]
APP_URL=https://techsubs-api.onrender.com

DB_CONNECTION=pgsql
DB_HOST=[NEON_HOST]
DB_PORT=5432
DB_DATABASE=[NEON_DATABASE]
DB_USERNAME=[NEON_USERNAME]
DB_PASSWORD=[NEON_PASSWORD]

LOG_CHANNEL=stderr
```

### Step 14: Deploy
1. Click "Create Web Service"
2. Wait for the build (5-10 minutes)
3. Access the URL provided by Render

### Step 15: Configure database in production
In Render terminal (or wait for first deploy):
```
php artisan migrate --force
php artisan db:seed
```

## Final Verification

After deployment, your application will be available at:
- Interface: https://[YOUR-APP].onrender.com
- Login: https://[YOUR-APP].onrender.com/login

Use the same credentials:
- Email: admin@example.com
- Password: password

## Important Files

- `Dockerfile`: Production configuration
- `docker-compose.yml`: Development configuration
- `.env`: Local environment variables
- `database/seeders/DatabaseSeeder.php`: Test data