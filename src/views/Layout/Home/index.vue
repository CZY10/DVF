<template>
    <div id="home">
        <div class="banner">
            <h1>Amazon Influencer 买家秀视频服务第一站</h1>
            <div class="banner_img">
                <el-row>
<!--                    <img src="../../../assets/images/home_banner.png" alt="">-->
                    <video width="100%" height="100%" autoplay muted loop>
                        <source src="../../../assets/images/video/home_banner.mp4" type="video/mp4">
                    </video>
                </el-row>
            </div>
        </div>
        <div class="content">
            <h2 class="content_title">别让竞争对手，抢走关联流量</h2>
            <el-row style="max-width: 1200px;margin: auto;display: flex;align-items: center;" :gutter="50">
                <el-col :span="15">
                    <div class="tabs_content" @mouseover="mouseover('tabPane1')" @mouseout="mouseout('tabPane1')">
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
                            <div><i class="iconfont" :class="item.icon" style="font-size: 18px" :style="{color: item.color}"></i></div>
                            <div style="margin-top: 8px">
                                <p class="tabs_title">{{item.label}}</p>
                                <p class="tabs_description">{{item.description}}</p>
                            </div>

                        </li>
                    </ul>
                </el-col>
                <el-col :span="15">
                    <div class="tabs_content1" @mouseover="mouseover('tabPane2')" @mouseout="mouseout('tabPane2')">
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
                    <a class="see_more" href="">更多+</a>
                </ul>

                <div class="tabs_content1" @mouseover="mouseover('tabPane3')" @mouseout="mouseout('tabPane3')">
<!--                    <div v-for="(item,index) in videoList" :key="index" v-show="currentIndex2 == index">-->
<!--                        <el-row :gutter="30">-->
<!--                            <el-col :span="16">-->
<!--                                <div class="video_content">-->
<!--                                    <div style="display: flex;justify-content: center">-->
<!--                                        <video-->
<!--                                            :id="'my-player'+index"-->
<!--                                            ref="video"-->
<!--                                            poster="../../../assets/images/video/poster_video.png"-->
<!--                                            class="video-js vjs-default-skin vjs-big-play-centered"-->
<!--                                            controls>-->
<!--                                            <source :src="item.src" />-->
<!--                                        </video>-->
<!--                                    </div>-->
<!--                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥{{item.price}}</span>-->
<!--                                        交付周期：<span style="color: #fff">{{item.date}}</span>-->
<!--                                        <span style="font-size: 12px;float: right">{{item.description}}</span>-->
<!--                                    </div>-->
<!--                                    <el-row class="params2">-->
<!--                                        <el-col :span="12">-->
<!--                                            <p>卖点展示：<span>{{item.params.item1}}</span></p>-->
<!--                                            <p>视频时长：<span>{{item.params.item2}}</span></p>-->
<!--                                        </el-col>-->
<!--                                        <el-col :span="12">-->
<!--                                            <p>拍摄场景：<span>{{item.params.item3}}</span></p>-->
<!--                                            <p>视频上传：<span>{{item.params.item4}}</span></p>-->
<!--                                        </el-col>-->
<!--                                    </el-row>-->
<!--                                </div>-->
<!--                            </el-col>-->
<!--                            <el-col :span="8">-->
<!--                                <div class="video_text">-->
<!--                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>-->
<!--                                    <ul>-->
<!--                                        <li>创作者：<span>{{ item.talentInformation.name }}</span></li>-->
<!--                                        <li>达人类型：<span>{{ item.talentInformation.type }}</span></li>-->
<!--                                        <li>性别：<span>{{ item.talentInformation.gender }}</span></li>-->
<!--                                        <li>国家：<span>{{ item.talentInformation.country }}</span></li>-->
<!--                                        <li>兴趣品类：<span>{{ item.talentInformation.category }}</span></li>-->
<!--                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>-->
<!--                                    </ul>-->

