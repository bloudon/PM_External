#!/bin/sh
# Prepare the existing real application screenshots for public presentation.
# Opaque redactions remove record identities; crops retain native screen pixels.
# Requires ImageMagick's convert. No fabricated records or generated UI.
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
dir="$root/public/product-screenshots"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT HUP INT TERM
for name in dashboard-dark permits-dark inspections-light contractors-light; do
    cp "$dir/$name.png" "$tmp/$name.png"
done

# The dashboard's lower recent-assignment list contains customer records.
# Keep the genuine action-needed and metric areas, excluding that list.
convert "$tmp/dashboard-dark.png" -crop 1918x695+0+0 +repage \
    "$dir/dashboard-dark.png"
convert "$dir/dashboard-dark.png" -crop 835x590+210+95 +repage \
    "$dir/dashboard-focus.png"

# Mask job numbers, names, street addresses, and permit identifiers in the list.
convert "$tmp/permits-dark.png" \
    -fill '#111827' -draw 'rectangle 260,194 680,845' \
    -draw 'rectangle 985,194 1080,845' \
    "$dir/permits-dark.png"
convert "$dir/permits-dark.png" -crop 460x450+680+160 +repage \
    "$dir/permits-focus.png"

# Mask job/customer/address/permit columns and staff names, not the headings.
convert "$tmp/inspections-light.png" \
    -fill '#e5e7eb' -draw 'rectangle 263,259 785,909' \
    -draw 'rectangle 1068,259 1175,909' \
    "$dir/inspections-light.png"
convert "$dir/inspections-light.png" -crop 530x360+785+220 +repage \
    "$dir/inspections-focus.png"

# Contractor records are not evidence of accounting. Keep this unused legacy
# asset sanitized as well, since public-directory assets can be fetched directly.
convert "$tmp/contractors-light.png" \
    -fill '#e5e7eb' -draw 'rectangle 260,45 1775,902' \
    "$dir/contractors-light.png"
printf 'Prepared real screenshot crops and opaque record redactions.\n'
