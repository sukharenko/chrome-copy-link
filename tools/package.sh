#!/bin/sh
# Builds dist/copy-link-<version>.zip for upload to the Chrome Web Store.
set -e
cd "$(dirname "$0")/.."
VERSION=$(python3 -c "import json;print(json.load(open('src/manifest.json'))['version'])")
mkdir -p dist
rm -f "dist/copy-link-$VERSION.zip"
(cd src && zip -qr -X "../dist/copy-link-$VERSION.zip" . -x '.*')
echo "dist/copy-link-$VERSION.zip"
