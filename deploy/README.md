# Ubuntu VPS deployment

Replit is the development environment only. Push reviewed changes to Git, then pull and build them on the Ubuntu VPS.

## Scope: static website first, SMTP forms separately

The public site consists of static HTML/CSS/JavaScript/images, with sign-in links to **https://app.permitsmanager.com**. Nginx serves these files directly; **no running Node service or PostgreSQL database is needed to display the site**. Node and pnpm are build tools.

Forms use the separate SMTP2GO handler in `artifacts/api-server`, without database storage. Browsers never receive SMTP credentials. **The handler must be configured, started and verified on the VPS before forms can deliver email.** The default static Nginx example deliberately returns JSON `503` for `/api/`; enable the optional proxy only after following the mail-service section below.

Static pages can launch independently. A complete forms-enabled launch must verify real email delivery and visible failure handling. Do not advertise forms as working before then. No database setup is needed. The earlier unused marketing database can remain untouched. Marketing-click tracking is disabled.

## Protect the other sites

- Existing application: `app.permitsmanager.com`, upstream **127.0.0.1:3000**. Never use that port for this site.
- Preserve all existing `permitflow.conf` blocks, certificates, maintenance-sentinel rules, and the `pflow.permitsmanager.com` HTTP default-server redirect.
- Add one distinct marketing site file; do not replace `/etc/nginx/nginx.conf`, `permitflow.conf`, or other site files. Do not add `default_server`.
- DNS for different hostnames can point to the same VPS IP. Nginx selects the matching `server_name`; each HTTPS hostname also needs certificate coverage.
- Do not upgrade system Node, restart other application services, or run a blanket PM2 restart.

## 1. First clone, or later pull

Run as `administrator`, not root. The confirmed checkout path is:

```text
/home/administrator/apps/PM_External
```

For the first clone, the directory must be empty:

```bash
mkdir -p /home/administrator/apps/PM_External
cd /home/administrator/apps/PM_External
git clone --branch main https://github.com/bloudon/PM_External.git .
git status --short --branch
pwd
```

If it has already been cloned, do **not** clone again:

```bash
cd /home/administrator/apps/PM_External
git status --short --branch
# Stop if there are local changes; review them rather than resetting them.
git pull --ff-only origin main
```

Push the desired commits from Replit before pulling. Never use `git reset --hard` to resolve an unexpected dirty checkout. Keep credentials out of remote URLs and Git.

## 2. Activate the isolated build tools

This workspace has locked dependencies requiring Node 22+; use **Node 24**. The shared VPS's `/usr/bin/node` is Node 20 and must remain unchanged.

The following isolated installation has already been verified on this VPS. In each new deployment shell, activate it explicitly:

```bash
export NVM_DIR="$HOME/.local/share/pm-external-nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24
node --version
command -v node
pnpm --version
```

Confirmed versions were Node `v24.22.1` and pnpm `10.34.5`. Do not follow package-manager upgrade notices during deployment.

For a fresh server without that installation, first check `node --version`, `command -v node`, `pnpm --version`, and existing version managers. If needed, install nvm only in this dedicated directory, without modifying shell startup files or system Node:

```bash
export NVM_DIR="$HOME/.local/share/pm-external-nvm"
mkdir -p "$NVM_DIR"
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh \
  -o /tmp/pm-external-install-nvm.sh &&
PROFILE=/dev/null bash /tmp/pm-external-install-nvm.sh &&
. "$NVM_DIR/nvm.sh" &&
nvm install 24 &&
nvm use 24
```

This sets a default only inside the dedicated nvm directory, not in the system installation. Do not uninstall existing global packages. If pnpm is missing, install the confirmed pnpm version only under the activated isolated Node (`npm install --global pnpm@10.34.5`, without sudo); do not run global `corepack enable` against `/usr/bin`.

## 3. Build the static site

From the checkout, with Node 24 active:

```bash
pnpm install --frozen-lockfile &&
BASE_PATH=/ NODE_ENV=production VITE_APP_URL=https://app.permitsmanager.com \
  pnpm --filter @workspace/permits-manager-site run build &&
test -s artifacts/permits-manager-site/dist/public/index.html &&
echo "Website build confirmed"
```

Output: `/home/administrator/apps/PM_External/artifacts/permits-manager-site/dist/public`.

Do not use Vite's development or preview server as the production web server. The static launch does not need an API build, API port, systemd unit, PostgreSQL, or database schema changes.

## 4. Add the separate static Nginx host

First inspect the active configuration locally on the VPS:

```bash
sudo nginx -T
sudo ss -ltnp
```

