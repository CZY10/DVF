<template>
    <div id="order">
        <div class="content">
            <el-form ref="form" class="form_search" size="small" :model="form" label-width="80px">
                <el-form-item label="订单记录" class="title">
                    <el-input placeholder="输入ASIN/订单号" v-model="form.keywords" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="currentPage=1;isMessage= 0;getOrderList()"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="form.dateValue"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        @change="currentPage=1;isMessage= 0;getOrderList()"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="text" class="reset_btn" @click="clearOrderList">恢复默认 <i class="el-icon-refresh-left"></i></el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                class="order_table"
                size="medium"
                :height="tableHeight"
                :header-cell-style="{background:'#F6F6F6'}"
                @sort-change="handlerSort"
                style="width: 100%">
                <el-table-column prop="createtime" label="创建时间" sortable="custom" min-width="100"></el-table-column>
                <el-table-column prop="id" label="订单号" min-width="110"></el-table-column>
                <el-table-column prop="asin" label="Asin及需求详情" min-width="110">
                    <template slot-scope="scope">
                        <p>{{ scope.row.asin}} <a :href="scope.row.url" target="_blank"><i class="iconfont icon-fx"></i></a></p>
                        <el-button class="deatail_btn" type="text" @click="checkVideoDialog=true;videoForm = scope.row;">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="nickName" label="接单达人">
                    <template slot-scope="scope">
                        <div class="avatar_box">
                            <p>
                                <el-avatar v-if="scope.row.avatar==''" icon="el-icon-user-solid"></el-avatar>
                                <router-link v-else target="_blank" :to="{path:'/homepage:'+5}"><el-avatar v-if="scope.row.influencer" :src="localhost + scope.row.influencer.image"></el-avatar></router-link>
                            </p>
                            <p>
                                <span v-if="scope.row.influencer_id==''||scope.row.influencer_id==null" style="color: #999999;">--</span>
                                <span v-else>NO.{{scope.row.influencer_id}}</span>
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="订单金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.price==''" style="color: #999999;">待反馈</span>
                        <span v-else>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="订单状态">
                    <template slot-scope="scope">
                        <el-popover
                            placement="bottom"
                            width="185"
                            trigger="hover">
                            <div solt="content" style="padding: 15px 15px 0 15px">
                                <el-steps direction="vertical" :active="scope.row.status+1">
                                    <el-step v-for="(item,index) in stepsList" :key="index" :title="item.title" :description="item.date"><span></span></el-step>
                                </el-steps>
                            </div>
                            <span slot="reference" class="status_style" :style="{color:scope.row.status == 0 ? '#FF000C' : scope.row.status == 1 ? '#FF000C' : scope.row.status == 2 ? '#FF000C' : scope.row.status == 4 ? '#00D9AD' : '#333333'}">
                                <i
                                    :style="{background:scope.row.status == 0 ? '#FF000C' : scope.row.status == 1 ? '#FF000C' : scope.row.status == 2 ? '#FF000C' : scope.row.status == 4 ? '#00D9AD' : '#333333'}"
                                ></i>
                                {{scope.row.status == 0 ? '待付定金' : scope.row.status == 1 ? '待付尾款' : scope.row.status == 2 ? '待寄送样品' : scope.row.status == 3 ? '待上传视频' : scope.row.status == 4 ? '已完成' : scope.row.status == 5 ? '已退定金' : '已退尾款频'}}
                            </span>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="hasMessage" label="达人沟通">
                    <template slot-scope="scope">
                        <el-badge is-dot :hidden="scope.row.message === 0 ? true : false" @click.native="orderId = scope.row.id;message = scope.row.message;scope.row.message = 0;handleChatFn(scope);" class="badge_style">
                            <i class="el-icon-chat-dot-round" style="font-size: 20px;cursor: pointer"></i>
                        </el-badge>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <div>
                            <div v-if="scope.row.status == 0" class="flex_center">
                                <el-button class="operation_btn payment_btn_style" size="small" @click="orderId = scope.row.id;handlePaymentOrder(0)" round>付定金</el-button>
                                <el-button class="operation_btn" size="small" @click="deleteOrderDialog=true;orderId = scope.row.id" round>删除</el-button>
                            </div>
                            <div v-else-if="scope.row.status == 1" class="flex_center">

                                <el-button class="operation_btn payment_btn_style" v-if="scope.row.status ===1 && scope.row.influencer_id != null" size="small" @click="orderId = scope.row.id;handlePaymentOrder(1)" round>付尾款</el-button>
                                <div class="normal_style" v-else>/</div>
                                <div class="normal_style" v-if="scope.row.apply_refund_deposit == 1" style="font-size: 12px;color: #C0C4CC;border-radius: 16px;border: 1px solid #EBEEF5;height: 32px;line-height: 30px;margin-right: 0;margin-left: 10px">已申请退定</div>
                                <el-button class="operation_btn" v-else size="small" @click="orderId = scope.row.id;returnDepositDialog=true" round>退定金</el-button>

                            </div>
                            <div v-else-if="scope.row.status == 2" class="flex_center">
                                <el-tooltip  class="item" effect="dark"  placement="bottom">
                                    <div slot="content" style="max-width: 200px;line-height: 20px;padding: 3px 5px 0 5px;">若未收到样品寄送地址，请检查消息反馈或联系工作人员！</div>
                                    <el-button class="payment_btn_style" size="small" @click="submitDialog=true;orderId = scope.row.id;handlerClearSubmit()" round>提交寄送信息</el-button>
                                </el-tooltip>
                            </div>
                            <div v-else-if="scope.row.status == 3" class="flex_center">
                                <div class="normal_style">/</div>
                                <div class="normal_style">/</div>
                            </div>
                            <div v-else-if="scope.row.status == 4" class="flex_center">
                                <a :href="scope.row.attachfile" target="_blank" style="text-decoration: none;color: #776CF3;border: 1px solid #776CF3;font-size: 12px;font-size: 12px;padding: 3px 16px;border-radius: 16px;margin-right: 10px">查看视频</a>
                                <el-button  v-if="scope.row.comment===1"class="operation_btn" size="small" round @click="handleComments(scope)">已评价</el-button>
                                <el-button v-else class="operation_btn" size="small" round @click="toCommentDialog=true;orderId = scope.row.id">去评价</el-button>
                            </div>
                            <div v-else-if="scope.row.status == 5" class="flex_center">
                                <div class="normal_style">/</div>
                                <el-button class="operation_btn" size="small" @click="deleteOrderDialog=true;orderId = scope.row.id" round>删除</el-button>
                            </div>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 20px">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 500]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <!--支付尾款-->
        <el-dialog
            title="请尽快支付尾款"
            :visible.sync="paymentDialog"
            v-if="paymentDialog"
            @close="handleClose"
            :close-on-click-modal="false"
            center
            width="500px">
            <el-alert
                title="支付完尾款，代表服务正式生效。在订单完成之前，平台不会将你的款项支付给达人。"
                center
                style="position: relative;background: #F4F2FF"
                :closable="false">
                <i class="iconfont icon-tips" style="position: absolute;top: 9px;left: 14px;font-size: 18px;color: #776CF3"></i>
            </el-alert>
            <div class="payment_content">
                <h4>¥{{ orderData.price }}</h4>
                <p>尾款金额</p>
                <p>订单号：<span>{{ orderData.out_trade_no }}</span></p>
                <ul>
                    <li>
                        <div class="qrcode" ref="alipayQrCodeUrl" style="padding: 5px"></div>
                        <p><i class="iconfont icon-zhifu-zhifubao" style="color: rgba(2, 169, 241, 1)"></i>支付宝支付</p>
                    </li>
                    <li>
                        <div class="qrcode" ref="wechatQrCodeUrl" style="padding: 5px"></div>
                        <p><i class="iconfont icon-zhifupingtai-weixin" style="color: rgba(59, 202, 114, 1)"></i>微信支付</p>
                    </li>
                </ul>
            </div>
        </el-dialog>
        <!--申请退还定金-->
        <el-dialog
            title="是否申请退还定金？"
            :visible.sync="returnDepositDialog"
            width="388px"
            :close-on-click-modal="false"
            class="return_deposit_dialog"
            center>
            <div style="padding-top: 10px">
                <p>退还定金后，我们将不再为您匹配达人</p>
                <p>如不满意达人或需<b>变更需求</b>，您可联系客服处理</p>
                <div class="button_box">
                    <el-button class="cancel_style" @click="returnDepositDialog=false">取消</el-button>
                    <el-button class="confirm_style" @click="handleReturnFrontMoney">确认</el-button>
                </div>
            </div>
        </el-dialog>
        <!--订单删除确认-->
        <el-dialog
            title="是否删除该订单记录？"
            :visible.sync="deleteOrderDialog"
            width="300px"
            :close-on-click-modal="false"
            class="return_deposit_dialog"
            center>
            <div style="padding-top: 10px">
                <p>删除后将不可恢复</p>
                <div class="button_box">
                    <el-button class="cancel_style" @click="deleteOrderDialog=false">取消</el-button>
                    <el-button class="confirm_style" @click="handleRemoveOrder">确认</el-button>
                </div>
            </div>
        </el-dialog>
        <!--去评价-->
        <el-dialog
            title="您对本次服务满意吗？"
            :visible.sync="toCommentDialog"
            width="460px"
            :close-on-click-modal="false"
            class="to_comment_dialog"
            center>
            <div>
                <p class="description">您的真实评价反馈，将极大地帮助我们改善产品体验及服务质量</p>
                <el-form :model="ruleCommentForm" :rules="commentRules" ref="ruleCommentForm" size="mini" label-position="left" label-width="100px" class="comment_form">
                    <el-form-item label="需求达成度" prop="complete">
                        <el-rate v-model="ruleCommentForm.complete" @change="ruleCommentForm.complete===0?completeError=true:completeError=false" :colors="colors"></el-rate>
                        <div v-if="completeError" class="form_error">请对需求达成度进行评价</div>
                    </el-form-item>
                    <el-form-item label="视频质量" prop="quality">
                        <el-rate v-model="ruleCommentForm.quality" @change="ruleCommentForm.quality===0?qualityError=true:qualityError=false" :colors="colors"></el-rate>
                        <div v-if="qualityError" class="form_error">请对视频质量进行评价</div>
                    </el-form-item>
                    <el-form-item label="交付周期" prop="cycle">
                        <el-rate v-model="ruleCommentForm.cycle" @change="ruleCommentForm.cycle===0?cycleError=true:cycleError=false" :colors="colors"></el-rate>
                        <div v-if="cycleError" class="form_error">请对交付周期进行评价</div>
                    </el-form-item>
                    <el-form-item label="留言反馈（非必填）" style="display: block;" class="form_item_block">
                        <el-input
                            type="textarea"
                            style="display: block"
                            :rows="3"
                            placeholder="请填写您的真实服务感受或建议"
                            v-model="ruleCommentForm.remarks">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form_item_block" style="margin-bottom: 0">
                        <el-button @click="commentSubmitForm('ruleCommentForm')" style="margin: auto;display: block;color:#ffffff;padding: 9px 57px;background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);border-radius: 16px;">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--已评价-->
        <el-dialog
            title="我的评价"
            :visible.sync="completeCommentDialog"
            width="460px"
            :close-on-click-modal="false"
            class="to_comment_dialog"
            center>
            <div>
                <el-form size="mini" label-position="left" disabled label-width="100px" style="margin-top: 10px" class="comment_form">
                    <el-form-item label="需求达成度">
                        <el-rate v-model="completeCommentList.satisfaction" :colors="colors"></el-rate>
                    </el-form-item>
                    <el-form-item label="视频质量">
                        <el-rate v-model="completeCommentList.quality" :colors="colors"></el-rate>
                    </el-form-item>
                    <el-form-item label="交付周期">
                        <el-rate v-model="completeCommentList.period" :colors="colors"></el-rate>
                    </el-form-item>
                    <el-form-item label="留言反馈（非必填）" style="display: block;margin-bottom: 0" class="form_item_block">
                        <el-input
                            type="textarea"
                            style="display: block"
                            :rows="3"
                            placeholder="请填写您的真实服务感受或建议"
                            v-model="completeCommentList.content">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--视频拍摄需求-->
        <el-dialog
            title="视频拍摄需求"
            :visible.sync="checkVideoDialog"
            width="702px"
            :close-on-click-modal="false"
            class="video_dialog"
            center>
            <div>
                <el-form size="small" label-position="left" disabled :model="videoForm" ref="videoRules" label-width="125px" class="video_ruleForm">
                    <el-form-item label="选择拍摄类型">
                        <div>
                            <el-radio-group v-model="videoForm.shoot" size="small">
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
                    </el-form-item>
                    <el-form-item label="产品亚马逊链接">
                        <p style="background: #F5F7FA;border: 1px solid #E4E7ED;border-radius: 4px">
                            <a :href="videoForm.url" style="color: #C0C4CC;padding-left: 15px;text-decoration: none" target="_blank">{{ videoForm.url }}</a>
                        </p>
