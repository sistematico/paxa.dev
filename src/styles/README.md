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
    └── tts.css                 # Estilos do Text-to-Speech
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

### 🗣️ `components/tts.css`
**Responsabilidade:** Estilos do sistema Text-to-Speech
- Controles de reprodução (`.tts-controls`, `.tts-control-btn`)
- Destacamento de palavras (`.tts-word`, `.tts-active`, `.tts-spoken`)
- Painel de configurações de voz (`.voice-controls-panel`)
- Animações de palavra (`word-glow`, `word-wave`)
- Sliders e controles customizados

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

- **Prefixos de classe:** Use prefixos descritivos (`tts-`, `synthwave-`, `mode-`)
- **Nomenclatura:** Use kebab-case para classes CSS
- **Comentários:** Organize seções com comentários descritivos
- **Ordem:** Mantenha a ordem lógica (layout → aparência → interações)