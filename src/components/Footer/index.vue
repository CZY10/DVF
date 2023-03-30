<template>
    <div>
        <div class="footer">
            <el-row :gutter="54" style="max-width: 1200px;margin: auto;padding-bottom: 28px">
                <el-col :span="5" style="padding-left: 0">
                    <div style="max-width: 180px;margin: auto">
                        <img :src="formData.footerlogo" alt="">
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
                        <div class="qr_code"><img :src="formData.wechat" style="width: 72px;height: 72px" alt=""></div>
                        <p style="text-align: center;margin-top: 8px">微信咨询</p>
                    </el-col>
                    <el-col :span="12" style="padding: 0">
                        <div class="qr_code"><img :src="formData.chat" style="width: 72px;height: 72px" alt=""></div>
                        <p style="text-align: center;margin-top: 8px">公众号</p>
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <div class="footer" style="padding-top: 0">
            <el-row style="max-width: 1200px;margin: auto;">
                <p class="keep_on_record">© 2022. {{ formData.companyname }}版权所有 <a href="https://beian.miit.gov.cn/" target="_blank">{{ formData.beian }}</a></p>
            </el-row>
        </div>

    </div>

</template>

<script>
import {getConfig} from '@/api'
import {mapMutations} from "vuex";
export default {
    name: "index",
    data(){
        return{
            formData:{}
        }
    },
    mounted() {
        if(localStorage.getItem('configObj')){
            this.formData = JSON.parse(localStorage.getItem('configObj'));
        }
    },
    methods:{

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
        height: 100%;
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
        padding: 20px 0;
        a{
            color: #CCD0D7;
            text-decoration: none;
        }
    }
}
</style>
