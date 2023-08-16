import '@/assets/main.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// COMPONENTS
import widgets from '@/components/widgets'
import elements from '@/components/elements'
import wrappers from '@/components/wrappers'
import blocks from '@/components/blocks'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(widgets)
  .use(elements)
  .use(wrappers)
  .use(blocks)
  .mount('#app')
