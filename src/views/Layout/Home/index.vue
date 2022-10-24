<template>
    <div id="home">
        <div class="banner">
            <h1>Amazon Influencer <span>买家秀视频服务平台</span> <br> Best Seller <span>第一站</span></h1>
            <div class="banner_img">
                <el-row>
                    <img src="../../../assets/images/home_banner.png" alt="">
                </el-row>
            </div>
        </div>
        <div class="content">
            <h2 class="content_title">别让竞争对手，抢走关联流量</h2>
            <el-row style="max-width: 1200px;margin: auto;display: flex;align-items: center;" :gutter="50">
                <el-col :span="15">
                    <div class="tabs_content">
                        <div :class="{tab_pane1:currentIndex == 0,tab_pane2:currentIndex == 1,tab_pane3:currentIndex == 2,tab_pane4:currentIndex == 3}"><img src="../../../assets/images/tab-pane4.png" alt=""></div>
                        <div :class="{tab_pane2:currentIndex == 0,tab_pane3:currentIndex == 1,tab_pane4:currentIndex == 2,tab_pane1:currentIndex == 3}"><img src="../../../assets/images/tab-pane3.png" alt=""></div>
                        <div :class="{tab_pane3:currentIndex == 0,tab_pane4:currentIndex == 1,tab_pane1:currentIndex == 2,tab_pane2:currentIndex == 3}"><img src="../../../assets/images/tab-pane2.png" alt=""></div>
                        <div :class="{tab_pane4:currentIndex == 0,tab_pane1:currentIndex == 1,tab_pane2:currentIndex == 2,tab_pane3:currentIndex == 3}"><img src="../../../assets/images/tab-pane1.png" alt=""></div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <ul class="tabs_header">
                        <li v-for="(item,index) in tabList" :key="index" @click="clickTab(index)" :class="{active:currentIndex == index}">
                            <p class="tabs_title"><span>{{item.no}}</span> {{item.label}}</p>
                            <p class="tabs_description">{{item.description}}</p>
                        </li>
                    </ul>
                </el-col>
            </el-row>


            <h2 class="content_title pt160">不止是买家秀，更是红人背书和引流</h2>
            <el-row style="max-width: 1200px;margin: auto;display: flex;align-items: center;" :gutter="40">
                <el-col :span="9" style="max-width: 428px;">
                    <ul class="tabs_header1">
                        <li v-for="(item,index) in buyerShowTabList" :key="index" @click="currentIndex1 = index" :class="{active1:currentIndex1 == index}">
                            <div><i class="iconfont" :class="item.icon" :style="{color: item.color}"></i></div>
                            <div style="margin-top: 8px">
                                <p class="tabs_title">{{item.label}}</p>
                                <p class="tabs_description">{{item.description}}</p>
                            </div>

                        </li>
                    </ul>
                </el-col>
                <el-col :span="15">
                    <div class="tabs_content1">
                        <div v-show="currentIndex1 == 0"><img src="../../../assets/images/buyer_show_tab1.png" alt=""></div>
                        <div v-show="currentIndex1 == 1"><img src="../../../assets/images/buyer_show_tab2.png" alt=""></div>
                        <div v-show="currentIndex1 == 2"><img src="../../../assets/images/buyer_show_tab3.png" alt=""></div>
                        <div v-show="currentIndex1 == 3"><img src="../../../assets/images/buyer_show_tab4.png" alt=""></div>
                    </div>
                </el-col>
            </el-row>


            <h2 class="content_title pt160 pb40">拍摄方案</h2>
            <el-row class="shooting_plan" style="max-width: 1200px;margin: auto;" :gutter="40">
                <ul class="tabs_header2 pb46">
                    <li v-for="(item,index) in shootingPlanTabList" :key="index" @click="currentIndex2 = index" :class="{active2:currentIndex2 == index}">
                        {{item.title}}
                    </li>
                </ul>
                <div class="tabs_content1">
                    <div v-show="currentIndex2 == 0"><img src="../../../assets/images/buyer_show_tab1.png" alt=""></div>
                    <div v-show="currentIndex2 == 1"><img src="../../../assets/images/buyer_show_tab2.png" alt=""></div>
                    <div v-show="currentIndex2 == 2"><img src="../../../assets/images/buyer_show_tab3.png" alt=""></div>
                    <div v-show="currentIndex2 == 3"><img src="../../../assets/images/buyer_show_tab4.png" alt=""></div>
                </div>
            </el-row>
        </div>
    </div>

