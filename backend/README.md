# Future Innovations LK - Backend API

Express.js backend API for Future Innovations LK 3D printing and laser cutting business.

## Features

- **Authentication**: JWT-based admin authentication
- **Quotations**: File upload and automated quote generation
- **Orders**: Order management and tracking
- **Services**: Service catalog management
- **File Upload**: Secure file handling for STL, DXF, PDF files
- **PostgreSQL**: Full database integration

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb future_innovations

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

### 3. Run Migrations
```bash
npm run migrate
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Production Deployment
```bash
npm start
```

## Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=future_innovations
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/change-password` - Change password

### Quotations
- `POST /api/quotations` - Create quotation with file upload
- `GET /api/quotations` - Get all quotations (admin)
- `GET /api/quotations/:id` - Get quotation by ID
- `PATCH /api/quotations/:id/status` - Update quotation status
- `POST /api/quotations/:id/convert-to-order` - Convert to order

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order status/progress
- `GET /api/orders/stats/dashboard` - Get dashboard statistics

### Services
- `GET /api/services` - Get all services (public)
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `PATCH /api/services/:id/toggle` - Toggle service status
- `DELETE /api/services/:id` - Delete service (admin)

## Database Schema

### Tables
- `users` - Admin users
- `services` - Service catalog
- `quotations` - Customer quotations
- `quote_files` - Files attached to quotations
- `orders` - Customer orders
- `order_files` - Files attached to orders

## File Upload

Supports the following file types:
- STL files (3D models)
- DXF files (CAD drawings)
- PDF files (documentation)
- SVG files (vector graphics)
- AI files (Adobe Illustrator)
- DWG files (AutoCAD)

Maximum file size: 10MB per file
Maximum files per upload: 10 files

## Security Features

- JWT authentication
- Rate limiting
- Helmet security headers
- CORS protection
- Input validation
- SQL injection prevention
- File type validation

## Production Deployment

### Using PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Logs
```bash
# View logs
pm2 logs

# Monitor in real-time
pm2 monit
```

## Backup

### Database Backup
```bash
# Create backup
pg_dump future_innovations > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
psql future_innovations < backup_file.sql
```

### File Backup
```bash
# Backup uploads directory
tar -czf uploads_backup_$(date +%Y%m%d_%H%M%S).tar.gz uploads/
```