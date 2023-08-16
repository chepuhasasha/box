import type { App } from 'vue'
import ButtonVue from './Button.vue'
import IconButtonVue from './IconButton.vue'
import UserVue from './User.vue'

export default {
  install(vue: App) {
    vue.component('e_button', ButtonVue)
    vue.component('e_icon_button', IconButtonVue)
    vue.component('e_user', UserVue)
  }
}
