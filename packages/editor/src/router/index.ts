import { createRouter, createWebHistory } from 'vue-router'
// import AuthView from '@/views/AuthView.vue'
// import FilesView from '@/views/files/FilesView.vue'
import { EditorView } from '@/editor'
// import ViewerView from '@/views/editor/ViewerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'files',
    //   component: FilesView
    // },
    {
      path: '/editor/:id',
      name: 'editor',
      component: EditorView
    },
    // {
    //   path: '/viewer/:config',
    //   name: 'viewer',
    //   component: ViewerView
    // },
    // {
    //   path: '/auth',
    //   name: 'auth',
    //   component: AuthView
    // }
  ]
})

export default router
