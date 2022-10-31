<template>
    <div class="header">
        <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            router
            mode="horizontal"
            active-text-color="#ffffff"
            text-color="#ffffff"
            @select="handleSelect">
            <a href="" style="display: flex;justify-content: center;align-items: center"><img src="../../assets/images/logo.png" alt=""></a>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/buyershow">拍买家秀</el-menu-item>
            <el-menu-item index="3">联系我们</el-menu-item>
            <el-menu-item v-if="isLogin" style="float: right;" index="/login"><el-button class="login_btn" round>登陆/注册</el-button></el-menu-item>
            <el-submenu v-else index="/manage" style="float: right;">
                <template slot="title">Hi,18175888288</template>
                <el-menu-item index="/manage/order">订单信息</el-menu-item>
                <el-menu-item index="/manage/payment">支付记录</el-menu-item>
                <el-menu-item index="/manage/message">消息通知</el-menu-item>
                <el-menu-item index="/manage/personal">个人资料</el-menu-item>
                <el-menu-item>退出</el-menu-item>
            </el-submenu>
            <el-menu-item style="float: right;padding: 0" index="5"><i class="el-icon-bell" style="color: #ffffff"></i></el-menu-item>
            <el-menu-item style="float: right;" index="4"><a href="">新手指南</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import store from "@/store";

export default {
    name: "NavMenu",
    data(){
        return{
            isLogin:true,
        }
    },
    created() {
        let userInfo = localStorage.getItem('userInfo')
        console.log('menu',userInfo)
        if (userInfo){
            this.isLogin = true;
        }
        console.log()
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less">
.el-menu,
.el-menu--horizontal .el-menu .el-menu-item{
    background: none !important;
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-menu-item.is-active,
.el-menu.el-menu--horizontal{
    border-bottom: none !important;
}
.el-menu-item{
    transition:none !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal>.el-menu-item.is-active{
    font-weight: bold;
    background: none !important;
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
    color: #ffffff !important;
}

.el-menu--popup{
    box-shadow: none !important;
}

.el-menu--horizontal{
    background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
}

.header{
    background: none;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99999;
    >ul{
        max-width: 1200px;
        margin: auto;
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
</style>