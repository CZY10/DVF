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
export function getQrcode(data) {
    return request({
        url: '/addons/wechatscanlogin/api/qrcode',
        method: 'get',
        data
    })
}
//发送验证码
export function smsSend(data) {
    return request({
        url: '/api/sms/send',
        method: 'post',
        data
    })
}
//短信登录注册
export function mobileLogin(data) {
    return request({
        url: '/api/user/mobilelogin',
        method: 'post',
        data
    })
}
//绑定手机号
export function bindPhone(data) {
    return request({
        url: '/addons/wechatscanlogin/api/register',
        method: 'post',
        data
    })
}

//检测是否扫码成功
export function checkQr(data) {
    return request({
        url: '/addons/wechatscanlogin/api/check',
        method: 'post',
        data
    })
}

/*拍买家秀*/
//搜索分类
export function getCategory(data) {
    return request({
        url: '/api/category/index',
        method: 'post',
        data
    })
}
//搜索列表
export function getSearchList(data) {
    return request({
        url: '/api/influencer/search',
        method: 'post',
        data
    })
}
//提交订单 改为 填写拍摄需求
export function createOrder(data) {
    return request({
        url: '/api/order/create',
        method: 'post',
        data
    })
}
//获取拍摄场景列表
export function getShootRequire(data) {
    return request({
        url: '/api/order/shootrequire',
        method: 'post',
        data
    })
}
//提交寄送信息
export function createTransport(data) {
    return request({
        url: '/api/order/transport',
        method: 'post',
        data
    })
}
//支付定金/尾款
export function payOrder(data) {
    return request({
        url: '/api/pay/order',
        method: 'post',
        data
    })
}
//支付状态检测
export function checkPayment(data) {
    return request({
        url: '/api/pay/check',
        method: 'post',
        data
    })
}
//订单记录列表
export function orderList(data) {
    return request({
        url: '/api/order/search',
        method: 'post',
        data
    })
}
//支付记录列表
export function paymentList(data) {
    return request({
        url: '/api/pay/search',
        method: 'post',
        data
    })
}
//订单删除
export function orderDelete(data) {
    return request({
        url: '/api/order/delete',
        method: 'post',
        data
    })
}
//退定金
export function returnFrontMoney(data) {
    return request({
        url: '/api/order/refunddeposit',
        method: 'post',
        data
    })
}
//去评价
export function commentCreate(data) {
    return request({
        url: '/api/comment/create',
        method: 'post',
        data
    })
}
//更新用户信息
export function userProfile(data) {
    return request({
        url: '/api/user/profile',
        method: 'post',
        data
    })
}
//获取用户信息
export function getUserInfo(data) {
    return request({
        url: '/api/user/index',
        method: 'post',
        data
    })
}
//修改手机号
export function updateMobile(data) {
    return request({
        url: '/api/user/changemobile',
        method: 'post',
        data
    })
}
//后台解绑微信
export function unBindWechat(data) {
    return request({
        url: '/addons/wechatscanlogin/api/unbind',
        method: 'post',
        data
    })
}
//获取聊天列表
export function getChatList(data) {
    return request({
        url: '/api/chat/index',
        method: 'post',
        data
    })
}
//获取聊天列表
export function createChat(data) {
    return request({
        url: '/api/chat/create',
        method: 'post',
        data
    })
}
//刷新Token
export function refreshToken(data) {
    return request({
        url: '/api/token/refresh',
        method: 'post',
        data
    })
}
//获取消息条数
export function chatCount(data) {
    return request({
        url: '/api/chat/count',
        method: 'post',
        data
    })
}
//获取配置信息
export function getConfig(data) {
    return request({
        url: '/api/config/index',
        method: 'post',
        data
    })
}
//后台绑定微信
export function bindWechat() {
    return request({
        url: '/addons/wechatscanlogin/api/bind',
        method: 'post',
    })
}
//后台绑定微信检测是否绑定成功
export function checkBindWechat() {
    return request({
        url: '/addons/wechatscanlogin/api/checkbind',
        method: 'post',
    })
}
//达人详情
export function influencerDetail(data) {
    return request({
        url: '/api/influencer/index',
        method: 'post',
        data
    })
}
//拍摄方案
export function takePlanList(data) {
    return request({
        url: '/api/home/index',
        method: 'post',
        data
    })
}
//订单详情
export function orderDetail(data) {
    return request({
        url: '/api/order/detail',
        method: 'post',
        data
    })
}
//订单步骤
export function orderStep(data) {
    return request({
        url: '/api/order/step',
        method: 'post',
        data
    })
}

