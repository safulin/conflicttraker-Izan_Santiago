import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConflictDetailView from '../views/ConflictDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/conflicts/:id', component: ConflictDetailView }
  ]
})

export default router
