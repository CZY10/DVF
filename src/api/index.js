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
        url:'api/qrcode',
        method: 'get',
        data
    })
}
//发送验证码
export function smsSend(data){
    return request({
        url:'api/sms/send',
        method: 'post',
        data
    })
}
