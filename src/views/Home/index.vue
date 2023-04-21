<template>
    <div class="home">
        <div class="banner">
            <el-carousel height="340px" :interval="3000" autoplay indicator-position="none" arrow="always">
                <el-carousel-item v-for="(item,index) in 2" :key="item">
                    <a :href="index == 0 ? '/videohome' : index == 1 ? 'https://seller.vipona.com/account/login':''" target="_blank" style="width: 100%;height: 100%">
                        <div class="carousel_item" :class="'carousel-item' + index">
                            <div class="item_box">
                                <h5 :style="index == 0? 'color:#ffffff' : 'color:#333333'">{{index == 0 ? '微胖联盟 Amazon Influencer 视频服务第一站':'微胖联盟 海外Deal站'}}</h5>
                                <div class="description">{{index == 0 ? '':'官方Deal联盟 一手推广资源'}}</div>
                                <div v-if="index == 0" style="text-align: center"><el-button class="banner_btn" @click.stop="handleConsult" round>立即咨询</el-button></div>
                                <div v-else style="text-align: center"><el-button class="banner_btn" round>立即咨询</el-button></div>
                            </div>
                        </div>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--拍买家秀-->
        <div class="buyshow">
            <div class="description_item">
                <div class="item"><i class="iconfont icon-gf"></i>官方渠道</div>
                <div class="item"><i class="iconfont icon-zy"></i>正规资源</div>
                <div class="item"><i class="iconfont icon-jg"></i>一手价格</div>
                <div class="item"><i class="iconfont icon-ys1"></i>严审交付</div>
                <div class="item"><i class="iconfont icon-fw1"></i>服务保障</div>
            </div>
            <div class="auto1200 pt60">
                <div class="flex_between">
                    <div class="flex_style header_style"><h5>拍买家秀 <i class="iconfont icon-line"></i></h5><span>500+本土达人 签约合作</span></div>
                    <div>
                        <ul class="flex_style buyshow_type">
                            <li v-for="(item,index) in influenceList" :key="index" @click="activeIndex = index" :class="activeIndex == index ? 'activeStyle' : ''">{{ item.category_name }}</li>
                            <a :href="token? '/buyershow':'/login'"><li style="color: #999999;display: flex;align-items: center">更多 <i class="iconfont icon-more" style="font-size: 12px"></i></li></a>
                        </ul>
                    </div>
                </div>
                <div class="flex_style" v-for="(i,index) in influenceList" v-show="activeIndex == index" :key="index" style="flex-flow: row wrap;align-content: flex-start;justify-content: flex-start;">
                    <a target="_blank" :href="token? '/homepage:'+item.id:'/login'" v-for="(item,ind) in i.influencerList" class="buyshowItem">
                        <div class="item_img"><img :src="item.image" alt=""></div>
                        <div class="flex_between item_pic">
                            <h5>NO.{{item.id}}</h5>
                            <div><b v-if="item.price != '视产品而定'" style="font-weight: normal">￥</b><span>{{ item.price }}</span></div>
                        </div>
                        <div class="flex_between item_title">
                            <div class="title_style">{{item.type}}</div>
                            <span>交付{{item.order_count}}笔</span>
                        </div>
                    </a>
                </div>
                <div class="flex_between button_box"><a :href="token? '/buyershow':'/login'"><el-button round>挑选达人拍摄</el-button></a></div>
            </div>
        </div>


        <!--vipon自主发帖-->
        <div class="vipon_box">
            <div class="auto1200 pt60 pb100">
                <div class="flex_style header_style"><h5>Vipon自助发帖 <i class="iconfont icon-line"></i></h5><span>亚马逊站外Deal网站</span><i class="iconfont icon-top" style="font-size:20px;line-height: 57px;margin-left: 3px;color: #FF9C17"></i></div>
                <div class="vipon_content flex_style">
                    <div class="vipon_img">
                        <img src="../../assets/images/home/vipon.png" alt="">
                    </div>
                    <div class="vipon_text">
                        <h5>清库存，推新品，就用VIPON</h5>
                        <div class="subtitle">已累计帮助52万+亚马逊卖家，清理3568万+件库存</div>
                        <ul class="vipon_list flex_between">
                            <li>
                                <h4>55<span>%</span></h4>
                                <div>销量最高提升</div>
                            </li>
                            <li>
                                <h4>78<span>%</span></h4>
                                <div>库存周期最高缩短</div>
                            </li>
                            <li>
                                <h4>62<span>%</span></h4>
                                <div>新品排名最高提升</div>
                            </li>
                            <li>
                                <h4>31<span>%</span></h4>
                                <div>营销成本最高减少</div>
                            </li>
                        </ul>
                        <div class="button_box">
                            <a target="_blank" href="https://seller.vipona.com/account/login" style="color: #FFFFFF"><el-button class="btn_type">发布促销</el-button></a>
                            <a target="_blank" href="https://www.myvipon.cn/" style="color: #333333"><el-button class="btn_plain">了解Vipon</el-button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--FB推广-->
        <div class="buyshow">
            <div class="auto1200 pt60">
                <div class="flex_between">
                    <div class="flex_style header_style"><h5>FB推广 <i class="iconfont icon-line"></i></h5><span>精选群组  效果保障</span></div>
                    <div>
                        <ul class="flex_style buyshow_type">
                            <li v-for="(item,index) in fbList" @click="fbActiveIndex = index" :class="fbActiveIndex == index ? 'activeStyle' : ''">
                                {{ item.type }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex_style" v-for="(i,index) in fbList" :key="index" v-show="fbActiveIndex == index" style="flex-flow: row wrap;align-content: flex-start;justify-content: flex-start;">
                    <a target="_blank" href="https://seller.vipona.com/account/login" v-for="(item,ind) in i.productList" class="fbItem" >
                        <div class="user_info flex_style">
                            <div class="header_img"><img :src="item.logo" alt=""></div>
                            <div class="info_des">
                                <h5 class="name">{{ item.name }}</h5>
                                <div class="fan_style"><i class="iconfont icon-fs" style="font-size: 16px;color: #999999;margin-right: 4px"></i>{{ item.fans }}</div>
                            </div>
                        </div>
                        <ul class="flex_style">
                            <li v-for="(i,index) in item.label" :key="index">{{ i }}#</li>
                        </ul>
                        <div class="fb_price">
                            <span style="color: #FF2C4C;padding-right: 6px;font-size: 12px">￥<span style="font-size: 20px">{{ item.discount_price }}</span></span><span style="color: #999999;font-size: 12px;text-decoration: line-through">¥{{ item.price }}</span>
                        </div>
                    </a>
                </div>
                <div class="flex_between button_box"><a href="https://seller.vipona.com/account/login" target="_blank" style="color: #FFFFFF"><el-button round>查看全部</el-button></a></div>

            </div>
        </div>

        <!--Deal推广-->
        <div class="buyshow" style="background: #FFFFFF">
            <div class="auto1200 pt60">
                <div class="flex_style header_style"><h5>Deal推广 <i class="iconfont icon-line"></i></h5><span>官方渠道 一手资源</span></div>
                <div class="flex_style" style="flex-flow: row wrap;align-content: flex-start;justify-content: flex-start;">
                    <a href="https://seller.vipona.com/account/login" target="_blank" v-for="(item,index) in dealList" :key="index" class="dealItem">
                        <div>
                            <div class="deal_head">
                                <img :src="item.logo" alt="">
                            </div>
                            <h5 class="deal_name">
                                {{item.name}}
                            </h5>
                            <ul class="flex_style deal_list">
                                <li v-for="(j,index) in item.label" :key="index">
                                    {{j}}
                                </li>
                            </ul>
                            <div class="fb_price">
                                <span style="color: #FF2C4C;padding-right: 6px;font-size: 12px">￥<span style="font-size: 20px">{{ item.discount_price }}</span></span><span style="color: #999999;font-size: 12px">¥{{ item.price }}</span>
                            </div>
                        </div>

                    </a>
                </div>
                <div class="flex_between button_box"><a target="_blank" href="https://seller.vipona.com/account/login" style="color: #FFFFFF"><el-button round>查看全部</el-button></a></div>
            </div>
        </div>

        <div class="tag_style" v-show="isShowTag">
            <div class="auto1200 flex_between">
                <h5>
                    怎么推广，效果最好？
                    <span style="margin-left: 30px">免费领取：价值99元<span style="color: #FF9C17">《产品推广诊断建议》</span>+买家秀首单<span style="color: #FF9C17">50元优惠</span></span>
                </h5>
                <el-button round @click="isShowDialog = true">立即获取</el-button>
            </div>
            <i class="el-icon-close close_btn" @click="isShowTag = false"></i>
        </div>
        <!--footer-->
        <Footer></Footer>
        <ConsultDialog :visible.sync="isShowDialog"></ConsultDialog>
    </div>
</template>

<script>
import {influenceData, fbData, dealData, getConfig} from "@/api";
import Footer from "@/components/Footer";
import ConsultDialog from "@/components/ConsultDialog";
export default {
    name: "index",
    components:{
        Footer,
        ConsultDialog
    },
    data(){
        return{
            activeIndex:0,
            fbActiveIndex:0,
            dealList:[],
            fbList:[],
            isShowTag:true,
            token:'',
            ids:196,
            influenceList:{},
            formData:{},
            isShowDialog: false,
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.isShowTag = this.token ? false : true;
        this.handleTakePlanList();
        this.getFBData();
        this.getDealData();
        if(localStorage.getItem('configObj')){
            this.formData = JSON.parse(localStorage.getItem('configObj'));
        }else {
            this.getContent()
        }
    },
    methods:{
        handleConsult(event){
            event.preventDefault();
            this.isShowDialog = true;
        },
        //获取公共配置信息
        getContent(){
            getConfig()
                .then((res)=>{
                    if(res.code === 1){
                        this.formData = res.data;
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        //获取拍买家秀
        handleTakePlanList(){
            influenceData()
                .then((res)=>{
                    this.influenceList = res.data;
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        //获取FB推广
        getFBData(){
            fbData().then((res)=>{
                if(res.code == 1){
                    this.fbList = res.data;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //获取DEAL推广
        getDealData(){
            dealData().then((res)=>{
                if(res.code == 1){
                    if(res.data.length>0){
                        this.dealList = res.data[0].productList;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.pb100{
    padding-bottom: 100px;
}
.pt60{
    padding-top: 60px;
}
.auto1200{
    max-width: 1200px !important;
    margin: auto;
}
.flex_between{
    display: flex;
    justify-content: space-between;
}
.flex_style{
    display: flex;
}
.home{
    a{
        text-decoration: none !important;
    }
    .header_style{
        padding-bottom: 30px;
        h5{
            font-size: 32px;
            font-weight: 600;
            color: #333333;
            line-height: 45px;
            position: relative;
            i{
                position: absolute;
                right:0;
                bottom: -14px;
                color: #999999;
                font-size: 12px;
                font-weight: normal;
            }
        }
        span{
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 57px;
            margin-left: 16px;
        }
    }
    .banner{
        .carousel_item{
            height: 100%;
            width: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            .item_box{
                padding-bottom: 26px;
                h5{
                    font-size: 36px;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 50px;
                    text-align: center;
                }
                .description{
                    text-align: center;
                    padding-top: 4px;
                    font-size: 14px;
                    color: #666666;
                    line-height: 20px;
                }
                .banner_btn{
                    margin-top: 30px;
                    color: #FFFFFF;
                    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                    padding: 15px 69px;
                    border: none;
                    border-radius: 22px;
                }
            }

        }
        .carousel-item0{
            background-image: url("../../assets/images/home/banner1.png");
        }
        .carousel-item1{
            background-image: url("../../assets/images/home/banner2.png");
        }

    }
    .buyshow{
        background: linear-gradient(225deg, #ECEEFA 0%, #F7F8FA 20%, #F7F8FA 61%, #F2EDFA 100%);
        .description_item{
            position: relative;
            top: -40px;
            z-index: 99;
            max-width: 1200px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item{
                width: 216px;
                height: 80px;
                background: linear-gradient(180deg, #F2F0FE 0%, #FFFFFF 43%, #FFFFFF 100%);
                box-shadow: 0px 11px 11px 0px rgba(233,229,254,0.6);
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 600;
                i{
                    width:40px;
                    height: 40px;
                    border-radius: 50%;
                    background: pink;
                    font-size: 20px;
                    color: #FFFFFF;
                    font-weight: normal;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 16px;
                }
                &:nth-child(1){
                    i{
                        background: #FF9C17;
                    }
                }
                &:nth-child(2){
                    i{
                        background: #24DEB8;
                    }
                }
                &:nth-child(3){
                    i{
                        background: #00B2FF;
                    }
                }
                &:nth-child(4){
                    i{
                        background: #8360FF;
                    }
                }
                &:nth-child(5){
                    i{
                        background: #E6401F;
                    }
                }
            }
        }
        .buyshow_type{
            li{
                padding: 24px 20px 4px 20px;
                cursor: pointer;
                font-size: 14px;
                color: #666666;
            }
        }
        .activeStyle{
            font-size: 14px;
            font-weight: 600;
            color: #333333 !important;
            position: relative;
            &:before{
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translate(-50%,0);
                content: '';
                width: 18px;
                height: 3px;
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 2px;
            }
        }
        .buyshowItem{
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 4px 8px 0px #F1F4F7;
            border-radius: 10px;
            padding: 8px;
            width: 216px;
            margin: 0 12px 30px 12px;
            position: relative;
            cursor: pointer;
            .item_img{
                height: 154px;
                border-radius: 10px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 154px;
                    object-fit: cover;
                }
            }
            .item_pic{
                padding: 16px 8px 9px 8px;
                align-items: center;
                h5{
                    font-size: 16px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 22px;
                }
                >div{
                    font-size: 15px;
                    color: #FF2C4C;
                    span{
                        font-size: 20px;
                    }
                }
            }
            .item_title{
                padding: 0 8px 8px 8px;
                line-height: 17px;
                .title_style{
                    background: rgba(0,217,173,0.1);
                    border-radius: 9px;
                    font-size: 12px;
                    color: #00D9AD;
                    padding: 1px 6px;
                    text-align: center;
                }
                >span{
                    font-size: 12px;
                    color: #999999;

                }
            }
            //&:after{
            //    content: '';
            //    width: 29px;
            //    height: 3px;
            //    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            //    border-radius: 2px;
            //    position: absolute;
            //    top: -3px;
            //    left: 24px;
            //}
        }
        .buyshowItem:hover{
            border-bottom: 3px solid #796CF3;
            position: relative;
            top: -7px;
            .item_title{
                padding-bottom: 5px !important;
            }
        }
        .button_box{
            justify-content: center;
            padding-bottom: 100px;
            .el-button{
                background: #3442FF linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 20px;
                font-size: 14px;
                color: #FFFFFF;
                width: 300px;
                height: 40px;
                border: none;
            }
        }
        /*FB推广*/
        .fbItem{
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 4px 8px 0px #F1F4F7;
            border-radius: 10px;
            padding: 20px 20px 54px 20px;
            width: 216px;
            margin: 0 12px 30px 12px;
            position: relative;
            cursor: pointer;
            .user_info{
                .header_img{
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    border: 1px solid #FFFFFF;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .info_des{
                margin-left: 14px;
                flex: 1;
                .name{
                    font-size: 16px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 22px;
                    margin-bottom: 8px;
                }
                .fan_style{
                    font-size: 14px;
                    color: #999999;
                    line-height: 20px;
                }
            }
            >ul{
                flex-flow: row wrap;
                justify-content: center;
                padding: 17px 0 30px 0;
                li{
                    box-sizing: border-box;
                    border-radius: 16px;
                    border: 1px solid #EEEEEE;
                    padding: 4px 10px;
                    margin: 3px;
                    font-size: 12px;
                    color: #999999;
                    &:hover{
                        border: 1px solid #796CF3;
                        color: #796CF3;
                    }
                }
            }
            .fb_price{
                padding-top: 14px;
                text-align: center;
                position: absolute;
                bottom: 14px;
                left: 20px;
                right: 20px;
                border-top: 1px solid #eeeeee;
            }
            &:after{
                content: '';
                width: 29px;
                height: 3px;
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 2px;
                position: absolute;
                top: -3px;
                left: 24px;
            }
        }
        .fbItem:hover{
            border-bottom: 3px solid #796CF3;
            position: relative;
            top: -7px;
            > ul{
                padding-bottom: 20px !important;
            }
        }
        //Deal推广
        .dealItem{
            //box-sizing: border-box;
            padding: 14px;
            //padding-bottom: 55px;
            margin: 0 15px 40px 15px;
            width: 210px;
            display: inline-flex;
            justify-content: center;
            box-sizing: border-box;
            //border-bottom: 3px solid #796CF3;
            //box-shadow: 0px 4px 8px 0px #F1F4F7;
            //border-radius: 10px;
            //border: 1px solid #EEEEEE;
            //transform: perspective(800px) rotateX(30deg);
            //padding-bottom: 40px;
            position: relative;
            >div{
                width: 182px;
                //position: absolute;
                //border: 1px solid #999;
                //transform: perspective(800px) rotateX(332deg);
                position: relative;
                top: 17px;
                padding-bottom: 40px;
                .deal_head{
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    background: #ffffff;
                    box-shadow: 0px 4px 8px 0px #F1F4F7;
                    border-radius: 50%;
                    transform: translate(-50%,-50%);
                    left: 50%;
                    top: -1px;
                    overflow: hidden;
                    padding: 16px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: auto;
                        height: auto;
                        max-width: 38px;
                        max-height: 38px;
                    }
                }
                .deal_name{
                    padding-top: 45px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 22px;
                    text-align: center;
                }
                .deal_list{
                    flex-flow: row wrap;
                    justify-content: center;
                    padding: 17px 0;
                    margin-bottom: 2px;
                    li{
                        box-sizing: border-box;
                        border-radius: 16px;
                        border: 1px solid #EEEEEE;
                        padding: 5px 10px;
                        margin: 3px;
                        font-size: 12px;
                        cursor: pointer;
                        font-weight: 200;
                        cursor: pointer;
                        color: #999999;
                        &:hover{
                            border: 1px solid #796CF3;
                            color: #796CF3;
                        }
                    }
                }
                .fb_price{
                    text-align: center;
                    position: absolute;
                    bottom: 14px;
                    left: 20px;
                    right: 20px;
                    //border-top: 1px solid #eeeeee;
                    padding-top: 14px;
                }
            }
        }
        .dealItem:before{
            position: absolute;
            left: 8px;
            top: 0;
            right: 8px;
            bottom: -11px;
            display: block;
            content: '';
            //box-sizing: border-box;
            padding: 14px;
            //margin: 0 20px 20px 20px;
            //width: 197px;
            box-shadow: 0px 4px 8px 0px #F1F4F7;
            border-radius: 10px;
            border: 1px solid #EEEEEE;
            transform: perspective(800px) rotateX(30deg);
            //padding-bottom: 40px;
        }
        .dealItem:hover{
            border-bottom: 3px solid #796CF3;
            position: relative;
            border-radius: 10px;
            top: -7px;
            .deal_list{
                padding-bottom: 15px !important;
            }
        }
    }
    .vipon_box{
        .vipon_img{
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .vipon_text{
            margin-left: 68px;
            width: 544px;
            h5{
                font-size: 28px;
                font-weight: 600;
                color: #333333;
                line-height: 40px;
                padding: 66px 0 15px 0;
            }
            .subtitle{
                font-size: 14px;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
                padding-bottom: 40px;
            }
            .vipon_list{
                margin-right: 15px;
                li{
                    padding: 0 20px;
                    position: relative;
                    h4{
                        font-size: 42px;
                        color: #333333;
                        font-family: FetteMittelschrift-Regular, FetteMittelschrift;
                        span{
                            font-size: 24px;
                            position: relative;
                            &:before{
                                position: absolute;
                                right: -11px;
                                top: -16px;
                                content: url("../../assets/images/home/down.png");
                            }
                        }
                    }
                    >div{
                        font-size: 14px;
                        font-weight: 400;
                        color: #666666;
                        line-height: 20px;
                        padding-top: 4px;
                    }
                    &:first-child{
                        padding-left: 0;
                    }
                    &:last-child{
                        padding-right: 0;
                    }
                    &:after{
                        content: '';
                        position: absolute;
                        width: 1px;
                        height: 60px;
                        background: #EEEEEE;
                        top: 7px;
                        right: 0;
                    }

                    &:nth-child(1){
                        h4 span{
                            &:before{
                                content: url("../../assets/images/home/up.png");
                            }
                        }

                    }
                    &:nth-child(3){
                        h4 span{
                            &:before{
                                content: url("../../assets/images/home/up.png");
                            }
                        }

                    }
                    &:last-child{
                        &:after{
                            content: none;
                        }
                    }
                }

            }
            .button_box{
                padding-top: 60px;
                .el-button{
                    width: 180px;
                    height: 40px;
                    font-size: 14px;
                    border-radius: 20px;
                }
                .btn_type{
                    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                    color: #FFFFFF;
                    border: none;
                }
                .btn_plain{
                    border: 1px solid #796CF3;
                    color: #333333;
                    margin-left: 20px;
                }
            }
        }
    }
    .tag_style{
        background: #796CF3;
        height: 70px;
        position: relative;
        >div{
            height: 100%;
            align-items: center;
            position: relative;
            box-sizing: border-box;
            padding-left: 168px;
            &:after{
                content: url("../../assets/images/home/gift.png");
                position: absolute;
                left: 0;
                top: -22px;
            }
            h5{
                font-size: 22px;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 30px;
                span{
                    font-size: 16px;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 22px;
                }
            }
            .el-button{
                background: #FF9C17;
                padding: 11px 72px;
                border: none;
                font-size: 18px;
                font-weight: 600;
                color: #FFFFFF;
                position: relative;
                &::after{
                    content: url("../../assets/images/home/cursor.png");
                    width: 26px;
                    height: 29px;
                    position: absolute;
                    right: 16px;
                    bottom: -11px;
                }
            }

        }
        .close_btn{
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
        }
    }
}
</style>
<style>

.el-carousel__arrow{
    background-color:#f0f0f0 !important;
    color: #333333 !important;
    font-size: 14px;
}
</style>
