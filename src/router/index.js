import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import index from '../views/Index.vue'
import appiontment from '../views/Appiontment.vue'
import hospital from '../views/Hospital.vue'
import setmeal from '../views/SetMeal.vue'
import selectDate from '../views/SelectDate.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name:'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/appiontment',
      name: 'appiontment',
      component: appiontment
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: hospital
    },
    {
      path: '/setmeal',
      name: 'setmeal',
      component: setmeal
    },
    {
      path:'/selectDate',
      name:'selectDate',
      component:selectDate
    }

  ]
})

export default router
