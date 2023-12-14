import axios from "axios";
import { Message } from 'element-ui'
import store from "@/store";
import router from '@/router'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,   // api的base_url  自动加在url前面
    timeout: 5000 * 60, //请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    if (config.url == "/api/needs/template" || config.url == '/api/needs/inviteTemplate') {
        config.headers['Content-Type'] = 'multipart/form-data'
    } else {
        config.headers['Content-Type'] = 'application/json'
    }
    config.headers['token'] = localStorage.getItem('token')
    return config
},
    error => {
        console.log(error)
        return Promise.reject(error)
    })
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        const reg = /^0.*0$|^0$/;
        if (res.code !== 1 && res.msg != '添加失败') {
            Message({
                message: res.msg,
                type: 'error',
                offset: 100,
                duration: 5 * 1000
            })
            console.log(res.msg)
            if (res.code == 300 && reg.test(res.errorCode)) {
                Message({
                    message: '未知错误,请稍后再试或联系管理员!',
                    type: 'error',
                    offset: 100,
                    duration: 5 * 1000
                })
            }
            return res; /*Promise.reject('error')*/
        } else {
            return response.data
        }
    },
    error => {
        if (error.request.status == 401 && error.response.data.msg == '请登录后操作') {
            store.commit("login/clearUserInfo");
            localStorage.clear("serviceInfoList");
            router.push('/login')
            Message.error('登录已过期，请重新登录');
        }
    }
)
export const createAPI = (url, method, data) => {

    const config = {}
    if (method === 'get') {
        config.params = data
    } else {
        config.data = data
    }
    return service({
        url,
        method,
        ...config
    })
}

export default service
