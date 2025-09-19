# Ansible SSL Certificates and Nginx Configuration

Este projeto Ansible foi estruturado para instalar e configurar certificados SSL automaticamente usando Certbot e configurar o Nginx de forma dinâmica.

## Estrutura

```
ansible/
├── group_vars/
│   └── all.yml                 # Variáveis globais do domínio
├── roles/
│   ├── ssl-certificates/       # Role para gestão de certificados SSL
│   │   ├── defaults/main.yml
│   │   ├── tasks/main.yml
│   │   ├── handlers/main.yml
│   │   └── templates/
│   │       └── ssl-params.conf.j2
│   ├── nginx/                  # Role para configuração do Nginx
│   │   ├── tasks/main.yml
│   │   ├── handlers/main.yml
│   │   └── templates/
│   │       └── site.conf.j2
│   └── systemd/                # Role para serviços systemd
└── main.yml                    # Playbook principal
```

## Configuração

### Variáveis Principais (group_vars/all.yml)

```yaml
# Domínio principal
domain_name: "paxa.dev"
domain_subdomains:
  - "www"
  - "pages"

# Configuração do certificado SSL
ssl_certificate_email: "admin@paxa.dev"
ssl_certificate_staging: false  # true para testes
ssl_certificate_force_renewal: false

# Configuração da aplicação
app_port: 3033
github_pages_host: "sistematico.github.io"
github_pages_path: "/startpages"
```

## Como usar

### 1. Configurar o domínio
Edite o arquivo `group_vars/all.yml` e altere as variáveis conforme sua necessidade:

```yaml
domain_name: "seu-dominio.com"
domain_subdomains:
  - "www"
  - "blog"
  - "api"
ssl_certificate_email: "admin@seu-dominio.com"
```

### 2. Executar o playbook
```bash
ansible-playbook -i inventory main.yml
```

### 3. Para diferentes ambientes
Você pode criar arquivos específicos:
- `group_vars/production.yml`
- `group_vars/staging.yml`
- `host_vars/servidor1.yml`

## Funcionalidades

### Role ssl-certificates
- ✅ Instala Certbot via package manager (apt/yum/dnf)
- ✅ Gera certificados SSL automaticamente
- ✅ Configura renovação automática
- ✅ Suporte a staging para testes
- ✅ Configura parâmetros SSL seguros no Nginx
- ✅ Suporte a múltiplas distribuições Linux

### Role nginx (atualizada)
- ✅ Configuração dinâmica baseada em variáveis
- ✅ Templates Jinja2 para configuração flexível
- ✅ Suporte a múltiplos subdomínios
- ✅ Redirecionamento HTTP → HTTPS automático
- ✅ Redirecionamento www → não-www

### Recursos de Segurança
- 🔒 TLS 1.2 e 1.3 apenas
- 🔒 Ciphers seguros (ECDHE)
- 🔒 HSTS habilitado
- 🔒 Headers de segurança (X-Frame-Options, X-Content-Type-Options, etc.)
- 🔒 SSL Stapling habilitado

## Personalização

### Adicionando novos subdomínios
1. Adicione o subdomínio em `domain_subdomains` no `group_vars/all.yml`
2. Execute o playbook novamente
3. O certificado será atualizado automaticamente

### Modificando configurações SSL
Edite as variáveis no `group_vars/all.yml`:
```yaml
nginx_ssl_protocols: "TLSv1.2 TLSv1.3"
nginx_ssl_ciphers: "ECDHE-ECDSA-AES128-GCM-SHA256:..."
```

### Testando com certificados staging
Para evitar rate limits durante testes:
```yaml
ssl_certificate_staging: true
```

## Troubleshooting

### Forçar renovação de certificado
```yaml
ssl_certificate_force_renewal: true
```

### Verificar logs do Certbot
```bash
sudo journalctl -u certbot
# ou
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

### Verificar configuração do Nginx
```bash
sudo nginx -t
```