</template>

<script>

import {getQrcode} from "@/api";
import {mapMutations} from "vuex";

export default {
    name: "home",
    data() {
        return {
            currentIndex:0,
            currentIndex1:0,
            currentIndex2:0,
            activeName:'clothing',
            tabList:[
                {
                    no:'01.',
                    label:'关联视频',
                    description:'阻止竞品关联！促进listing转化！提升产品权重！阻止竞品关联！阻止竞品关联！',

                },
                {
                    no:'02.',
                    label:'主图视频',
                    description: '阻止竞品关联！促进listing转化！提升产品权重！阻止竞品关联！阻止竞品关联！',
                },
                {
                    no:'03.',
                    label:'A++视频',
                    description: '阻止竞品关联！促进listing转化！提升产品权重！阻止竞品关联！阻止竞品关联！',
                },
                {
                    no:'04.',
                    label:'QA视频',
                    description: '阻止竞品关联！促进listing转化！提升产品权重！阻止竞品关联！阻止竞品关联！'
                },
            ],
            buyerShowTabList:[
                {
                    label:'拥有官方认证标识',
                    description:'Influencer帮拍开箱视频，通过其账号上传，带有Earns Commissions官认方证标志',
                    icon:'icon-renzheng',
                    color:'#F44EFF',

                },
                {
                    label:'抢夺竞品关联流量',
                    description: '视频会一有定概率被亚马算逊法关联到竞品页上面去，从而给产品引来更多的流量',
                    icon: '',
                    color:'#2D6CEF',
                },
                {
                    label:'成为Influencer长期推荐产品',
                    description: '视频不仅展示在产品页面videos位置，也会展示在Influencer个人主页，作为长期推荐买购的产品',
                    icon: 'icon-tuijian',
                    color:'#00B2FF',
                },
                {
                    label:'附带社媒免费传播',
                    description: 'Influencer通常会有自己的Youtube/Tiktok/Ins等社媒账号，拍完视频后会同步到社媒平台展现',
                    icon: 'icon-chuanbo',
                    color:'#00D9AD',
                },
            ],
            shootingPlanTabList:[
                {title: '服装'},
                {title: '数码'},
                {title: '家居'},
                {title: '儿童'},
                {title: '宠物'},
                {title: '更多+'},

            ]
        }
    },
    created(){

    },
    mounted() {
        this.autoPlay();
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        clickTab(index){
            this.currentIndex = index;
        },
        //自动轮播
        autoPlay(){
            let _this = this;
            let autoPlayInter = setInterval(function (){
                if(_this.currentIndex == _this.tabList.length-1){
                    _this.currentIndex=0;
                }else {
                    _this.currentIndex+=1;
                }
            },3000)
        }
    },
}
</script>

<style lang="less" scoped>
.pb40{
    padding-bottom: 40px !important;
}
.pb46{
    padding-bottom: 46px;
}
.pt160{
    padding-top: 160px !important;
}
@keyframes anim {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}

.active{
    animation: anim 1s;
    .tabs_title{
        margin-bottom: 20px;
        position: relative;
        color: #ffffff;
        &::before{
            position: absolute;
            bottom: -10px;
            left: 0;
            content: '';
            display: block;
            width: 72px;
            height: 1px;
            background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
        }
    }
    &::before {
        background-image: linear-gradient(270deg, rgba(251, 150, 139, 0), rgba(223, 96, 247, 1), rgba(121, 108, 243, 1)) !important;
        animation: rotate 4s linear infinite;
    }
    &::after {
        width: calc(100% - 0px) !important;
        height: calc(100% - 4px) !important;
    }
    .tabs_description{
        display: block !important;
    }
}
.active1{
    padding: 26px 30px;
    border-radius: 10px;
    margin: 20px 0;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(270deg, #000827 0%, #361140 100%);
    border-image: linear-gradient(180deg, rgba(121, 108, 243, 0.35), rgba(223, 96, 247,  0.35), rgba(251, 150, 139, 0.35));
    display: flex;
    &::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -114px;
        top: -120%;
        width: 150%;
        height: 370%;
        background-image: linear-gradient(270deg, rgba(251, 150, 139, 0), rgba(223, 96, 247, 1), rgba(121, 108, 243, 1));
    }
    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 2px;
        top: 2px;
        width: calc(100% - 2px);
        height: calc(100% - 4px);
        background: linear-gradient(270deg, #000827 0%, #361140 100%);
        border-radius: 5px;
    }
}
.active2{
    border-radius: 38px;
    font-weight: bold !important;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1)) 1 1;
}
.tab_pane1{
    left: 0;
    top: 72px;
    bottom: 72px;
    z-index: 9;
}
.tab_pane2{
    left: 30px;
    top: 48px;
    bottom: 48px;
    z-index: 99;
    transition: all 0.5s;
}
.tab_pane3{
    left: 70px;
    top: 25px;
    bottom: 25px;
    z-index: 999;
    transition: all 0.5s;
}
.tab_pane4{
    left: 128px;
    top: 0;
    bottom: 0;
    z-index: 9999;
    transition: all 0.5s;
}
.el-tabs__nav{
    width: 100%;
    text-align: center;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}