<!--                                </div>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                    </div>-->
                    <div v-show="currentIndex2 == 0">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <div class="video_content">
                                    <div style="display: flex;justify-content: center">
                                        <video
                                            id="my-player1"
                                            ref="video"
                                            poster="../../../assets/images/video/poster_video.png"
                                            class="video-js vjs-default-skin vjs-big-play-centered"
                                            controls>
                                            <source src="https://vjs.zencdn.net/v/oceans.mp4" />
                                        </video>
                                    </div>
                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥580</span>
                                        交付周期：<span style="color: #fff">7-14天</span>
                                        <span style="font-size: 12px;float: right">家用投影仪开箱展示视频</span>
                                    </div>
                                    <el-row class="params2">
                                        <el-col :span="12">
                                            <p>卖点展示：<span>纯展示</span></p>
                                            <p>视频时长：<span>60-80s</span></p>
                                        </el-col>
                                        <el-col :span="12">
                                            <p>拍摄场景：<span>达人自行发挥</span></p>
                                            <p>视频上传：<span>达人账号上传并关联listing</span></p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="video_text">
                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>
                                    <ul>
                                        <li>创作者：<span>NO.123  </span></li>
                                        <li>达人类型：<span>Amazon Influencer</span></li>
                                        <li>性别：<span>男性</span></li>
                                        <li>国家：<span>美国</span></li>
                                        <li>兴趣品类：<span>服装、电子、家居</span></li>
                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>
                                    </ul>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="currentIndex2 == 1">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <div class="video_content">
                                    <div style="display: flex;justify-content: center">
                                        <video
                                            id="my-player2"
                                            ref="video"
                                            poster="../../../assets/images/video/poster_video.png"
                                            class="video-js vjs-default-skin vjs-big-play-centered"
                                            controls>
                                            <source src="../../../assets/images/video/video.mp4" />
                                        </video>
                                    </div>
                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥580</span>
                                        交付周期：<span style="color: #fff">7-14天</span>
                                        <span style="font-size: 12px;float: right">家用投影仪开箱展示视频</span>
                                    </div>
                                    <el-row class="params2">
                                        <el-col :span="12">
                                            <p>卖点展示：<span>纯展示</span></p>
                                            <p>视频时长：<span>60-80s</span></p>
                                        </el-col>
                                        <el-col :span="12">
                                            <p>拍摄场景：<span>达人自行发挥</span></p>
                                            <p>视频上传：<span>达人账号上传并关联listing</span></p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="video_text">
                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>
                                    <ul>
                                        <li>创作者：<span>NO.123  </span></li>
                                        <li>达人类型：<span>Amazon Influencer</span></li>
                                        <li>性别：<span>男性</span></li>
                                        <li>国家：<span>美国</span></li>
                                        <li>兴趣品类：<span>服装、电子、家居</span></li>
                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>
                                    </ul>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="currentIndex2 ==2">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <div class="video_content">
                                    <div style="display: flex;justify-content: center">
                                        <video
                                            id="my-player3"
                                            ref="video"
                                            poster="../../../assets/images/video/poster_video.png"
                                            class="video-js vjs-default-skin vjs-big-play-centered"
                                            controls>
                                            <source src="../../../assets/images/video/222.mp4" />
                                        </video>
                                    </div>
                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥580</span>
                                        交付周期：<span style="color: #fff">7-14天</span>
                                        <span style="font-size: 12px;float: right">家用投影仪开箱展示视频</span>
                                    </div>
                                    <el-row class="params2">
                                        <el-col :span="12">
                                            <p>卖点展示：<span>纯展示</span></p>
                                            <p>视频时长：<span>60-80s</span></p>
                                        </el-col>
                                        <el-col :span="12">
                                            <p>拍摄场景：<span>达人自行发挥</span></p>
                                            <p>视频上传：<span>达人账号上传并关联listing</span></p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="video_text">
                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>
                                    <ul>
                                        <li>创作者：<span>NO.123  </span></li>
                                        <li>达人类型：<span>Amazon Influencer</span></li>
                                        <li>性别：<span>男性</span></li>
                                        <li>国家：<span>美国</span></li>
                                        <li>兴趣品类：<span>服装、电子、家居</span></li>
                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>
                                    </ul>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="currentIndex2 == 3">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <div class="video_content">
                                    <div style="display: flex;justify-content: center">
                                        <video
                                            id="my-player4"
                                            ref="video"
                                            poster="../../../assets/images/video/poster_video.png"
                                            class="video-js vjs-default-skin vjs-big-play-centered"
                                            controls>
                                            <source src="https://vjs.zencdn.net/v/oceans.mp4" />
                                        </video>
                                    </div>
                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥580</span>
                                        交付周期：<span style="color: #fff">7-14天</span>
                                        <span style="font-size: 12px;float: right">家用投影仪开箱展示视频</span>
                                    </div>
                                    <el-row class="params2">
                                        <el-col :span="12">
                                            <p>卖点展示：<span>纯展示</span></p>
                                            <p>视频时长：<span>60-80s</span></p>
                                        </el-col>
                                        <el-col :span="12">
                                            <p>拍摄场景：<span>达人自行发挥</span></p>
                                            <p>视频上传：<span>达人账号上传并关联listing</span></p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="video_text">
                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>
                                    <ul>
                                        <li>创作者：<span>NO.123  </span></li>
                                        <li>达人类型：<span>Amazon Influencer</span></li>
                                        <li>性别：<span>男性</span></li>
                                        <li>国家：<span>美国</span></li>
                                        <li>兴趣品类：<span>服装、电子、家居</span></li>
                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>
                                    </ul>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="currentIndex2 == 4">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <div class="video_content">
                                    <div style="display: flex;justify-content: center">
                                        <video
                                            id="my-player5"
                                            ref="video"
                                            poster="../../../assets/images/video/poster_video.png"
                                            class="video-js vjs-default-skin vjs-big-play-centered"
                                            controls>
                                            <source src="https://vjs.zencdn.net/v/oceans.mp4" />
                                        </video>
                                    </div>
                                    <div class="params1">参考价：<span style="color: #FF2C4C;font-size: 24px;margin-right: 44px">￥580</span>
                                        交付周期：<span style="color: #fff">7-14天</span>
                                        <span style="font-size: 12px;float: right">家用投影仪开箱展示视频</span>
                                    </div>
                                    <el-row class="params2">
                                        <el-col :span="12">
                                            <p>卖点展示：<span>纯展示</span></p>
                                            <p>视频时长：<span>60-80s</span></p>
                                        </el-col>
                                        <el-col :span="12">
                                            <p>拍摄场景：<span>达人自行发挥</span></p>
                                            <p>视频上传：<span>达人账号上传并关联listing</span></p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="video_text">
                                    <div><img src="../../../assets/images/buyer_header1.png" alt=""></div>
                                    <ul>
                                        <li>创作者：<span>NO.123  </span></li>
                                        <li>达人类型：<span>Amazon Influencer</span></li>
                                        <li>性别：<span>男性</span></li>
                                        <li>国家：<span>美国</span></li>
                                        <li>兴趣品类：<span>服装、电子、家居</span></li>
                                        <li><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></li>
                                    </ul>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-row>

            <h2 class="content_title pt160 pb18">我们的服务</h2>
            <p class="content_description pb40">以优质服务换取客户复购，是我们的最高经营战略</p>
            <el-row class="services_box" style="max-width: 1200px;margin: auto;display: flex;align-items: center;">
                <el-row class="services_content">
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services1.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">匹配最佳创作达人</p>
                                <p class="services_description">基于产品及您的实际需求，筛选、匹配最适合的达人为你创作</p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services2.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">专业视频拍摄方案</p>
                                <p class="services_description">结合产品现状及竞品情况，给您提供专业的listing优化策略及视频拍摄方案</p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services3.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">高效对接反馈</p>
                                <p class="services_description">专业化的国内及海外服务团队进行业务沟通，无障碍、无偏差落实您的诉求</p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services4.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">保障交易安全</p>
                                <p class="services_description">交付前你的服务费用会在平台进行冻结，在您验收确认后，我们才会打款给创作者</p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services5.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">严控视频质量</p>
                                <p class="services_description">视频交付时平台会先审核把关，若不合格，平台会责成重拍，通过后才反馈给您进行确认</p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row class="services_flex">
                            <el-col :span="4" style="max-width: 80px;padding-right: 20px">
                                <img src="../../../assets/images/services6.png" alt="">
                            </el-col>
                            <el-col :span="20">
                                <p class="services_header">提供安心售后</p>
                                <p class="services_description">平台会持续跟踪您的视频效果，有任何问题您都可以向我们反馈，我们会第一时间协调处理</p>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-row>
            <el-row style="text-align: center"><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></el-row>

            <h2 class="content_title pt160 pb18">我们的优势</h2>
            <p class="content_description pb40">让视频营销成为性价比极高的亚马逊运营手段</p>
            <el-row style="max-width: 1200px;margin: auto;display: flex;align-items: center;">
                <el-row :gutter="30">
                    <el-col :span="6">
                        <div class="advantage_item">
                            <div class="advantage_img" style="background: #FFA76C">
                                <img src="../../../assets/images/advantage1.png" alt="">
                            </div>
                            <p class="advantage_title">本土达人 签约合作</p>
                            <p class="advantage_description">签约本土优质达人，视频质量高，内容真实，贴合海外群体</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="advantage_item">
                            <div class="advantage_img" style="background: #F782F9">
                                <img src="../../../assets/images/advantage2.png" alt="">
                            </div>
                            <p class="advantage_title">一手报价 质量更好</p>
                            <p class="advantage_description">平台直接对接签约达人，价格远低于同行，且质量更有保障</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="advantage_item">
                            <div class="advantage_img" style="background: #8360FF">
                                <img src="../../../assets/images/advantage3.png" alt="">
                            </div>
                            <p class="advantage_title">一个视频 多处可用</p>
                            <p class="advantage_description">交付原创视频，二次剪辑可上传到主图视频、A+视频、QA视频等</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="advantage_item">
                            <div class="advantage_img" style="background: #00D9AD">
                                <img src="../../../assets/images/advantage4.png" alt="">
                            </div>
                            <p class="advantage_title">高效交付 省心省力</p>
                            <p class="advantage_description">专业海外服务团队对接需求，确认服务后通常7-14日即可交付</p>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
            <el-row style="text-align: center" class="pb160"><el-button class="apply_for_shooting" @click="handleGoLogin" round>申请拍摄</el-button></el-row>
        </div>
        <Footer></Footer>

    </div>

