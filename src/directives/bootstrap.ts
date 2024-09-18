import type { Directive } from 'vue'
import { Tooltip, Popover } from 'bootstrap'

export const tooltip: Directive = {
  mounted(el: HTMLElement) {
    return new Tooltip(el)    
  }
}

export const popover: Directive = {
  mounted(el: HTMLElement) {
    return new Popover(el)
  }
}