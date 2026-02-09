#!/usr/bin/env bash

NAME="paxa.dev"
TMPDIR="/tmp/$NAME"
WORKDIR="/var/www/$NAME"
SERVICE="paxa.service"
PATH=$PATH:/home/nginx/.local/share/pnpm

echo "📦 Preparando ambiente de deploy..."

[ -e $TMPDIR ] && rm -rf $TMPDIR
[ -e $WORKDIR ] && cp -af $WORKDIR $TMPDIR
cd $TMPDIR || exit 1

git clean -fxd
#git clean -fxd -e .env
#cp .env .env.production

echo "📥 Instalando dependências..."
pnpm install

#echo "🗃️ Sincronizando banco de dados..."
#pnpm run push
#pnpm run seed

if pnpm run build; then
  echo "✅ Build concluído com sucesso!"
  sudo /usr/bin/systemctl stop $SERVICE
  [ -e $WORKDIR ] && rm -rf $WORKDIR
  [ -e $TMPDIR ] && cp -af $TMPDIR $WORKDIR

  echo "✅ Configurando contexto SELinux para /var/www/paxa.dev..."
  sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/paxa.dev(/.*)?" 2> /dev/null
  sudo restorecon -R /var/www/paxa.dev 2> /dev/null

  sudo /usr/bin/systemctl start $SERVICE
  echo "🚀 Serviço reiniciado!"
fi