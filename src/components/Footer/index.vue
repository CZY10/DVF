<template>
    <div class="footer">
        <el-row :gutter="54" style="max-width: 1200px;margin: auto;">
            <el-col :span="5" style="padding-left: 0">
                <div style="max-width: 50px;margin: auto">
                    <img :src="formData.logo" alt="">
                </div>
                <p style="text-align: center;margin-top: 10px">{{ formData.name }}</p>
            </el-col>
            <el-col :span="8">
                <p class="title">关于我们</p>
                <p>{{ formData.about }}</p>
            </el-col>
            <el-col :span="6">
                <p class="title">联系我们</p>
                <p><span>联系我们</span>{{ formData.phone }}</p>
                <p><span>邮箱地址</span>{{ formData.email }}</p>
            </el-col>
            <el-col :span="5" style="padding-right: 0">
                <el-col :span="12" style="padding: 0">
                    <div class="qr_code"><img :src="formData.wechat" alt=""></div>
                    <p style="text-align: center;margin-top: 8px">微信咨询</p>
                </el-col>
                <el-col :span="12" style="padding: 0">
                    <div class="qr_code"><img :src="formData.chat" alt=""></div>
                    <p style="text-align: center;margin-top: 8px">公众号</p>
                </el-col>
            </el-col>
        </el-row>
        <el-row style="max-width: 1200px;margin: auto;">
            <p class="keep_on_record">© 2021. {{ formData.companyname }}版权所有 {{ formData.beian }}</p>
        </el-row>
    </div>
</template>

<script>
import {getConfig} from '@/api'
export default {
    name: "index",
    data(){
        return{
            formData:{}
        }
    },
    mounted() {
        this.getContent()
    },
    methods:{
        getContent(){
            getConfig()
                .then((res)=>{
                    if(res.code === 1){
                        this.formData = res.data;
                        localStorage.setItem('logo',res.data.logo)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="less" scoped>
.footer{
    background: rgba(0, 8, 39, 1);
    border-top: 1px solid rgba(255, 255, 255, 0.2200);
    padding-top: 50px;
    img{
        width: 100%;
    }
    .title{
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #E6E8EB;
        line-height: 22px;
        padding-bottom: 19px;
    }
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(204, 208, 215, 0.8);
        line-height: 24px;
        padding-bottom: 19px;
        span{
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #E6E8EB;
            line-height: 20px;
            margin-right: 16px;
        }
    }
    .qr_code{
        padding: 4px;
        width: 72px;
        height: 72px;
        background: #FFFFFF;
        margin: auto;
    }
    .keep_on_record{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #CCD0D7;
        line-height: 20px;
        padding: 48px 0 20px 0;
    }
}
</style>
