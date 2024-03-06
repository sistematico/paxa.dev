---
title: "Como criar um site no Github"
description: "Crie seu próprio site pessoal de graça no Github Pages"
publishDate: "07 Jun 2016"
updatedDate: 06 Mar 2024
tags: ["git"]
draft: false
---

## Crie um novo repositório

- https://github.com/new
- Use o nome no formato: `LOGIN.github.io`

## Crie o Github Actions File

`RAIZ/.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{steps.deployment.outputs.page_url}}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.' # upload entire directory
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

```

Mais informações [(1)[https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages]]

## Adicionando conteúdo ao seu novo site

### Método 1(Clonar o repositório)

```bash
git clone git@github.com:LOGIN/LOGIN.github.io.git
```

### Método 2(Adicionar arquivos ao remote do seu novo repositório)

```bash
echo "# LOGIN.github.io" >> README.md
git init
git add .
git commit -m "Meu primeiro commit"
git branch -M main
git remote add origin git@github.com:LOGIN/LOGIN.github.io.git
git push -u origin main
```

### Método 3(Adicionar o remote a um repositório existente)

```bash
git remote add origin https://github.com/sistematico/LOGIN.github.io.git
git push -u origin main
```

## Para atualizar seu site:

```bash
cd RAIZ
nano x y z
git add .
git commit -m "Alterados os arquivos x, y e z..."
git push origin main
```

## Testando

Acesse seu novo site em: https://LOGIN.github.io

## Importante!!!

Substitua **LOGIN** com seu nome de usuário do GitHub e **RAIZ** pela pasta raíz do seu projeto.

## Referências

- [Github Pages](https://pages.github.com)
- [Using workflows with Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [git](/git)
- [git filter](/git-filter-branch)

Boa sorte!
