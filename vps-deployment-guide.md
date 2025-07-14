# VPS Deployment Guide for Future Innovations LK

## Prerequisites

- VPS with Ubuntu/CentOS/Debian
- Root or sudo access
- Domain name pointed to your VPS IP

## Step 1: Server Setup

### Update System
```bash
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# OR
sudo yum update -y  # CentOS
```

### Install Node.js and npm
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 2: Deploy Your Application

### Upload Project Files
```bash
# Create project directory
sudo mkdir -p /var/www/future-innovations-lk
sudo chown $USER:$USER /var/www/future-innovations-lk

# Upload your project files to this directory
# You can use scp, rsync, or git clone
```

### Build the Application
```bash
cd /var/www/future-innovations-lk
npm install
npm run build
```

## Step 3: Configure Nginx

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/future-innovations-lk
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/future-innovations-lk/dist;
    index index.html;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Optimize static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

### Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/future-innovations-lk /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 4: SSL Certificate (Recommended)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 5: Set Up Process Management (Optional)

If you plan to add a backend API later:

### Install PM2
```bash
sudo npm install -g pm2
```

### Create PM2 Ecosystem File
```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'future-innovations-api',
    script: './server.js',  // Your backend server file
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

## Step 6: Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Step 7: Set Up Automatic Deployment (Optional)

### Create Deployment Script
```bash
nano deploy.sh
```

```bash
#!/bin/bash
cd /var/www/future-innovations-lk
git pull origin main  # If using git
npm install
npm run build
sudo systemctl reload nginx
echo "Deployment completed successfully!"
```

```bash
chmod +x deploy.sh
```

## Step 8: Monitoring and Maintenance

### Set Up Log Rotation
```bash
sudo nano /etc/logrotate.d/nginx
```

### Monitor Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Set Up Automatic Updates
```bash
sudo crontab -e
```

Add:
```bash
0 2 * * 0 apt update && apt upgrade -y
```

## Troubleshooting

### Check Nginx Status
```bash
sudo systemctl status nginx
```

### Check Nginx Configuration
```bash
sudo nginx -t
```

### View Nginx Logs
```bash
sudo journalctl -u nginx
```

### Restart Services
```bash
sudo systemctl restart nginx
```

## Security Best Practices

1. **Keep system updated**
2. **Use strong passwords**
3. **Disable root login**
4. **Use SSH keys**
5. **Configure fail2ban**
6. **Regular backups**
7. **Monitor logs**

## Backup Strategy

### Create Backup Script
```bash
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/future-innovations-lk"
mkdir -p $BACKUP_DIR

# Backup website files
tar -czf $BACKUP_DIR/website_$DATE.tar.gz /var/www/future-innovations-lk

# Keep only last 7 days of backups
find $BACKUP_DIR -name "website_*.tar.gz" -mtime +7 -delete

echo "Backup completed: website_$DATE.tar.gz"
```

### Schedule Backups
```bash
sudo crontab -e
```

Add:
```bash
0 3 * * * /path/to/backup.sh
```

Your website will be accessible at your domain once DNS propagates!