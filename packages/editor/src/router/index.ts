import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import FilesView from '@/views/files/FilesView.vue'
import EditorView from '@/views/editor/EditorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'files',
      component: FilesView
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
  ]
})

export default router
