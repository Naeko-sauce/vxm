import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/inDex.vue'

import NotFound from '../pages/404E.vue'
import inde from '../pages/inde.vue'

const router = createRouter({
   //里面配置路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inDex',
      component: HomeView
    },
  
    {
      path: '/inde',
      name: 'inde',
      component: inde
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
      //动态路由404页面
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
