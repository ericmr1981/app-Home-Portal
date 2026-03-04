# Personal App Portal - Implementation Plan

## Overview
Create a personal homepage portal that serves as a hub for mini-applications, with simple password authentication and card-based app display.

## Tech Stack
- **Frontend**: Pure HTML + CSS + JavaScript (static files)
- **Server**: Nginx (reverse proxy + static file serving)
- **Authentication**: Simple password with Cookie-based session
- **Deployment**: VPS with Docker containers for sub-apps

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │         Nginx (Port 80)              │
                    │   - Serve portal static files        │
                    │   - Reverse proxy to sub-apps        │
                    │   - Auth check via Cookie            │
                    └─────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
         ▼                            ▼                            ▼
   / (Portal)              /minesweeper/*              /app2/*
   Static Files            → localhost:8081            → localhost:8082
                           (Minesweeper)               (Future App)
```

## Implementation Steps

### Phase 1: Project Setup & Portal Core
1. Create project directory structure
2. Create login page (login.html)
3. Create main portal page (index.html)
   - Date/time display
   - Card-based app grid
   - Logout button
4. Create CSS styles (minimalist design)
5. Create JavaScript modules
   - auth.js - Login/logout logic
   - apps.js - App card management
   - time.js - Date/time display

### Phase 2: Authentication System
6. Implement password verification (client-side hash)
7. Set Cookie with expiration
8. Create auth check middleware logic
9. Implement logout functionality

### Phase 3: App Management
10. Create apps.json configuration file
11. Create card rendering logic
12. Add first app (Minesweeper) to config
13. Implement click-to-navigate functionality

### Phase 4: Nginx Configuration
14. Create nginx.conf with:
    - Static file serving for portal
    - Reverse proxy for /minesweeper
    - Cookie-based auth check
    - Redirect to login if not authenticated
15. Test configuration locally

### Phase 5: Deployment Ready
16. Create deployment documentation
17. Create docker-compose.yml for portal (optional)
18. Create setup scripts

## Files to Create

```
app-Home-Portal/
├── public/
│   ├── index.html          # Main portal page
│   ├── login.html          # Login page
│   ├── css/
│   │   └── style.css       # Portal styles
│   └── js/
│       ├── auth.js         # Authentication logic
│       ├── apps.js         # App card management
│       └── time.js         # Date/time display
├── config/
│   └── apps.json           # App configuration
├── nginx/
│   └── nginx.conf          # Nginx configuration
├── scripts/
│   └── deploy.sh           # Deployment script
└── README.md               # Project documentation
```

## Security Considerations
- Password is hashed (SHA-256) before storage
- Cookie includes timestamp for expiration check
- Cookie is HttpOnly and Secure (in production)
- All sub-apps verify cookie before serving

## Acceptance Criteria
- [ ] Login page accepts correct password
- [ ] Wrong password shows error
- [ ] Main portal shows date/time
- [ ] Main portal shows app cards
- [ ] Clicking card navigates to sub-app
- [ ] Sub-app requires authentication
- [ ] Logout clears session
- [ ] Responsive design works on mobile