<!--                        <el-input v-model="videoForm.product" placeholder="请输入产品亚马逊链接"></el-input>-->
                    </el-form-item>
                    <el-form-item label="产品所属品类">
                        <el-select v-model="videoForm.category_id" style="width: 100%" placeholder="请选择产品所属品类">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品核心卖点">
                        <el-input type="textarea" placeholder="请输入产品核心卖点" v-model="videoForm.sellingpoint"></el-input>
                    </el-form-item>
                    <el-form-item label="定制需求" v-if="videoForm.shoot == 1">
                        <el-input type="textarea" placeholder="请输入您的拍摄需求" v-model="videoForm.custom"></el-input>
                    </el-form-item>
                    <el-form-item label="备注（非必填）">
                        <el-input type="textarea" placeholder="不超过60字，如对达人性别、肤色，小孩或宠物出镜有要求，可备注" v-model="videoForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="候选达人" style="border-top: 1px solid #eeeeee;padding-top: 14px">
                        <ul class="candidate_list">
                            <router-link target="_blank" :to="{path:'/homepage:'+5}">
                                <li v-for="(item,index) in videoForm.selectedTableData" :key="index">
                                    <div>
                                        <img :src="item.img" alt="">
                                    </div>
                                    <p>{{item.nickname}}</p>
                                    <span>{{item.price}}</span>
                                </li>
                            </router-link>
                        </ul>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--提交寄送信息-->
        <el-dialog
            title="提交样品寄送信息"
            :visible.sync="submitDialog"
            width="622px"
            class="submit_dialog"
            :close-on-click-modal="false"
            center>
            <div>
                <el-form size="small" label-position="left" :model="sampleForm" :rules="sampleFormRules" ref="videoRules" label-width="115px" class="submit_form">
                    <el-form-item label="样品物流方式" prop="type">
                        <el-radio-group v-model="sampleForm.type" @change="checkSubmit('videoRules')">
                            <el-radio label="fba">FBA</el-radio>
                            <el-radio label="fbm">FBM</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="预计到达日期" prop="date">
                        <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-d" value-format="yyyy-MM-dd" :clearable="false" v-model="sampleForm.date" @change="checkSubmit('videoRules')" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <div v-show="sampleForm.type === 'fba'">
                        <el-form-item label="上传物流截图" key="file" prop="file">
                            <el-checkbox-group v-model="sampleForm.file" v-show="false"></el-checkbox-group>
                            <el-upload
                                ref="upload"
                                :class="{hide_upload:isHide}"
                                :action="localhost + '/api/common/upload'"
                                :on-change="changeUpload"
                                list-type="picture-card"
                                :on-success="uploadSuccess"
                                :headers="{token: token}"
                                :before-upload="beforeUpload">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview check_preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in" style="color: #333333;font-size: 18px"></i>
                                        </span>
                                        <span v-if="!sampleForm.disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                          <i class="el-icon-close" style="color: #ffffff"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <p class="description"><b>注：</b>为方便尽快开展视频制作，上传的截图需包含：<span>产品信息（型号、尺寸、颜色等）、预计到达时间、收件人及收货地址</span>等信息。</p>
                        </el-form-item>
                        <el-form-item label="">
                            <div class="demo_img">
                                <img src="../../../assets/images/screenshot.jpg" alt="">
                                <span class="el-upload-list__item-preview upload_preview" @click="checkViewImg">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item v-show="sampleForm.type === 'fbm'" label="物流单号" key="order" prop="order">
                        <el-input type="text" v-model="sampleForm.order" @keyup.native="checkSubmit('videoRules')" @blur="checkSubmit('videoRules')" @change="checkSubmit('videoRules')"></el-input>
                        <p class="description">如：1Z998F32032699533</p>
                    </el-form-item>
                </el-form>
                <div class="button_box">
                    <el-button :disabled="isDisabled" :class="{disabled_btn:isDisabled}" @click="submitForm('videoRules')">提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!--查看大图-->
        <el-dialog :visible.sync="imgDialog" class="viewDialog" :close-on-click-modal="false">
            <div class="viewImg">
                <img :src="dialogImageUrl" id="viewImg" alt="">
            </div>
        </el-dialog>
        <!--联系拍摄顾问-->
        <el-dialog
            title="联系拍摄顾问"
            :visible.sync="feedbackDialog"
            width="700px"
            :close-on-click-modal="false"
            class="feedback_modal"
            center>
            <div>
                <div class="chat">
                    <div v-if="chatData.length>0" class="chat-message-body" id="chatForm">
                        <div  dis-hover v-for="(item,index) in chatData" :key="index" class="message-card">
                            <div :class="item.type == 0?'message-row-right': 'message-row-left'">
                                <img :src="item.type == 0? avatar : require('../../../assets/images/gani.png')" height="32" width="32" >
                                <div class="message-content">
                                    <div :style="item.type == 0?'text-align:right;display: flex;flex-direction:row-reverse':''">
                                       {{item.type == 0 ? '我' : 'Gani-拍摄顾问'}}
                                        <span class="message-time">{{item.createtime}}</span>
                                    </div>
                                    <div class="message-body" v-show="item.content !== ''">
                                        {{item.content}}
                                    </div>
                                    <div class="feedback_images_list" v-show="item.images.length>0">
                                        <div>
                                            <div class="item_img" v-for="item in item.images">
                                                <template>
                                                    <img :src="item" fit="cover" width="100%" height="100%" />
                                                    <div class="demo-upload-list-cover">
                                                        <i class="el-icon-zoom-in" @click="handleImgView(item)"></i>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-empty v-else style="border-top: 1px solid #eeeeee" description="暂无消息" :image="require('../../../assets/images/chat_empty.png')"></el-empty>
                    <el-input
                        v-model="chatForm.feedback"
                        type="textarea"
                        style="margin:10px 0 0 0;"
                        maxlength="500"
                        placeholder="编辑回复内容..."
                        show-word-limit
                        :rows="4"/>
                </div>

                <div class="title">(非必选）上传图片 <span>(支持jpg/png不超过5M)</span></div>
                <div>
                    <el-upload
                        :action="localhost + '/api/common/upload'"
                        ref="chatUpload"
                        class="chat_upload"
                        list-type="picture-card"
                        :on-success="handleUploadSuccess"
                        :on-error="handleUploadError"
                        :headers="{token: token}"
                        :before-upload="beforeUpload">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}" style="height: inherit;">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                  <i class="el-icon-zoom-in"></i>
                                </span>
                                <span class="el-upload-list__item-delete" @click="handleChatRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
                <div style="text-align: center;margin-top: 24px"><el-button type="primary" size="small" @click="handlerSedMeg" style="border: none;padding: 10px 58px;border-radius: 16px;background: #3E7AFF linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);">提交</el-button></div>
            </div>
        </el-dialog>
        <!--支付定金-->
        <el-dialog
            title="请尽快支付定金"
            @close="handleClose"
            :visible.sync="payDepositDialogVisible"
            v-if="payDepositDialogVisible"
            width="500px"
            :close-on-click-modal="false"
            class="pay_deposit_dialog"
            center>
            <div>
                <el-alert
                    title="支付定金后，平台将正式为您对接达人。不满意可随时申请退还定金。"
                    center
                    style="position: relative"
                    :closable="false">
                    <i class="iconfont icon-tips" style="position: absolute;top: 8px;left: 14px;font-size: 18px;color: #796CF3"></i>
                </el-alert>
                <h5>¥{{ orderData.price }}</h5>
                <p>定金金额</p>
                <p>订单号：<span>{{ orderData.out_trade_no }}</span></p>
                <ul>
                    <li>
                        <div class="qrcode" ref="alipayQrCodeUrl" style="padding: 5px"></div>
                        <!--                        <div><img src="../../../assets/images/contact_us.png" alt=""></div>-->
                        <p><i class="iconfont icon-zhifu-zhifubao" style="color: rgba(2, 169, 241, 1)"></i>支付宝支付</p>
                    </li>
                    <li>
                        <!--                        <div><img src="../../../assets/images/contact_us.png" alt=""></div>-->
                        <div class="qrcode" ref="wechatQrCodeUrl" style="padding: 5px"></div>
                        <p><i class="iconfont icon-zhifupingtai-weixin" style="color: rgba(59, 202, 114, 1)"></i>微信支付</p>
                    </li>
                </ul>
            </div>
        </el-dialog>
        <!--支付完成-->
        <el-dialog
            title="支付完成"
            :visible.sync="paymentCompletedDialogVisible"
            width="360px"
            @close="getOrderList"
            :close-on-click-modal="false"
            class="payment_completed_dialog"
            center>
            <div slot="title">
                <i style="color: rgba(2, 181, 120, 1);font-size: 20px" class="el-icon-success"></i>
                支付完成
            </div>
            <div>
                <p>平台将开始匹配并对接达人，预计1-2个工作日会收到反馈，敬请留意</p>
                <div class="button_box know_btn">
                    <el-button @click="paymentCompletedDialogVisible=false;getOrderList()">我知道了</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {orderList, orderDelete, payOrder, checkPayment, returnFrontMoney, commentCreate, createTransport, getChatList, createChat} from "@/api";
