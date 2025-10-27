#!/usr/bin/env bash

export NODE_OPTIONS="--max-old-space-size=512"

NAME=paxa.dev
SERVICE=$NAME.service
TEMP_DIR=/tmp/$NAME
PROJECT_DIR=/var/www/$NAME

[ -d "$TEMP_DIR" ] && rm -rf "$TEMP_DIR"
cp -a "$PROJECT_DIR" "$TEMP_DIR"
cd "$TEMP_DIR" || exit 1

git clean -fxd -e .env.production
cp -f .env.production .env

npm install
npm run build || exit 1

sudo /usr/bin/systemctl stop $SERVICE
rm -rf "$PROJECT_DIR"
mv "$TEMP_DIR" "$PROJECT_DIR"
sudo /usr/bin/systemctl start $SERVICE