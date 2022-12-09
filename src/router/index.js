import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout";
import Home from "@/views/Home"
import BuyershowManage from "@/views/BuyershowManage/index.vue";
import Manage from "@/views/Manage";
import Order from "@/views/Manage/Order";
import Payment from "@/views/Manage/Payment";
import Personal from "@/views/Manage/Personal";

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
                path: '/buyershowManage',
                name: 'buyershowManage',
                meta: {requiresAuth: false},
                component: BuyershowManage,
                children: [
                    {
                        path: '/buyershow',
                        name: 'buyershow',
                        meta: {requiresAuth: false},
                        component: () => import('@/views/BuyershowManage/Buyershow.vue'),
                    },
                    {
                        path: '/homepage:id',
                        name: 'homepage',
                        meta: {requiresAuth: false},
                        component: () => import('@/views/BuyershowManage/Homepage.vue'),
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
                        path: 'payment',
                        name: 'payment',
                        component: Payment,
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
    {
        path: "*",
        component: () => import("@/views/404"),
        meta:{
            title: '页面走丢了'
        }
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
