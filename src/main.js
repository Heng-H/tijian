import './assets/main.css'
import 'font-awesome/css/font-awesome.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import 'font-awesome/css/font-awesome.min.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.provide('$axios',axios)

app.mount('#app')
