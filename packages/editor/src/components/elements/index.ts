import type { App } from 'vue'
import ButtonVue from './Button.vue'
import IconButtonVue from './IconButton.vue'
import UserVue from './User.vue'
import InputVue from './Input.vue'
import DropdownVue from './Dropdown.vue'

export default {
  install(vue: App) {
    vue.component('e_button', ButtonVue)
    vue.component('e_icon_button', IconButtonVue)
    vue.component('e_user', UserVue)
    vue.component('e_input', InputVue)
    vue.component('e_drop', DropdownVue)
  }
}
