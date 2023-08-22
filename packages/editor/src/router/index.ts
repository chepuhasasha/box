import { createRouter, createWebHistory } from 'vue-router'
import FilesView from '@/views/Files.vue'
import EditorView from '@/views/Editor.vue'
import AuthView from '@/views/Auth.vue'

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
    }
  ]
})

export default router
