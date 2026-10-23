#!/bin/sh
set -eu

port="${1:-5000}"

case "$port" in
    ''|*[!0-9]*)
        printf 'Invalid TCP port: %s\n' "$port" >&2
        exit 2
        ;;
esac

if [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
    printf 'TCP port must be between 1 and 65535: %s\n' "$port" >&2
    exit 2
fi

if ! command -v ss >/dev/null 2>&1; then
    echo "The ss command is required; install iproute2 and rerun this check." >&2
    exit 2
fi

if ss -H -ltn "sport = :$port" | grep -q .; then
    printf 'TCP port %s is already listening:\n' "$port" >&2
    ss -ltnp "sport = :$port" >&2 || true
    exit 1
fi

printf 'TCP port %s is currently free.\n' "$port"
