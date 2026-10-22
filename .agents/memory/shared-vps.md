---
name: Shared VPS deployment
description: Permits Manager's public website and application share an Ubuntu VPS and IP with the user's other projects.
---

# Shared-hosting rule
Keep the Permits Manager marketing site isolated with its own checkout, systemd service, protected environment file, database credentials, verified local API port, and Nginx server block. The application at `app.permitsmanager.com` shares the same VPS IP, so use hostname-based routing in separate Nginx virtual hosts and preserve the application's existing upstream and TLS setup. Do not assume port 5000 is available or replace global Nginx configuration.

**Why:** The user said several other projects, including the application at `app.permitsmanager.com`, run on this VPS; deployment changes must avoid conflicts or downtime for them.

**How to apply:** Before giving or carrying out VPS deployment steps, check for existing service and port use, route each hostname separately, and preserve the other sites' configurations.
