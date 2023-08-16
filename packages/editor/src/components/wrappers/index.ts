import type { App } from 'vue'
import PageVue from './Page.vue'

export default {
  install(vue: App) {
    vue.component('wr_page', PageVue)
  }
}
