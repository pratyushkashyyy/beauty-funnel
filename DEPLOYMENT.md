# Beauty Quiz Deployment Guide

## Prerequisites
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx installed
- Domain connected to Cloudflare

## Step 1: Build and Start the Application

```bash
# Build the application
npm run build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "beauty-quiz" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Step 2: Configure Nginx

### Option A: Using the provided configuration

1. **Edit the domain name** in `nginx-cloudflare.conf`:
   ```bash
   # Replace 'your-domain.com' with your actual domain
   sed -i 's/your-domain.com/YOUR-ACTUAL-DOMAIN.com/g' nginx-cloudflare.conf
   ```

2. **Copy the configuration**:
   ```bash
   sudo cp nginx-cloudflare.conf /etc/nginx/sites-available/YOUR-DOMAIN.com
   ```

3. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/YOUR-DOMAIN.com /etc/nginx/sites-enabled/
   ```

4. **Test and restart Nginx**:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option B: Manual configuration

Create `/etc/nginx/sites-available/YOUR-DOMAIN.com` with:

```nginx
server {
    listen 80;
    server_name YOUR-DOMAIN.com www.YOUR-DOMAIN.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Handle Next.js static files
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Step 3: Cloudflare Configuration

1. **Add your domain** to Cloudflare
2. **Update DNS records**:
   - Type: A
   - Name: @ (or your subdomain)
   - Content: Your server's IP address
   - Proxy status: Proxied (orange cloud)

3. **SSL/TLS Settings**:
   - Encryption mode: Full (strict)
   - Always use HTTPS: On
   - Minimum TLS Version: 1.2

4. **Page Rules** (optional):
   - `*YOUR-DOMAIN.com/*` → Always Use HTTPS

## Step 4: Verify Deployment

1. **Check application status**:
   ```bash
   pm2 status
   pm2 logs beauty-quiz
   ```

2. **Test the application**:
   ```bash
   curl http://localhost:3000
   ```

3. **Test through Nginx**:
   ```bash
   curl http://YOUR-DOMAIN.com
   ```

## Monitoring and Maintenance

### PM2 Commands
```bash
# View all processes
pm2 list

# Monitor logs
pm2 logs beauty-quiz

# Restart application
pm2 restart beauty-quiz

# Stop application
pm2 stop beauty-quiz
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

### Logs
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Application logs
pm2 logs beauty-quiz
```

## Troubleshooting

### Application not starting
```bash
# Check if port 3000 is in use
sudo netstat -tlnp | grep :3000

# Check PM2 logs
pm2 logs beauty-quiz
```

### Nginx issues
```bash
# Check Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### Domain not resolving
1. Check DNS propagation: https://www.whatsmydns.net/
2. Verify Cloudflare DNS settings
3. Check if domain is proxied (orange cloud)

## Security Considerations

1. **Firewall**: Ensure only ports 80, 443, and 22 are open
2. **SSL**: Cloudflare handles SSL termination
3. **Headers**: Security headers are included in the Nginx config
4. **Updates**: Keep Node.js and Nginx updated

## Performance Optimization

1. **Caching**: Static files are cached for 1 year
2. **Compression**: Gzip is enabled
3. **PM2**: Process management ensures uptime
4. **Cloudflare**: CDN and caching layer 