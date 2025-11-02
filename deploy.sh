#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

NAME="paxa.dev"
WORKDIR="/var/www/$NAME"
TEMPDIR="/tmp/$NAME"
SERVICE="$NAME.service"

[ -d $TEMPDIR ] && rm -rf $TEMPDIR
cp -a $WORKDIR $TEMPDIR
cd $TEMPDIR

#git clean -fxd -e .env.production
git clean -fxd
cp server/.env.production server/.env
cp client/.env.production client/.env

bun install
bunx drizzle-kit push
bun run build:single || { echo "Build failed"; exit 1; }

sudo /usr/bin/systemctl stop $SERVICE
[ -d $WORKDIR ] && rm -rf $WORKDIR
mv $TEMPDIR $WORKDIR
sudo /usr/bin/systemctl start $SERVICE