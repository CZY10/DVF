import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout";
import Home from "@/views/Layout/Home"
import Buyershow from "@/views/Layout/Buyershow/index.vue";
import Manage from "@/views/Layout/Manage";
import Order from "@/views/Layout/Manage/Order";
import Payment from "@/views/Layout/Manage/Payment";
import Message from "@/views/Layout/Manage/Message";
import Personal from "@/views/Layout/Manage/Personal";

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'home',
                meta: {requiresAuth: false},
                component: Home,
            },
            {
                path: '/buyershow',
                name: 'Buyershow',
                meta: {requiresAuth: false},
                component: Buyershow,
                children: [
                    {
                        path: '/buyershow',
                        name: 'Buyershow',
                        meta: {requiresAuth: false},
                        component: () => import('@/views/Layout/Buyershow/Buyershow.vue'),
                    },
                    {
                        path: '/homepage:id',
                        name: 'Homepage',
                        meta: {requiresAuth: false},
                        component: () => import('@/views/Layout/Buyershow/Homepage.vue'),
                    },
                ]
            },

            {
                path: '/manage',
                name: 'manage',
                meta: {requiresAuth: true},
                component: Manage,
                redirect: '/manage/order',
                children: [
                    {
                        path: 'order',
                        name: 'order',
                        component: Order,
                    },
                    {
                        path: 'Payment',
                        name: 'Payment',
                        component: Payment,
                    },
                    {
                        path: 'Message',
                        name: 'message',
                        component: Message,
                    },
                    {
                        path: 'personal',
                        name: 'personal',
                        component: Personal,
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import store from '../store/index'

//路由拦截
router.beforeEach((to, from, next) => {
    localStorage.setItem('loginFromPath',from.path)
    let token = localStorage.getItem('token');
    if (to.matched.some(ele => ele.meta.requiresAuth)) {
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router
