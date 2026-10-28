---
name: Shared VPS deployment
description: Permits Manager's public website and application share an Ubuntu VPS and IP with the user's other projects.
---

# Shared-hosting rule
The Permits Manager marketing-site checkout on the VPS is `/home/administrator/apps/PM_External/`, confirmed by the user's `pwd` output. Keep it isolated with its own Nginx server block and, if needed for SMTP forms, a separate service, protected environment file, and verified local port. The application at `app.permitsmanager.com` shares the same VPS IP and its current Nginx upstream is `127.0.0.1:3000`; preserve that upstream and TLS setup. The existing `pflow.permitsmanager.com` HTTP redirect is the port-80 default server, and the app/pflow blocks use a maintenance sentinel. Add the marketing domains as explicit hostnames; do not assign them `default_server` or copy the maintenance rule without direction.

**Why:** The user said several other projects, including the application at `app.permitsmanager.com`, run on this VPS; the supplied Nginx config maps the app to port 3000 and shows the pflow default-server and maintenance behavior. Deployment changes must avoid conflicts or downtime for them.

**How to apply:** Use `/home/administrator/apps/PM_External/artifacts/permits-manager-site/dist/public` as the Nginx static-site root. Before giving or carrying out VPS deployment steps, check for existing service and port use, route each hostname separately, and preserve the app/pflow blocks and other sites' configurations.

# Marketing-site scope
The user specifies that this is strictly an HTML site at this point: a public front end with forms submitted through SMTP connections and a link to the existing application. No marketing database is needed to launch.

**Why:** The user explicitly corrected the database-based deployment approach; database-backed inquiry storage and marketing event tracking are not requirements.

**How to apply:** Serve static assets through Nginx and use only a minimal server-side mail handler for SMTP forms. Keep SMTP credentials out of browser code. Do not add database setup or application features to this deployment without a new request.

# Privileged Nginx path inspection
Use sudo for Nginx path inspection on this VPS; a blank unprivileged `readlink -f` result does not establish that the configuration file is absent.

**Why:** The owner's 2026-10-28 directory listing showed `/etc/nginx` as root-only (`0700`). The marketing configuration existed as a regular file in `sites-enabled`, despite unprivileged path resolution returning no output.

**How to apply:** Inspect with `sudo ls` or `sudo readlink` before deciding a file is missing. When confirmed, give direct absolute-path backup/editor commands; keep backups outside Nginx include directories.
