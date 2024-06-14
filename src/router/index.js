import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import index from '../views/Index.vue'
import appointment from '../views/Appointment.vue'
import hospital from '../views/Hospital.vue'
import setmeal from '../views/SetMeal.vue'
import selectdate from '../views/SelectDate.vue'
import confirmorder from '../views/ConfirmOrder.vue'
import appointmentsuccess from '../views/AppointmentSuccess.vue'
import appointmentlist from '../views/AppointmentList.vue'
import appointmentcancel from '../views/AppointmentCancel.vue'

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
      path: '/appointment',
      name: 'appointment',
      component: appointment
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
      path: '/selectdate',
      name: 'selectdate',
      component: selectdate
    },
    {
      path: '/confirmorder',
      name: 'confirmorder',
      component: confirmorder
    },
    {
      path: '/appointmentsuccess',
      name: 'appointmentsuccess',
      component: appointmentsuccess
    },
    {
      path: '/appointmentlist',
      name: 'appointmentlist',
      component: appointmentlist
    },
    {
      path: '/appointmentcancel',
      name: 'appointmentcancel',
      component: appointmentcancel
    }

  ]
})

export default router
