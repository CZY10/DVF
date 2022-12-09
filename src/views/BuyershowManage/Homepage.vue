<template>
    <div id="homepage">
        <div class="content">
            <el-row :gutter="30" style="max-width: 1200px;margin: auto">
                <el-col :span="9" style="padding-left: 0">
                    <div class="homepage_header">
                        <div class="head_img">
                            <img src="../../assets/images/people_header.png" alt="">
                        </div>
                        <h5>NO.123</h5>
                        <span class="category">Amazon Influencer</span>
                        <div class="title">
                            <span v-for="(item,index) in title" :style="{color: index % 3 ==0 ? '#4BB1F1' : index % 2 == 0 ? '#F56422 !important':'#00D9AD',background: index % 3 == 0 ? 'rgba(75,177,241,0.1)' : index % 2 == 0 ? 'rgba(245,100,34,0.1) !important':'rgba(0,217,173,0.1)'}" :key="index">{{ item }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="15" style="padding-right: 0">
                    <el-card class="box_card basic_information_card" style="margin-bottom: 20px">
                        <h4>基本资料</h4>
                        <div>年龄：<span style="margin-right: 40px">45岁</span>性别：<span>男</span></div>
                        <div>国家：<span>美国</span></div>
                        <div style="display: flex;align-items: center">社交平台：<i></i><i></i><i></i></div>
                        <div>个人简介<p>TK、YouTube上有个人账号，粉丝约200万，可带宠物出镜，作品讲解细致、生动。TK、YouTube上有个人账号，粉丝约200万，可带宠物出镜，作品讲解细致、生动。</p></div>
                    </el-card>
                    <el-card class="box_card basic_information_card">
                        <h4>交付说明</h4>
                        <el-row style="padding-bottom: 0">
                            <el-col :span="12" style="padding-bottom: 0">
                                <div>卖点呈现：<span>通常纯展示</span></div>
                                <div>视频上传：<span>达人账号上传并关联listing</span></div>
                            </el-col>
                            <el-col :span="12" style="padding-bottom: 0">
                                <div>拍摄场景：<span>通常自行发挥</span></div>
                                <div>交付周期：<span>通常7-14天</span><b>（样品收货后）</b></div>
                            </el-col>
                        </el-row>
                        <div>视频时长：<span>通常60-80s</span></div>
                        <div>其他说明<p>交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...</p></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card class="title-card" style="max-width: 1200px;margin: auto">
                <h4>作品</h4>
            </el-card>
            <div class="product_box">
               <div style="max-width: 1200px;margin: auto">
                   <div class="product_item" v-for="(item,index) in productList" :key="index">
                       <img :src="item.img" alt="">
                       <p>{{ item.title }}</p>
                   </div>
               </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
    name: "homepage",
    components:{
        Footer,
    },
    data(){
        return{
            title:['家居','电子','服装设计','家居','电子','服装设计','家居','电子','服装设计','家居','电子','服装设计','家居'],
            productList:[
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                },
                {
                    title:'家用投影仪开箱展示视频家用投影仪开箱展示视频',
                    img:require('../../assets/images/table_video.png')
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.flex{
    display: flex;

}
#homepage{
    margin-top: 66px;
    background: rgba(248, 248, 249, 1);
    .content{
        overflow: hidden;
        padding-top: 29px;
        margin: auto;
        .homepage_header{
            padding-top: 8px;
            background: #FFFFFF linear-gradient(180deg, rgba(214,216,255,0.36) 0%, rgba(255,255,255,0) 100%);
            box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.05);
            border-radius: 14px;
            padding-bottom: 28px;
            text-align: center;
            .head_img{
                margin: 20px 50px;
                border: 6px solid #FFFFFF;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            h5{
                font-size: 18px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 25px;
                text-align: center;
                position: relative;
                &:after{
                    display: inline-block;
                    content: '';
                    height: 1px;
                    width: 30px;
                    background: #eeeeee;
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    margin-left: -15px;
                }
            }
            .category{
                display: inline-block;
                padding: 2px 10px;
                background: rgba(0,217,173,0.1);
                border-radius: 12px;
                border: 1px solid rgba(0,217,173,0.4);
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #00D9AD;
                line-height: 20px;
                text-align: center;
                margin-top: 23px;
            }
            .title{
                margin: 20px 74px 0 74px;
                span{
                    padding: 0px 5px;
                    margin: 2px;
                    line-height: 25px;
                    border-radius: 2px;
                    display: inline-block;
                }
            }
        }
        .box_card{
            background: #FFFFFF linear-gradient(199deg, rgba(214,216,255,0.36) 0%, #FFFFFF 100%);
            box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.05);
            border-radius: 20px;
            padding: 0 10px;

        }
        .basic_information_card{
            h4{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 14px;
                position: relative;
                margin-bottom: 19px;
                &:after{
                    content: '';
                    position: absolute;
                    width: 56px;
                    height: 2px;
                    background: #333333 linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                    bottom: -1px;
                    left: 0;
                }
            }
            div{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
                padding-bottom: 14px;
                p{
                    font-size: 14px;
                    color: #333333;
                    padding-top: 8px;
                }
                span{
                    font-size: 14px;
                    color: #333333;
                }
                i{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #EEEEEE;
                    border-radius: 50%;
                    margin: 0 5px;
                }
                b{
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
        .title-card{
            background: #FFFFFF;
            border-radius: 10px;
            margin-top: 30px !important;
            margin-bottom: 7px !important;
            h4{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                position: relative;
                margin-left: 10px;
                &:after{
                    content: '';
                    position: absolute;
                    width: 28px;
                    height: 2px;
                    background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                    left: 0;
                    bottom: -20px;
                }
            }
        }
        .product_box{
            overflow: hidden;
            padding-bottom: 43px;
            .product_item{
                width: 224px;
                background: #FFFFFF;
                border-radius: 10px;
                border: 1px solid #EEEEEE;
                float: left;
                margin: 7px 7px;
                img{
                    width: 100%;
                }
                p{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 19px;
                    padding: 14px 12px;
                }
            }
        }

    }

}
</style>
