# Ubuntu VPS deployment

This repository is the source of truth. Build and run it on the Ubuntu VPS after pulling from Git; Replit is used for development and preview only. The marketing site has its own Nginx site file and API service. Do not replace or edit the existing `permitflow.conf` blocks for `app.permitsmanager.com` and `pflow.permitsmanager.com`.

## Requirements and paths

- Ubuntu with Node.js 24, Corepack, pnpm, Git, Nginx, PostgreSQL, and `ss` from `iproute2`
- A PostgreSQL database reachable by the API server
- DNS for `permitsmanager.com` and, if used, `www.permitsmanager.com` pointed to this VPS
- The checkout is expected at `~/apps/PM_External`. From the checkout, run `pwd` and use that absolute path in Nginx and systemd. The examples below assume `/home/administrator/apps/PM_External`.

## Check port usage before installing the API

Port `3000` is already used by `app.permitsmanager.com`; do not assign it to the marketing API. The most recent VPS check showed no listener on `5000`, but port usage can change. Recheck on the VPS before starting the service:

```sh
sudo ss -ltnp
sh deploy/check-api-port.sh 5000
```

The check exits unsuccessfully if the selected TCP port is already listening. If `5000` is occupied, choose a free port and use it consistently in all three places: the port-check command, `PORT` in the protected API environment file, and the Nginx `proxy_pass` target. The API example binds to `127.0.0.1`, so it is reachable through local Nginx but not directly on the public interface.

The check is a preflight, not a reservation: another service could claim the port afterward. Confirm the systemd service starts and inspect listeners again after startup.

## Pull and build

Push the desired commits from Replit first. On the VPS, run as the checkout owner (not as root):

```sh
cd ~/apps/PM_External
git status --short --branch
git pull --ff-only origin main
corepack enable
pnpm install --frozen-lockfile
VITE_APP_URL=https://app.permitsmanager.com pnpm --filter @workspace/permits-manager-site run build
pnpm --filter @workspace/api-server run build
```

The static site is written to `artifacts/permits-manager-site/dist/public`. The site build keeps sign-in pointed at `https://app.permitsmanager.com`.

## Prepare the database

Create a PostgreSQL database and a restricted application user. Before the first production run, review the Drizzle schema changes and back up the database, then apply the schema using the repository's database tooling:

```sh
DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE' pnpm --filter @workspace/db run push
```

Do not use the example credentials below or commit real credentials.

## Install the API service

The examples run the API as the non-root checkout owner `administrator`. Confirm that account owns or can read the checkout, and that `command -v node` matches the path used in the service file. If the VPS uses a different account, checkout path, or Node installation path, update the example before installing it.

Create a root-readable environment file, replace the placeholder database URL, and install the service:

```sh
sudo install -d -o root -g root -m 0750 /etc/permitsmanager
if sudo test -e /etc/permitsmanager/marketing-api.env; then
  echo "Keeping the existing environment file; edit it with sudoedit if needed."
else
  sudo install -o root -g root -m 0600 deploy/marketing-api.env.example /etc/permitsmanager/marketing-api.env
fi
sudoedit /etc/permitsmanager/marketing-api.env
if sudo test -e /etc/systemd/system/permitsmanager-marketing-api.service; then
  echo "Service unit already exists; inspect it before making changes."
else
  sudo install -o root -g root -m 0644 deploy/permitsmanager-marketing-api.service.example /etc/systemd/system/permitsmanager-marketing-api.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now permitsmanager-marketing-api
fi
sudo systemctl status permitsmanager-marketing-api
sudo journalctl -u permitsmanager-marketing-api -n 50 --no-pager
```

The environment example sets `HOST=127.0.0.1` and `PORT=5000`. The API supports the optional `HOST` setting; without it, existing development behavior is unchanged. The service has a unique name and does not reuse the existing application's port or service.

The API stores demo, access, and contact requests in `marketing_inquiries`. Privacy-safe CTA and successful-submission events are stored in `marketing_events`; event records contain only an event name, page path, and timestamp, not submitted form contents.

## Install the marketing Nginx site

`deploy/nginx.conf.example` is a standalone marketing-site server block. It does not include `default_server` and must be installed as a new file, not copied over `permitflow.conf`. Confirm its `root` path matches `pwd` from the checkout. Ensure the Nginx worker can traverse the checkout directories and read the built `index.html`; do not make the whole checkout world-writable.

On this VPS, the current Nginx setup loads files from `sites-enabled`. Install the new file only if that destination does not already exist:

```sh
if sudo test -e /etc/nginx/sites-enabled/permitsmanager-site.conf; then
  echo "Site file already exists; inspect it rather than overwriting it."
else
  sudo install -o root -g root -m 0644 deploy/nginx.conf.example /etc/nginx/sites-enabled/permitsmanager-site.conf
  sudo nginx -t && sudo systemctl reload nginx
fi
```

On a standard Ubuntu Nginx install, confirm the worker can read the built page with `sudo -u www-data test -r /home/administrator/apps/PM_External/artifacts/permits-manager-site/dist/public/index.html`. Adjust the path if `pwd` reported a different checkout location.

The explicit `server_name` routes the marketing domains to this new file; the existing `pflow.permitsmanager.com` HTTP default and app configuration remain untouched. Once both DNS names resolve to this VPS and HTTP works, request HTTPS certificates:

```sh
sudo certbot --nginx -d permitsmanager.com -d www.permitsmanager.com
```

Certbot may modify the active Nginx file to add TLS. Do not overwrite that active file with the HTTP-only example after Certbot runs.

## Updating

Pull reviewed Git changes with `git pull --ff-only origin main`, install frozen dependencies, rebuild the site and API, and restart only `permitsmanager-marketing-api`. Before reloading Nginx, run `sudo nginx -t`. Do not restart the existing application service or replace its Nginx blocks.