Do not paste private keys or credentials from any configuration. Check for existing `permitsmanager.com` / `www.permitsmanager.com` server names before adding duplicates. The supplied configuration shows the existing app/pflow blocks; leave them intact.

`deploy/nginx.conf.example` is a complete, **HTTP-only static site file** using the confirmed absolute document root. The optional `deploy/nginx-api-location.conf.example` is only a location snippet, not a complete site file.

Before installing, verify the usual Ubuntu Nginx worker can traverse the checkout and read the built page:

```bash
sudo -u www-data test -r /home/administrator/apps/PM_External/artifacts/permits-manager-site/dist/public/index.html \
  && echo "Nginx can read the website"
```

If this fails, stop and inspect `namei -l /home/administrator/apps/PM_External/artifacts/permits-manager-site/dist/public/index.html`. Grant only the needed directory traversal and static-file read access (or use a dedicated static directory and adjust the root). Do not make the checkout world-writable or expose private configuration files.

On this VPS, site files are loaded from `/etc/nginx/sites-enabled`. Install a **new** file only if absent, keeping a dated backup of the existing Nginx directory:

```bash
if sudo test -e /etc/nginx/sites-enabled/permitsmanager-site.conf ||
   sudo test -L /etc/nginx/sites-enabled/permitsmanager-site.conf; then
  echo "Marketing site file already exists; stop and inspect it. Do not overwrite it."
else
  sudo cp -a /etc/nginx "/etc/nginx.backup.$(date +%Y%m%d-%H%M%S)" &&
  sudo install -o root -g root -m 0644 deploy/nginx.conf.example \
    /etc/nginx/sites-enabled/permitsmanager-site.conf &&
  sudo nginx -t &&
  sudo systemctl reload nginx
fi
```

If `nginx -t` fails, do not reload. Inspect the error and correct only the newly added marketing file. Existing running workers continue using their previous configuration. Never replace the existing app configuration to make a test pass.

### HTTP checks before TLS

On the VPS:

```bash
curl --fail --silent --show-error -o /dev/null \
  -H 'Host: permitsmanager.com' http://127.0.0.1/
curl --fail --silent --show-error -o /dev/null \
  -H 'Host: www.permitsmanager.com' http://127.0.0.1/
# Expected: HTTP 503 and JSON explaining forms are not configured yet.
curl -i -H 'Host: permitsmanager.com' http://127.0.0.1/api/healthz
```

Also check a real built asset from `dist/public/assets`, a client-side page route, and the sign-in link in a browser. The sign-in destination must remain `https://app.permitsmanager.com`. Confirm the existing app and pflow redirect still respond as before; do not trigger their maintenance switch.

### TLS after DNS is ready

Verify both A and any AAAA records point to this VPS, and public HTTP for both names works. Only then, if Certbot is installed and those are the intended domains:

```bash
sudo certbot --nginx -d permitsmanager.com -d www.permitsmanager.com
sudo nginx -t && sudo systemctl reload nginx
```

If `www` is not configured, do not request its certificate yet. Keep the existing application and pflow certificates untouched. Certbot may add TLS directives to the marketing file: **never overwrite that active file afterward with the HTTP-only template**.

Verify public HTTPS for the marketing hostnames, the application, and the pflow redirect. Static-site deployment needs no new publicly exposed application port.

## 5. Later updates

Use the same isolated Node activation as above. Before changing a working site, keep a copy of the existing static output **outside Git** for recovery:

```bash
cd /home/administrator/apps/PM_External
git status --short --branch
# Stop on local modifications.
mkdir -p "$HOME/deployment-backups"
cp -a artifacts/permits-manager-site/dist/public \
  "$HOME/deployment-backups/pm-external-public-$(date +%Y%m%d-%H%M%S)" &&
git pull --ff-only origin main &&
pnpm install --frozen-lockfile &&
BASE_PATH=/ NODE_ENV=production VITE_APP_URL=https://app.permitsmanager.com \
  pnpm --filter @workspace/permits-manager-site run build &&
test -s artifacts/permits-manager-site/dist/public/index.html
```

Vite rebuilds the output directory in place; a brief incomplete-assets window is possible. Schedule updates appropriately. For higher availability later, build into versioned release directories and switch a static-root symlink atomically.

For static-file updates, **no Nginx reload or Node restart is needed**. Repeat the HTTP/HTTPS and sign-in checks. If a build fails, restore the backup static files before serving the release. Do not overwrite TLS configuration during updates.

## SMTP2GO form service

This service handles demo, company-access and contact forms. It sends plain-text emails through SMTP2GO, with mandatory STARTTLS on port 587 and certificate validation. From and To are server-controlled; the visitor's validated email is Reply-To. It never creates an application account or writes to PostgreSQL.

