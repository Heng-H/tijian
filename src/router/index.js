import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import index from '../views/Index.vue'
import Appointment from '../views/Appointment.vue'
import Hospital from '../views/Hospital.vue'
import SetMeal from '../views/SetMeal.vue'
import SelectDate from '../views/SelectDate.vue'
import ConfirmOrder from '../views/ConfirmOrder.vue'
import AppointMentSuccess from '../views/AppointmentSuccess.vue'
import AppointmentList from '../views/AppointmentList.vue'
import AppointmentCancel from '../views/AppointmentCancel.vue'

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
      component:Appointment
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: Hospital
    },
    {
      path: '/setmeal',
      name: 'setmeal',
      component: SetMeal
    },
    {
      path: '/selectdate',
      name: 'selectdate',
      component: SelectDate
    },
    {
      path: '/confirmorder',
      name: 'confirmorder',
      component: ConfirmOrder
    },
    {
      path: '/appointmentsuccess',
      name: 'appointmentsuccess',
      component: AppointMentSuccess
    },
    {
      path: '/appointmentlist',
      name: 'appointmentlist',
      component: AppointmentList
    },
    {
      path: '/appointmentcancel',
      name: 'appointmentcancel',
      component: AppointmentCancel
    }

  ]
})

export default router
