#!/usr/bin/env bash
set -euo pipefail

CONF_SRC="$(cd "$(dirname "$0")" && pwd)/nginx/app-home-portal.conf"
CONF_DST="/etc/nginx/sites-available/app-home-portal"

if [[ ! -f "$CONF_SRC" ]]; then
  echo "Missing $CONF_SRC" >&2
  exit 1
fi

sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
sudo cp "$CONF_SRC" "$CONF_DST"

sudo ln -sf "$CONF_DST" /etc/nginx/sites-enabled/app-home-portal
sudo rm -f /etc/nginx/sites-enabled/default || true

sudo nginx -t
sudo systemctl reload nginx

echo "Applied nginx config: $CONF_DST"
