import { createRouter, createWebHistory } from 'vue-router'
import PokemonPage from '../Layout/PokemonPage.vue'
import HomePage from '../views/HomeView.vue'
import slider  from '@/views/slider.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: PokemonPage,
      children: [
        {
          path: '/',  // Empty path because it's the main root
          component: HomePage,  // Render HomePage within DefaultLayout
        }
      ]
    },
    {
      path: '/slider',
      name: 'Slider',
      component: slider,
      
    },
  ]
})

export default router
