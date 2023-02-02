<template>
    <div id="buyer_show" class="buyer_show">
        <div>
            <div class="banner">
                <h2>服务流程</h2>
                <div class="service_steps">
                    <div>
                        <div class="service_item">
                            <i class="iconfont icon-fa"></i>
                            <div>
                                <p>选择3-5款意向方案</p>
                                <p>提交需求并支付定金</p>
                            </div>
                            <i class="iconfont icon-bz" style="color: #ffffff"></i>
                        </div>
                        <div class="service_item">
                            <i class="iconfont icon-bj"></i>
                            <div>
                                <p>等待达人</p>
                                <p>反馈报价</p>
                            </div>
                            <i class="iconfont icon-bz" style="color: #ffffff"></i>
                        </div>
                        <div class="service_item">
                            <i class="iconfont icon-yp"></i>
                            <div>
                                <p>补缴尾款</p>
                                <p>寄送样品</p>
                            </div>
                            <i class="iconfont icon-bz" style="color: #ffffff"></i>
                        </div>
                        <div class="service_item">
                            <i class="iconfont icon-sp"></i>
                            <div>
                                <p>上传视频</p>
                                <p>交付完成</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div style="max-width: 1200px;margin: auto">
                    <h2 class="title_box">查找适合你的拍摄方案</h2>
                    <div style="background: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1));border-radius: 23px;padding: 2px">
                        <div class="search_style">
                            <el-input placeholder="搜索品类/红人编号" v-model="keyword" class="input-with-select input_radius">
                                <el-button slot="append" style="width: 140px;color: #ffffff;font-size: 20px" icon="el-icon-search" @click="handlerSearchList('reset')"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <div class="filter_header">
                        <div class="filter_item">
                            <span>达人性别</span>
                            <el-radio-group v-model="genderValue" @change="handlerSearchList('reset')">
                                <el-radio-button label="">全部</el-radio-button>
                                <el-radio-button label="male">男性</el-radio-button>
                                <el-radio-button label="female">女性</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="filter_item">
                            <span>产品品类</span>
                            <el-radio-group v-model="categoryValue" @change="handlerSearchList('reset')">
                                <el-radio-button label="">全部</el-radio-button>
                                <el-radio-button v-for="(item,index) in categoryList" :key="index" :label="item.id">{{item.name}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div class="filter_search" id="filter_search">
                    <div>
                        <span style="margin-right: 40px">找到{{total}}个</span>
                        <span>匹配预算<el-input size="small" style="width: 79px;margin: 0 12px" placeholder="" @change="handlerSearchList('reset')" v-model="priceValue"></el-input>元</span>
                    </div>
                    <div>
                        <el-checkbox-group v-model="checkType" @change="handlerSearchList('reset')">
                            <el-checkbox v-for="(item,index) in checkGroup" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>

                <el-table
                    :data="tableData"
                    id="searchBar"
                    ref="multipleTable"
                    v-loading="loading"
                    @cell-click="cellClick"
                    :row-key="getRowKeys"
                    v-if="tableData.length!==0"
                    v-el-table-infinite-scroll="loadTable"
                    :infinite-scroll-immediate="false"
                    :infinite-scroll-disabled="disabled"
                    :header-cell-style="{background:'#F6F6F6',color:'#333333',fontWeight: '600'}"
                    size="mini"
                    :height="1000"
                    @sort-change="handlerSort"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;margin-bottom: 40px">
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        align="center"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="information"
                        width="290"
                        label="创作达人">
                        <template slot-scope="scope">
                            <div class="people_information_style" style="cursor: pointer">
                                <div class="people_img">
                                    <img :src="scope.row.image" alt="">
                                </div>
                                <div>
                                    <p class="people_nickname">NO.{{ scope.row.id }}</p>
                                    <span class="people_type">{{ scope.row.type }}</span>
                                    <p>
                                        <img :src="scope.row.country_id.image" style="margin-right: 10px;width: 14px" alt="">
                                        <img v-if="scope.row.genderdata === 'male'" src="../../assets/images/male.png" alt="">
                                        <img v-else src="../../assets/images/female.png" alt="">
                                    </p>
                                    <el-tooltip placement="bottom" :content="scope.row.categorys" effect="light">
                                        <div class="title_style">
                                            <span v-for="(item,index) in scope.row.category_ids" :style="{color: index % 3 ==0 ? '#4BB1F1' : index % 2 == 0 ? '#F56422 !important':'#00D9AD',background: index % 3 == 0 ? 'rgba(75,177,241,0.1)' : index % 2 == 0 ? 'rgba(245,100,34,0.1) !important':'rgba(0,217,173,0.1)'}" :key="index">{{ item.name }}</span>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="以往作品"
                        align="center"
                        width="180">
                        <template slot-scope="scope">
                            <div class="people_works" @click="handleShowVideo(scope)" :style="{cursor: scope.row.videos.length!=0? 'pointer': 'auto'}">
                                <p>共{{scope.row.videos.length}}个</p>
                                <img v-if="scope.row.videos.length>0" :src="localhost + scope.row.videos[0].coverimage" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="交付说明">
                        <template slot-scope="scope">
                            <div class="upload_description">
                                <div><span>卖点呈现：</span>{{ scope.row.sellingpoint_id }}</div>
                                <div><span>拍摄场景：</span>{{ scope.row.scene_id }}</div>
                                <div><span>视频上传：</span>{{ scope.row.videoupload_id }}</div>
                                <div><span>交付周期：</span>{{ scope.row.leadtime_id }}<span>（样品发货后）</span></div>
                                <div>
                                    <span>其他说明：</span>
                                    <el-tooltip placement="top" effect="light">
                                        <div slot="content" style="max-width: 400px">
                                            {{ scope.row.content }}</div>
                                        <div class="other_description">
                                            {{ scope.row.content }}</div>
                                    </el-tooltip>
                                </div>
                            </div>
<!--                            <div class="upload_description">-->
<!--                                <div>-->
<!--                                    <p><span>卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>-->
<!--                                    <p><span>拍摄场景：</span>{{ scope.row.scene_id }}</p>-->
<!--                                </div>-->
<!--                                <div>-->
<!--                                    <p><span>视频上传：</span>{{ scope.row.videoupload_id }}</p>-->
<!--                                    <p><span>交付周期：</span>{{ scope.row.leadtime_id }}<span style="color: #999999;font-size: 12px">（样品发货后）</span></p>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <el-tooltip placement="top" effect="light">-->
<!--                                <div slot="content" style="max-width: 400px">-->
<!--                                    {{ scope.row.content }}</div>-->
<!--                                <div class="other_description">-->
<!--                                    {{ scope.row.content }}</div>-->
<!--                            </el-tooltip>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        sortable="custom"
                        width="160"
                        align="center"
                        label="参考报价">
                        <template slot-scope="scope">
                            <p class="consult_price">￥<span>{{ scope.row.lower_price }}-{{ scope.row.highest_price }}</span></p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-else :image="require('../../assets/images/empty_img.png')" description="暂无搜索结果" :image-size="400" style="padding: 80px 0"></el-empty>


            </div>
        </div>

        <div ref="getheight" v-show="isShowSelectedPlan" class="foot_box">
            <el-drawer
                :show-close="false"
                style="bottom: 67px"
                :visible.sync="drawer"
                size="354"
                :direction="direction">
                <div style="background: #ffffff;">
                    <div style="max-width: 1200px;margin: auto;padding-top: 16px">
                        <el-table
                            :data="selectedTableData"
                            :header-cell-style="{background:'#F6F6F6',color:'#333333',fontWeight: '600'}"
                            size="mini"
                            class="tableScrollStyle"
                            max-height="275"
                            style="width: 100%;">
                            <el-table-column type="index" align="center" label="方案" width="80"></el-table-column>
                            <el-table-column prop="date" width="200" label="创作达人">
                                <template slot-scope="scope">
                                    <div class="people_information_style">
                                        <div class="people_img">
                                            <img :src="scope.row.image" alt="">
                                        </div>
                                        <p class="people_nickname">NO.{{ scope.row.id }}</p>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="以往作品" align="center" width="180">
                                <template slot-scope="scope">
                                    <div class="people_works" @click="handleShowVideo(scope)">
                                        <img :src="scope.row.videos.length>0 ? localhost + scope.row.videos[0].coverimage : ''" alt="">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="交付说明">
                                <template slot-scope="scope">
                                    <el-tooltip placement="right" effect="light">
                                        <div slot="content" style="max-width: 400px">
                                            <p><span>卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>
                                            <p><span>拍摄场景：</span>{{ scope.row.scene_id }}</p>
                                            <p><span>视频上传：</span>{{ scope.row.videoupload_id }}</p>
                                            <p><span>交付周期：</span>{{ scope.row.leadtime_id }} <span style="color: rgba(153, 153, 153, 1);font-size: 12px">（样品收货后）</span></p>
                                            <p><span>其他说明：</span>{{ scope.row.content }}</p>
                                        </div>
                                        <div class="other_description">
                                            <p><span style="color: #999999">卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>
                                            <p><span style="color: #999999">拍摄场景：</span>{{ scope.row.scene_id }}</p>
                                        </div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="lower_price" width="150" align="center" label="参考报价">
                                <template slot-scope="scope">
                                    <p class="consult_price">￥<span>{{ scope.row.lower_price }}-{{ scope.row.highest_price }}</span></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <i @click="deleteRow(scope.$index,scope.row.id,selectedTableData,tableData)" style="font-size: 16px;display: block;margin: auto;width: 30px;height: 30px;line-height: 30px;cursor: pointer" class="el-icon-delete"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-drawer>
            <div>
                <div>
                    <div class="choice_style">已选择：<span>{{ selectedTableData.length }}</span>个意向方案 <i style="color: #796CF3;font-size:14px;font-weight: bold;display: inline-block;width: 30px;height: 30px;line-height: 30px;text-align: center;cursor: pointer" @click="drawer = !drawer" :class="drawer ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></div>
                    <div><el-button @click="handleSubmitSelectedPlan();clearSubmitForm()">提交拍摄需求</el-button></div>
                </div>
            </div>

        </div>
        <el-backtop style="background: #000827;width: 36px;height: 36px;bottom: 70px">
            <div>
                <i class="iconfont icon-fhdb" style="color: #ffffff;font-size: 20px"></i>
            </div>
        </el-backtop>

        <!--登录提示-->
        <el-dialog
            title="温馨提示"
            :visible.sync="loginDialogVisible"
            width="300px"
            class="login_dialog"
            center>
            <div>
                <p>您还没有登录，登录后即可继续操作</p>
                <el-button type="primary" size="small" @click="loginDialogVisible = false;$router.replace('/login')">去登录</el-button>
            </div>
        </el-dialog>

        <!--视频拍摄需求-->
        <el-dialog
            title="视频拍摄需求"
            :visible.sync="videoSubmitDialogVisible"
            width="702px"
            :close-on-click-modal="false"
            class="video_dialog"
            center>
            <div>
                <el-form size="small" :model="videoRuleForm" :rules="videoRules" ref="videoRules" label-width="125px" class="video_ruleForm">
                    <el-form-item label="选择拍摄类型" prop="selectedType">
                        <div style="padding-bottom: 10px">
                            <el-radio-group v-model="videoRuleForm.selectedType" size="small">
                                <el-radio class="radio_style1" label="0" border>
                                    <p class="recommend">推荐</p>
                                    标准化拍摄
                                    <ul>
                                        <li>达人根据产品卖点自行拍摄</li>
                                        <li>匹配快，成功率高</li>
                                        <li>交付周期5天起</li>
                                        <li>费用实惠</li>
                                        <li>重拍需另行收费</li>
                                    </ul>
                                </el-radio>
                                <el-radio class="radio_style2" label="1" border>
                                    定制化拍摄
                                    <ul>
                                        <li>达人按卖家指定方式及场景拍摄</li>
                                        <li>专业拍摄设备及团队</li>
                                        <li>交付周期10天起</li>
                                        <li>费用是标准化拍摄的数倍</li>
                                        <li>重拍需另行收费</li>
                                    </ul>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="description" style="padding-bottom: 0"><span>注：</span>视频内容不会提及产品售后政策、优惠、站外引流等亚马逊严禁内容</div>
                    </el-form-item>
                    <el-form-item label="产品亚马逊链接" prop="product">
                        <el-input v-model="videoRuleForm.product" placeholder="请输入产品亚马逊链接"></el-input>
                    </el-form-item>
                    <el-form-item label="产品所属品类" prop="category" required>
                        <el-select v-model="videoRuleForm.category" style="width: 100%" placeholder="请选择产品所属品类">
                            <el-option v-for="(item,index) in categoryList" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品核心卖点" prop="selling_point">
                        <div class="description">请用英文简要说明3-4个卖点
                            <el-tooltip class="item" effect="dark" placement="right">
                                <a href="javascript:;;">示例</a>
                                <p slot="content">
                                    例：<br/>
                                    1.Disco modes color changing<br/>
                                    2.Dance hall projection effect<br/>
                                    3. 41FT & 15 Disco Bulbs
                                </p>
                            </el-tooltip>
                        </div>
                        <el-input type="textarea" placeholder="请输入产品核心卖点" v-model="videoRuleForm.selling_point"></el-input>
                    </el-form-item>
                    <el-form-item label="定制需求" v-if="videoRuleForm.selectedType == 1" prop="demand">
                        <div class="description">请具体说明您的拍摄需求
                            <el-tooltip class="item" effect="dark" placement="right">
                                <a href="javascript:;;">示例</a>
                                <p slot="content">
                                    例：<br/>
                                    1. 介绍包装内容，并开箱展示天线安装、电源适配器连接，手机 APP连接等安装使用步骤；<br/>
                                    2. 介绍30X光学变焦功能：将摄像机安装在室外，放大并查看远处的景物或动物，以展示摄像机能看清楚很远处的风景；<br/>
                                    3. 介绍人形跟踪功能：将摄像机安装在室外，为摄像机开启人形跟踪功能，然后人在摄像机的镜头前走动，以展示摄像机的人形跟踪功能。<br/>
                                </p>
                            </el-tooltip>
                        </div>
                        <el-input type="textarea" placeholder="请输入您的拍摄需求" v-model="videoRuleForm.demand"></el-input>
                    </el-form-item>
                    <el-form-item label="备注（非必填）">
                        <p class="description">在候选达人匹配失败时，将据此为您推荐其他达人</p>
                        <el-input type="textarea" placeholder="不超过60字，如对达人性别、肤色，小孩或宠物出镜有要求，可备注" v-model="videoRuleForm.remarks"></el-input>
                    </el-form-item>
                    <el-form-item label="候选达人" style="border-top: 1px solid #eeeeee;padding-top: 14px">
                        <ul class="candidate_list">
                            <router-link v-for="(item,index) in selectedTableData" :key="index" target="_blank" :to="{path:'/homepage:'+item.id}">
                                <li>
                                    <div>
                                        <img :src="item.image" alt="">
                                    </div>
                                    <p>NO.{{item.id}}</p>
                                    <span>￥{{item.lower_price}}-{{item.highest_price}}</span>
                                </li>
                            </router-link>
                        </ul>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form_button"><el-button size="small" type="primary" @click="submitForm('videoRules')">提交</el-button></div>
        </el-dialog>

        <!--支付定金-->
        <el-dialog
            title="请尽快支付定金"
            :visible.sync="payDepositDialogVisible"
            width="500px"
            @close="handleClose"
            :close-on-click-modal="false"
            class="pay_deposit_dialog"
            center>
            <div>
                <el-alert
                    title="支付定金后，平台将正式为您对接达人。不满意可随时申请退还定金。"
                    center
                    style="position: relative"
                    :closable="false">
                    <i class="iconfont icon-tips" style="position: absolute;top: 8px;left: 14px;font-size: 18px"></i>
                </el-alert>
                <h5>¥{{ orderData.price }}</h5>
                <p>定金金额</p>
                <p>订单号：<span>{{ orderData.order_id }}</span></p>
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label" style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-zhifupingtai-weixin" style="color: rgba(59, 202, 114, 1);font-size: 20px;margin-right: 6px"></i>微信支付</span>
                        <div>
                            <div class="qrcode" ref="wechatQrCodeUrl">
                                <span class="top_left"></span>
                                <span class="top_right"></span>
                                <span class="bottom_left"></span>
                                <span class="bottom_right"></span>
                            </div>
                            <p style="padding-top: 8px">可截图给财务人员付款</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label" style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-zhifu-zhifubao" style="color: rgba(2, 169, 241, 1);font-size: 20px;margin-right: 6px"></i>支付宝支付</span>
                        <div>
                            <div class="qrcode" ref="alipayQrCodeUrl">
                                <span class="top_left"></span>
                                <span class="top_right"></span>
                                <span class="bottom_left"></span>
                                <span class="bottom_right"></span>
                            </div>
                            <p style="padding-top: 8px">可截图给财务人员付款</p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
        <!--支付完成-->
        <el-dialog
            title="定金支付成功"
            :visible.sync="paymentCompletedDialogVisible"
            :before-close="handlePaymentCompletedClose"
            width="360px"
            :close-on-click-modal="false"
            class="payment_completed_dialog"
            center>
            <div slot="title">
                <i style="color: rgba(2, 181, 120, 1);font-size: 20px" class="el-icon-success"></i>
                定金支付成功
            </div>
            <div>
                <p>平台将开始匹配并对接达人，预计1-2个工作日会收到反馈，敬请留意</p>
                <div class="button_box">
                    <el-button @click="handlePaymentCompletedClose">我知道了</el-button>
                </div>
            </div>
        </el-dialog>

        <!--视频播放-->
        <el-dialog
            :title="this.videoData.name"
            :visible.sync="videoPlayDialog"
            width="896px"
            :close-on-click-modal="false"
            class="video_dialog video_player"
            @close="handleVideoClose"
            center>
            <div style="padding-top: 0">
                <div class="thumb-example">
                    <ul ref="swiperList" class="swiper_list">
                        <li v-for="(item,index) in this.videoData" v-show="swiperIndex == index" :key="index">
                            <h4 :title="item.desc" style="padding-left:20px;padding-right:20px;text-align:center;font-size: 16px;font-weight: 600;color: #333333;line-height: 22px;z-index: 99;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;margin-bottom: 22px">{{item.desc}}</h4>
                            <div class="video_content">
<!--                                <video-->
<!--                                    :id="'my-player'+ ++index"-->
<!--                                    ref="video"-->
<!--                                    :poster="localhost + item.coverimage"-->
<!--                                    class="video-js vjs-default-skin vjs-big-play-centered"-->
<!--                                    controls>-->
<!--                                    <source :src="localhost + item.file" />-->
<!--                                </video>-->
                                <video
                                    :id="'my-video'+index+1"
                                    ref="videoPlayerRef"
                                    class="video-js"
                                    controls
                                    preload="auto"
                                    :poster="localhost + item.coverimage"
                                    data-setup="{}"
                                >
                                    <source :src="localhost + item.file" />
                                </video>
                            </div>
                        </li>
                    </ul>
                    <!-- swiper2 Thumbs -->
                    <swiper class="swiper gallery-thumbs" id="swiperThumbs" :options="swiperOptionThumbs" style="" ref="swiperThumbs">
                        <swiper-slide v-for="(item,index) in this.videoData" :key="index" :class="'slide-'+ ++index">
                            <img :src="localhost + item.coverimage" alt="">
                        </swiper-slide>
                    </swiper>
                    <div class="swiper-button-next swiper-button-white" @click="handleClickSwiperNextButton" slot="button-next"><i class="el-icon-arrow-right"></i></div>
                    <div class="swiper-button-prev swiper-button-white" @click="handleClickSwiperPreButton" slot="button-prev"><i class="el-icon-arrow-left"></i></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Footer from "@/components/Footer";
import QRCode from 'qrcodejs2'
import {getCategory, getSearchList, createOrder, payOrder, checkPayment} from "@/api";
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
import videojs from "video.js";


let vm = null;
export default {
    name: "buyershow",
    data(){
        return{
            swiperOptionThumbs: {
                // loop: true,
                loopedSlides: 5, // looped slides should be the same
                spaceBetween: 24,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                watchSlidesVisibility: true,//防止不可点击
                on: {
                    click: function () {
                        vm.pauseFun();
                        setTimeout(()=>{
                            vm.setSwiper(this.activeIndex)
                        },200)

                    }
                }

            },
            swiperIndex:0,
            loading: false,
            disabled: false,
            pageIndex:1,
            pageSize:20,
            total:0,
            saveDATA:[],
            paymentCompletedDialogVisible: false,
            payDepositDialogVisible:false,
            videoRuleForm: {
                selectedType:'0',
                product:'',
                category:'',
                selling_point:'',
                demand:'',
                remarks:'',
            },
            videoRules: {
                selectedType: [
                    { required: true, message: '请选择拍摄类型', trigger: 'change' }
                ],
                product: [
                    { required: true, message: '请输入产品亚马逊链接', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请选择产品所属品类', trigger: 'change' }
                ],
                selling_point: [
                    { required: true, message: '请输入产品核心卖点', trigger: 'blur' },
                ],
                demand: [
                    { required: true, message: '请输入定制需求', trigger: 'blur' },
                ],
            },
            videoSubmitDialogVisible:false,
            loginDialogVisible:false,
            drawer: false,
            direction: 'btt',
            footerHeight:'',
            keyword:'',
            genderValue:'',
            categoryValue:'',
            categoryList:[],
            checkGroup:[],
            priceValue:'',
            keywords:'',
            checkType: [],
            tableData: [],
            selectedTableData:[],
            isShowSelectedPlan: false,
            totalNum:1,
            selectRow:[],
            orderData:{},
            checkWechatPaymentVal:'',
            checkAlipayPaymentVal:'',
            videoPlayDialog:false,
            videoData:[],
            player: null,
            localhost:process.env.VUE_APP_BASE_URL,
            order: '',
            orderType: '',
        }
    },
    components:{
        Footer,
        Swiper,
        SwiperSlide
    },
    created() {
        vm = this;
    },
    mounted() {
        this.footerHeight = this.$refs.getheight.offsetHeight + 'px'
        this.handlerGetCategory('influencer');
        this.handlerGetCategory('type');
        this.handlerSearchList();
        this.setSwiper(0);
        document.body.scrollTop = 0
    },
    beforeUpdate(){
        window.addEventListener('scroll',this.handleScroll,true)
    },
    methods:{
        setSwiper(data){
            this.swiperIndex = data
        },
        pauseFun(){
            this.$refs.videoPlayerRef[this.swiperIndex].pause();
        },
        handleClickSwiperNextButton(){
            this.$refs.videoPlayerRef[this.swiperIndex].pause();
            if(this.swiperIndex == this.videoData.length-1){
                this.swiperIndex = this.videoData.length-1
            }else {
                this.swiperIndex++
            }
        },
        handleClickSwiperPreButton(){
            this.$refs.videoPlayerRef[this.swiperIndex].pause();
            if(this.swiperIndex == 0){
                this.swiperIndex = 0
            }else {
                this.swiperIndex--
            }
        },
        /*关闭支付完成页面并跳转至订单信息页面*/
        handlePaymentCompletedClose(){
            this.paymentCompletedDialogVisible=false;
            window.open('/#/manage/order', '_blank');
        },
        /*播放视频*/
        handleShowVideo(scope){
            if(scope.row.videos.length > 0){
                this.videoData= scope.row.videos;
                this.drawer = false;
                this.videoPlayDialog =true;
            }
            let _this = this;
            _this.$nextTick(() => {
                this.videoData.forEach((item,index)=>{
                    this.videoPlayers = videojs('my-video'+index+1, {
                        // controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                        // autoplay: false, //自动播放属性,
                        // muted: false, // 静音播放
                        // preload: 'auto', //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                        // fluid: true
                    }, function onPlayerReady() {
                        // videojs.log('Your player is ready!'); // 比如： 播放量+1请求
                        this.on('ended', function() {
                            // videojs.log('Awww...over so soon?!');
                        });
                    });
                })
            })

        },
        cellClick(row, column, cell, event){
            if(column.property === 'information'){
                let pathInfo = this.$router.resolve({
                    path:'/homepage:' + row.id,
                })
                window.open(pathInfo.href, '_blank');
            }
        },
        //排序
        handlerSort(column){
            if (!localStorage.getItem('token')){
                this.$refs.multipleTable.clearSort();
                this.loginDialogVisible = true;
                return
            }else {
                this.pageIndex = 1
                column.order == 'ascending' ? this.orderType='asc' : this.orderType='desc';
                column.order == 'ascending'? this.order = 'lower_price' : this.order = 'highest_price';
                this.handlerSearchList();
            }
        },
        //table头部固定顶部
        handleScroll() {
            let scrollTop = window.pageYOffset ||document.documentElement.scrollTop ||document.body.scrollTop; //滑动的距离
            let heightTop;
            if(document.querySelector("#searchBar")){
                heightTop = document.querySelector("#searchBar").offsetTop;
                if (scrollTop >= heightTop) {
                    //表头到达页面顶部固定表头
                    let top = scrollTop - (heightTop-166);
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.position = "relative";
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.zIndex = "500";
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.top = `${top-35}px`;

                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.position = "relative";
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.zIndex = "500";
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.top = `${top-35}px`;

                } else if (scrollTop == 0) {
                    //表格横向
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.position = "relative";
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.zIndex = "500";

                    // console.log('横拉')
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.position = "relative";
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.zIndex = "500";
                } else {
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.position = "";
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.zIndex = "";
                    document.getElementsByClassName(
                        "filter_search"
                    )[0].style.top = "";

                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.position = "";
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.top = "";
                    document.getElementsByClassName(
                        "el-table__header-wrapper"
                    )[0].style.zIndex = "";
                }
            }

        },
        getRowKeys(row){
            return row.id;
        },
        //关闭视频弹窗
        handleVideoClose(){
            this.swiperIndex = 0;
            this.videoData.forEach((item,index)=>{
                videojs('my-video'+index+1).dispose()
            })
            this.videoData = [];

        },
        //获取搜索分类
        handlerGetCategory(type){
            getCategory({type:type})
                .then((res) => {
                    if(res.code === 1){
                        if(type == 'type'){
                            this.checkGroup = res.data
                        }else {
                            this.categoryList = res.data;
                        }
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        loadTable(){
            this.disabled = true;
            if(!localStorage.getItem('token')){
                this.loginDialogVisible = true;
                return;
            }
            if(this.pageIndex < this.totalNum){
                this.pageIndex++;
                let data = {
                    keyword: this.keyword,
                    genderdata: this.genderValue,
                    type: this.checkType,
                    price: this.priceValue,
                    category_id: this.categoryValue,
                    page: this.pageIndex,
                    pageSize: this.pageSize,
                    order: this.order,
                    orderType:this.orderType
                }
                getSearchList(data)
                    .then((res) => {
                        if(res.code === 1){
                            if (this.pageIndex === 1) {
                                this.tableData = res.data.data;
                            } else {
                                this.tableData = this.tableData.concat(res.data.data)
                            }
                            this.total = res.data.total;
                            this.pageIndex = res.data.current_page;
                            this.totalNum = res.data.last_page;
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err.msg);
                    });
            }
            this.disabled = false;
        },
        //搜索列表
        handlerSearchList(value){
            if(value == 'reset'){
                this.pageIndex = 1
                if(!localStorage.getItem('token')){
                    this.loginDialogVisible = true;
                    this.genderValue = '';
                    this.categoryValue = '';
                    this.checkType = [];
                    this.priceValue = '';
                    return;
                }
            }else {
                this.pageIndex = this.pageIndex
            }
            let data = {
                keyword: this.keyword,
                genderdata: this.genderValue,
                type: this.checkType,
                price: this.priceValue,
                category_id: this.categoryValue,
                page: this.pageIndex,
                pageSize: this.pageSize,
                order: this.order,
                orderType:this.orderType
            }
            getSearchList(data)
                .then((res) => {
                    if(res.code === 1){
                        if (this.pageIndex === 1) {
                            this.tableData = res.data.data;
                        } else {
                            this.tableData = this.tableData.concat(res.data.data)
                        }
                        this.total = res.data.total;
                        this.pageIndex = res.data.current_page;
                        this.totalNum = res.data.last_page;
                        let arr = [];
                        setTimeout(()=>{
                            this.tableData.forEach((item)=>{
                                this.selectedTableData.forEach((row,index)=>{
                                    if(item.id == row.id){
                                        arr.push(item);
                                    }
                                })
                            })
                            if(arr){
                                arr.forEach((row)=>{
                                    this.$refs.multipleTable.toggleRowSelection(row,true);
                                })
                            }
                        },100);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
            this.disabled = false;
        },
        //重置提交需求表单
        clearSubmitForm(){
            this.videoRuleForm = {
                selectedType:'0',
                product:'',
                category:'',
                selling_point:'',
                demand:'',
                remarks:'',
            }
        },
        //支付定金||尾款
        handlerPayOrder(order,type){
            //微信二维码
            payOrder({
                order_id: order,
                type:type,
                payment: 'wechat'
            })
                .then((res) => {
                    if(res.code === 1){
                        this.orderData = res.data.order;
                        new QRCode(this.$refs.wechatQrCodeUrl, {
                            text: res.data.qrcode,
                            width: 130,
                            height: 130,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        })
                        this.handlerCheckWechatPayment(res.data.order.out_trade_no);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
            //支付宝二维码
            payOrder({
                order_id: order,
                type:type,
                payment: 'alipay'
            })
                .then((res) => {
                    if(res.code === 1){
                        console.log(res)
                        this.orderData = res.data.order;
                        new QRCode(this.$refs.alipayQrCodeUrl, {
                            text: res.data.qrcode,
                            width: 130,
                            height: 130,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        })
                        this.handlerCheckAlipayPayment(res.data.order.out_trade_no);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        //检测微信是否支付成功
        handlerCheckWechatPayment(order){
            let _this = this;
            //微信支付检测
            _this.checkWechatPaymentVal = setInterval(function (){
                checkPayment({
                    out_trade_no:order,
                    payment: 'wechat'
                })
                    .then((res) => {
                        if(res.code === 1){
                            if(res.data.status === 'success'){
                                _this.payDepositDialogVisible = false;
                                _this.paymentCompletedDialogVisible = true;
                                clearInterval(_this.checkWechatPaymentVal);
                                clearInterval(_this.checkAlipayPaymentVal);
                            }
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err.msg);
                    });
            },3000)
        },
        //检测支付宝是否支付成功
        handlerCheckAlipayPayment(order){
            let _this = this;
            //支付宝支付检测
            _this.checkAlipayPaymentVal = setInterval(function (){
                checkPayment({
                    out_trade_no:order,
                    payment: 'alipay'
                })
                    .then((res) => {
                        if(res.code === 1){
                            if(res.data.status === 'success'){
                                _this.payDepositDialogVisible = false;
                                _this.paymentCompletedDialogVisible = true;
                                clearInterval(_this.checkAlipayPaymentVal);
                                clearInterval(_this.checkWechatPaymentVal);
                            }
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err.msg);
                    });
            },3000)
        },
        //清除定时器
        handleClose(){
            clearInterval(this.checkWechatPaymentVal);
            clearInterval(this.checkAlipayPaymentVal);
            this.$refs.alipayQrCodeUrl.innerHTML='';
            this.$refs.wechatQrCodeUrl.innerHTML='';
        },
        //提交拍摄需求
        submitForm(formName) {
            let influencer_id = [];
            this.selectedTableData.forEach((item,index)=>{
                influencer_id.push(item.id)
            })
            let data = {
                shoot: this.videoRuleForm.selectedType,
                influencer_ids: influencer_id,
                category_id: this.videoRuleForm.category,
                custom: this.videoRuleForm.demand,
                url: this.videoRuleForm.product,
                sellingpoint: this.videoRuleForm.selling_point,
                description: this.videoRuleForm.remarks,
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createOrder(data)
                        .then((res) => {
                            if(res.code === 1){
                                this.videoSubmitDialogVisible = false;
                                this.selectRow.forEach((item)=>{
                                    this.$refs.multipleTable.toggleRowSelection(item,false);
                                })
                                this.selectedTableData = [];
                                this.payDepositDialogVisible = true;
                                this.handlerPayOrder(res.data.id,0)
                            }
                        })
                        .catch((err) => {
                            this.$message.error(err.msg);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleSelectionChange(val){
            this.selectRow = val;
            if (!localStorage.getItem('token')){
                val.forEach((item,index)=>{
                    this.$refs.multipleTable.toggleRowSelection(item,false);
                    this.loginDialogVisible = true;
                    return;
                })
            }else {
                val.length>0 ? this.isShowSelectedPlan=true:this.isShowSelectedPlan=false;
                if(val.length>5){
                    this.selectedTableData = val.splice(0,5);
                    val.splice(0,5).forEach((item,index)=>{
                        this.$refs.multipleTable.toggleRowSelection(item,false);
                        this.$message({
                            message: '每个需求请选择3~5个意向方案',
                            type: 'warning'
                        });
                        return;
                    })

                }else {
                    this.selectedTableData = val
                    this.selectedLength = val.length;
                }
            }

        },
        deleteRow(index,id,rows,tab) {

            rows.splice(index, 1);
            if(rows.length == 0){
                this.drawer = false;
            }
            this.selectedLength = this.selectedTableData.length;
            for (let key in tab){
                if(tab[key].id == id){
                    this.$refs.multipleTable.toggleRowSelection(tab[key],false);
                }
            }
        },
        //提交拍摄方案
        handleSubmitSelectedPlan(){
            if(this.selectedTableData.length < 3 ){
                this.$message({
                    message: '每个需求请选择3~5个意向方案',
                    type: 'warning'
                });
            }else {
                this.videoSubmitDialogVisible = true;
                this.drawer = false;
            }
        }
    },
}
</script>
<style lang="less">
#searchBar{
    .el-checkbox__inner{
        border: 1px solid #796CF3;
    }
}
#buyer_show{
    .el-table .caret-wrapper{
        width: 15px !important;
    }
    .video_content .vjs-poster{
        background-size: cover;
    }
    .tableScrollStyle{
        padding: 0;
    }
    .my-video11-dimensions.vjs-fluid:not(.vjs-audio-only-mode){
        padding-top: 0;
    }
    .video-js .vjs-big-play-button{
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        width: 100px !important;
        height: 100px !important;
        font-size: 38px;
        line-height: 96px;
    }
}

.video_player{
    .el-dialog--center .el-dialog__body{
        padding-top: 0 !important;
    }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}


.swiper.gallery-thumbs .swiper-container-android .swiper-slide, .swiper-wrapper{
    position: relative;
    left: -343px;
}
.swiper_list {
    width: 100%;
    height: 518px;
    overflow: hidden;
    li {
        width: 100%;
        float: left;
        height: 100%;
        .video_content{
            height: 474px;
            width: 100%;
        }
    }
}
#buyer_show{
    .video_content .video-js{
        height: 474px !important;
        width: 100%;
        position: relative;
    }
}

.swiper-button-next.swiper-button-white, .swiper-container-rtl .swiper-button-prev.swiper-button-white,
.swiper-button-prev.swiper-button-white, .swiper-container-rtl .swiper-button-next.swiper-button-white{
    background-image: none;
}
.swiper-button-prev, .swiper-button-next,
.swiper-button-next, .swiper-button-prev{
    top: auto;
    bottom: 21px !important;
    background: rgba(153, 153, 153, 0.7);
    color: #ffffff;
    width: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    font-size: 18px;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    left: 1px;
    border-radius: 0 9px 9px 0px;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    right: 3px;
    border-radius: 9px 0 0 9px;
}
.thumb-example {
    position: relative;
}
.swiper.gallery-thumbs .swiper-slide{
    cursor:pointer;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.swiper.gallery-top{
    height: 440px !important;
    .swiper-slide{
        border-radius: 20px;
    }
}
.swiper {
    .swiper-slide {
        background-size: cover;
        background-position: center;
        video{
            width: 100%;
            height: 100%;
        }
    }

    &.gallery-top {
        height: 80%;
        width: 100%;
    }
    &.gallery-thumbs {
        height: 84px;
        box-sizing: border-box;
        padding: 0 1px;
        margin-top: 24px;
    }
    &.gallery-thumbs .swiper-slide {
        width: 147px !important;
        height: 84px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        &:after{
            position: absolute;
            content: '';
            left: 1px;
            top: 1px;
            right: 1px;
            bottom: 1px;
            background: rgba(0,0,0,0.4);
            z-index: 9;
            border-radius: 4px;
        }
        &:before{
            font-family: element-icons;
            position: absolute;
            content: '\e791';
            width: 28px;
            height: 28px;
            font-size: 24px;
            background: #FFFFFF;
            box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.07);
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            display: flex;
            z-index: 99;
            justify-content: center;
            align-items: center;
            transform: translate(-50%,-50%);
        }
    }
    &.gallery-thumbs .swiper-slide-active {
        opacity: 1;
        background: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1), rgba(251, 150, 139, 1));
        border-radius: 9px;
        padding: 1px;
        overflow: hidden;
        &:after{
            background: none;
        }
        &:before{
            content: '';
            background: none;
            box-shadow: none;
            border: none;
        }
    }
}

</style>
<style lang="less">
.el-tooltip__popper.is-dark{
    max-width: 500px;
}
#buyer_show{

    .el-table__body-wrapper{
        border: none;
        padding: 0;
    }
    .el-table__header-wrapper table{
        padding: 0;
    }
    .el-table__body-wrapper .el-table__body{
        padding-bottom: 20px;
    }
}

.el-tooltip__popper.is-dark{
    font-size: 12px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400 !important;;
    color: #E4E4E4 !important;;
    line-height: 20px !important;;
}

.pay_deposit_dialog {
    .el-tabs--border-card>.el-tabs__content{
        padding: 34px 15px 21px 15px;
    }
    .qrcode{
        position: relative;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        height: 140px;
        margin: auto;
        border: 1px solid #eeeeee;
        .top_left,.top_right,.bottom_left,.bottom_right{
            position: absolute;
            width: 4px;
            height: 4px;
        }
        .top_left{
            border-top: 1px solid #333333;
            left: -1px;
            top: -1px;
            border-left: 1px solid #333333;
        }
        .top_right{
            border-top: 1px solid #333333;
            right: -1px;
            top: -1px;
            border-right: 1px solid #333333;
        }
        .bottom_left{
            border-bottom: 1px solid #333333;
            left: -1px;
            bottom: -1px;
            border-left: 1px solid #333333;
        }
        .bottom_right{
            border-bottom: 1px solid #333333;
            right: -1px;
            bottom: -1px;
            border-right: 1px solid #333333;
        }
    }
    .el-tabs--border-card{
        border: 1px solid #eeeeee;
        margin-top: 15px;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item+.el-tabs__item{
        margin-left: 0;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child{
        border-right: 1px solid #eeeeee !important;
        margin-left: 0;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover{
        margin-left: 0;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item{
        color: #999999;
        font-family: PingFangSC-Semibold, PingFang SC;
        border: none;
        margin-bottom: 1px;
        transition: none;
        height: 42px;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active,
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover{
        font-weight: 600;
        color: #333333;
        background: #F6F5FF;
        border-bottom: 2px solid #796CF3;
        i{
            font-weight: normal;
        }
    }

    .el-tabs--border-card>.el-tabs__header{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
        background: #ffffff;
    }
    .el-tabs--border-card{
        box-shadow: none;
        border-radius: 10px;
    }
    .el-tabs__nav{
        width: 100%;
        //padding-bottom: 1px;
    }
    .el-tabs__item{
        width: 50%;
        text-align: center;
    }
    .el-alert{
        padding: 7px 0;
        .el-alert__description{
            margin: 0;
        }
    }
    .el-alert__icon{
        color: #796CF3;
    }
    .el-alert--info.is-light{
        background: #F4F2FF;
        color: #666666;
    }
    .el-alert__title{
        font-size: 12px !important;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400 !important;
        color: #666666 !important;
    }
}
.el-form-item__label{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    line-height: 20px;
    text-align: left !important;
}
.el-table__empty-block{
    display: none !important;
}
.el-table th.el-table__cell>.cell .el-checkbox{
    display: none;
}
/* 设置滚动条的样式 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    width:6px;
}
/* 滚动槽 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius:10px;
}
/* 滚动条滑块 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb:window-inactive {
    background:#D8D8D8;
}

.el-table th.el-table__cell>.cell{
    text-align: center;
}

.buyer_show{
    .el-input-group__append{
        border-radius: 23px !important;
        background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
        border: none;
    }
    .el-radio-button__inner{
        border: none !important;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #666666;
    }
    .el-input-group--append .el-input__inner{
        border: none;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: #796CF3;
        border-color: #796CF3;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #796CF3;
    }
}

.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    font-weight: 600;
    color: #333333 !important;
    background: none !important;
    box-shadow:none !important;
}
.el-table__header-wrapper{
    border-radius: 10px;
}
.el-tooltip__popper.is-light{
    z-index: 2300 !important;
    border: 1px solid #796CF3 !important;
    color: rgba(51, 51, 51, 1) !important;
    padding: 10px 14px;
    line-height:24px ;
}
.el-tooltip__popper.is-light p{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    text-shadow: 0px 12px 20px rgba(0,0,0,0.1);
    padding: 5px 0;
}
.el-tooltip__popper.is-light p span{
    color: rgba(153, 153, 153, 1);
}

.el-radio--small.is-bordered{
    height: 191px !important;
    padding: 20px 14px !important;
    width: 208px;
    border-radius: 10px !important;
}
.el-radio--small.is-bordered .el-radio__label{
    font-size: 14px !important;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
}
.el-radio__label ul{
    padding-top: 10px;
}
.el-radio__label ul li {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    padding: 4px 0 4px 12px;
    position: relative;
}
.el-radio__label ul li:before{
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    background: #666666;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -2px;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #333333 !important;
}
.radio_style2 .el-radio__input.is-checked .el-radio__inner{
    border: 1px solid #00D9AD !important;
    background: #00D9AD !important;
}
.radio_style2.is-bordered.is-checked{
    border: 2px solid #00D9AD !important;
}
.radio_style1 .el-radio__input.is-checked .el-radio__inner{
    border: 1px solid rgba(121, 108, 243, 1) !important;
    background: rgba(121, 108, 243, 1) !important;
    background-image: url("../../assets/images/radio_style1_bg.png");
}
.radio_style1.is-bordered.is-checked{
    border: 2px solid rgba(121, 108, 243, 1) !important;
}

</style>
<style lang="less" scoped>
.payment_completed_dialog{
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
        padding: 10px 12px 0 12px;
        text-align: center;
    }
    .button_box{
        margin-top: 28px;
        button{
            display: block;
            margin: auto;
            width: 140px;
            background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            padding: 8px 0;
        }
    }
}
.pay_deposit_dialog{
    h5{
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FF2C4C;
        line-height: 30px;
        text-align: center;
        margin: 18px 0 1px 0;
    }
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        text-align: center;
        padding: 5px 0;
        span{
            color: rgba(51, 51, 51, 1);
        }
    }
    ul{
        border-radius: 10px;
        border: 2px solid #F4F2FF;
        display: flex;
        justify-content: space-between;
        padding: 20px 30px;
        margin: 15px 35px 16px 35px;
        li{
            div{
                width: 128px;
                height: 128px;
                background: #FFFFFF;
                border: 1px solid #EEEEEE;
                img{
                    width: 100%;
                }
            }
            p{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                margin-top: 10px;
                margin-bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 18px;
                    margin-right: 6px;
                }
            }
        }
    }
}
.video_dialog{
    .video_ruleForm{
        height: 500px;
        padding-top: 10px;
        padding-right: 10px;
        margin: 0 12px;
        overflow: auto;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width:6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            border-radius:10px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            border-radius:10px;
            background:rgba(0,0,0,0.1);
        }
        &::-webkit-scrollbar-thumb:window-inactive {
            background:#D8D8D8;
        }
        .radio_style1{
            background: rgba(131,96,255,0.04);
            border: 1px solid rgba(131,96,255,1);
            position: relative;
            &:before{
                content: url("../../assets/images/radio_style1_bg.png");
                width: 60px;
                height: 48px;
                display: block;
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .recommend:before{
                position: absolute;
                content: '';
                width: 3px;
                height: 3px;
                background: #ffffff;
                border-radius: 50%;
                top: 50%;
                margin-top: -2px;
                left: 8px;
            }
            .recommend{
                position: absolute;
                text-align: center;
                line-height: 22px;
                right: 0;
                top: 10px;
                width: 40px;
                height: 22px;
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 100px 0px 0px 100px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                padding-left: 8px;
            }
        }
        .radio_style2{
            position: relative;
            background: rgba(0,217,173,0.04);
            border: 1px solid rgba(0,217,173,1);
            &:before{
                width: 60px;
                height: 60px;
                content: url("../../assets/images/radio_style2_bg.png");
                display: block;
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
        }
        .description{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
            padding-bottom: 10px;
            span{
                color: #ED4014;
            }
            a{
                font-weight: 400;
                color: #796CF3;
                text-decoration: none;
            }
        }
        .candidate_list {
            li{
                width: 76px;
                background: #FFFFFF;
                border-radius: 3px;
                border: 1px solid #EEEEEE;
                text-align: center;
                padding: 12px 5px;
                float: left;
                margin-right: 7px;
                div{
                    width: 44px;
                    height: 44px;
                    border-radius: 26px;
                    margin: auto;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                p{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 17px;
                    text-align: center;
                    margin: 4px 0;
                }
                span{
                    display: block;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #796CF3;
                    line-height: 17px;
                    text-align: center;
                }
                &:last-child li{
                    margin-right: 0;
                }
            }
        }
    }
    .form_button{
        button{
            margin: auto;
            display: block;
            width: 140px;
            height: 32px;
            background: #CCCCCC linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            border: none;
            margin-top: 24px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #FFFFFF;
        }
    }
}

.login_dialog{
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
        text-align: center;
        padding: 10px 0 28px 0;
    }
    button{
        display: block;
        width: 140px;
        background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
        border-radius: 16px;
        margin: auto;
        border: none;
        font-size: 14px;
    }
}
.foot_box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2200;
    background: #F6F6F6;
    box-shadow: 0px -2px 20px 0px rgba(0,0,0,0.13);
    >div:nth-child(2){

        padding: 13px 0;
        background: rgba(246, 246, 246, 1);
        border-top: 1px solid #eeeeee;
        >div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: auto;
            .choice_style{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
            }
            span{
                font-size: 28px;
                font-family: FetteMittelschrift-Regular, FetteMittelschrift;
                font-weight: 400;
                color: #FF2C4C;
                padding: 0 0 0 3px;
                line-height: 33px;
            }
            button{
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 20px;
                padding: 12px 87px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }
    .people_information_style{
        display: flex;
        align-items: center;
        justify-content: center;
        .people_img{
            width: 64px;
            height: 64px;
            border-radius: 35px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .people_nickname{
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
            margin-left: 12px;
        }

    }
    .people_works{
        width: 72px;
        height: 48px;
        margin: auto;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:after{
            font-family: element-icons;
            position: absolute;
            left: 50%;
            top: 50%;
            content: '\e791';
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            margin-left: -7px;
            margin-top: -7px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .upload_description p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        span{
            color: #999999;
        }
    }
    .consult_price{
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF2C4C;
        line-height: 21px;
        span{
            font-size: 20px;
        }
    }
}

#buyer_show{
    .banner{
        margin-top: 66px;
        height: 340px;
        background: #000827;
        h2{
            font-family: GothamHTF;
            font-size: 40px;
            font-weight: 900;
            color: #FFFFFF;
            line-height: 42px;
            padding: 60px 0 38px 0;
            text-align: center;
        }
        .service_steps{
            background: linear-gradient(233deg, rgba(255,163,115,0.1) 0%, rgba(234, 94, 247, 0.48) 48%, rgba(119,108,243,0) 100%);
            backdrop-filter: blur(22px);
            padding: 37px 0;
            border-top: 1px solid;
            border-image: linear-gradient(228deg, #000827 0%, #FFA373 12%, #EA5EF7 48%, #776CF3 91%, #000827 100%) 1;
            >div{
                max-width: 1200px;
                display: flex;
                margin: auto;
                justify-content: center;
                .service_item{
                    display: flex;
                    align-items: center;
                    i:last-child{
                        margin-right: 34px;
                    }
                    i:first-child{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 54px;
                        height: 54px;
                        border-radius: 50%;
                        margin-right: 18px;
                        font-size: 26px;
                        color: #ffffff;
                    }
                    div{
                        margin-right: 34px;
                        font-size: 14px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 600;
                        color: #FFFFFF;
                        line-height: 24px;
                    }
                    &:first-child i:first-child{
                        background: #FF9C17;
                    }
                    &:nth-child(2) i:first-child{
                        background: #24DEB8;
                    }
                    &:nth-child(3) i:first-child{
                        background: #00B2FF;
                    }
                    &:nth-child(4) i:first-child{
                        background: #E6401F;
                    }
                }
            }

        }
    }
    .content{
        max-width: 1200px;
        margin: auto;
        h2{
            font-family: GothamHTF;
            font-size: 40px;
            font-weight: 900;
            color: #333333;
            line-height: 42px;
            text-align: center;
            padding-top: 73px;
            padding-bottom: 50px;
        }
        .search_style{
            clip-path: inset(0 round 23px);
            background: white;
        }
        .filter_header{
            border-radius: 10px;
            border: 1px solid #EEEEEE;
            margin-top: 30px;
            padding: 16px 30px;
            .filter_item{
                display: flex;
                align-items: baseline;
                padding: 1px 0;
                span{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 20px;
                    padding-right: 24px;
                    border-right: 1px solid #eeeeee;
                    flex-shrink:0;
                    position: relative;
                    top: 5px;
                }
            }
        }
        .filter_search{
            display: flex;
            background: #ffffff;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 20px 0;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 24px;
            span:first-child{
                color: #333333;
                font-weight: 600;
            }
        }
        .people_information_style{
            display: flex;
            align-items: center;
            .title_style{
                height: 46px;
                overflow: hidden;
                span{
                    display: inline-block;
                    background: rgba(245,100,34,0.1);
                    border-radius: 2px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 5px;
                    margin: 1px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #F56422;
                }
            }
            .people_img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink:0;
                margin-right: 24px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .people_nickname{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                margin-bottom: 8px;
            }
            .people_type{
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #00D9AD;
                line-height: 17px;
                background: rgba(0,217,173,0.1);
                border-radius: 9px;
                padding: 1px 5px;
                display: inline-block;
                margin-bottom: 7px;
            }
        }
        .people_works{
            display: block;
            width: 140px;
            margin: 0 6px;
            height: 79px;
            background: #7B7A7A;
            box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.07);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            &:before{
                font-family:element-icons;
                position: absolute;
                content: '\e791';
                width: 28px;
                height: 28px;
                font-size: 24px;
                background: #FFFFFF;
                box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.07);
                border: 2px solid #FFFFFF;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translate(-50%,-50%);
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            p{
                position: absolute;
                top: 5px;
                left: 5px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 17px;
                background: rgba(0, 0, 0, 0.43);
                border-radius: 10px;
                padding: 1px 6px;
            }
        }
        .upload_description{
            margin-top: 10px;
            div{
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 18px;
                padding-bottom: 8px;
                display: flex;
                span{
                    color: #999999;
                    flex-shrink: 0;
                }
            }
        }
        .other_description{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666 !important;
            padding-bottom: 0 !important;
            line-height: 22px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box !important;
            //// 下面这句用来控制行数
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .consult_price{
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FF2C4C;

            line-height: 21px;
            span{
                font-weight: 600;
                font-size: 16px;
            }
        }
    }
}

</style>
