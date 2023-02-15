//请求方法
import request,{createAPI} from "@/utils/request";

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

/*拍买家秀*/
//搜索分类
export function getCategory(data){
    return request({
        url:'/api/category/index',
        method: 'post',
        data
    })
}
//搜索列表
export function getSearchList(data){
    return request({
        url:'/api/influencer/search',
        method: 'post',
        data
    })
}
//提交订单
export function createOrder(data){
    return request({
        url:'/api/order/create',
        method: 'post',
        data
    })
}
//获取拍摄场景列表
export function getShootRequire(data){
    return request({
        url:'/api/order/shootrequire',
        method: 'post',
        data
    })
}
//提交寄送信息
export function createTransport(data){
    return request({
        url:'/api/order/transport',
        method: 'post',
        data
    })
}
//支付定金/尾款
export function payOrder(data){
    return request({
        url:'/api/pay/order',
        method: 'post',
        data
    })
}
//支付状态检测
export function checkPayment(data){
    return request({
        url:'/api/pay/check',
        method: 'post',
        data
    })
}
//订单记录列表
export function orderList(data){
    return request({
        url:'/api/order/search',
        method: 'post',
        data
    })
}
//支付记录列表
export function paymentList(data){
    return request({
        url:'/api/pay/search',
        method: 'post',
        data
    })
}
//订单删除
export function orderDelete(data){
    return request({
        url:'/api/order/delete',
        method: 'post',
        data
    })
}
//退定金
export function returnFrontMoney(data){
    return request({
        url:'/api/order/refunddeposit',
        method: 'post',
        data
    })
}
//去评价
export function commentCreate(data){
    return request({
        url:'/api/comment/create',
        method: 'post',
        data
    })
}
//更新用户信息
export function userProfile(data){
    return request({
        url:'/api/user/profile',
        method: 'post',
        data
    })
}
//获取用户信息
export function getUserInfo(data){
    return request({
        url:'/api/user/index',
        method: 'post',
        data
    })
}
//修改手机号
export function updateMobile(data){
    return request({
        url:'/api/user/changemobile',
        method: 'post',
        data
    })
}
//后台解绑微信
export function unBindWechat(data){
    return request({
        url:'/addons/wechatscanlogin/api/unbind',
        method: 'post',
        data
    })
}
//获取聊天列表
export function getChatList(data){
    return request({
        url:'/api/chat/index',
        method: 'post',
        data
    })
}
//获取聊天列表
export function createChat(data){
    return request({
        url:'/api/chat/create',
        method: 'post',
        data
    })
}
//刷新Token
export function refreshToken(data){
    return request({
        url:'/api/token/refresh',
        method: 'post',
        data
    })
}
//获取消息条数
export function chatCount(data){
    return request({
        url:'/api/chat/count',
        method: 'post',
        data
    })
}
//获取消息条数
export function getConfig(data){
    return request({
        url:'/api/config/index',
        method: 'post',
        data
    })
}
//后台绑定微信
export function bindWechat(){
    return request({
        url:'/addons/wechatscanlogin/api/bind',
        method: 'post',
    })
}
//后台绑定微信检测是否绑定成功
export function checkBindWechat(){
    return request({
        url:'/addons/wechatscanlogin/api/checkbind',
        method: 'post',
    })
}
//达人详情
export function influencerDetail(data){
    return request({
        url:'/api/influencer/index',
        method: 'post',
        data
    })
}
//拍摄方案
export function takePlanList(data){
    return request({
        url:'/api/home/index',
        method: 'post',
        data
    })
}
//订单详情
export function orderDetail(data){
    return request({
        url:'/api/order/detail',
        method: 'post',
        data
    })
}
//订单步骤
export function orderStep(data){
    return request({
        url:'/api/order/step',
        method: 'post',
        data
    })
}
//获取chatGPT列表
export function chatgptList(data){
    return request({
        url:'/api/chatgpt/index',
        method: 'post',
        data
    })
}
//chatGPT消息发送
export function createChatgpt(data){
    return request({
        url:'/api/chatgpt/create',
        method: 'post',
        data
    })
}
