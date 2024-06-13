import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home1',
      component: Login1
    },
    { 
      path: '/register1',
      name: 'register1',
      component: Register1
    },{
      path: '/registe1r',
      name: 'register1',
      component: Registe1r
    }
  ]
})

export default router
