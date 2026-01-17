#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

NAME="paxa.dev"
WORKDIR="/var/www/$NAME"
TEMPDIR="/tmp/$NAME"
SERVICE="paxa.service"

[ -d $TEMPDIR ] && rm -rf $TEMPDIR
cp -a $WORKDIR $TEMPDIR
cd $TEMPDIR

git clean -fxd
#git clean -fxd \
#  -e server/drizzle/database.sqlite \
#  -e client/.env \
#  -e server/.env

bun install
bun run build || exit 1

sudo /usr/bin/systemctl stop $SERVICE
[ -d $WORKDIR ] && rm -rf $WORKDIR
mv $TEMPDIR $WORKDIR
sudo /usr/bin/systemctl start $SERVICE