//获取企业客服信息
export function serviceInfo(data) {
    return request({
        url: '/api/home/serviceInfo',
        method: 'post',
        data
    })
}

//获取FB群组
export function fbData(data) {
    return request({
        url: '/api/home/fbData',
        method: 'post',
        data
    })
}
//获取达人数据
export function influenceData(data) {
    return request({
        url: '/api/home/influenceData',
        method: 'post',
        data
    })
}
//获取DEAL数据
export function dealData(data) {
    return request({
        url: '/api/home/dealData',
        method: 'post',
        data
    })
}

//登录页面判断deal用户的跳转
export function determineDeal(data) {
    return request({
        url: "/api/user/directDeal",
        method: "post",
        data
    })
}

// 修改订单地址的未读状态
export function siteRead(data) {
    return request({
        url: "/api/order/siteRead",
        method: "post",
        data
    })
}

//需求列表
export function search(data) {
    return request({
        url: "/api/needs/search",
        method: "post",
        data
    })
}

//编辑拍摄需求
export function needsEdit(data) {
    return request({
        url: "/api/needs/edit",
        method: "post",
        data
    })
}

//需求删除
export function needsDelete(data) {
    return request({
        url: "/api/needs/delete",
        method: "post",
        data
    })
}

//勾选达人提交需求
export function needsSelectInfluencer(data) {
    return request({
        url: "/api/needs/selectInfluencer",
        method: "post",
        data
    })
}

// 删除需求的意向达人
export function needsRemoveInfluencer(data) {
    return request({
        url: "/api/needs/removeInfluencer",
        method: "post",
        data
    })
}

//需求提交
export function needsSubmit(data) {
    return request({
        url: "/api/needs/submit",
        method: "post",
        data
    })
}

//导入模板
export function needsTemplate(data) {
    return request({
        url: "/api/needs/template",
        method: "post",
        data
    })
}

//修改产品信息url
export function orderEdit(data) {
    return request({
        url: "/api/order/edit",
        method: "post",
        data
    })
}

//意向红人购物车操作
export function carOperate(data) {
    return request({
        url: "/api/influencer/carOperate",
        method: "post",
        data
    })
}

//意向红人购物车列表
export function carList() {
    return request({
        url: "/api/influencer/carList",
        method: "post"
    })
}

//拍摄需求填写模板粘贴一键识别
export function needsPaste(data) {
    return request({
        url: "/api/needs/paste",
        method: "post",
        data
    })
}


//修改视频数量
export function needsVideoNumin(data) {
    return request({
        url: "/api/needs/videoNum",
        method: "post",
        data
    })
}

//记录'修改预算'的弹窗状态
export function needsBudgetTip(data) {
    return request({
        url: "/api/needs/budgetTip",
        method: "post",
        data
    })
}

//修改拍摄预算
export function needsBudget(data) {
    return request({
        url: "/api/needs/budget",
        method: "post",
        data
    })
}

//拍摄需求首页
export function needsIndex(data) {
    return request({
        url: "/api/needs/index",
        method: "post",
        data
    })
}

// 邀请填写页勾选达人提交需求
export function inviteSelectInfluencer(data) {
    return request({
        url: "/api/needs/inviteSelectInfluencer",
        method: "post",
        data
    })
}

// 邀请填写页导入模板
export function inviteTemplate(data) {
    return request({
        url: "/api/needs/inviteTemplate",
        method: "post",
        data
    })
}

//邀请填写页删除需求的意向红人
export function inviteRemoveInfluencer(data) {
    return request({
        url: "/api/needs/inviteRemoveInfluencer",
        method: "post",
        data
    })
}

//邀请填写页需求提交
export function inviteSubmit(data) {
    return request({
        url: "/api/needs/inviteSubmit",
        method: "post",
        data
    })
}