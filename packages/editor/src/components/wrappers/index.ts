import type { App } from 'vue'
import PageVue from './Page.vue'
import ModalVue from './Modal.vue'

export default {
  install(vue: App) {
    vue.component('wr_page', PageVue)
    vue.component('wr_modal', ModalVue)
  }
}
