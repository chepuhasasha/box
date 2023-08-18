import type { App } from 'vue'
import BoxVue from './elements/Box.vue'
import ContainerVue from './elements/Container.vue'
import AddObjectVue from './modals/AddObject.vue'

export const editorComponents = {
  install(vue: App) {
    vue.component('editor_e_box', BoxVue)
    vue.component('editor_e_container', ContainerVue)
    vue.component('editor_m_add_object', AddObjectVue)
  }
}
