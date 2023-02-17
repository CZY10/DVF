<template>
    <div>
        <div class="header">
            <el-menu
                :default-active="$route.path"
                class="el-menu-demo"
                router
                mode="horizontal"
                active-text-color="#333333"
                text-color="#666666"
                @select="handleSelect">
                <a href="" style="display: flex;justify-content: center;align-items: center;width: 180px;padding: 0 20px;"><img :src="logoImg" style="width: 100%" alt=""></a>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/buyershow">拍买家秀</el-menu-item>
                <el-menu-item @click="handlerClick">联系我们</el-menu-item>
                <el-menu-item index="/chatgpt">ChatGPT</el-menu-item>
                <el-menu-item v-if="!isLogin" style="float: right;" index="/login"><el-button class="login_btn" round>登陆/注册</el-button></el-menu-item>
                <el-submenu v-else index="/manage" style="float: right;border-radius: 10px">
                    <template slot="title"><span class="user_info_box"><img :src="avatar" alt=""></span></template>
                    <el-menu-item index="/manage/order">订单信息</el-menu-item>
                    <el-menu-item index="/manage/payment">支付记录</el-menu-item>
                    <el-menu-item index="/manage/personal">个人资料</el-menu-item>
                    <el-menu-item @click="handlerLogOut">退出</el-menu-item>
                </el-submenu>
                <el-menu-item class="icon_hover_style" style="float: right;padding: 0" index="/manage/order" @click="changeIsMessage">
                    <el-badge style="display: flex;height: 100%;align-items: center" :value="messageCount" :hidden="messageCount==0" class="item">
                        <i class="el-icon-chat-dot-round" style="color: #666666;font-size: 22px"></i>
                    </el-badge>
                </el-menu-item>
                <el-menu-item style="float: right;"><a href="https://peseeazfwl.feishu.cn/wiki/wikcnMyh2Kpl0beLaynqfWT3Vuc" target="_blank">新手指南</a></el-menu-item>
            </el-menu>
        </div>
        <el-dialog
            title="微信咨询"
            :visible.sync="dialogVisible"
            center
            class="weChatDialog"
            width="320px">
            <div class="contact_us_box">
                <span></span><span></span><span></span><span></span>
                <img :src="configData.wechat" alt="">
            </div>
            <div class="contact_us_foot">
                <p><i class="iconfont icon-phone-call"></i><span>电话：</span>{{ configData.phone }}</p>
                <p><i class="iconfont icon-mail"></i><span>邮箱：</span>{{ configData.email }}</p>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import {mapMutations} from "vuex";
import { chatCount } from '../../api/index'
import store from "@/store";

export default {
    name: "NavMenu",
    inject:['reload'],
    data(){
        return{
            isLogin:true,
            dialogVisible: false,
            avatar: localStorage.getItem('avatar'),
            messageCount: 0,
            logoImg:localStorage.getItem('logo'),
            configData:{},
            token:localStorage.getItem('token')
        }
    },
    computed:{
        avatarFn(){
            return this.$store.state.login.avatar
        },
        messageFn(){
            return this.$store.state.order.isRead
        },
        logoFn(){
            return this.$store.state.login.logo
        }
    },
    watch:{
        avatarFn(newVal){
            this.avatar = newVal
            this.$forceUpdate();// 更新数据
        },
        messageFn(newVal){
            if(newVal === 1){
                if(this.messageCount>0){
                    this.messageCount--;
                    this.setMessage(this.messageCount)
                }

            }
        },
        logoFn(newVal){
            this.logoImg = newVal;
        }
    },
    created() {
        if (this.token){
            this.isLogin = true;
        }else {
            this.isLogin = false;
        }
        window.addEventListener('setItem', ()=> {
            //这里就可以根据具体情况调用或刷新需要的操作
            this.avatar = localStorage.getItem('avatar'); //获取监听的值
        })
    },
    mounted() {
        this.getMessage();
    },
    methods: {
        ...mapMutations('order', ["setIsMessage","setMessage","setIsRead"]),
        handlerClick(){
            this.dialogVisible = true;
            if(localStorage.getItem('configObj')!=null){
                this.configData = JSON.parse(localStorage.getItem('configObj'));
            }
        },
        //获取消息条数
        getMessage(){
            chatCount()
                .then((res)=>{
                    this.messageCount = res.data.count;
                    this.setMessage(this.messageCount);
                })
                .catch()
        },
        handleSelect(key, keyPath) {},
        changeIsMessage(){
            this.setIsMessage(1)
        },
        //退出登录
        handlerLogOut(){
            this.$confirm('您真的要退出本次登录吗？','退出登录')
                .then(()=>{
                    this.$store.commit('login/clearUserInfo')
                    switch(this.$route.name)
                    {
                        case 'order':
                            window.location.href = '/#/';
                            break;
                        case 'payment':
                            window.location.href = '/#/';
                            break;
                        case 'personal':
                            window.location.href = '/#/';
                            break;
                        case 'chatgpt':
                            window.location.href = '/#/';
                            break;
                        default:
                            window.location.href = '/#' + this.$route.fullPath;
                    }
                    this.reload();
                })
                .catch((err)=>{})
        }
    }
}
</script>

