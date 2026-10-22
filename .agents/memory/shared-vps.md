---
name: Shared VPS deployment
description: Permits Manager's public website shares an Ubuntu VPS with the user's other projects.
---

# Shared-hosting rule
Keep the Permits Manager deployment isolated with its own checkout, systemd service, protected environment file, database credentials, verified local API port, and Nginx server block. Do not assume port 5000 is available or replace global Nginx configuration.

**Why:** The user said several other projects also run on this VPS; deployment changes must avoid conflicts or downtime for them.

**How to apply:** Before giving or carrying out VPS deployment steps, check for existing service and port use and preserve the other sites' configurations.