Keep SMTP credentials server-side in `/etc/permitsmanager/marketing-api.env`, owned by root with mode `0600`, inside a root-owned directory with mode `0750`. This protected file is the production equivalent of a server-side `.env`; systemd loads it, so no `.env` file is needed in the checkout. Never put secrets in `VITE_*`, `NEXT_PUBLIC_*`, Git, browser code, terminal arguments or chat.

The service template isolates the mail handler:

- Name: `permitsmanager-marketing-api.service`.
- Working directory: `/home/administrator/apps/PM_External`.
- User: `administrator`, not root.
- Environment file: `/etc/permitsmanager/marketing-api.env`.
- Listener: `HOST=127.0.0.1`, `PORT=5000`.
- Explicit isolated Node binary; no shell startup or system Node dependency.
- Enabled at boot, restarted on failure, read-only filesystem hardening.

### A. Pull and build, without changing system Node

Push the reviewed changes from development to Git first. On the VPS, inspect `git status` and stop if there are local changes; do not reset or discard them.

```bash
cd /home/administrator/apps/PM_External &&
git status --short --branch
```

Once the working tree is clean:

```bash
cd /home/administrator/apps/PM_External &&
git pull --ff-only origin main &&
export NVM_DIR="$HOME/.local/share/pm-external-nvm" &&
. "$NVM_DIR/nvm.sh" --no-use &&
nvm use 24 &&
pnpm install --frozen-lockfile &&
pnpm --filter @workspace/api-server run build &&
BASE_PATH=/ NODE_ENV=production VITE_APP_URL=https://app.permitsmanager.com \
  pnpm --filter @workspace/permits-manager-site run build
```

Use the isolated Node path above; do not upgrade system Node or other projects' dependencies. Sourcing nvm with `--no-use` avoids the earlier `version "install"` selection error.

### B. Set the protected SMTP environment locally

This preserves an existing environment file instead of overwriting it:

```bash
sudo install -d -o root -g root -m 0750 /etc/permitsmanager &&
if ! sudo test -e /etc/permitsmanager/marketing-api.env; then
  sudo install -o root -g root -m 0600 deploy/marketing-api.env.example \
    /etc/permitsmanager/marketing-api.env
fi
sudo chown root:root /etc/permitsmanager/marketing-api.env &&
sudo chmod 0600 /etc/permitsmanager/marketing-api.env &&
sudoedit /etc/permitsmanager/marketing-api.env
```

Use the variable names in `deploy/marketing-api.env.example`:

- `HOST=127.0.0.1`, `PORT=5000` (or a separately checked free port).
- `SMTP_HOST=mail.smtp2go.com`, `SMTP_PORT=587`.
- `SMTP_USER`, `SMTP_PASS`: SMTP2GO **SMTP credentials**, not the dashboard login.
- `SMTP_FROM`: one bare email address verified in SMTP2GO. Copy the existing verified sender locally or use another verified sender; do not change the application.
- `SMTP_TO`: one destination inbox confirmed by the owner. This is separate from From.

Replace every placeholder. Use systemd EnvironmentFile syntax (`KEY="value"`), not `export KEY=...`, and no shell substitutions or inline comments. Remove obsolete `DATABASE_URL` from this marketing file if present; do not modify any other service's file. Do not paste file contents or passwords back into chat.

### C. Check port use and start only the marketing service

```bash
sudo ss -ltnp
sh deploy/check-api-port.sh 5000
```

The checker rejects invalid ports, reserved application port `3000`, inspection failures, and ports with TCP listeners. It is a preflight, not a reservation. If `5000` is busy, choose another verified free port and update all of:

1. The preflight command.
2. `PORT` in the protected environment file.
3. The upstream port in `deploy/nginx-api-location.conf.example` when copied into the live marketing host.

Verify `command -v node` with the isolated version active. Check the service template's absolute `ExecStart` binary exists and matches it; systemd does not source nvm. The template matches the previously verified Node `v24.22.1`. If yours differs, edit only this project's service template before installing.

For a first installation, after preparing the configuration and checking the port:

```bash
if sudo test -e /etc/systemd/system/permitsmanager-marketing-api.service ||
   sudo test -L /etc/systemd/system/permitsmanager-marketing-api.service; then
  echo "Service already exists; stop and inspect it rather than overwriting it."
else
  sudo install -o root -g root -m 0644 \
    deploy/permitsmanager-marketing-api.service.example \
    /etc/systemd/system/permitsmanager-marketing-api.service &&
  sudo systemd-analyze verify /etc/systemd/system/permitsmanager-marketing-api.service &&
  sh deploy/check-api-port.sh 5000 &&
  sudo systemctl daemon-reload &&
  sudo systemctl enable --now permitsmanager-marketing-api
fi
sudo systemctl status permitsmanager-marketing-api --no-pager
sudo journalctl -u permitsmanager-marketing-api -n 50 --no-pager
curl --fail --silent --show-error http://127.0.0.1:5000/api/healthz
curl --fail --silent --show-error http://127.0.0.1:5000/api/readyz
sudo ss -ltnp 'sport = :5000'
```