#home{
    .banner{
        height: 591px;
        background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
        padding-top: 66px;
        position: relative;
        h1{
            font-size: 50px;
            font-family: Montreal-Bold, Montreal;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 80px;
            text-align: center;
            padding-top: 50px;
            span{
                font-family: GothamHTF;
            }
        }
        .banner_img{
            display: flex;
            justify-content: center;
            margin-top: 48px;
            img{
                width: 100%;
            }
        }
    }
    .content{
        background: #000827;
        .content_title{
            font-size: 40px;
            font-family: GothamHTF;
            font-weight: 900;
            color: #FFFFFF;
            line-height: 42px;
            padding-top: 317px;
            text-align: center;
            padding-bottom: 66px;
        }
        .tabs_img{
            img{
                width: 100%;
            }
        }
        .tabs_header{
            li{
                cursor: pointer;
                padding: 26px 30px;
                border-radius: 10px;
                margin: 20px 0;
                position: relative;
                z-index: 0;
                border-radius: 10px;
                overflow: hidden;
                border-image: linear-gradient(180deg, rgba(121, 108, 243, 0.35), rgba(223, 96, 247,  0.35), rgba(251, 150, 139, 0.35));
                &::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -114px;
                    top: -120%;
                    width: 150%;
                    height: 370%;
                    background-image:linear-gradient(180deg, rgba(121, 108, 243,  0.35), rgba(223, 96, 247,  0.35), rgba(251, 150, 139,  0.35));
                }
                &::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 2px;
                    top: 2px;
                    width: calc(100% - 4px);
                    height: calc(100% - 2px);
                    background: #000827;
                    border-radius: 5px;
                }
                .tabs_title{
                    font-size: 18px;
                    font-weight: bold;
                    color: #FFFFFF;
                    >span{
                        color: #FF9C17;
                        font-weight: normal;
                    }
                }
                .tabs_description{
                    display: none;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #CED2DA;
                    line-height: 24px;
                }
            }
        }
        .tabs_content{
            height: 464px;
            position: relative;
            >div{
                position: absolute;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .tabs_header1{
            li{
                cursor: pointer;
                padding: 20px;
                margin: 10px;
                display: flex;
                justify-content: center;
                .tabs_title{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 24px;
                    &::after {
                        display: none;
                    }
                }
                .tabs_description{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #CED2DA;
                    line-height: 20px;
                }
                >div{
                    margin-right: 18px;
                    i{
                        display: flex;
                        width: 40px;
                        height: 40px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                    }
                }

            }
            li:first-child{
                >div:first-child{
                    i{
                        background: rgba(244, 78, 255, 0.18);
                    }
                }
            }
            li:nth-child(2){
                >div:first-child{
                    i{
                        background: rgba(45, 108, 239, 0.18);
                    }
                }
            }
            li:nth-child(3){
                >div:first-child{
                    i{
                        background: rgba(0, 178, 255, 0.18);
                    }
                }
            }
            li:nth-child(4){
                >div:first-child{
                    i{
                        background: rgba(0, 217, 173, 0.18);
                    }
                }
            }
        }
        .tabs_content1{
            img{
                width: 100%;
            }
        }
        .tabs_header2{
            display: flex;
            justify-content: center;
            li{
                padding: 8px 40px;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 22px;
                cursor: pointer;
            }
        }
    }
}


</style>