import Vue from 'vue'
import VueRouter from 'vue-router'

import Session from '../views/session_index.vue'
// import Login from '../views/login.vue'
// import Signup from '../views/signup.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/session',
        name: 'Session',
        component: Session
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    // {
    //     path: '/signup',
    //     name: 'Signup',
    //     component: Signup
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router