import '@/styles/main.scss'
import { createApp } from 'vue'
import App from '@/app.vue'
import { tooltip, popover } from '@/directives/bootstrap'
import 'bootstrap'

createApp(App)
  .directive('tooltip', tooltip)
  .directive('popover', popover)
  .mount('#app')
