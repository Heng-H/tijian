import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App)

app.use(router)

app.provide('$axios',axios)

app.mount('#app')
