---
name: Shared VPS deployment
description: Permits Manager's public website and application share an Ubuntu VPS and IP with the user's other projects.
---

# Shared-hosting rule
Keep the Permits Manager marketing site isolated with its own checkout, systemd service, protected environment file, database credentials, verified local API port, and Nginx server block. The application at `app.permitsmanager.com` shares the same VPS IP and its current Nginx upstream is `127.0.0.1:3000`; preserve that upstream and TLS setup. Use hostname-based routing in separate Nginx virtual hosts. Do not assume another port is available or replace global Nginx configuration.

**Why:** The user said several other projects, including the application at `app.permitsmanager.com`, run on this VPS; the supplied Nginx summary maps that application to port 3000. Deployment changes must avoid conflicts or downtime for them.

**How to apply:** Before giving or carrying out VPS deployment steps, check for existing service and port use, route each hostname separately, and preserve the other sites' configurations.
