#!/bin/sh
# Portable isolated tests: no real listener changes or root privileges.
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT HUP INT TERM
mkdir "$tmp/bin"
cat > "$tmp/bin/ss" <<'MOCK'
#!/bin/sh
case "${SS_MODE:-free}" in
    free) exit 0 ;;
    busy) echo "LISTEN 0 128 127.0.0.1:5000 0.0.0.0:*" ;;
    failed) echo "simulated listener inspection failure" >&2; exit 1 ;;
esac
MOCK
chmod +x "$tmp/bin/ss"

check() {
    mode=$1
    port=$2
    expected=$3
    actual=0
    SS_MODE="$mode" PATH="$tmp/bin:$PATH" \
      sh "$root/deploy/check-api-port.sh" "$port" > "$tmp/output" 2>&1 || actual=$?
    if [ "$actual" -ne "$expected" ]; then
        cat "$tmp/output"
        printf 'FAIL mode=%s port=%s expected=%s actual=%s\n' \
          "$mode" "$port" "$expected" "$actual" >&2
        exit 1
    fi
}

check free 5000 0
check busy 5000 1
check failed 5000 2
check free abc 2
check free '' 2
check free 0 2
check free 65536 2
check free 9999999999999999999999999999999 2
check free 3000 2
check free 03000 2
check free 05000 0
check free 1 0
check free 65535 0
echo "Port preflight tests passed."