</template>

<script>

import {getQrcode} from "@/api";
import {mapMutations} from "vuex";
import Footer from "@/components/Footer";

export default {
    name: "home",
    components:{
        Footer,
    },
    data() {
        return {
            dialogVisible:false,
            player: null,
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
                    icon: 'icon-yuanxinglianjie_circular-connection',
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
            ],
            videoList:[
                {
                    src: 'https://vjs.zencdn.net/v/oceans.mp4',
                    price:'500-900',
                    date:'7-14天',
                    description:'家用投影仪开箱展示视频',
                    params:{
                        item1:'纯展示',
                        item2:'60-80s',
                        item3:'达人自行发挥',
                        item4:'达人账号上传并关联listing',
                    },
                    talentInformation:{
                        name: 'NO.123',
                        type: 'Amazon Influencer',
                        gender: '男性',
                        country: '美国',
                        category: '服装、电子、家居',
                    }
                },
                {
                    src: '/static/media/video.b9066892.mp4',
                    price:'500-900',
                    date:'7-14天',
                    description:'家用投影仪开箱展示视频',
                    params:{
                        item1:'纯展示',
                        item2:'60-80s',
                        item3:'达人自行发挥',
                        item4:'达人账号上传并关联listing',
                    },
                    talentInformation:{
                        name: 'NO.123',
                        type: 'Amazon Influencer',
                        gender: '男性',
                        country: '美国',
                        category: '服装、电子、家居',
                    }
                },
                {
                    src: '/static/media/222.347df256.mp4',
                    price:'500-900',
                    date:'7-14天',
                    description:'家用投影仪开箱展示视频',
                    params:{
                        item1:'纯展示',
                        item2:'60-80s',
                        item3:'达人自行发挥',
                        item4:'达人账号上传并关联listing',
                    },
                    talentInformation:{
                        name: 'NO.123',
                        type: 'Amazon Influencer',
                        gender: '男性',
                        country: '美国',
                        category: '服装、电子、家居',
                    }
                },
                {
                    src: 'https://vjs.zencdn.net/v/oceans.mp4',
                    price:'500-900',
                    date:'7-14天',
                    description:'家用投影仪开箱展示视频',
                    params:{
                        item1:'纯展示',
                        item2:'60-80s',
                        item3:'达人自行发挥',
                        item4:'达人账号上传并关联listing',
                    },
                    talentInformation:{
                        name: 'NO.123',
                        type: 'Amazon Influencer',
                        gender: '男性',
                        country: '美国',
                        category: '服装、电子、家居',
                    }
                },
                {
                    src: '/static/media/111.e885d4c1.mp4',
                    price:'500-900',
                    date:'7-14天',
                    description:'家用投影仪开箱展示视频',
                    params:{
                        item1:'纯展示',
                        item2:'60-80s',
                        item3:'达人自行发挥',
                        item4:'达人账号上传并关联listing',
                    },
                    talentInformation:{
                        name: 'NO.123',
                        type: 'Amazon Influencer',
                        gender: '男性',
                        country: '美国',
                        category: '服装、电子、家居',
                    }
                }
            ],
            serviceslist:[
                {
                    title:'匹配最佳创作达人',
                    description: '基于产品及您的实际需求，筛选、匹配最适合的达人为你创作'
                },
                {
                    title:'专业视频拍摄方案',
                    description: '结合产品现状及竞品情况，给您提供专业的listing优化策略及视频拍摄方案'
                },
                {
                    title:'高效对接反馈',
                    description: '专业化的国内及海外服务团队进行业务沟通，无障碍、无偏差落实您的诉求'
                },
                {
                    title:'保障交易安全',
                    description: '交付前你的服务费用会在平台进行冻结，在您验收确认后，我们才会打款给创作者'
                },
                {
                    title:'严控视频质量',
                    description: '视频交付时平台会先审核把关，若不合格，平台会责成重拍，通过后才反馈给您进行确认'
                },
                {
                    title:'提供安心售后',
                    description: '平台会持续跟踪您的视频效果，有任何问题您都可以向我们反馈，我们会第一时间协调处理'
                }
            ],
            autoPlayInter1:'',
            autoPlayInter2:'',
            autoPlayInter3:'',
        }
    },
    created(){

    },
    mounted() {
        this.autoPlay('tabPane1');
        this.autoPlay('tabPane2');
        this.autoPlay('tabPane3');
        for (var i=1;i<this.videoList.length;i++){
            this.player=this.$video('my-player'+i);
        }
        // this.player=this.$video('my-player1');
        // this.player=this.$video('my-player2');
        // this.player=this.$video('my-player3');
        // this.player=this.$video('my-player4');
        // this.player=this.$video('my-player5');
    },
    methods: {
        handleGoLogin(){
            this.$router.push('/login')
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        clickTab(index){
            this.currentIndex = index;
        },
        //自动轮播
        autoPlay(tabs){
            let _this = this;
            if(tabs == 'tabPane1'){
                this.autoPlayInter1 = setInterval(function (){
                    if(_this.currentIndex == _this.tabList.length-1){
                        _this.currentIndex=0;
                    }else {
                        _this.currentIndex+=1;
                    }
                },3000)
            }else if(tabs == 'tabPane2'){
                this.autoPlayInter2 = setInterval(function (){
                    if(_this.currentIndex1 == _this.buyerShowTabList.length-1){
                        _this.currentIndex1=0;
                    }else {
                        _this.currentIndex1+=1;
                    }
                },3000)
            }else if(tabs == 'tabPane3'){
                this.autoPlayInter3 = setInterval(function (){
                    if(_this.currentIndex2 == _this.shootingPlanTabList.length-1){
                        _this.currentIndex2=0;
                    }else {
                        _this.currentIndex2+=1;
                    }
                },3000)
            }

        },
        mouseover(tabs){
            if(tabs == 'tabPane1'){
                clearInterval(this.autoPlayInter1);
                this.autoPlayInter1 = null;
            }else if(tabs == 'tabPane2'){
                clearInterval(this.autoPlayInter2);
                this.autoPlayInter2 = null;
            }else if(tabs == 'tabPane3'){
                clearInterval(this.autoPlayInter3);
                this.autoPlayInter3 = null;
            }
        },
        mouseout(tabs){
            if(tabs == 'tabPane1'){
                this.autoPlay('tabPane1');
            }else if(tabs == 'tabPane2'){
                this.autoPlay('tabPane2');
            }else if(tabs == 'tabPane3'){
                this.autoPlay('tabPane3');
            }
        },
    },
}
</script>

