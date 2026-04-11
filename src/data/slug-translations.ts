/**
 * Bidirectional slug translations for content that has
 * different filenames across locales.
 *
 * - Key: slug in one locale → Value: slug in the other locale
 * - Value `null` means no translation exists (falls back to listing page)
 * - Slugs NOT listed here are assumed identical across locales
 *
 * Update this map when adding content with locale-specific filenames.
 */

export const slugTranslations: Record<string, Record<string, string | null>> = {
  posts: {
    "macos-login-items": "inicializacao-macos",
    "inicializacao-macos": "macos-login-items",
  },
  cheatsheets: {
    "docker-useful-commands": "docker-comandos-uteis",
    "docker-comandos-uteis": "docker-useful-commands",
    "git-quick-commands": "git-comandos-rapidos",
    "git-comandos-rapidos": "git-quick-commands",
    "systemd-service-commands": "systemd-servicos",
    "systemd-servicos": "systemd-service-commands",
    "tmux-essentials": "tmux-essencial",
    "tmux-essencial": "tmux-essentials",
    "yazi-shortcuts": "yazi-atalhos",
    "yazi-atalhos": "yazi-shortcuts",
    "yazi-cheatsheet-completo": null,
  },
};
