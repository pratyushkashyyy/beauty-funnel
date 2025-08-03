#!/bin/bash

# Beauty Quiz Deployment Script
# This script sets up Nginx and starts your Next.js application

echo "🚀 Starting Beauty Quiz Deployment..."

# 1. Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# 2. Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    npm install -g pm2
fi

# 3. Start the Next.js application with PM2
echo "🔄 Starting Next.js application with PM2..."
pm2 start npm --name "beauty-quiz" -- start

# 4. Save PM2 configuration
pm2 save

# 5. Setup PM2 to start on boot
pm2 startup

echo "✅ Next.js application is running on port 3000"
echo "🌐 Configure your domain in Cloudflare to point to this server's IP"
echo "📋 Use the nginx-cloudflare.conf file for your Nginx configuration"
echo ""
echo "📝 Next steps:"
echo "1. Replace 'your-domain.com' in nginx-cloudflare.conf with your actual domain"
echo "2. Copy nginx-cloudflare.conf to /etc/nginx/sites-available/your-domain.com"
echo "3. Create symlink: sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/"
echo "4. Test Nginx: sudo nginx -t"
echo "5. Restart Nginx: sudo systemctl restart nginx"
echo ""
echo "🔍 Check application status: pm2 status"
echo "📊 Monitor logs: pm2 logs beauty-quiz" 