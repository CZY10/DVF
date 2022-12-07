import axios from "axios";
import { Message, MessageBox } from 'element-ui'
import store from "@/store";
import config from "../../config";


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,   // api的base_url  自动加在url前面
    timeout:10000, //请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
        config.headers['token'] = store.state["login"].token;
        config.headers['Content-Type'] = 'application/json'
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
        if(res.code !== 1) {
                Message({
                    message: res.msg,
                    type: 'error',
                    offset:100,
                    duration: 5 * 1000
                })
            if(res.code == 300 && reg.test(res.errorCode)){
                Message({
                    message: '未知错误,请稍后再试或联系管理员!',
                    type: 'error',
                    offset:100,
                    duration: 5 * 1000
                })
            }else if( res.code == 401) {
                MessageBox.confirm('会话过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    offset:100,
                    type: 'warning'
                }).then(() => {
                    store.commit('clearUserInfo');//删除token
                    localStorage.removeItem('userInfo')//删除用户信息
                    localStorage.removeItem('token ');//删除token
                    location.reload();
                }).catch(()=>{
                    return
                })
            }
            return res; /*Promise.reject('error')*/
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        /*Message({
            message: error.message || error.msg,
            type: 'error',
             offset:100,
            duration: 5 * 1000
        })*/
        // return Promise.reject(error)
    }
)
export const createAPI = (url, method, data) => {

    const config = {}
    if(method === 'get'){
        config.params = data
    }else {
        config.data = data
    }
    return service({
        url,
        method,
        ...config
    })
}

export default service
