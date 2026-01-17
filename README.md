This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Deploy (VPS) — Ansible ⚙️

Use este playbook Ansible para copiar os arquivos de configuração do Nginx e instalar a unit do systemd na VPS configurada em `/etc/hosts` como `ananke`.

Principais pontos:
- SSH: host `ananke` (definido em `/etc/hosts`) na porta **2200**.
- Arquivos estáticos usados pelo playbook: `ansible/files/etc/nginx/sites.d/` e `ansible/files/etc/systemd/system/paxa.service`.

Rápido — como rodar (exemplo):

```bash
# a partir da raiz do repositório
# se precisar de senha sudo: --ask-become-pass
ansible-playbook -i ansible/inventory.ini ansible/site.yml -u ubuntu --private-key ~/.ssh/id_rsa

# ou, se seu user exigir passwordless sudo e quiser prompt de sudo:
ansible-playbook -i ansible/inventory.ini ansible/site.yml --ask-become-pass
```

O que o playbook faz:
1. Instala `nginx` (se necessário).
2. Copia os arquivos de `ansible/files/etc/nginx/sites.d/` para `/etc/nginx/sites.d/`.
3. Copia a unit `paxa.service` para `/etc/systemd/system/`, recarrega o systemd, habilita e reinicia o serviço.
4. Valida a configuração do Nginx e faz reload.

Verificação rápida após o deploy:

```bash
# testa o unit
ssh -p 2200 ananke "sudo systemctl status paxa --no-pager"

# testa e recarrega nginx (remoto)
ssh -p 2200 ananke "sudo nginx -t && sudo systemctl reload nginx"

# checar resposta HTTP (local)
curl -I http://ananke/
```

Dicas e troubleshooting:
- Para rodar apenas a parte do systemd: `--tags systemd`.
- Para rodar apenas nginx: `--tags nginx`.
- Se o SSH user não for `ubuntu`, atualize `ansible/inventory.ini` (ou passe `-u`).

Se precisar, posso adicionar tarefa opcional para configurar firewall (ufw) ou TLS (Certbot).
