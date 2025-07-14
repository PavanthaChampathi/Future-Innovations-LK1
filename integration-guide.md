# PostgreSQL & Express API Integration Guide

This guide explains how to integrate your Future Innovations LK website with PostgreSQL database and Node.js Express API.

## Architecture Overview

```
Frontend (React) ↔ Express API ↔ PostgreSQL Database
```

## Setup Steps

### 1. Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Database**:
   ```bash
   # Create PostgreSQL database
   createdb future_innovations
   
   # Copy environment file
   cp .env.example .env
   ```

3. **Edit .env file** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=future_innovations
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret_key_here
   ```

4. **Run database migrations**:
   ```bash
   npm run migrate
   ```

5. **Start the API server**:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Configure API URL**:
   ```bash
   # Copy environment file
   cp .env.example .env
   ```

2. **Edit .env file**:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Install additional dependencies**:
   ```bash
   npm install
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```

## Database Schema

The system creates the following tables:

### Core Tables
- **users**: Admin authentication
- **services**: Service catalog (3D printing, laser cutting)
- **quotations**: Customer quote requests
- **orders**: Confirmed orders
- **quote_files**: Files uploaded with quotes
- **order_files**: Files associated with orders

### Default Services
The migration automatically creates services for:
- 3D Printing: PLA+ (LKR 50/gram), ABS (LKR 60/gram), eTU-95A (LKR 75/gram)
- Laser Cutting: Wood (LKR 100/min), Acrylic (LKR 120/min), Cardboard (LKR 80/min)

## API Integration Features

### 1. Authentication
- JWT-based admin login
- Token verification
- Password management

### 2. Quotation System
- File upload (STL, DXF, PDF, SVG, AI, DWG)
- Automated price calculation
- Status management (Pending, Sent, Approved, Rejected)
- Convert quotes to orders

### 3. Order Management
- Order tracking with progress updates
- Status management (Pending, In Progress, Completed, Shipped)
- Customer communication

### 4. Service Management
- Add/edit/delete services
- Price management
- Material catalog

## File Upload System

### Supported File Types
- **3D Printing**: STL files
- **Laser Cutting**: DXF, SVG, AI, DWG files
- **Documentation**: PDF files

### Upload Limits
- Maximum file size: 10MB per file
- Maximum files per upload: 10 files
- Files stored in `backend/uploads/` directory

## Security Features

### Backend Security
- JWT authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- CORS protection
- Input validation
- SQL injection prevention

### File Security
- File type validation
- Size limits
- Secure file storage

## Production Deployment

### Database Setup
```sql
-- Create production database
CREATE DATABASE future_innovations_prod;

-- Create user
CREATE USER fi_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE future_innovations_prod TO fi_user;
```

### Environment Configuration
```env
# Production .env
NODE_ENV=production
DB_HOST=your_db_host
DB_NAME=future_innovations_prod
DB_USER=fi_user
DB_PASSWORD=secure_password
JWT_SECRET=very_secure_jwt_secret
```

### Process Management
```bash
# Install PM2
npm install -g pm2

# Start API server
pm2 start backend/server.js --name "fi-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Nginx Configuration
```nginx
# API proxy
server {
    listen 80;
    server_name api.futureinnovationslk.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name futureinnovationslk.com www.futureinnovationslk.com;
    
    root /var/www/future-innovations-lk/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Testing the Integration

### 1. Test API Health
```bash
curl http://localhost:3001/api/health
```

### 2. Test Authentication
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 3. Test Services Endpoint
```bash
curl http://localhost:3001/api/services
```

## Customization

### Adding New Services
```javascript
// Add via API
POST /api/services
{
  "name": "3D Printing - PETG",
  "category": "3D Printing",
  "material": "PETG",
  "price": 65.00,
  "unit": "gram",
  "description": "Chemical resistant PETG printing"
}
```

### Custom Pricing Logic
Edit `backend/routes/quotations.js` to implement your pricing algorithms:

```javascript
// Custom price calculation
const calculatePrice = (serviceType, material, quantity, files) => {
  // Your custom logic here
  return estimatedPrice;
};
```

## Monitoring & Maintenance

### Database Monitoring
```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('future_innovations'));

-- Monitor active connections
SELECT count(*) FROM pg_stat_activity;
```

### API Monitoring
```bash
# Check API status
pm2 status

# View logs
pm2 logs fi-api

# Monitor resources
pm2 monit
```

### Backup Strategy
```bash
# Database backup
pg_dump future_innovations > backup_$(date +%Y%m%d).sql

# File backup
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz backend/uploads/
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Check firewall settings

2. **File Upload Fails**
   - Check file size limits
   - Verify file type is supported
   - Check uploads directory permissions

3. **CORS Errors**
   - Update CORS origins in server.js
   - Check API URL in frontend .env

4. **Authentication Issues**
   - Verify JWT secret matches
   - Check token expiration
   - Clear browser localStorage

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

This integration provides a complete, production-ready system for managing your 3D printing and laser cutting business with PostgreSQL database backend.