# Ubuntu VPS deployment

This repository is the source of truth. Build and run it on your Ubuntu VPS after pulling from Git; Replit is used for development and preview only.

## Requirements

- Ubuntu with Node.js 24, Corepack, pnpm, Git, Nginx, and PostgreSQL
- A PostgreSQL database reachable by the API server
- DNS for `permitsmanager.com` pointed to the VPS

## Build the website

From the repository root:

```sh
corepack enable
pnpm install --frozen-lockfile
VITE_APP_URL=https://app.permitsmanager.com pnpm --filter @workspace/permits-manager-site run build
```

The static site is written to `artifacts/permits-manager-site/dist/public`. Serve that directory from Nginx. The API should be reverse-proxied on the same domain under `/api`, so the website can use its same-origin API routes.

## Prepare the database and API

Create a PostgreSQL database and a restricted application user. Store the connection URL in a root-readable environment file outside the Git checkout; do not commit credentials.

Before the first production run, review the Drizzle schema changes and back up the database, then apply the schema using the repository's database tooling:

```sh
DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE' pnpm --filter @workspace/db run push
```

Build and start the API server with `DATABASE_URL` and `PORT` set in its service environment:

```sh
pnpm --filter @workspace/api-server run build
PORT=5000 DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE' pnpm --filter @workspace/api-server run start
```

Run the API under systemd or another process supervisor, not an interactive shell. Do not use the example credentials above.

The API stores demo, access, and contact requests in `marketing_inquiries`. Privacy-safe CTA and successful-submission events are stored in `marketing_events`; event records contain only an event name, page path, and timestamp, not submitted form contents.

## Nginx routing

The example in `deploy/nginx.conf.example` serves the static build and forwards `/api/` to the API process. Add TLS configuration using your certificate provider before exposing the site publicly.

## Updating

Pull the reviewed Git changes, install frozen dependencies, apply any reviewed database changes with a backup, rebuild the site and API, then reload Nginx and restart the API service.
