#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

NAME="paxa.dev"
WORKDIR="/var/www/$NAME"
TEMPDIR="/tmp/$NAME"
SERVICE="$NAME.service"

[ -d $TEMPDIR ] && rm -rf $TEMPDIR
cp -a $WORKDIR $TEMPDIR
cd $TEMPDIR

git clean -fxd \
  -e server/drizzle/database.sqlite \
  -e client/.env.production \
  -e server/.env.production
cp server/.env.production server/.env
cp client/.env.production client/.env

bun install
cd server && bunx drizzle-kit push && cd ..
bun run build:single || { echo "Build failed"; exit 1; }

sudo /usr/bin/systemctl stop $SERVICE
[ -d $WORKDIR ] && rm -rf $WORKDIR
mv $TEMPDIR $WORKDIR
sudo /usr/bin/systemctl start $SERVICE