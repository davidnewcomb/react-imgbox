#!/bin/bash
#
# Build code
#

echo "Building development copy"

S="src"
B="build"
T="/tmp"
D=dist

if [ "$VERSION" = "" ]
then
    VERSION="0.0.0-dev"
fi

rm -rf "$D"
mkdir "$D"

echo "Building version: $VERSION"

yarn install

DATE="$(date -u)"
YEAR=$(date +%Y)

echo "Build static"

cat "$B/code-header.js" \
    | sed "s/{version}/$VERSION/g" \
    | sed "s/{date}/$DATE/g" \
    | sed "s/{year}/$YEAR/g" \
    > "$T/header.tmp"
cat "$S/react-imgbox.js" \
    | sed "s/{version}/$VERSION/g" \
    | sed "s/{date}/$DATE/g" \
    | sed "s/{year}/$YEAR/g" \
    > "$T/body.tmp"

cat "$T/header.tmp" "$T/body.tmp" > "$D/react-imgbox.js"

echo "Run Babel"

./node_modules/.bin/babel "$T/body.tmp" -o "$T/body.babel.tmp"
cat "$T/header.tmp" "$T/body.babel.tmp" > "$D/react-imgbox.babel.js"

echo "Run Uglifyjs, add hack for ES6 use client"
./node_modules/.bin/uglifyjs "$T/body.babel.tmp" -m -c \
    | sed 's/^"use strict";/"use strict";"use client";/' \
    > "$T/body.babel.min.tmp"

cat "$T/header.tmp" "$T/body.babel.min.tmp" > "$D/react-imgbox.babel.min.js"

ls -l "$D"

(cd "$T" ; rm -f header.tmp body.tmp body.babel.tmp body.babel.min.tmp)
