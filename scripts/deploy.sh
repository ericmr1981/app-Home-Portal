#!/bin/bash
# Deployment script for Personal App Portal

set -e

echo "====================================="
echo "Personal App Portal Deployment"
echo "====================================="

# Configuration
PORTAL_DIR="/var/www/home-portal"
NGINX_CONF="/etc/nginx/sites-available/home-portal"
NGINX_ENABLED="/etc/nginx/sites-enabled/home-portal"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}[Step 1] Copying portal files...${NC}"
sudo mkdir -p $PORTAL_DIR
sudo cp -r public $PORTAL_DIR/
sudo cp -r config $PORTAL_DIR/

echo ""
echo -e "${BLUE}[Step 2] Installing Nginx configuration...${NC}"
sudo cp nginx/nginx.conf $NGINX_CONF
sudo ln -sf $NGINX_CONF $NGINX_ENABLED

echo ""
echo -e "${BLUE}[Step 3] Testing Nginx configuration...${NC}"
sudo nginx -t

echo ""
echo -e "${BLUE}[Step 4] Reloading Nginx...${NC}"
sudo systemctl reload nginx

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "Portal is available at: http://your-server-ip/"
echo "Default password: 123456"
echo ""
echo "To change the password, edit public/js/auth.js and update DEFAULT_PASSWORD_HASH"
echo ""