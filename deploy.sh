#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

NAME="paxa.dev"
WORKDIR="/var/www/$NAME"
TEMPDIR="/tmp/$NAME"
SERVICE="$NAME.service"

[ -d $TEMPDIR ] && rm -rf $TEMPDIR
cp -a $WORKDIR $TEMPDIR
cd $TEMPDIR

git clean -fxd
cp .env.production .env

bun install
bun run build:single || { echo "Build failed"; exit 1; }

sudo /usr/bin/systemctl stop $SERVICE
rm -rf $WORKDIR
mv $TEMPDIR $WORKDIR
sudo /usr/bin/systemctl start $SERVICE

PORT=8080 bun run start:single