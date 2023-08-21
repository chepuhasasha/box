import type { App } from 'vue'
import AddObjectVue from './AddObject.vue'

export default {
  install(vue: App) {
    vue.component('m_add_object', AddObjectVue)
  }
}
