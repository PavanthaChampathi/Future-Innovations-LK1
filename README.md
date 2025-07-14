# Future Innovations LK

Professional 3D printing and laser cutting services website with admin panel.

## Features

- **Public Website**: Showcase services, automated quotations, contact forms
- **Admin Panel**: Manage quotations, orders, and services
- **Automated Quotes**: File upload with instant pricing
- **Order Management**: Track orders from quote to completion
- **Service Management**: Add/edit services and pricing

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Admin Access

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`

## Deployment

The `dist` folder contains the built files ready for deployment to any static hosting service.

For VPS deployment:
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your web server to serve the files
4. Set up URL rewriting for React Router (see nginx/apache config below)

## Web Server Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/dist/folder;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Apache Configuration (.htaccess)
```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Optional: Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── OrderManager.tsx
│   │   ├── QuotationManager.tsx
│   │   └── ServiceManager.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── QuoteUpload.tsx
│   └── Services.tsx
├── contexts/
│   └── AuthContext.tsx
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Customization

- **Colors**: Edit Tailwind classes throughout components
- **Content**: Update text content in component files
- **Services**: Modify services in `ServiceManager.tsx`
- **Contact Info**: Update contact details in `Contact.tsx` and `Footer.tsx`
- **Admin Credentials**: Change in `AdminLogin.tsx` (implement proper authentication for production)

## Production Considerations

1. **Authentication**: Implement proper backend authentication
2. **Database**: Add database integration for quotes/orders
3. **File Upload**: Implement secure file upload handling
4. **Email**: Add email notifications for quotes/orders
5. **Payment**: Integrate payment processing if needed
6. **SSL**: Enable HTTPS on your VPS
7. **Backup**: Set up regular backups

## Support

For technical support or customization requests, contact your development team.