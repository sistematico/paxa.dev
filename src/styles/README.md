# Estrutura CSS Modular

Este projeto agora usa uma estrutura CSS modularizada para melhor organização e manutenção.

## Estrutura de Arquivos

```
src/styles/
├── main.css                     # Estilos básicos e imports
├── effects/
│   └── synthwave.css           # Efeitos visuais SynthWave
└── components/
    ├── text-switcher.css       # Estilos do componente TextSwitcher
    ├── navbar.css              # Estilos da barra de navegação
    ├── inline-menu.css         # Estilos do menu inline
    └── audio-player.css        # Estilos do player de áudio
```

## Arquivos

### 📄 `main.css`
**Responsabilidade:** Configurações básicas, variáveis CSS e imports dos módulos
- Variáveis CSS (`--background`, `--foreground`)
- Configuração do Tailwind CSS
- Estilos base do `body` e elementos globais
- Imports de todos os módulos específicos

### 🎨 `effects/synthwave.css`
**Responsabilidade:** Efeitos visuais temáticos
- Classe `.synthwave-glow` e suas variações
- Animações `frantic-glow`, `hyper-frantic-glow`, `underline-pulse`
- Efeitos de hover e pseudo-elementos
- Gradientes e sombras neon

### 🔄 `components/text-switcher.css`
**Responsabilidade:** Estilos do componente de alternância de texto
- Layout grid natural (`.text-switcher-natural`)
- Layout com posição absoluta (`.text-switcher`)
- Botões de modo (`.mode-toggle`, `.mode-button`)
- Transições e estados ativos
- Animação `shimmer`

### 🎵 `components/audio-player.css`
**Responsabilidade:** Estilos do player de áudio
- Controles de reprodução (`.audio-control-btn`, `.audio-play-btn`)
- Barras de progresso (`.audio-progress-bg`, `.audio-progress-fill`)
- Informações da faixa (`.audio-track-title`, `.audio-track-artist`)
- Controles de volume (`.audio-volume-slider`)
- Adaptação para temas claro/escuro

### 🧭 `components/navbar.css`
**Responsabilidade:** Estilos da barra de navegação
- Layout responsivo da navbar
- Botões de controle e menu mobile
- Estilos de hover e transições
- Adaptação para diferentes temas

### 📱 `components/inline-menu.css`
**Responsabilidade:** Estilos do menu inline integrado
- Botões de controle sóbrios
- Posicionamento flexível
- Efeitos de hover minimalistas
- Design responsivo

## Vantagens da Modularização

### ✅ **Organização**
- Cada arquivo tem uma responsabilidade específica
- Fácil localização de estilos por funcionalidade
- Redução da complexidade do arquivo principal

### ✅ **Manutenção**
- Alterações isoladas por componente
- Menor risco de quebrar estilos não relacionados
- Debugging mais eficiente

### ✅ **Performance**
- Carregamento seletivo de estilos
- Possibilidade futura de lazy loading
- Cache mais eficiente por arquivo

### ✅ **Colaboração**
- Diferentes desenvolvedores podem trabalhar em arquivos separados
- Menor chance de conflitos em merge
- Responsabilidades claras

## Como Adicionar Novos Estilos

### Para um novo componente:
1. Crie um arquivo em `src/styles/components/nome-componente.css`
2. Adicione o import no `main.css`: `@import "./components/nome-componente.css";`

### Para novos efeitos visuais:
1. Adicione no arquivo `src/styles/effects/synthwave.css`
2. Ou crie um novo arquivo em `effects/` se for um tema diferente

### Para estilos globais:
1. Adicione diretamente no `main.css`

## Convenções

- **Prefixos de classe:** Use prefixos descritivos (`audio-`, `synthwave-`, `mode-`)
- **Nomenclatura:** Use kebab-case para classes CSS
- **Comentários:** Organize seções com comentários descritivos
- **Ordem:** Mantenha a ordem lógica (layout → aparência → interações)