<style lang="less" scoped>
/*视频按钮样式*/
.video-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.pb160{
    padding-bottom: 160px;
}
.pb18{
    padding-bottom: 18px !important;
}
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
        border-top-right-radius: 0 !important;
        border-top-left-radius: 10px !important;;
        border-bottom-left-radius: 10px !important;;
        border-bottom-right-radius: 0 !important;;
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
        border-top-right-radius: 0;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 10px;
    }
}
.active2{
    border-radius: 38px;
    position: relative;
    z-index: 0;
    font-size: 20px !important;
    overflow: hidden;
    background:  linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
    border-image: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
    display: flex;
    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 1px;
        top: 1px;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: #000827;
        border-radius: 38px;
    }
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
            padding-top: 30px;
            span{
                font-family: GothamHTF;
            }
        }
        .banner_img{
            display: flex;
            justify-content: center;
            margin-top: 48px;
            video{
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
        .content_description{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #CED2DA;
            line-height: 20px;
            text-align: center;
        }
        .services_box{
            border-radius: 20px;
            position: relative;
            z-index: 0;
            font-size: 20px !important;
            overflow: hidden;
            background:  linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
            border-image: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
            display: flex;
            &::after {
                content: '';
                position: absolute;
                z-index: -1;
                left: 1px;
                top: 1px;
                width: calc(100% - 2px);
                height: calc(100% - 2px);
                background: #00173B;
                border-radius: 20px;
            }
            .services_content{
                border-radius: 20px;
                border-bottom-left-radius: 0;
                margin: 19px 0 2px 21px;
                padding: 51px 30px 31px 70px;
                width: 100%;
                position: relative;
                z-index: 0;
                font-size: 20px !important;
                overflow: hidden;
                background:  linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 0));
                border-image: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 0)) 1 1;;
                &::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 1px;
                    top: 1px;
                    width: calc(100% - 2px);
                    height: calc(100%);
                    background: linear-gradient(233deg, #000827 0%, #532F7D 48%, #000827 100%);;
                    border-radius: 20px;
                    border-bottom-left-radius: 0;
                }
                img{
                    width: 100%;
                }
                .services_flex{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-right: 60px;
                }
                .services_header{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 20px;
                    padding-bottom: 6px;
                }
                .services_description{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #CED2DA;
                    line-height: 22px;
                }
            }
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
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
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
            .video_content{
                background: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
                border-radius:20px;
                backdrop-filter: blur(10px);
                position: relative;
                z-index: 0;
                overflow: hidden;
                &::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 1px;
                    top: 1px;
                    width: calc(100% - 2px);
                    height: calc(100% - 2px);
                    border-radius: 20px;
                    background: linear-gradient(180deg, #131648, #000827);
                }
                .params1{
                    padding: 13px 30px 16px 30px;
                    position: relative;
                    color: #CED2DA;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    line-height: 17px;
                    &::before {
                        content: '';
                        position: absolute;
                        left: 30px;
                        right: 30px;
                        bottom: 0;
                        height: 1px;
                        border-radius: 1px;
                        background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                    }
                }
                .params2{
                    padding: 17px 30px 12px 30px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #CED2DA;
                    line-height: 20px;
                    p{
                        padding: 7px 0;
                    }
                    span{
                        color: #ffffff;
                    }
                }
            }
            .video_text{
                background: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
                border-radius:20px;
                backdrop-filter: blur(10px);
                position: relative;
                padding: 14px;
                z-index: 0;
                overflow: hidden;
                &::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 1px;
                    top: 1px;
                    width: calc(100% - 2px);
                    height: calc(100% - 2px);
                    border-radius: 20px;
                    background: linear-gradient(180deg, #131648, #000827);
                }
                ul{
                    padding: 17px 16px 0 16px;
                    li{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #CED2DA;
                        line-height: 20px;
                        padding: 7px;
                        span{
                            color: #ffffff;
                        }
                        .apply_for_shooting{
                            background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                            border-radius: 20px;
                            width: 100%;
                            border: none;
                            color: #ffffff;
                            height: 40px;
                            margin-top: 8px;
                        }
                    }
                }

            }
        }
        .tabs_header2{
            display: flex;
            justify-content: center;
            li{
                padding: 11px 40px;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 22px;
                cursor: pointer;
            }
            .see_more{
                color: #FFFFFF;
                line-height: 22px;
                cursor: pointer;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                line-height: 22px;
                padding: 11px 40px;
            }
        }
        .apply_for_shooting{
            background: #3442FF linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);;
            border-radius: 20px;
            width: 340px;
            border: none;
            color: #ffffff;
            height: 40px;
            margin-top: 42px;
        }
        .advantage_item{
            .advantage_img{
                border-radius: 20px;
                padding: 20px;
                img{
                    width: 100%;
                    display: block;
                }
            }
            .advantage_title{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 20px;
                text-align: center;
                padding-top: 16px;
                padding: 16px 24px 8px 24px;
            }
            .advantage_description{
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #CED2DA;
                line-height: 22px;
                text-align: center;
                padding:0 24px;
            }
        }
    }
}


</style>