<style lang="less">
.icon_hover_style:hover{
    i{
        color: #333333 !important;
        font-weight: bold;
    }
}
.el-menu-demo .el-badge__content{
    height: 14px;
    line-height: 14px;
    font-weight: normal;
}
.el-menu-demo .el-badge__content.is-fixed{
    top: 18px;
    right: 18px;
}
.el-menu--popup-bottom-start{
    margin-top: 0;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title{
    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%) !important;
    border-radius: 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF !important;
}
.contact_us_box{
    position: relative;
    width: 220px;
    height: 220px;
    padding: 7px;
    margin: auto;
    margin-top: 10px;
    border: 1px solid #EEEEEE;
    img{
        width: 100%;
        height: 100%;
    }
    span{
        position: absolute;
        display: block;
        width: 7px;
        height: 7px;
        &:first-child{
            left: -1px;;
            top: -1px;;
            border-top: 1px solid #333333;
            border-left: 1px solid #333333;
        }
        &:nth-child(2){
            right: -1px;
            top: -1px;
            border-top: 1px solid #333333;
            border-right: 1px solid #333333;
        }
        &:nth-child(3){
            right: -1px;;
            bottom: -1px;;
            border-bottom: 1px solid #333333;
            border-right: 1px solid #333333;
        }
        &:nth-child(4){
            left: -1px;;
            bottom: -1px;;
            border-bottom: 1px solid #333333;
            border-left: 1px solid #333333;
        }
    }
}
.contact_us_foot{
    margin-top: 24px;
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        display: flex;
        align-items: center;
        margin-top: 12px;
        span{
            color: rgba(153, 153, 153, 1);

        }
        i{
            display: flex;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 7px;
            justify-content: center;
            align-items: center;
        }
        &:first-child{
            i{
                background: rgba(0, 217, 173, 0.1);
                color: #00D9AD;
            }
        }
        &:nth-child(2){
            i{
                background: rgba(0, 178, 255, 0.1);
                color: #00B2FF;
            }
        }
    }
}
.el-menu,
.el-menu--horizontal .el-menu .el-menu-item{
    background: none !important;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-menu-item.is-active,
.el-menu.el-menu--horizontal{
    border-bottom: 1px solid #eeeeee;
}
.el-menu--horizontal > .el-menu-item.is-active{
    border-bottom: none !important;
}
.el-menu-item{
    transition:none !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal>.el-menu-item.is-active{
    color: #333333 !important;
    font-weight: bold;
    background: none !important;
}
.el-menu--horizontal .el-menu .el-menu-item:hover,
.el-menu--horizontal .el-menu .el-menu-item:focus,
.el-menu--horizontal .el-menu .el-menu-item:active{
    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%) !important;
    border-radius: 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF !important;
}
.el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background: none !important;
}
.el-menu--horizontal>.el-submenu .el-submenu__title,
.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-menu-item{
    height: 66px !important;
    line-height: 66px !important;
}

.el-submenu__title i{
    color: #666666 !important;
}

.el-menu--popup{
    //box-shadow: none !important;
}
.el-menu--popup{
    min-width: 100px !important;
    padding: 6px !important;
    text-align: center;
}
.el-menu--horizontal{
    //background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
    background: #FFFFFF;
}

.header{
    background: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    .user_info_box{
        display: inline-flex;
        width: 36px;
        height: 36px;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            height: auto;
        }
    }
    >ul{
        //max-width: 1200px;
        margin: 0 10px;
        align-items: center;
        border-bottom: none;
        a{
            float: left;
            height: 66px;
            line-height: 66px;
            width: 61px;
            text-decoration: none;
            color: #ffffff;
        }
        li{
            font-family: PingFangSC-Semibold, PingFang SC;
            line-height: 66px;
            height: 66px;
            .login_btn{
                color: #FFFFFF;
                background: #001238 linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                padding: 10px 28px;
                border: none;
            }
        }
    }
}
@media screen and (max-width: 600px){
    .header{
        padding: 12px 0;
    }
    .header > ul{
        margin: 10px;
        padding-bottom: 10px;
    }
    .header > ul li{
        height: 40px !important;
        line-height: 40px !important;
    }
    .header > ul a{
        height: 40px !important;
        line-height: 40px !important;
        padding: 0 10px !important;
    }
    .el-menu-item{
        padding: 0 6px !important;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title,
    .el-submenu.is-active .el-submenu__title,
    .el-menu--horizontal>.el-menu-item{
        height: 40px !important;
        line-height: 40px !important;
    }
    .el-menu.el-menu--horizontal{
        border-bottom: none;
    }
}
</style>
