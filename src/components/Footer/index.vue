<template>
    <div class="footer">
        <el-row :gutter="54" style="max-width: 1200px;margin: auto;">
            <el-col :span="5" style="padding-left: 0">
                <div style="max-width: 50px;margin: auto">
                    <img src="../../assets/images/logo_footer.png" alt="">
                </div>
                <p style="text-align: center;margin-top: 10px">亚马逊视频营销服务平台</p>
            </el-col>
            <el-col :span="8">
                <p class="title">关于我们</p>
                <p>签约本土优质达人，视频质量高，内容真实，贴合海外群体，平台直接对接签约达人，价格远低于同行，且质量更有保障</p>
            </el-col>
            <el-col :span="6">
                <p class="title">联系我们</p>
                <p><span>联系我们</span>0755-84861340</p>
                <p><span>邮箱地址</span>support@amztracker.com</p>
            </el-col>
            <el-col :span="5" style="padding-right: 0">
                <el-col :span="12" style="padding: 0">
                    <div class="qr_code"><img src="" alt=""></div>
                    <p style="text-align: center;margin-top: 8px">微信咨询</p>
                </el-col>
                <el-col :span="12" style="padding: 0">
                    <div class="qr_code"><img src="" alt=""></div>
                    <p style="text-align: center;margin-top: 8px">公众号</p>
                </el-col>
            </el-col>
        </el-row>
        <el-row style="max-width: 1200px;margin: auto;">
            <p class="keep_on_record">© 2021. 百佬汇跨境电商（深圳）有限公司版权所有 粤ICP备16035415号</p>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "index"
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