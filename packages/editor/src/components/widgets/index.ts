import type { App} from 'vue'
import IconVue from './Icon.vue'

export default {
  install(vue: App) {
    vue.component('w_icon', IconVue)
  }
}