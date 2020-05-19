import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/session_index'
import Login from '@/views/login'
import Signup from '@/views/signup'
import BookIndex from '@/views/books_index'
// import User from '../views/user'
import userCard from '../components/userCard'

// import store from "@/store/index.js"


Vue.use(Router);

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/session',
            component: Index
        },
        {
          path: '/login',
          component: Login
        },
        {
            path: '/signup',
            component: Signup
        },
        {
          path: '/book_index',
          component: BookIndex
        },
        // {
        //   path: '/user/:id',
        //   component: User
        // },
        {
          path: '/userCard',
          component: userCard
        }

    ]
})

export default router;