#!/bin/sh
set -eu

port="${1-5000}"

case "$port" in
    ''|*[!0-9]*)
        printf 'Invalid TCP port: %s\n' "$port" >&2
        exit 2
        ;;
esac

# Normalize leading zeroes and reject oversized input before shell arithmetic.
port=$(printf '%s' "$port" | sed 's/^0*//')
if [ -z "$port" ] || [ "${#port}" -gt 5 ]; then
    printf 'TCP port must be between 1 and 65535.\n' >&2
    exit 2
fi
if [ "$port" -gt 65535 ]; then
    printf 'TCP port must be between 1 and 65535: %s\n' "$port" >&2
    exit 2
fi

if [ "$port" = 3000 ]; then
    echo "Port 3000 is reserved for app.permitsmanager.com; choose another port." >&2
    exit 2
fi

if ! command -v ss >/dev/null 2>&1; then
    echo "The ss command is required; install iproute2 and rerun this check." >&2
    exit 2
fi

if ! listeners=$(ss -H -ltn "sport = :$port"); then
    echo "Unable to inspect TCP listeners; do not start the service." >&2
    exit 2
fi

if [ -n "$listeners" ]; then
    printf 'TCP port %s is already listening:\n' "$port" >&2
    ss -ltnp "sport = :$port" >&2 || true
    exit 1
fi

printf 'TCP port %s is currently free.\n' "$port"
