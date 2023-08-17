import type { App } from 'vue'
import IconVue from './Icon.vue'
import LinkVue from './Link.vue'
import AvatarVue from './Avatar.vue'
import TagVue from './Tag.vue'
import UtilizationVue from './Utilization.vue'

export default {
  install(vue: App) {
    vue.component('w_icon', IconVue)
    vue.component('w_link', LinkVue)
    vue.component('w_avatar', AvatarVue)
    vue.component('w_tag', TagVue)
    vue.component('w_util', UtilizationVue)
  }
}
