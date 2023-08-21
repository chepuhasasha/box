import { createRouter, createWebHistory } from 'vue-router'
import FilesView from '@/views/Files.vue'
import EditorView from '@/views/Editor.vue'

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
    }
  ]
})

export default router