If the service already exists, inspect its unit locally with `sudo systemctl cat permitsmanager-marketing-api` and compare its paths/hardening to the example. Do not overwrite it blindly. After any approved unit edits run `sudo systemctl daemon-reload`. After a build or environment change run `sudo systemctl restart permitsmanager-marketing-api`, then the health/readiness commands above.

The listener must be `127.0.0.1:5000`, never public. `healthz` confirms the process; `readyz` confirms settings are present and structurally valid, **not** successful SMTP authentication, sender verification or inbox delivery. Logs contain references and status codes, not submission content or raw SMTP errors.

### D. Enable the marketing host's API proxy

Keep `/api/` returning 503 until the service is ready. Back up the active marketing file **outside** Nginx include directories so a backup is not loaded as a second virtual host:

```bash
SITE="$(readlink -f /etc/nginx/sites-enabled/permitsmanager-site.conf)" &&
test -f "$SITE" &&
sudo install -d -o root -g root -m 0700 /var/backups/permitsmanager-nginx &&
sudo cp -p "$SITE" "/var/backups/permitsmanager-nginx/marketing-$(date +%Y%m%d-%H%M%S).conf" &&
sudoedit "$SITE"
```

Replace **only the existing marketing `/api/` location** with `deploy/nginx-api-location.conf.example`. Preserve the rest of the file, including Certbot HTTPS/redirects. Do not install this location-only snippet directly in `sites-enabled` and do not edit `permitflow.conf`.

The snippet overwrites `X-Forwarded-For` with `$remote_addr`; the API trusts only the loopback Nginx hop. Do not switch to client-supplied forwarded headers. If a CDN is added later, configure Nginx real-IP handling with only its exact trusted ranges before changing this scheme.

```bash
sudo nginx -t && sudo systemctl reload nginx
curl --fail --silent --show-error https://permitsmanager.com/api/healthz
curl --fail --silent --show-error https://permitsmanager.com/api/readyz
```

Reloading Nginx applies the checked configuration; it does not restart the other applications. If necessary, restore the timestamped backup to the exact `$SITE` path, then test and reload. Never copy the backup into `sites-enabled` as an additional file.

### E. Verify real delivery before declaring forms live

1. Confirm `SMTP_TO` with the owner and authorize a real test. Submit a uniquely labeled message through Contact and confirm receipt in that inbox (check spam too). Confirm fixed sender and visitor Reply-To.
2. Exercise Demo with the optional process/challenge and Request Access with phone/volume. Confirm every field is present and no application account is created.
3. Verify failure handling before public launch: locally set an intentionally invalid SMTP password in the protected file, restart **only this service**, and submit a test. The browser should retain fields, show an error and not show success. Restore the correct setting immediately, restart and verify readiness and a successful submission. Never display or share credentials during this exercise.
4. A successful submission means SMTP2GO accepted the email, not guaranteed final delivery. SMTP rejection/timeout returns 502; missing configuration returns 503. There is no lead database or persistent retry queue. A connection lost after acceptance may leave delivery uncertain; check the inbox before retrying to avoid duplicates.
5. Five attempts per client IP per 15 minutes and a global 100/hour cap protect this single-instance service. Shared offices may share an IP. Limits are in memory and reset on restart; 429 includes Retry-After. Bodies are capped at 16KB, fields retain their existing limits, and excessive links are rejected. These are basic abuse controls, not full bot protection.
6. Browser origins are restricted to `https://permitsmanager.com` and `https://www.permitsmanager.com` in production. Same-origin HTTPS needs no permissive CORS header. Non-browser clients can omit Origin, so rate limiting still applies.

For later updates, pull/build, then restart **only** `permitsmanager-marketing-api`. Environment changes require that restart; static rebuilds alone do not. Nginx needs reloading only after a configuration edit and successful `nginx -t`.

## Legacy database mode: not part of this launch

Only if database persistence is explicitly requested again: use a separate database and restricted login, review the schema, and back up production data before applying changes. Do not point marketing schema tools at the existing application's database. Load `DATABASE_URL` from a protected environment file; do not paste credentials into a command or shell history.

The legacy schema command is `pnpm --filter @workspace/db run push`. Review proposed changes and never use `push-force` to bypass warnings. The intended static/SMTP launch does not require this command.
