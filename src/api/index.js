//请求方法
import request from "@/utils/request";

//post请求
// export function login(data){
//     return request({
//         url:'v1/login',
//         method: 'post',
//         data
//     })
// }
// //get请求
// export function deleteAddress(params){
//     return request({
//         url:'v1/deleteAddress',
//         method: 'get',
//         params
//     })
// }
//生成微信二维码
export function getQrcode(data){
    return request({
        url:'/addons/wechatscanlogin/api/qrcode',
        method: 'get',
        data
    })
}
//发送验证码
export function smsSend(data){
    return request({
        url:'/api/sms/send',
        method: 'post',
        data
    })
}
//短信登录注册
export function mobileLogin(data){
    return request({
        url:'/api/user/mobilelogin',
        method: 'post',
        data
    })
}
//绑定手机号
export function bindPhone(data){
    return request({
        url:'/addons/wechatscanlogin/api/register',
        method: 'post',
        data
    })
}

//检测是否扫码成功
export function checkQr(data){
    return request({
        url:'/addons/wechatscanlogin/api/check',
        method: 'post',
        data
    })
}
//检查token是否过期
export function checkToken(data){
    return request({
        url:'/addons/wechatscanlogin/api/check',
        method: 'post',
        data
    })
}
