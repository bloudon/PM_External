---
name: Shared VPS deployment
description: Permits Manager's public website and application share an Ubuntu VPS and IP with the user's other projects.
---

# Shared-hosting rule
The Permits Manager marketing-site checkout on the VPS is `/apps/PM_External/`. Keep it isolated with its own systemd service, protected environment file, database credentials, verified local API port, and Nginx server block. The application at `app.permitsmanager.com` shares the same VPS IP and its current Nginx upstream is `127.0.0.1:3000`; preserve that upstream and TLS setup. The existing `pflow.permitsmanager.com` HTTP redirect is the port-80 default server, and the app/pflow blocks use a maintenance sentinel. Add the marketing domains as explicit hostnames; do not assign them `default_server` or copy the maintenance rule without direction.

**Why:** The user said several other projects, including the application at `app.permitsmanager.com`, run on this VPS; the supplied Nginx config maps the app to port 3000 and shows the pflow default-server and maintenance behavior. Deployment changes must avoid conflicts or downtime for them.

**How to apply:** Use `/apps/PM_External/artifacts/permits-manager-site/dist/public` as the marketing site's Nginx root. Before giving or carrying out VPS deployment steps, check for existing service and port use, route each hostname separately, and preserve the app/pflow blocks and other sites' configurations.