import QRCode from "qrcodejs2";
import {mapMutations} from "vuex";
export default {
    name: "order",
    data(){
        const validateSelect = (rule, value, callback) => {
            if(this.sampleForm.type !== 'fba' ){
                if(rule.field === 'order' && this.sampleForm.type && !value){
                    callback(new Error(rule.message))
                }else {
                    callback()
                }
            }else {
                if(rule.field === 'file' && this.sampleForm.type && !value){
                    callback(new Error(rule.message))
                }else {
                    callback()
                }
            }
        }
        return {
            isHide:false,
            form:{
                keywords:'',
                dateValue:[],
            },
            tableData:[],
            currentPage:1,
            tableHeight:document.documentElement.clientHeight-235,
            paymentDialog:false,
            returnDepositDialog:false,
            deleteOrderDialog:false,
            toCommentDialog: false,
            completeCommentDialog:false,
            checkVideoDialog:false,
            submitDialog:false,
            imgDialog:false,
            feedbackDialog:false,
            payDepositDialogVisible:false,
            messageData:[],
            uploadFile:[],
            stepsList:[
                {
                    title: '步骤一',
                    date:'2022-02-14'
                },
                {
                    title: '步骤二',
                    date:'2022-02-14'
                },
                {
                    title: '步骤三',
                    date:'2022-02-14'
                }
            ],
            videoForm: {},
            dialogImageUrl: '',
            completeCommentList:{
                satisfaction:null,
                quality:null,
                period:null,
                content:'',
            },
            ruleCommentForm:{
                complete: null,
                quality: null,
                cycle: null,
                remarks:'',
            },
            commentRules: {
                complete:[{required: true, message: '请对需求达成度进行评价', trigger: 'change'}],
                quality:[{required: true, message: '请对需求达成度进行评价', trigger: 'change'}],
                cycle:[{required: true, message: '请对交付周期进行评价', trigger: 'change'}],
            },
            completeError:false,
            qualityError:false,
            cycleError:false,
            colors: ['#796CF3', '#796CF3', '#796CF3'],
            sampleForm:{
                type:'fba',
                file:'',
                date:'',
                order:'',
                disabled: false
            },
            sampleFormRules:{
                type: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                date: [
                    { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                ],
                file:[
                    { required: true, validator:validateSelect, message: '请上传物流截图', trigger: 'change' },
                ],
                order:[
                    { required: true, validator:validateSelect, message: '请输入物流单号', trigger: 'change' }
                ]
            },
            checkImgSuccess:true,
            isDisabled:true,
            feedbackVal: '',
            uploadList:[],
            //聊天
            chatVisible:this.value,
            loading:false,
            defualtAvatar:require('../../../assets/images/people_header.png'), // 后端没有返回头像默认头像，注意：需要用require请求方式才能动态访问本地文件
            chatData:[],
            distincData:[], // 消息去重数组
            offsetMax:0, // 最大偏移位，记录当前获取的最大id，往后的定时轮询数据时每次只获取比这个id大的数据
            offsetMin:0,//  // 最小偏移位，记录当前获取的最小id，往上滑动时每次只获取比这小id大的数据
            searchForm:{ // 每次定时获取数据或首次加载数据提交的form表单数据
                pageNumber: 1,
                pageSize: 20
            },
            chatForm:{ // 发送数据提交数据表单
                feedback:"",
                feedback_images:[]
            },
            timerSwitch:0, // 定时器开关，默认关闭
            localhost:process.env.VUE_APP_BASE_URL,
            total:0,
            pageSize: 20,
            pageNumber:1,
            pageState: true,
            orderId:'',
            paymentCompletedDialogVisible:false,
            orderData:{},
            checkPaymentVal:'',
            token:'',
            avatar:'',
            isMessage: this.$store.state.order.isMessage,
            message: 0,
            order:'',
            orderType:'',
        }
    },
    mounted() {
        this.getOrderList();
        this.token = localStorage.getItem('token');
        this.avatar = localStorage.getItem('avatar');
    },
    computed:{
        query(){
          return [this.payDepositDialogVisible,this.paymentDialog]
        },
        isMessageFn(){
            return this.$store.state.order.isMessage
        }
    },
    watch:{
        query:{
            handler(val){
                if(val[0] === false && val[1]===false){
                    setTimeout(()=>{
                        clearInterval(this.checkPaymentVal);
                    },5000)
                }
            }
        },
        isMessageFn(newVal){
            if(newVal == 1){
                this.isMessage = newVal;
                this.getOrderList();
            }
        }
    },
    methods:{
        ...mapMutations('order', ["setIsMessage","setMessage"]),
        handleComments(content){
            this.completeCommentDialog=true;
            if (content.row.comments !=null) this.completeCommentList=content.row.comments
        },
        //排序
        handlerSort(column){
            column.order == 'ascending'? this.orderType='asc' : this.orderType='desc';
            this.order = column.prop;
            this.getOrderList();
        },
        //获取订单列表
        getOrderList(){
            orderList({
                keyword:this.form.keywords,
                date: this.form.dateValue,
                pageSize: this.pageSize,
                page: this.currentPage,
                message: this.isMessage,
                order: this.order,
                orderType: this.orderType,
            })
                .then((res) => {
                    if(res.code === 1){
                        this.pageState = true;
                        this.tableData = res.data.data;
                        this.total = res.data.total;
                        this.setIsMessage(0)
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        //初始化列表
        clearOrderList(){
            this.form.keywords = '';
            this.form.dateValue = [];
            this.currentPage = 1;
            this.isMessage= 0;
            this.getOrderList();
        },
        //分页
        handleSizeChange(val) {
            this.pageState = false;
            this.pageSize = val;
            this.currentPage = 1;
            this.isMessage= 0;
            if (this.pageState === false) this.getOrderList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.isMessage= 0;
            if(this.pageState === true) this.getOrderList();
        },
        //删除订单
        handleRemoveOrder(){
            orderDelete({order_id:this.orderId})
                .then((res)=>{
                    if(res.code === 1){
                        this.$message.success('删除成功！');
                        this.deleteOrderDialog = false;
                        this.getOrderList();
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        //支付定金/尾款
        handlePaymentOrder(type){
            type===0 ? this.payDepositDialogVisible=true:this.paymentDialog=true
            payOrder({
                order_id: this.orderId,
                type:type
            })
                .then((res) => {
                    if(res.code === 1){
                        this.orderData = res.data.order;
                        if(this.$refs.alipayQrCodeUrl){
                            new QRCode(this.$refs.alipayQrCodeUrl, {
                                text: res.data.alipay_qrcode,
                                width: 130,
                                height: 130,
                                colorDark: '#000000',
                                colorLight: '#ffffff',
                                correctLevel: QRCode.CorrectLevel.H
                            })
                        }
                        if(this.$refs.wechatQrCodeUrl){
                            new QRCode(this.$refs.wechatQrCodeUrl, {
                                text: res.data.wechat_qrcode,
                                width: 130,
                                height: 130,
                                colorDark: '#000000',
                                colorLight: '#ffffff',
                                correctLevel: QRCode.CorrectLevel.H
                            })
                        }
                        this.handlerCheckPayment(res.data.order.out_trade_no);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        //检测是否支付成功
        handlerCheckPayment(order){
            let _this = this;
            _this.checkPaymentVal = setInterval(function (){
                checkPayment({
                    out_trade_no:order
                })
                    .then((res) => {
                        if(res.code === 1){
                            if(res.data.status === 'success'){
                                _this.payDepositDialogVisible = false;
                                _this.paymentDialog = false;
                                _this.paymentCompletedDialogVisible = true;
                                clearInterval(_this.checkPaymentVal);
                            }
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err.message);
                    });
            },3000)
        },
        //清除定时器
        handleClose(){
            clearInterval(this.checkPaymentVal);
        },
        //退定金
        handleReturnFrontMoney(){
            returnFrontMoney({
                order_id: this.orderId
            })
                .then((res)=>{
                    if(res.code === 1){
                        this.returnDepositDialog = false;
                        this.$message.success('退还定金成功！');
                        this.getOrderList();
                    }
                })
                .catch((err)=>{
                    this.$message.error(err.message);
                })
        },
        //去评价
        commentSubmitForm(){
            this.ruleCommentForm.complete===0 ? this.completeError = true :  this.completeError = false;
            this.ruleCommentForm.cycle===0 ? this.cycleError = true :  this.cycleError = false;
            this.ruleCommentForm.quality===0 ? this.qualityError = true :  this.qualityError = false;
            if(this.ruleCommentForm.complete!==0 && this.ruleCommentForm.cycle!==0 && this.ruleCommentForm.quality !==0){
                commentCreate({
                    order_id: this.orderId,
                    satisfaction: this.ruleCommentForm.complete,
                    quality: this.ruleCommentForm.quality,
                    period: this.ruleCommentForm.cycle,
                    content: this.ruleCommentForm.remarks
                })
                    .then((res)=>{
                        if(res.code === 1){
                            this.toCommentDialog = false;
                            this.$message.success('评价成功！');
                            this.ruleCommentForm.complete=0;
                            this.ruleCommentForm.quality=0;
                            this.ruleCommentForm.cycle=0;
                            this.getOrderList();
                        }
                    })
                    .catch((err)=>{
                        this.toCommentDialog = false;
                        this.$message.error('评价失败！')
                    })
            }else {
                return
            }

        },
        //上传
        uploadSuccess(res, file) {
            this.sampleForm.file = res.data.fullurl;
            this.sampleForm.file !== ''? this.isHide = true : this.isHide = false;
            if(this.sampleForm.type === '' || this.sampleForm.date === '' || this.sampleForm.file === ''){
                this.isDisabled = true;
            }else {
                this.isDisabled = false;
            }
        },
        beforeUpload(file) {
            const isFileType = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isFileType) {
                this.$message.error('上传头像图片只能是 JPG 格式或者 PNG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isFileType && isLt5M;
        },
        handleRemove(file) {
            const index = this.$refs.upload.uploadFiles.findIndex(e=>e.uid === file.uid);
            this.$refs.upload.uploadFiles.splice(index,1);
            this.isHide = false;
            this.sampleForm.file = '';
            if(this.sampleForm.type === '' || this.sampleForm.date === '' || this.sampleForm.file === ''){
                this.isDisabled = true;
            }else {
                this.isDisabled = false;
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.imgDialog = true;
        },
        changeUpload(file, fileList){
            fileList.length>1 ? this.isHide = false:this.isHide=true;
        },
        checkViewImg(){
            this.dialogImageUrl = require('../../../assets/images/screenshot.jpg')
            this.imgDialog = true;
        },
        handlerClearSubmit(){
            this.sampleForm={
                type:'fba',
                file:'',
                date:'',
                order:'',
                disabled: false
            }
            this.isDisabled = true;
            if(this.$refs.upload){
                this.$refs.upload.clearFiles();
                this.isHide=true;
            }
            this.isHide = false
        },
        //提交样品寄送信息
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createTransport({
                        order_id: this.orderId,
                        transport_type: this.sampleForm.type,
                        transport_number: this.sampleForm.order,
                        transportimage:this.sampleForm.file,
                        transporttime:this.sampleForm.date,
                    })
                        .then((res)=>{
                            if(res.code === 1){
                                this.submitDialog = false;
                                this.$message.success('样品寄送信息提交成功!');
                                this.getOrderList();
                            }
                        })
                        .catch((err)=>{
                            this.submitDialog = false;
                            this.$message.error(err.message)
                        })
                } else {
                    this.$message.warning('请先填写提交信息！')
                    return false;
                }
            });
        },
        //检测提交按钮是否禁用
        checkSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            });
        },
        handleChatFn(){
            this.setMessage(this.message)
            this.feedbackDialog=true;
            this.chatForm.feedback='';
            if(this.chatForm.feedback_images.length>0){
                this.chatForm.feedback_images=[];
                this.$refs.chatUpload.clearFiles();
            }
            this.handlerGetChatList();
        },

        //获取聊天列表
        handlerGetChatList(){
            getChatList({
                order_id: this.orderId
            })
                .then((res)=>{
                    if(res.code === 1){
                        this.chatData = res.data;
                        if(this.chatData.length>0){
                            this.scrollToBottom();
                        }
                    }
                })
                .catch((err)=>{
                    this.$message.error(err.message)
                })
        },
        // show(){ // 打开窗体初始化数据
        //     // 初始化数据
        //     this.chatData =[];
        //     this.distincData =[];
        //     this.offsetMax = 0;
        //     this.offsetMin = 0;
        //     this.searchForm.pageNumber = 1;
        //     this.searchForm.pageSize = 20;
        //     this.chatForm ={
        //         content:"",
        //         msg:""
        //     };
        //     // this.loadMsg();
        //     this.chatVisible = true;
        //     // 开启定时器
        //     this.timerSwitch = 1;
        //     // this.reloadData();
        // },
        // 发送消息
        handlerSedMeg(){
            if(this.chatForm.feedback == '' && this.chatForm.feedback_images.length == 0){
                this.$message.warning('不能发送空白信息');
                return;
            }
            createChat({
                order_id: this.orderId,
                content: this.chatForm.feedback,
                images: this.chatForm.feedback_images
            })
                .then((res)=>{
                    if(res.code === 1){
                        this.chatData.push(res.data);
                        this.scrollToBottom();
                        this.chatForm.feedback='';
                        this.chatForm.feedback_images=[];
                        this.$refs.chatUpload.clearFiles();
                    }
                })
                .catch((err)=>{
                    this.$message.error(err.message)
                })
        },
        scrollToBottom(){ // 滚动到窗体底部
            this.$nextTick(()=>{
                let chatForm = document.getElementById("chatForm");
                chatForm.scrollTop = chatForm.scrollHeight;
            });

        },
        handleChatRemove(file){
            const index = this.$refs.chatUpload.uploadFiles.findIndex(e=>e.uid === file.uid);
            this.$refs.chatUpload.uploadFiles.splice(index,1);
            this.sampleForm.file = '';

        },
        handleUploadSuccess(res, file){
            this.chatForm.feedback_images.push(res.data.url)
        },
        handleUploadError(err){
            this.$message.error(err.message)
        },
        /*查看上传文件*/
        handleImgView (file) {
            this.dialogImageUrl = file
            this.imgDialog = true;
        },

    }
}
</script>
<style lang="less">
#order{
    .know_btn{
        padding-top: 28px;
        button{
            display: block;
            margin: auto;
            background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 20px;
            padding: 5px 41px;
        }
    }
    .viewDialog .el-dialog{
        width: auto;
    }
    .viewImg img{
        display: block;
        width: 100%;
    }
    .el-upload-list__item{
        transition: none;
    }
    .form_error{
        position: absolute;
        top: 12px;
        font-size: 12px;
        left: -5px;
        color: #f56c6c;
    }
    .el-table__body-wrapper .el-table__body{
        margin-bottom: 30px;
    }
    .el-upload-list--picture-card .el-upload-list__item .el-icon-close{
        display: block;
        width: 20px;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background: #ED4014;
        opacity: 1;
    }
    .submit_form .el-upload-list--picture-card .el-upload-list__item{
        position: relative;
        transition: none !important;
        margin-bottom: 0 !important;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions span{
        display: inline-block;
        background: none;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{
        position: absolute;
        right: 0;
        top: 0;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions .check_preview{
        position: absolute;
        right: 9px;
        bottom: 0;
    }
    .flex_center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-alert__title{
        font-size: 12px !important;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400 !important;
        color: #666666 !important;
    }
    .el-alert__content{
        padding: 0 0 0 20px !important;
    }
    .el-form-item--mini .el-form-item__label{
        line-height: 20px !important;
    }
    .el-rate__icon{
        font-size: 20px;
    }
    .form_item_block{
        padding-top: 10px;
    }
    .form_item_block label{
        width: 100% !important;
        margin-bottom: 10px;
    }
    .form_item_block .el-form-item__content{
        margin-left: 0 !important;
        float: inherit !important;
    }
    .el-form-item--mini .el-form-item__content{
        float: right;
    }
    //上传
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100% !important;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: 150px;
        display: block;
    }
    .submit_form{
        .el-upload--picture-card{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-icon-plus{
                &:after{
                    content: '点击上传（支持jpg、png，5M以内）';
                    display: block;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 17px;
                    margin-top: 2px;
                }
            }

        }
        .el-upload-list--picture-card .el-upload-list__item{
            width: 100%;
        }
        .el-upload-list--picture-card .el-upload-list__item-thumbnail{
            height: 150px;
        }
        .description{
            line-height: 20px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #999999;
            padding-top: 10px;
            b{
                font-weight: normal;
                color: #ED4014;
            }
            span{
                color: #796CF3;
            }
        }
        .demo_img{
            height: 180px;
            border: 1px solid #eeeeee;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .upload_preview{
                position: absolute;
                cursor: pointer;
                right: 9px;
                bottom: 0;
                i{
                    color: #333333;
                    font-size: 18px;
                }
            }
        }
        button{
            width: 140px;
            height: 32px;
            background: #CCCCCC linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #FFFFFF;
            display: block;
            margin: auto;
            margin-top: 13px;
        }
    }
    /*单选样式*/
    .el-radio__input.is-checked .el-radio__inner{
        border-color: #796CF3;
        background: #796CF3;
    }
    /*在线聊天*/
    .chat-message-body {
        height: 350px;
        overflow: auto;
        border-top: 1px solid #eeeeee;
    }
    /* 设置滚动条的样式 */
    .chat-message-body::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    .chat-message-body::-webkit-scrollbar-track {
        border-radius:10px;
    }
    /* 滚动条滑块 */
    .chat-message-body::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0.1);
    }
    .chat-message-body::-webkit-scrollbar-thumb:window-inactive {
        background:#D8D8D8;
    }

    .chat-message-body .nothing{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .message-card {
        margin:20px 0;
    }
    .message-row-left {
        display: flex;
        flex-direction:row;
        overflow: auto;
    }
    .message-row-right {
        display: flex;
        flex-direction:row-reverse;
        overflow: auto;
    }
    /* 设置滚动条的样式 */
    .message-row-left::-webkit-scrollbar,
    .message-row-right::-webkit-scrollbar{
        height:6px;
    }
    /* 滚动槽 */
    .message-row-left::-webkit-scrollbar-track,
    .message-row-right::-webkit-scrollbar-track {
        border-radius:10px;
    }
    /* 滚动条滑块 */
    .message-row-left::-webkit-scrollbar-thumb,
    .message-row-right::-webkit-scrollbar-thumb{
        border-radius:10px;
        background:rgba(0,0,0,0.1);
    }
    .message-row-left::-webkit-scrollbar-thumb:window-inactive,
    .message-row-right::-webkit-scrollbar-thumb:window-inactive{
        background:#D8D8D8;
    }
    .message-row-right .message-body{
        /*display: inline;*/
        background: #796CF3;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 24px;
        border-top-right-radius: 0;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .message-row-left .message-body{
        background: #F6F7F9;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
        border-top-right-radius: 8px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .message-row-right > img,
    .message-row-left > img{
        border-radius: 50%;
    }
    .message-row-left .message-content{
        margin-right: 40px;
        align-items: start;
    }
    .message-row-right .message-content{
        margin-left: 40px;
        align-items: end;
    }
    .message-content {
        margin:5px 10px 5px 10px;
        display: flex;
        flex-direction:column;
    }
    .message-content .name{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
    }
    .message-body {
        padding: 6px 14px;
        border-radius:3px;
        margin-top: 10px;
    }
    .message-time {
        margin:0 10px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
    }
    .footer-btn {
        float:right;
        margin-bottom: 5px;
    }
    .spin-icon-load {
        animation:ani-spin 1s linear infinite;
    }
    @keyframes ani-spin{
        form{transform: rotate(0deg);}
        50% {transform: rotate(180deg);}
        to  {transform: rotate(360deg);}
    }
    .feedback_images_list{
        display: flex;
        position: relative;
    }
    .feedback_images_list > div{
        display: flex;
        justify-content: end;
        padding: 8px;
        margin-top: 10px;

    }
    .feedback_images_list .item_img{
        width: 96px;
        height: 96px;
        margin: 6px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
    }
    .message-row-right .feedback_images_list{
        justify-content: end;
    }
    .message-row-right .feedback_images_list > div{
        background: #796CF3;
        border-top-right-radius: 0;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .message-row-left .feedback_images_list > div{
        background: rgba(246, 247, 249, 1);
        border-top-right-radius: 8px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .feedback_images_list .item_img .demo-upload-list-cover{
        display: none;
    }
    .feedback_images_list .item_img:hover .demo-upload-list-cover{
        display: block;
    }
    .feedback_images_list .demo-upload-list-cover{
        line-height: 90px;
        text-align: center;
        top: 0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        cursor: pointer;
        i{
            color: #ffffff;
        }
    }
    .feedback_modal textarea.ivu-input{
        height: 100px;
        border-radius: 4px;
    }
    .feedback_modal .title{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #666666;
        line-height: 20px;
        margin: 20px 0 10px 0;
    }
    .feedback_modal .el-dialog__title:after{
        display: block;
        content: '请在下方留言反馈，系统会及时通知顾问查看';
        font-size: 12px;
        color: #999999;
        font-weight: normal;
        text-align: center
    }
    .feedback_modal .title span{
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #999999;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 17px;
    }
    .chat_upload .el-upload--picture-card{
        width: 62px;
        height: 60px;
        line-height: 60px;
    }
    .chat_upload .el-upload-list--picture-card .el-upload-list__item{
        width: 62px;
        height: 60px;
    }
    .chat_upload i{
        font-size: 14px;
    }
    .chat_upload .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{
        top: -10px;
        right: 2px;
    }
    .chat_upload .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-preview{
        position: absolute;
        right: 2px;
        bottom: -6px;
    }
    /*支付定金弹窗*/
    .pay_deposit_dialog {
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
}

.hide_upload .el-upload--picture-card {
    display: none !important;
}
/*单选框*/
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
    background-image: url("../../../assets/images/radio_style1_bg.png");
}
.radio_style1.is-bordered.is-checked{
    border: 2px solid rgba(121, 108, 243, 1) !important;
}
/*步骤条样式*/
.el-step.is-vertical .el-step__title{
    font-size: 14px;
}
.el-step__head.is-finish{
    color: #02B578 !important;
    border-color: #02B578 !important;
}
.el-step__title.is-finish{
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #02B578 !important;
    line-height: 20px;
}
.el-step__description.is-finish{
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999 !important;
    line-height: 17px;
}
.el-step.is-vertical .el-step__main{
    margin-bottom: 15px;
}
/*分页样式*/
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #ffffff !important;
    color: #776CF3 !important;
    border: 1px solid #776CF3;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #ffffff !important;
    border: 1px solid #DCDEE2;
    font-weight: normal;
    color: #999999 !important;
}
.el-table .el-table__cell.gutter{
    background: #F6F6F6;
}
.el-badge__content.is-dot{
    width: 6px !important;
    height: 6px !important;
    top: 2px !important;
    right: 2px !important;
}

.el-table__header-wrapper{
    border-radius: 4px;
    background: #F6F6F6;
    table{
        padding: 0 30px;
        width: auto !important;
    }
}
.el-table th.el-table__cell.is-leaf{
    border-bottom: none !important;
    padding: 6px 0;
}
.el-table__body-wrapper{
    border: 1px solid #eeeeee;
    padding: 10px 30px;
    width: auto !important;
    border-radius: 4px !important;
    margin-top: 10px;
    .el-table__body{
        width: auto !important;
    }
}
.el-table th.el-table__cell>.cell,
.el-table td.el-table__cell div
{
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
}
.order_table {
    .cell {
        text-align: center;
    }
}
</style>
<style scoped lang="less">
#order{
    margin-top: 66px;
    background: #F5F7F9;
    padding: 20px 30px 0 30px;
    .reset_btn{
        margin-left: 30px;
        color: #333333;
        font-size: 14px;
        i{
            color: #796CF3;
            font-size: 16px;
        }
    }
    .content{
        background: #FFFFFF;
        border-radius: 0px 4px 4px 0px;
        border: 1px solid #EEEEEE;
        padding: 20px 30px;
        .form_search{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
            }
        }
        .order_table{
            i{
                color: #796CF3;
                font-size: 10px;
            }
            .deatail_btn{
                color: #796CF3;
                font-size: 12px;
                padding: 3px 5px;
            }
            .avatar_box{
                display: flex;
                align-items: center;
                >p:first-child{
                    width: 40px;
                    height: 40px;
                    background: #E5E5E5;
                    border-radius: 50%;
                    line-height: 40px;
                    margin-right: 10px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
            }
            .status_style{
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    margin-right: 6px;
                }
            }
            .operation_btn{
                width: 82px;
                border-radius: 16px !important;
            }
            .payment_btn_style{
                color: #796CF3;
                border: 1px solid #796CF3;
                &:hover{
                    background: none;
                }
            }
            .normal_style{
                width: 82px;
                color: #333333;
                margin: 0 5px;
            }
        }
    }
    .payment_content{
        h4{
            font-size: 22px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FF2C4C;
            line-height: 30px;
            text-align: center;
            padding: 20px 0 6px 0;
        }
        p{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            text-align: center;
            padding-bottom: 10px;
            span{
                color: #333333;
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
                    padding-bottom: 0;
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
    .return_deposit_dialog{
        p{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 24px;
            text-align: center;
            padding-bottom: 4px;
            b{
                color: #333333;
            }
        }
        .button_box{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 24px;
            button{
                padding: 8px 45px;
                border-radius: 16px;
                font-size: 14px;
            }
            .cancel_style{
                border: 1px solid #EEEEEE;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #999999;
            }
            .confirm_style{
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                font-family: PingFangSC-Regular, PingFang SC;
                color: #FFFFFF;
            }
        }

    }
    .to_comment_dialog{
        .description{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 17px;
            text-align: center;
            margin-bottom: 34px;
        }
        .comment_form{
            .el-form-item{
                margin-bottom: 14px;
            }
        }
    }
    .video_dialog{
        .el-form-item--small.el-form-item{
            margin-bottom: 14px !important;
        }
        .video_ruleForm{
            height: 565px;
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
                    content: url("../../../assets/images/radio_style1_bg.png");
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
                    content: url("../../../assets/images/radio_style2_bg.png");
                    display: block;
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
            }
            .candidate_list {
                li{
                    width: 60px;
                    height: 83px;
                    background: #FFFFFF;
                    border-radius: 3px;
                    border: 1px solid #EEEEEE;
                    text-align: center;
                    padding: 12px;
                    float: left;
                    margin-right: 8px;
                    div{
                        width: 44px;
                        height: 44px;
                        border-radius: 26px;
                        margin: auto;
                        img{
                            width: 100%;
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
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .submit_dialog{
        .el-form-item--small.el-form-item{
            margin-bottom: 20px !important;
        }
        .submit_form{
            padding: 10px 16px 0 16px;
        }
        .button_box{
            padding-top: 7px;
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
            margin: 5px 0;
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
}
</style>
