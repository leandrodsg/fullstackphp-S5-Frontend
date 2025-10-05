FROM node:20-alpine as build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies with security flags
RUN npm ci --no-audit --no-fund

# Copy remaining files
COPY . .

# Use .env.docker for Docker environment
COPY .env.docker .env

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy React build to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]