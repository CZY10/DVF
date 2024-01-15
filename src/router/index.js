import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout";
import Home from "@/views/Home"
import VideoHome from "@/views/VideoHome"
import BuyershowManage from "@/views/BuyershowManage/index.vue";
import Manage from "@/views/Manage";
import Order from "@/views/Manage/Order";
import Payment from "@/views/Manage/Payment";
import Personal from "@/views/Manage/Personal";
import webDeal from "@/views/webDeal/index.vue"
import Requirement from "@/components/RequirementSubmission/index.vue"
import Note from "@/components/RequirementSubmission/note.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'home',
                meta: { requiresAuth: false },
                component: Home,
            },
            {
                path: '/videohome',
                name: 'videoHome',
                meta: { requiresAuth: false },
                component: VideoHome,
            },
            {
                path: '/webDeal',
                name: 'webDeal',
                meta: { requiresAuth: false },
                component: webDeal,
            },
            {
                path: '/buyershowmanage',
                name: 'buyershowManage',
                meta: { requiresAuth: false },
                component: BuyershowManage,
                children: [
                    {
                        path: '/buyershow',
                        name: 'buyershow',
                        meta: { requiresAuth: false },
                        component: () => import('@/views/BuyershowManage/Buyershow.vue'),
                    },
                    {
                        path: '/homepage',
                        name: 'homepage',
                        meta: { requiresAuth: false },
                        component: () => import('@/views/BuyershowManage/Homepage.vue'),
                    },
                    {
                        path: '/Requirement',
                        name: 'Requirement',
                        meta: { requiresAuth: true },
                        component: Requirement,
                    },
                    {
                        path: '/datalistdialog',
                        name: 'datalistdialog',
                        meta: { requiresAuth: true },
                        component: () => import('@/components/RequirementSubmission/datalistdialog.vue')
                    },
                    {
                        path: '/Note',
                        name: 'Note',
                        meta: { requiresAuth: false },
                        component: Note,
                    },
                    {
                        path: '/Invitationfilling',
                        name: 'Invitationfilling',
                        meta: { requiresAuth: false },
                        component: () => import('@/views/Invitationfilling/index.vue')
                    },
                    {
                        path: '/datalistdialogIf',
                        name: 'datalistdialogIf',
                        meta: { requiresAuth: false },
                        component: () => import('@/views/Invitationfilling/datalistdialog.vue')
                    },
                ]
            },

            {
                path: '/manage',
                name: 'manage',
                meta: { requiresAuth: true },
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
        component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
    },
    {
        path: '/tos',
        name: 'tos',
        component: () => import(/* webpackChunkName: "about" */ '@/views/TOS')
    },
    {
        path: "*",
        component: () => import("@/views/404"),
        meta: {
            title: '页面走丢了'
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//路由拦截
router.beforeEach((to, from, next) => {
    if (to.fullPath == "/Note" || to.fullPath == "/datalistdialog" || to.path == '/Invitationfilling' || to.path == '/datalistdialogIf') {
        store.commit('Index/setIsFalg', false)
    } else {
        store.commit('Index/setIsFalg', true)
    }

    if (to.query.source) localStorage.setItem('source', to.query.source)
    if (to.query.action) localStorage.setItem('action', to.query.action)
    localStorage.setItem('loginFromPath', from.path)
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
