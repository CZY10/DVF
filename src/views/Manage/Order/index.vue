<template>
  <div id="order">
    <div class="content">
      <el-form ref="form" class="form_search" size="small" :model="form" label-width="80px">
        <el-form-item label="订单记录" class="title" style="font-weight: 600">
          <el-input placeholder="输入ASIN/订单号" v-model="form.keywords">
            <el-button slot="append" icon="el-icon-search" @click="
              currentPage = 1;
            isMessage = 0;
            tableData = [];
            getOrderList();
            "></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="日期" class="title">
          <el-date-picker v-model="form.dateValue" type="daterange" value-format="yyyy-MM-dd" @change="
            currentPage = 1;
          isMessage = 0;
          tableData = [];
          getOrderList();
          " start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="text" class="reset_btn" @click="clearOrderList">恢复默认 <i
              class="el-icon-refresh-left"></i></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="tableData" class="order_table" size="medium" :height="tableHeight"
        :header-cell-style="{ background: '#F6F6F6' }" @sort-change="handlerSort"
        @selection-change="handleSelectionChange" style="width: 100%" @select-all="selectAll"
        :row-class-name="tableRowClassName">
        <!-- 订单多选 -->
        <el-table-column type="selection" :selectable="selectable">
        </el-table-column>
        <el-table-column label="订单号" min-width="110">
          <template slot-scope="scope">
            <div style="padding-left: 12px">
              <p>{{ scope.row.id }}</p>
              <p style="font-size: 12px; color: #999">
                {{ scope.row.createtime }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="意向红人" min-width="40">
          <template slot-scope="scope">
            <div v-if="scope.row.influencer_info.length == 0">平台推荐</div>
            <div v-else>
              <p>{{ scope.row.influencer_info.length }}个已选</p>
              <p style="cursor: pointer; color: #796cf3" @click="centerDialogVisibleXinzTan(scope.row.influencer_info)">
                查看
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="asin" label="需求内容" min-width="160">
          <template slot-scope="scope">
            <div class="asin">
              <div class="asin-img">
                <img :src="scope.row.image" v-if="scope.row.image != ''" />
                <img src="@/assets/images/tp.png" v-else style="width: 20px; height: 20px; margin-top: 20px" />
              </div>
              <div class="asin-p">
                <p class="p1" :title="scope.row.title">{{ scope.row.title }}</p>
                <p class="p2">
                  <span v-if="scope.row.asin">{{ scope.row.asin }}</span>
                  <span v-else>-----</span>
                  <a :href="scope.row.url" target="_blank" v-if="scope.row.url"><i class="iconfont icon-fx"></i></a>
                </p>
              </div>
              <div class="asin-div">
                <span @click="handleCheckOrderDetail(scope.row)">详情</span>
                <i class="iconfont icon-tx" v-if="scope.row.status == '0'" @click="handleCheckOrderDetail(scope.row)"></i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="接单红人">
          <template slot-scope="scope">
            <div class="avatar_box">
              <p>
                <el-avatar v-if="scope.row.influencer_id == '' ||
                  scope.row.influencer_id == null
                  " icon="el-icon-user-solid"></el-avatar>
                <router-link v-else target="_blank"
                  :to="{ path: '/homepage?id=' + scope.row.influencer.id + '&user-id=' + scope.row.influencer.user_id }"><el-avatar
                    v-if="scope.row.influencer" :src="scope.row.influencer.image"></el-avatar></router-link>
              </p>
              <p>
                <span v-if="scope.row.influencer_id == null && scope.row.status == 0
                  ">待匹配</span>
                <span v-else-if="scope.row.influencer_id == null && scope.row.status == 1
                  ">匹配中</span>
                <span v-else>NO.{{ scope.row.influencer_id }}</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="订单金额">
          <template slot-scope="scope">
            <span v-if="scope.row.influencer_id == null">待反馈</span>
            <span v-else>￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="100">
          <template slot-scope="scope">
            <el-popover placement="right" width="200" @hide="stepsList = []" @show="handleShowFn(scope.row)"
              trigger="hover" style="position: relative">
              <div solt="content" style="padding: 15px 15px 0 15px">
                <el-steps direction="vertical" :active="stepsList.current">
                  <el-step v-for="(item, index) in stepsList.items" icon="el-icon-success" :key="index" :title="item.name"
                    :description="item.createtime"><span></span></el-step>
                </el-steps>
              </div>
              <span slot="reference" class="status_style" :style="{
                color:
                  scope.row.status == 0
                    ? '#FF000C'
                    : scope.row.status == 1
                      ? '#FF000C'
                      : scope.row.status == 2
                        ? '#FF000C'
                        : scope.row.status == 4
                          ? '#00D9AD'
                          : '#333333',
              }">
                <i :style="{
                  background:
                    scope.row.status == 0
                      ? '#FF000C'
                      : scope.row.status == 1
                        ? '#FF000C'
                        : scope.row.status == 2
                          ? '#FF000C'
                          : scope.row.status == 4
                            ? '#00D9AD'
                            : '#333333',
                }"></i>
                {{
                  scope.row.status == 0
                  ? "待支付定金"
                  : scope.row.status == 1
                    ? "待支付订单"
                    : scope.row.status == 2
                      ? "待寄送样品"
                      : scope.row.status == 3
                        ? "待上传视频"
                        : scope.row.status == 4
                          ? "已完成"
                          : scope.row.status == 5
                            ? "已退定金"
                            : "已退尾款频"
                }}
              </span>
              <div v-if="backDeposit == 1" class="Thprice">已退还</div>
              <div v-if="scope.row.apply_refund_deposit == 1 && scope.row.status == 1
                " class="Thprice" style="right: 55px">
                正在退还
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="hasMessage" label="红人沟通" width="150">
          <template slot-scope="scope">
            <el-badge is-dot :hidden="scope.row.message === 0 ? true : false" @click.native="
              orderId = scope.row.id;
            message = scope.row.message;
            scope.row.message = 0;
            handleChatFn(scope);
            " class="badge_style">
              <p style="padding-right: 8px">
                <i class="el-icon-chat-dot-round" style="font-size: 20px; cursor: pointer"></i>
              </p>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.status == 0" class="flex_center">
                <el-button class="operation_btn payment_btn_style" size="small" @click="
                  orderId = scope.row.id;
                handlePaymentOrder(0);
                " round>付定金</el-button>
                <el-button class="operation_btn payment_btn_style2" size="small" @click="
                  deleteOrderDialog = true;
                orderId = scope.row.id;
                " round>删除</el-button>
              </div>
              <div v-else-if="scope.row.status == 1" class="flex_center">
                <el-button class="operation_btn payment_btn_style" v-if="scope.row.status === 1 && scope.row.influencer_id != null
                  " size="small" @click="
    orderId = scope.row.id;
  handlePaymentOrder(1);
  " round>支付订单</el-button>
                <div class="normal_style" v-else>/</div>
                <div class="operation_btn" v-if="scope.row.apply_refund_deposit == 1" style="
                    font-size: 12px;
                    color: #c0c4cc;
                    border-radius: 16px;
                    border: 1px solid #ebeef5;
                    height: 32px;
                    line-height: 30px;
                    margin-right: 0;
                    margin-left: 10px;
                  ">
                  已申请退定
                </div>
                <el-button class="operation_btn payment_btn_style2" v-else size="small" @click="
                  orderId = scope.row.id;
                returnDepositDialog = true;
                " round>退定金</el-button>
              </div>
              <div v-else-if="scope.row.status == 2" class="flex_center" style="position: relative">
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content" style="
                      max-width: 200px;
                      line-height: 20px;
                      padding: 3px 5px 0 5px;
                    ">
                    若未收到样品寄送地址，请检查消息反馈或联系工作人员！
                  </div>
                  <el-button class="operation_btn payment_btn_style" size="small" @click="
                    submitDialog = true;
                  orderId = scope.row.id;
                  handlerClearSubmit();
                  " round>
                    提交寄送信息
                  </el-button>
                </el-tooltip>
                <div style="
                    width: 6px;
                    height: 6px;
                    background: #ed4014;
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    border-radius: 50%;
                  " v-if="scope.row.site_read == 1"></div>
                <el-button class="operation_btn payment_btn_style2" size="small" style="margin-left: 10px"
                  @click="getsiteRead(scope.row.id)" round>查看地址
                </el-button>
              </div>
              <div v-else-if="scope.row.status == 3" class="flex_center">
                <div class="normal_style">/</div>
                <div class="normal_style">/</div>
              </div>
              <div v-else-if="scope.row.status == 4" class="flex_center">
                <a :href="scope.row.attachfile" target="_blank" style="text-decoration: none">
                  <el-button class="operation_btn payment_btn_style" size="small" round>查看视频
                  </el-button></a>
                <el-button v-if="scope.row.comment === 1" class="operation_btn payment_btn_style2" size="small" round
                  @click="handleComments(scope)">已评价</el-button>
                <el-button v-else class="operation_btn payment_btn_style2" style="margin-left: 10px" size="small" round
                  @click="
                    toCommentDialog = true;
                  orderId = scope.row.id;
                  ">去评价</el-button>
              </div>
              <div v-else-if="scope.row.status == 5" class="flex_center">
                <div class="normal_style">/</div>
                <el-button class="operation_btn payment_btn_style2" size="small" @click="
                  deleteOrderDialog = true;
                orderId = scope.row.id;
                " round>删除</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="order-bottom">
      <div style="color: #999">
        已选
        {{ multipleSelection.length == 0 ? "--" : multipleSelection.length }}
        项
      </div>

      <div style="display: flex; align-items: center">
        <span class="pagination-span" v-if="priceNum != 0">合计金额：<span style="color: #ff000c; font-weight: 900">￥{{
          priceNum }}</span></span>
        <span class="pagination-span" v-if="priceNum == 0">合计金额：<span
            style="color: #999; font-weight: 900">--</span></span>
        <el-button class="pagination-btn" @click="ConsolidatedPayment" v-if="multipleSelection.length != 0"><span
            class="pagination-btn-span" ref="btnDom">合并支付({{ multipleSelection.length }})</span></el-button>
        <el-button class="paginationBtn" v-if="multipleSelection.length == 0">合并支付</el-button>
      </div>
    </div>

    <!--支付尾款-->
    <el-dialog title="请尽快支付" :visible.sync="paymentDialog" v-if="paymentDialog" @close="handleClose"
      class="payment_dialog" :close-on-click-modal="false" center width="500px">
      <div class="payment_content">
        <h4>¥{{ orderData.price }}</h4>
        <p v-if="orderIdFlex">合并金额</p>
        <p v-if="orderIdFlex == false">订单金额</p>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label" style="
                display: flex;
                align-items: center;
                justify-content: center;
              "><i class="iconfont icon-zhifupingtai-weixin" style="
                  color: rgba(59, 202, 114, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "></i>微信支付</span>
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
            <span slot="label" style="
                display: flex;
                align-items: center;
                justify-content: center;
              "><i class="iconfont icon-zhifu-zhifubao" style="
                  color: rgba(2, 169, 241, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "></i>支付宝支付</span>
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
        <div class="group_26 flex-row">
          <div class="image-text_40 flex-row justify-between">
            <img class="thumbnail_26" referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngadd69f7b6dbb5a1080befad2c5168f68a6705b339b5967fdd3f737c59baf4d89" />
            <div class="text-group_14">
              <span class="text_98">1、订单支付成功后，</span>
              <span class="text_99">定金</span>
              <span class="paragraph_1">将原路退回至您的「支付宝/微信」账户；<br />2、完成订单支付，代表服务正式生效。在完成交付之前，平台不会将你的款项支付给达人。</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--申请退还定金-->
    <el-dialog title="是否申请退还定金？" :visible.sync="returnDepositDialog" width="388px" :close-on-click-modal="false"
      class="return_deposit_dialog" center>
      <div style="padding-top: 10px">
        <p>退还定金后，我们将不再为您匹配达人</p>
        <p>如不满意达人或需<b>变更需求</b>，您可联系客服处理</p>
        <div class="button_box">
          <el-button class="cancel_style" @click="returnDepositDialog = false">取消</el-button>
          <el-button class="confirm_style" @click="handleReturnFrontMoney">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!--订单删除确认-->
    <el-dialog title="是否删除该订单记录？" :visible.sync="deleteOrderDialog" width="300px" :close-on-click-modal="false"
      class="return_deposit_dialog" center>
      <div style="padding-top: 10px">
        <p>删除后将不可恢复</p>
        <div class="button_box">
          <el-button class="cancel_style" @click="deleteOrderDialog = false">取消</el-button>
          <el-button class="confirm_style" @click="handleRemoveOrder">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!--去评价-->
    <el-dialog title="您对本次服务满意吗？" :visible.sync="toCommentDialog" width="460px" :close-on-click-modal="false"
      class="to_comment_dialog" center>
      <div>
        <p class="description">
          您的真实评价反馈，将极大地帮助我们改善产品体验及服务质量
        </p>
        <el-form :model="ruleCommentForm" :rules="commentRules" ref="ruleCommentForm" size="mini" label-position="left"
          label-width="100px" class="comment_form">
          <el-form-item label="需求达成度" prop="complete">
            <el-rate v-model="ruleCommentForm.complete" @change="
              ruleCommentForm.complete === 0
                ? (completeError = true)
                : (completeError = false)
              " :colors="colors"></el-rate>
            <div v-if="completeError" class="form_error">
              请对需求达成度进行评价
            </div>
          </el-form-item>
          <el-form-item label="视频质量" prop="quality">
            <el-rate v-model="ruleCommentForm.quality" @change="
              ruleCommentForm.quality === 0
                ? (qualityError = true)
                : (qualityError = false)
              " :colors="colors"></el-rate>
            <div v-if="qualityError" class="form_error">
              请对视频质量进行评价
            </div>
          </el-form-item>
          <el-form-item label="交付周期" prop="cycle">
            <el-rate v-model="ruleCommentForm.cycle" @change="
              ruleCommentForm.cycle === 0
                ? (cycleError = true)
                : (cycleError = false)
              " :colors="colors"></el-rate>
            <div v-if="cycleError" class="form_error">请对交付周期进行评价</div>
          </el-form-item>
          <el-form-item label="留言反馈（非必填）" style="display: block" class="form_item_block">
            <el-input type="textarea" style="display: block" :rows="3" placeholder="请填写您的真实服务感受或建议"
              v-model="ruleCommentForm.remarks">
            </el-input>
          </el-form-item>
          <el-form-item class="form_item_block" style="margin-bottom: 0">
            <el-button @click="commentSubmitForm('ruleCommentForm')" style="
                margin: auto;
                display: block;
                color: #ffffff;
                padding: 9px 57px;
                background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
                border-radius: 16px;
              ">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--已评价-->
    <el-dialog title="我的评价" :visible.sync="completeCommentDialog" width="460px" :close-on-click-modal="false"
      class="to_comment_dialog" center>
      <div>
        <el-form size="mini" label-position="left" disabled label-width="100px" style="margin-top: 10px"
          class="comment_form">
          <el-form-item label="需求达成度">
            <el-rate v-model="completeCommentList.satisfaction" :colors="colors"></el-rate>
          </el-form-item>
          <el-form-item label="视频质量">
            <el-rate v-model="completeCommentList.quality" :colors="colors"></el-rate>
          </el-form-item>
          <el-form-item label="交付周期">
            <el-rate v-model="completeCommentList.period" :colors="colors"></el-rate>
          </el-form-item>
          <el-form-item label="留言反馈（非必填）" style="display: block; margin-bottom: 0" class="form_item_block">
            <el-input type="textarea" style="display: block" :rows="3" placeholder="请填写您的真实服务感受或建议"
              v-model="completeCommentList.content">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--视频拍摄需求-->
    <el-dialog title="视频拍摄需求" :visible.sync="checkVideoDialog" width="702px" :close-on-click-modal="false"
      class="video_dialog" center>
      <div>
        <el-form size="small" label-position="left" :model="videoForm" ref="videoRules" label-width="125px"
          class="video_ruleForm">
          <el-form-item label="产品名称">
            <el-input v-model="videoRuleForm.category" placeholder="请输入产品名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品链接">
            <div v-if="videoForm.url">
              <p style="
                  background: #f5f7fa;
                  border: 1px solid #e4e7ed;
                  border-radius: 4px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                ">
                <a :href="videoForm.url" :title="videoForm.url" style="
                    color: #333333;
                    padding-left: 15px;
                    text-decoration: none;
                  " target="_blank">{{ videoForm.url }}</a>
              </p>
            </div>
            <el-input v-model="videoRuleForm.url" placeholder="" v-else></el-input>
            <!--                        <el-input v-model="videoForm.url" placeholder="请输入产品亚马逊链接"></el-input>-->
          </el-form-item>
          <el-form-item label="拍摄预算 ¥" style="width: 350px">
            <el-input v-model="videoRuleForm.copper" placeholder="请填写该产品的预算金额" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="需重点体现的产品卖点/功能/特性">
            <el-input type="textarea" placeholder="注意： 
1、请勿填写过多信息，否则在极短的时间内视频将无法凸显重点；
2、如无特别要求，请填写“自由发挥”，达人将结合产品listing自由创作。" v-model="videoForm.sellingpoint" disabled></el-input>
          </el-form-item>
          <el-form-item label="拍摄要素">
            <div>
              <div class="form_item_title">
                在候选达人匹配失败时，将据此为您推荐其他达人
              </div>
              <div class="item_check_style" v-for="(item, index) in videoForm.shootrequire" :key="index">
                <div class="label_style">{{ item.title }}</div>
                <el-checkbox-group v-if="item.type == 'check'" v-model="item.checkList">
                  <el-checkbox v-for="(i, j) in item.list" :key="j" :label="i" disabled></el-checkbox>
                </el-checkbox-group>
                <el-radio-group v-else v-model="item.checkList">
                  <el-radio v-for="(i, j) in item.list" :key="j" :label="i" disabled>{{ i }}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="定制需求" v-if="videoForm.shoot == 1">
            <el-input type="textarea" placeholder="请输入您的拍摄需求" v-model="videoForm.custom" disabled></el-input>
          </el-form-item>
          <el-form-item label="其他拍摄说明">
            <el-input type="textarea" placeholder="以下情形请详细说明，如： 
1、产品仅适配特定配件/型号的；
2、要求特定场景的，如：汽车、泳池、卧室、海滩等
3、其他特殊要求，如：需要安装演示、需要3~6岁小孩出镜等" v-model="videoForm.description" disabled></el-input>
          </el-form-item>
          <el-form-item label="是否通过达人账号上传">
            <p class="description">视频通过达人上传会在达人主页展示</p>
            <el-radio v-model="videoRuleForm.radio" label="1" disabled>是</el-radio>
            <el-radio v-model="videoRuleForm.radio" label="0" disabled>否</el-radio>
          </el-form-item>
        </el-form>
        <div class="form_button">
          <button style="
              background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
            " v-if="!videoForm.url && balance_pay_status == 0" @click="modifyUrl(videoForm.id)">
            保存
          </button>
          <button style="background: #ccc" v-else>保存</button>
        </div>
      </div>
    </el-dialog>
    <!--提交寄送信息-->
    <el-dialog title="提交样品寄送信息" :visible.sync="submitDialog" width="622px" class="submit_dialog"
      :close-on-click-modal="false" center>
      <div>
        <el-form size="small" label-position="left" :model="sampleForm" :rules="sampleFormRules" ref="videoRules"
          label-width="115px" class="submit_form">
          <el-form-item label="样品物流方式" prop="type">
            <el-radio-group v-model="sampleForm.type" @change="checkSubmit('videoRules')">
              <el-radio label="fba">FBA</el-radio>
              <el-radio label="fbm">FBM</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="预计到达日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-d" value-format="yyyy-MM-dd" :clearable="false"
              v-model="sampleForm.date" @change="checkSubmit('videoRules')" style="width: 100%"></el-date-picker>
          </el-form-item>
          <div v-show="sampleForm.type === 'fba'">
            <el-form-item label="上传物流截图" key="file" prop="file">
              <el-checkbox-group v-model="sampleForm.file" v-show="false"></el-checkbox-group>
              <el-upload :class="{ hide_upload: isHide }" ref="upload" :action="localhost + '/api/common/upload'"
                :data="{ source: 'normal' }" :on-change="changeUpload" list-type="picture-card"
                :on-success="uploadSuccess" :headers="{ token: token }" :before-upload="beforeUpload">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview check_preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in" style="color: #333333; font-size: 18px"></i>
                    </span>
                    <span v-if="!sampleForm.disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-close" style="color: #ffffff"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <p class="description">
                <b>注：</b>为方便尽快开展视频制作，上传的截图需包含：<span>产品信息（型号、尺寸、颜色等）、预计到达时间、收件人及收货地址</span>等信息。
              </p>
            </el-form-item>
            <el-form-item label="">
              <div class="demo_img">
                <img src="../../../assets/images/screenshot.jpg" alt="" />
                <span class="el-upload-list__item-preview upload_preview" @click="checkViewImg">
                  <i class="el-icon-zoom-in"></i>
                </span>
              </div>
            </el-form-item>
          </div>
          <el-form-item v-show="sampleForm.type === 'fbm'" label="物流单号" key="order" prop="order">
            <el-input type="text" v-model="sampleForm.order" @keyup.native="checkSubmit('videoRules')"
              @blur="checkSubmit('videoRules')" @change="checkSubmit('videoRules')"></el-input>
            <p class="description">如：1Z998F32032699533</p>
          </el-form-item>
        </el-form>
        <div class="button_box">
          <el-button :disabled="isDisabled" :class="{ disabled_btn: isDisabled }"
            @click="submitForm('videoRules')">提交</el-button>
        </div>
      </div>
    </el-dialog>
    <!--查看大图-->
    <el-dialog :visible.sync="imgDialog" class="viewDialog" :close-on-click-modal="false">
      <div class="viewImg">
        <img :src="dialogImageUrl" id="viewImg" alt="" />
      </div>
    </el-dialog>
    <!--联系达人经纪人-->
    <el-dialog title="联系达人经纪人" @close="handleCloseFeedbackDialog" :visible.sync="feedbackDialog" width="700px"
      :close-on-click-modal="false" class="feedback_modal" center>
      <div>
        <div class="chat">
          <div v-if="chatData.length > 0" class="chat-message-body" id="chatForm">
            <div dis-hover v-for="(item, index) in chatData" :key="index" class="message-card">
              <div :class="item.type == 0 ? 'message-row-right' : 'message-row-left'
                ">
                <div style="position: relative">
                  <img style="border-radius: 50%" :src="item.type == 0
                    ? avatar
                    : require('../../../assets/images/gani.png')
                    " height="45" width="45" />
                  <div v-if="item.type == 0" style="
                      position: absolute;
                      bottom: 6px;
                      left: 0;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-size: 12px;
                    ">
                    <span v-if="item.is_read == 1" style="color: #999999">已读</span>
                    <span v-else style="color: #796cf3">未读</span>
                  </div>
                </div>
                <div class="message-content">
                  <div :style="item.type == 0
                    ? 'text-align:right;display: flex;flex-direction:row-reverse;line-height:24px'
                    : ''
                    ">
                    {{ item.type == 0 ? "我" : "Gani-达人经纪人" }}
                    <span class="message-time">{{ item.createtime }}</span>
                  </div>
                  <div class="message-body" v-show="item.content !== ''">
                    {{ item.content }}
                  </div>
                  <div class="feedback_images_list" v-show="item.images.length > 0">
                    <div>
                      <div class="item_img" v-for="(item, index) in item.images" :key="index">
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
          <el-empty v-else style="border-top: 1px solid #eeeeee" description="暂无消息"
            :image="require('../../../assets/images/chat_empty.png')"></el-empty>
          <el-input v-model="chatForm.feedback" type="textarea" style="margin: 10px 0 0 0" maxlength="500"
            placeholder="编辑回复内容..." show-word-limit :rows="4" />
        </div>

        <div class="title">
          (非必选）上传图片 <span>(支持jpg/png不超过5M)</span>
        </div>
        <div>
          <el-upload :action="localhost + '/api/common/upload'" :data="{ source: 'normal' }" ref="chatUpload"
            class="chat_upload" list-type="picture-card" :on-success="handleUploadSuccess" :on-error="handleUploadError"
            :headers="{ token: token }" :before-upload="beforeUpload" :on-progress="handleAvatarProgress">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }" style="height: inherit">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
          <p v-show="handletext != ''" style="color: #f56c6c">
            {{ handletext }}
          </p>
        </div>
        <div style="text-align: center; margin-top: 24px" class="upload_btn_box">
          <el-button type="primary" size="small" :disabled="this.chatForm.feedback == '' && this.feedback_images_length <= 0
            " @click="handlerSedMeg" style="
              border: none;
              padding: 10px 58px;
              border-radius: 16px;
              background: #3e7aff
                linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
            ">提交</el-button>
        </div>
      </div>
    </el-dialog>
    <!--支付定金-->
    <el-dialog title="请尽快支付" @close="handleClose" :visible.sync="payDepositDialogVisible" v-if="payDepositDialogVisible"
      width="500px" :close-on-click-modal="false" class="pay_deposit_dialog" center>
      <div>
        <el-alert title="支付定金后，平台将正式为您对接达人。不满意可随时申请退还定金。" center style="position: relative" :closable="false">
          <i class="iconfont icon-tips" style="
              position: absolute;
              top: 8px;
              left: 14px;
              font-size: 18px;
              color: #796cf3;
            "></i>
        </el-alert>
        <h5>¥{{ orderData.price }}</h5>
        <p>定金金额</p>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label" style="
                display: flex;
                align-items: center;
                justify-content: center;
              "><i class="iconfont icon-zhifupingtai-weixin" style="
                  color: rgba(59, 202, 114, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "></i>微信支付</span>
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
            <span slot="label" style="
                display: flex;
                align-items: center;
                justify-content: center;
              "><i class="iconfont icon-zhifu-zhifubao" style="
                  color: rgba(2, 169, 241, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "></i>支付宝支付</span>
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
        <div class="group_26 flex-row">
          <div class="image-text_40 flex-row justify-between">
            <img class="thumbnail_26" referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngadd69f7b6dbb5a1080befad2c5168f68a6705b339b5967fdd3f737c59baf4d89" />
            <div class="text-group_14">
              <span class="text_98">1、订单支付成功后，</span>
              <span class="text_99">定金</span>
              <span class="paragraph_1">将原路退回至您的「支付宝/微信」账户；<br />2、完成订单支付，代表服务正式生效。在完成交付之前，平台不会将你的款项支付给达人。</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--支付完成-->
    <el-dialog :visible.sync="paymentCompletedDialogVisible" width="360px" @close="updata()" :close-on-click-modal="false"
      class="payment_completed_dialog" center>
      <div slot="title">
        <i style="color: rgba(2, 181, 120, 1); font-size: 20px" class="el-icon-success"></i>
        {{ paymentType == 0 ? "定金支付成功" : "订单支付成功" }}
      </div>
      <div>
        <p v-if="paymentType == 0" style="line-height: 24px; text-align: center">
          平台将开始匹配并对接达人，预计1-2个工作日会收到反馈，敬请留意
        </p>
        <p v-else style="line-height: 24px; text-align: center">
          请尽快将样品寄送至达人收货地址，如已寄送，请及时上传样品寄送信息；点击【查看地址】即可获取达人收获信息~
        </p>
        <div class="button_box know_btn">
          <el-button @click="paymentCompletedDialogVisible = false">我知道了</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 查看地址 -->
    <el-dialog title="请尽快将产品寄送到以下地址" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="elDialogDz">
        <div v-for="(item, index) in strArray" :key="index">
          {{ item }}
        </div>
      </div>
      <div style="width: 100%; display: flex; justify-content: center">
        <el-button class="elDialogDz-btn" @click="centerDialogVisible = false">
          我知道了
        </el-button>
      </div>
    </el-dialog>

    <!-- 查看红人弹窗 -->
    <el-dialog title="已选红人" :visible.sync="centerDialogVisibleXinz" width="530px" center>
      <ul style="display: flex; justify-content: center">
        <li v-for="(item, index) in darList" :key="index" style="
            margin: 0 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          " @click="goDrxqy(darList[index].id, darList[index].user_id)">
          <img :src="item.image" style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            " />
          <p>No.{{ item.user_id }}</p>
          <p style="color: #796cf3; margin-top: 4px; white-space: nowrap">
            {{ item.price }}
          </p>
        </li>
      </ul>
    </el-dialog>
    <!-- 填写要求弹窗 -->
    <FillingRequirementsdialog :isFillingRequirementsdialogVisible="FillingRequirementsdialogVisible"
      @isFillingRequirementsdialogVisible="getChildMsg" :determine="determine" :RequirementsList="RequirementsList"
      :FillingRequirementid="FillingRequirementid" :reqsearch="clearOrderList" :getstate="getstate">
    </FillingRequirementsdialog>

    <!-- 合并支付弹窗 -->
    <Mergepaymentslog :MergepaymentslogVisible="MergepaymentslogVisible" @getMergepaymentslogMsg="getMergepaymentslogMsg">
    </Mergepaymentslog>
  </div>
</template>

<script>
import {
  orderList,
  orderDelete,
  payOrder,
  checkPayment,
  returnFrontMoney,
  commentCreate,
  createTransport,
  getChatList,
  createChat,
  orderDetail,
  getCategory,
  orderStep,
  getShootRequire,
  siteRead,
  orderEdit,
} from "@/api";
import QRCode from "qrcodejs2";
import { mapMutations } from "vuex";
import FillingRequirementsdialog from "@/components/RequirementSubmission/dialog/FillingRequirementsdialog.vue";
import Mergepaymentslog from "./dialog/Mergepaymentslog.vue";
export default {
  name: "order",
  data() {
    const validateSelect = (rule, value, callback) => {
      if (this.sampleForm.type !== "fba") {
        if (rule.field === "order" && this.sampleForm.type && !value) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      } else {
        if (rule.field === "file" && this.sampleForm.type && !value) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
    };
    return {
      videoRuleForm: {
        category: "",
        copper: "",
        radio: "",
        url: "",
      },
      centerDialogVisibleXinz: false,
      orderIdFlex: false,
      centerDialogVisible: false,
      multipleSelection: [],
      listArray: [],
      categoryList: [],
      isHide: false,
      form: {
        keywords: "",
        dateValue: [],
      },
      tableData: [],
      currentPage: 1,
      tableHeight: document.documentElement.clientHeight - 235,
      paymentDialog: false,
      returnDepositDialog: false,
      deleteOrderDialog: false,
      toCommentDialog: false,
      completeCommentDialog: false,
      checkVideoDialog: false,
      submitDialog: false,
      imgDialog: false,
      feedbackDialog: false,
      payDepositDialogVisible: false,
      uploadFile: [],
      stepsList: {},
      videoForm: {},
      dialogImageUrl: "",
      completeCommentList: {
        satisfaction: null,
        quality: null,
        period: null,
        content: "",
      },
      ruleCommentForm: {
        complete: null,
        quality: null,
        cycle: null,
        remarks: "",
      },
      commentRules: {
        complete: [
          {
            required: true,
            message: "请对需求达成度进行评价",
            trigger: "change",
          },
        ],
        quality: [
          {
            required: true,
            message: "请对需求达成度进行评价",
            trigger: "change",
          },
        ],
        cycle: [
          {
            required: true,
            message: "请对交付周期进行评价",
            trigger: "change",
          },
        ],
      },
      completeError: false,
      qualityError: false,
      cycleError: false,
      colors: ["#796CF3", "#796CF3", "#796CF3"],
      sampleForm: {
        type: "fba",
        file: "",
        date: "",
        order: "",
        disabled: false,
      },
      sampleFormRules: {
        type: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        file: [
          {
            required: true,
            validator: validateSelect,
            message: "请上传物流截图",
            trigger: "change",
          },
        ],
        order: [
          {
            required: true,
            validator: validateSelect,
            message: "请输入物流单号",
            trigger: "change",
          },
        ],
      },
      checkImgSuccess: true,
      isDisabled: true,
      feedbackVal: "",
      uploadList: [],
      chatData: [],
      chatForm: {
        // 发送数据提交数据表单
        feedback: "",
        feedback_images: [],
      },
      timerSwitch: 0, // 定时器开关，默认关闭
      localhost: process.env.VUE_APP_BASE_URL,
      pageSize: 20,
      pageNumber: 1,
      pageState: true,
      orderId: "",
      paymentCompletedDialogVisible: false,
      orderData: {},
      checkWechatPaymentVal: "",
      checkAlipayPaymentVal: "",
      token: "",
      avatar: "",
      isMessage:
        this.$store.state.order.isMessage ||
        window.localStorage.getItem("ismessage"),
      message: 0,
      order: "",
      orderType: "",
      feedback_images_length: 0,
      paymentType: 0,
      strArr: "",
      priceNum: 0,
      getsite: "",
      backDeposit: 0,
      strArray: [],
      darList: [],
      balance_pay_status: "1",
      totalPage: 0,
      FillingRequirementsdialogVisible: false,
      determine: 1,
      RequirementsList: {},
      FillingRequirementid: 0,
      getstate: 0,
      iftableListener: true,
      MergepaymentslogVisible: false,
      allSatisfy1: false,
      allSatisfy2: false,
      handletext: "",
    };
  },
  created() {
    for (let key in this.listArray) {
      if (this.listArray[key].type == "check") {
        this.$set(this.listArray[key], key, this.listArray[key].checkList);
      }
    }
  },
  mounted() {
    this.tableData = [];
    this.tableListener();
    this.getOrderList();
    this.token = localStorage.getItem("token");
    this.avatar = localStorage.getItem("avatar");
    this.handlerGetCategory();
    this.getShootRequireList();
  },
  computed: {
    query() {
      return [this.payDepositDialogVisible, this.paymentDialog];
    },
    isMessageFn() {
      return this.$store.state.order.isMessage;
    },
  },
  watch: {
    query: {
      handler(val) {
        if (val[0] === false && val[1] === false) {
          setTimeout(() => {
            clearInterval(this.checkWechatPaymentVal);
            clearInterval(this.checkAlipayPaymentVal);
          }, 5000);
        }
      },
    },
    isMessageFn(newVal) {
      if (newVal == 1) {
        this.isMessage = newVal;
        this.tableData = [];
        this.getOrderList();
      }
    },
    tableData() {
      //默认勾选上所有的选项
      this.$nextTick(() => {
        for (const item of this.tableData) {
          if (
            item.status == 2 ||
            item.status == 3 ||
            item.status == 0 ||
            item.status == 4 ||
            item.status == 5
          ) {
          } else {
            this.$refs.multipleTable.toggleRowSelection(item, false);
          }
        }
      });
    },
    MergepaymentslogVisible(newVal) {
      if (newVal == false) {
        this.updata();
      }
    },
    centerDialogVisible(newval) {
      if (newval == false) this.updata();
    },
  },
  methods: {
    ...mapMutations("order", ["setIsMessage", "setMessage", "setIsRead"]),

    //在父组件中声明这个函数，用于接收子组件传回的值
    getChildMsg(msg) {
      this.getstate = 0;
      this.FillingRequirementsdialogVisible = msg;
    },
    getMergepaymentslogMsg(msg) {
      this.MergepaymentslogVisible = msg;
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.merge !== 0) {
        return "warning-row";
      }
      return "";
    },
    handleSelectable(row) {
      return row.category_id == 18 ? false : true;
    },
    centerDialogVisibleXinzTan(list) {
      this.centerDialogVisibleXinz = true;
      console.log(list);
      this.darList = list;
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let num = 0;
      this.multipleSelection.map((item) => {
        num = num + item.price * 1;
      });
      this.priceNum = num.toFixed(2);

      setTimeout(() => {
        var element = document.querySelector(".is-indeterminate");
        element?.classList.remove("is-indeterminate");
      }, 10);
    },
    //当用户手动勾选全选 Checkbox 时触发的事件
    selectAll() { },
    // 判断CheckBox 是否可以勾选
    selectable(row, index) {
      if (
        row.status == 2 ||
        row.status == 3 ||
        row.status == 4 ||
        row.status == 5 ||
        (row.status == 1 && row.influencer_id == null)
      ) {
        return false;
      } else {
        return true;
      }
    },

    allSatisfy(array, condition) {
      return array.every(condition);
    },
    //合并支付
    ConsolidatedPayment() {
      const arr = [];

      var condition1 = function (item) {
        return item.status == 0;
      };
      var condition2 = function (item) {
        return item.status == 1;
      };
      this.allSatisfy1 = this.allSatisfy(this.multipleSelection, condition1);
      this.allSatisfy2 = this.allSatisfy(this.multipleSelection, condition2);
      console.log(
        this.allSatisfy1,
        "condition1",
        this.allSatisfy2,
        "condition2"
      );

      this.multipleSelection.forEach((item) => {
        arr.push(item.id);
      });
      const str = arr.join(",");
      this.orderId = str;
      this.handlePaymentOrder(2);
      this.orderIdFlex = true;
    },
    //获取拍摄场景列表
    getShootRequireList() {
      getShootRequire()
        .then((res) => {
          if (res.code === 1) {
            this.listArray = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    handleShowFn(row) {
      orderStep({
        order_id: row.id,
      })
        .then((res) => {
          if (res.code === 1) {
            this.stepsList = res.data;
            this.backDeposit = res.data.back_deposit;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取搜索分类
    handlerGetCategory() {
      getCategory({ type: "influencer" })
        .then((res) => {
          if (res.code === 1) {
            this.categoryList = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    handleCheckOrderDetail(column) {
      this.balance_pay_status = column.status;
      orderDetail({
        order_id: column.id,
      })
        .then((res) => {
          if (res.code == 1) {
            this.RequirementsList = res.data;
            this.videoRuleForm.category = res.data.title;
            this.videoRuleForm.copper = res.data.budget;
            this.videoRuleForm.radio = res.data.method + "";
            this.videoForm = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (column.brand == 0) {
        this.checkVideoDialog = true;
      } else {
        this.determine = 4;
        this.getstate = column.status;
        this.FillingRequirementid = column.id;
        this.FillingRequirementsdialogVisible = true;
      }
    },
    handleComments(content) {
      this.completeCommentDialog = true;
      if (content.row.comments != null)
        this.completeCommentList = content.row.comments;
    },
    //排序
    handlerSort(column) {
      column.order == "ascending"
        ? (this.orderType = "asc")
        : (this.orderType = "desc");
      this.order = column.prop;
      this.tableData = [];
      this.getOrderList();
    },
    //获取订单列表
    getOrderList() {
      orderList({
        keyword: this.form.keywords,
        date: this.form.dateValue,
        pageSize: this.pageSize,
        page: this.currentPage,
        message: this.isMessage,
        order: this.order,
        orderType: this.orderType,
      })
        .then((res) => {
          if (res.code == 1) {
            this.pageState = true;
            this.iftableListener = true;

            res.data.data.forEach((item) => {
              this.tableData.push(item);
            });

            this.totalPage = res.data.last_page;
            this.setIsMessage(0);
            window.localStorage.setItem("ismessage", 0);

            this.handleSelectable();
          }
        })
        .catch((err) => { });
    },
    //初始化列表
    clearOrderList() {
      this.form.keywords = "";
      this.form.dateValue = [];
      this.currentPage = 1;
      this.isMessage = 0;
      this.tableData = [];
      this.iftableListener = false;
      this.getOrderList();
    },

    findIndex(array, id) {
      return array.findIndex((item) => item.id === id);
    },

    //删除订单
    handleRemoveOrder() {
      let index = this.findIndex(this.tableData, this.orderId);
      orderDelete({ order_id: this.orderId })
        .then((res) => {
          if (res.code === 1) {
            this.$message.success("删除成功！");
            this.deleteOrderDialog = false;
            this.tableData.splice(index, 1);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //支付定金/尾款
    handlePaymentOrder(type) {
      this.orderIdFlex = false;

      type === 0
        ? (this.payDepositDialogVisible = true)
        : (this.paymentDialog = true);

      this.paymentType = type;
      //微信
      payOrder({
        order_id: this.orderId,
        payment: "wechat",
      })
        .then((res) => {
          if (res.code === 1) {
            this.orderData = res.data.order;
            if (this.$refs.wechatQrCodeUrl) {
              new QRCode(this.$refs.wechatQrCodeUrl, {
                text: res.data.qrcode,
                width: 130,
                height: 130,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
              });
            }
            this.handlerCheckWechatPayment(res.data.order.out_trade_no);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
      //支付宝
      payOrder({
        order_id: this.orderId,
        payment: "alipay",
      })
        .then((res) => {
          if (res.code === 1) {
            this.orderData = res.data.order;
            if (this.$refs.alipayQrCodeUrl) {
              new QRCode(this.$refs.alipayQrCodeUrl, {
                text: res.data.qrcode,
                width: 130,
                height: 130,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
              });
            }
            this.handlerCheckAlipayPayment(res.data.order.out_trade_no);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //微信检测是否支付成功
    handlerCheckWechatPayment(order) {
      let _this = this;
      _this.checkWechatPaymentVal = setInterval(function () {
        checkPayment({
          out_trade_no: order,
          payment: "wechat",
        })
          .then((res) => {
            if (res.code === 1) {
              if (res.data.status === "success") {
                _this.payDepositDialogVisible = false;
                _this.paymentDialog = false;

                if (_this.allSatisfy1) {
                  _this.paymentType = 0;
                  _this.paymentCompletedDialogVisible = true;
                } else if (_this.allSatisfy2) {
                  _this.paymentType = 1;
                  _this.paymentCompletedDialogVisible = true;
                } else if (_this.paymentType == 2) {
                  _this.MergepaymentslogVisible = true;
                } else {
                  _this.paymentCompletedDialogVisible = true;
                }

                clearInterval(_this.checkWechatPaymentVal);
                clearInterval(_this.checkAlipayPaymentVal);
              }
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }, 3000);
    },
    //支付宝检测是否支付成功
    handlerCheckAlipayPayment(order) {
      let _this = this;
      _this.checkAlipayPaymentVal = setInterval(function () {
        checkPayment({
          out_trade_no: order,
          payment: "alipay",
        })
          .then((res) => {
            if (res.code === 1) {
              if (res.data.status === "success") {
                _this.payDepositDialogVisible = false;
                _this.paymentDialog = false;

                if (_this.allSatisfy1) {
                  _this.paymentType = 0;
                  _this.paymentCompletedDialogVisible = true;
                } else if (_this.allSatisfy2) {
                  _this.paymentType = 1;
                  _this.paymentCompletedDialogVisible = true;
                } else if (_this.paymentType == 2) {
                  _this.MergepaymentslogVisible = true;
                } else {
                  _this.paymentCompletedDialogVisible = true;
                }
                clearInterval(_this.checkAlipayPaymentVal);
                clearInterval(_this.checkWechatPaymentVal);
              }
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }, 3000);
    },
    //清除定时器
    handleClose() {
      clearInterval(this.checkWechatPaymentVal);
      clearInterval(this.checkAlipayPaymentVal);
    },
    //退定金
    handleReturnFrontMoney() {
      returnFrontMoney({
        order_id: this.orderId,
      })
        .then((res) => {
          if (res.code === 1) {
            this.returnDepositDialog = false;
            this.$message.success("申请成功！");
            this.updata();
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    //去评价
    commentSubmitForm() {
      this.ruleCommentForm.complete === 0
        ? (this.completeError = true)
        : (this.completeError = false);
      this.ruleCommentForm.cycle === 0
        ? (this.cycleError = true)
        : (this.cycleError = false);
      this.ruleCommentForm.quality === 0
        ? (this.qualityError = true)
        : (this.qualityError = false);
      if (
        this.ruleCommentForm.complete !== 0 &&
        this.ruleCommentForm.cycle !== 0 &&
        this.ruleCommentForm.quality !== 0
      ) {
        commentCreate({
          order_id: this.orderId,
          satisfaction: this.ruleCommentForm.complete,
          quality: this.ruleCommentForm.quality,
          period: this.ruleCommentForm.cycle,
          content: this.ruleCommentForm.remarks,
        })
          .then((res) => {
            if (res.code === 1) {
              this.toCommentDialog = false;
              this.$message.success("评价成功！");
              this.ruleCommentForm.complete = 0;
              this.ruleCommentForm.quality = 0;
              this.ruleCommentForm.cycle = 0;
              this.updata();
            }
          })
          .catch((err) => {
            this.toCommentDialog = false;
            this.$message.error("评价失败！");
          });
      } else {
        return;
      }
    },
    //上传
    uploadSuccess(res, file) {
      this.sampleForm.file = res.data.fullurl;
      this.sampleForm.file !== ""
        ? (this.isHide = true)
        : (this.isHide = false);
      if (
        this.sampleForm.type === "" ||
        this.sampleForm.date === "" ||
        this.sampleForm.file === ""
      ) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    beforeUpload(file) {
      const isFileType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isFileType) {
        this.$message.error("上传头像图片只能是 JPG 格式或者 PNG 格式!");
        this.isHide = false;
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
        this.isHide = false;
      }

      return isFileType && isLt5M;
    },
    handleRemove(file) {
      const index = this.$refs.upload.uploadFiles.findIndex(
        (e) => e.uid === file.uid
      );
      this.$refs.upload.uploadFiles.splice(index, 1);
      this.isHide = false;
      this.sampleForm.file = "";
      if (
        this.sampleForm.type === "" ||
        this.sampleForm.date === "" ||
        this.sampleForm.file === ""
      ) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    changeUpload(file, fileList) {
      fileList.length > 1 ? (this.isHide = false) : (this.isHide = true);
    },
    checkViewImg() {
      this.dialogImageUrl = require("../../../assets/images/screenshot.jpg");
      this.imgDialog = true;
    },
    handlerClearSubmit() {
      this.sampleForm = {
        type: "fba",
        file: "",
        date: "",
        order: "",
        disabled: false,
      };
      this.isDisabled = true;
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
        this.isHide = true;
      }
      this.isHide = false;
    },
    //提交样品寄送信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createTransport({
            order_id: this.orderId,
            transport_type: this.sampleForm.type,
            transport_number: this.sampleForm.order,
            transportimage: this.sampleForm.file,
            transporttime: this.sampleForm.date,
          })
            .then((res) => {
              if (res.code === 1) {
                this.submitDialog = false;
                this.$message.success("样品寄送信息提交成功!");
                this.updata();
              }
            })
            .catch((err) => {
              this.submitDialog = false;
              this.$message.error(err.message);
            });
        } else {
          this.$message.warning("请先填写提交信息！");
          return false;
        }
      });
    },
    //检测提交按钮是否禁用
    checkSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      });
    },
    handleChatFn() {
      if (this.message == 1) {
        this.setIsRead(this.message);
      }
      this.feedbackDialog = true;
      this.chatForm.feedback = "";
      if (this.chatForm.feedback_images.length > 0) {
        this.chatForm.feedback_images = [];
        this.$refs.chatUpload.clearFiles();
      }
      this.handlerGetChatList();
    },
    handleCloseFeedbackDialog() {
      this.setIsRead(0);
    },
    //获取聊天列表
    handlerGetChatList() {
      getChatList({
        order_id: this.orderId,
      })
        .then((res) => {
          if (res.code === 1) {
            this.chatData = res.data;
            if (this.chatData.length > 0) {
              this.scrollToBottom();
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 发送消息
    handlerSedMeg() {
      this.chatForm.feedback_images = [];
      if (this.$refs.chatUpload.uploadFiles.length > 0) {
        this.$refs.chatUpload.uploadFiles.forEach((item) => {
          this.chatForm.feedback_images.push(item.response.data.url);
        });
      }
      if (
        this.chatForm.feedback == "" &&
        this.chatForm.feedback_images.length == 0
      ) {
        this.$message.warning("不能发送空白信息");
        return;
      }
      createChat({
        order_id: this.orderId,
        content: this.chatForm.feedback,
        images: this.chatForm.feedback_images,
      })
        .then((res) => {
          if (res.code === 1) {
            this.chatData.push(res.data);
            this.scrollToBottom();
            this.chatForm.feedback = "";
            this.chatForm.feedback_images = [];
            this.$refs.chatUpload.clearFiles();
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    scrollToBottom() {
      // 滚动到窗体底部
      this.$nextTick(() => {
        let chatForm = document.getElementById("chatForm");
        chatForm.scrollTop = chatForm.scrollHeight;
      });
    },
    handleChatRemove(file) {
      const index = this.$refs.chatUpload.uploadFiles.findIndex(
        (e) => e.uid === file.uid
      );
      this.$refs.chatUpload.uploadFiles.splice(index, 1);
      this.sampleForm.file = "";
      this.feedback_images_length = this.$refs.chatUpload.uploadFiles.length;
    },
    //上传开始
    handleAvatarProgress() {
      console.log("开始上传");
      this.handletext = "图片正在上传中......";
    },

    handleUploadSuccess(res, file) {
      this.handletext = "";
      this.chatForm.feedback_images.push(res.data.url);
      this.feedback_images_length = this.$refs.chatUpload.uploadFiles.length;
    },
    handleUploadError(err) {
      this.$message.error(err.message);
    },
    /*查看上传文件*/
    handleImgView(file) {
      this.dialogImageUrl = file;
      this.imgDialog = true;
    },

    // 查看地址
    getsiteRead(id) {
      siteRead({
        order_id: id,
      }).then((res) => {
        if (res.code == 1) {
          this.centerDialogVisible = true;
          let req = this.tableData.filter((item) => {
            return item.id == id;
          });
          this.getsite = req[0].site;
          this.strArray = this.getsite.split("\r\n");
        }
      });
    },
    goDrxqy(id, userid) {
      window.open(window.location.origin + `/homepage?id=${id}&user-id=${userid}`);
    },
    //修改url
    modifyUrl(id) {
      orderEdit({
        id: id,
        url: this.videoRuleForm.url,
      }).then((res) => {
        if (res.code == 1) {
          this.checkVideoDialog = false;
          this.updata();
        }
      });
    },
    tableListener() {
      // console.log("监听表格dom对象的滚动事件");
      let that = this;
      let dom = that.$refs.multipleTable.bodyWrapper;
      dom.addEventListener("scroll", function () {
        const scrollDistance =
          dom.scrollHeight - dom.scrollTop - dom.clientHeight;
        if (scrollDistance <= 0) {
          //等于0证明已经到底，可以请求接口
          if (that.currentPage < that.totalPage && that.iftableListener) {
            //当前页数小于总页数就请求
            that.currentPage++; //当前页数自增

            //请求接口的代码
            that.getOrderList();
          }
        }
      });
    },

    //更新最新的数据
    updata() {
      this.currentPage == 1 && this.pageSize != 20
        ? (this.pageSize = this.pageSize)
        : (this.pageSize = this.currentPage * 20);

      this.currentPage = 1;
      orderList({
        keyword: this.form.keywords,
        date: this.form.dateValue,
        pageSize: this.pageSize,
        page: this.currentPage,
        message: this.isMessage,
        order: this.order,
        orderType: this.orderType,
      }).then((res) => {
        if (res.code == 1) {
          this.tableData = res.data.data;
          this.totalPage = res.data.last_page;
        }
      });
    },
  },
  components: { FillingRequirementsdialog, Mergepaymentslog },
};
</script>
<style lang="less">
#order {
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #796cf3;
    border-color: #796cf3;
  }

  .video_dialog {

    .el-input.is-disabled .el-input__inner,
    .el-textarea.is-disabled .el-textarea__inner {
      color: #333333;
    }
  }
}

.el-step__head.is-process,
.el-step__title.is-process,
.el-step__title.is-wait,
.el-step__title.is-process {
  color: #999999 !important;
}

.el-step__head.is-wait,
.el-step__head.is-process {
  color: #cccccc !important;
}

.el-step.is-vertical .el-step__line {
  width: 1px !important;
}

.el-step__line {
  background-color: #cccccc !important;
}

.el-step__head.is-finish .el-step__line {
  background: #02b578 !important;
}

.el-step__head.is-wait .el-icon-success:before,
.el-step__head.is-process .el-icon-success:before {
  font-family: "iconfont" !important;
  content: "\e666";
}

.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
  font-size: 18px !important;
}

#order {
  .know_btn {
    padding-top: 28px;

    button {
      display: block;
      margin: auto;
      background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
      border-radius: 16px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
      padding: 5px 41px;
    }
  }

  .viewDialog .el-dialog {
    width: auto;
  }

  .viewImg img {
    display: block;
    width: 100%;
  }

  .el-upload-list__item {
    transition: none;
  }

  .form_error {
    position: absolute;
    top: 12px;
    font-size: 12px;
    left: -5px;
    color: #f56c6c;
  }

  .el-upload-list--picture-card .el-upload-list__item .el-icon-close {
    display: block;
    width: 20px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background: #ed4014;
    opacity: 1;
  }

  .submit_form .el-upload-list--picture-card .el-upload-list__item {
    position: relative;
    transition: none !important;
    margin-bottom: 0 !important;
  }

  .el-upload-list--picture-card .el-upload-list__item-actions span {
    display: inline-block;
    background: none;
  }

  .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
    position: absolute;
    right: 0;
    top: 0;
  }

  .el-upload-list--picture-card .el-upload-list__item-actions .check_preview {
    position: absolute;
    right: 9px;
    bottom: 0;
  }

  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-alert__title {
    font-size: 12px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400 !important;
    color: #666666 !important;
  }

  .el-alert__content {
    padding: 0 0 0 20px !important;
  }

  .el-form-item--mini .el-form-item__label {
    line-height: 20px !important;
  }

  .el-rate__icon {
    font-size: 20px;
  }

  .form_item_block {
    padding-top: 10px;
  }

  .form_item_block label {
    width: 100% !important;
    margin-bottom: 10px;
  }

  .form_item_block .el-form-item__content {
    margin-left: 0 !important;
    float: inherit !important;
  }

  .el-form-item--mini .el-form-item__content {
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
    border-color: #409eff;
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

  .submit_form {
    .el-upload--picture-card {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-icon-plus {
        &:after {
          content: "点击上传（支持jpg、png，5M以内）";
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

    .el-upload-list--picture-card .el-upload-list__item {
      width: 100%;
    }

    .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      height: 150px;
    }

    .description {
      line-height: 20px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999999;
      padding-top: 10px;

      b {
        font-weight: normal;
        color: #ed4014;
      }

      span {
        color: #796cf3;
      }
    }

    .demo_img {
      height: 180px;
      border: 1px solid #eeeeee;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .upload_preview {
        position: absolute;
        cursor: pointer;
        right: 9px;
        bottom: 0;

        i {
          color: #333333;
          font-size: 18px;
        }
      }
    }

    button {
      width: 140px;
      height: 32px;
      background: #cccccc linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
      border-radius: 16px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
      display: block;
      margin: auto;
      margin-top: 13px;
    }
  }

  /*单选样式*/
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #796cf3;
    background: #796cf3;
  }

  /*在线聊天*/
  .chat-message-body {
    height: 350px;
    overflow: auto;
    border-top: 1px solid #eeeeee;
  }

  .chat-message-body .nothing {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .message-card {
    margin: 20px 0;
  }

  .message-row-left {
    display: flex;
    flex-direction: row;
    overflow: auto;
  }

  .message-row-right {
    display: flex;
    flex-direction: row-reverse;
    overflow: auto;
  }

  .message-row-right .message-body {
    /*display: inline;*/
    background: #796cf3;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    border-top-right-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    white-space: pre-wrap;
  }

  .message-row-left .message-body {
    background: #f6f7f9;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 24px;
    border-top-right-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    white-space: pre-wrap;
  }

  .message-row-right>img,
  .message-row-left>img {
    border-radius: 50%;
  }

  .message-row-left .message-content {
    margin-right: 40px;
    align-items: start;
  }

  .message-row-right .message-content {
    margin-left: 40px;
    align-items: end;
  }

  .message-content {
    margin: 5px 10px 5px 10px;
    display: flex;
    flex-direction: column;
  }

  .message-content .name {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
  }

  .message-body {
    padding: 6px 14px;
    border-radius: 3px;
    margin-top: 10px;
  }

  .message-time {
    margin: 0 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 24px;
  }

  .footer-btn {
    float: right;
    margin-bottom: 5px;
  }

  .spin-icon-load {
    animation: ani-spin 1s linear infinite;
  }

  @keyframes ani-spin {
    form {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .feedback_images_list {
    display: flex;
    position: relative;
  }

  .feedback_images_list>div {
    display: flex;
    justify-content: end;
    padding: 8px;
    margin-top: 10px;
  }

  .feedback_images_list .item_img {
    width: 96px;
    height: 96px;
    margin: 6px;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }

  .message-row-right .feedback_images_list {
    justify-content: end;
  }

  .message-row-right .feedback_images_list>div {
    background: #796cf3;
    border-top-right-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .message-row-left .feedback_images_list>div {
    background: rgba(246, 247, 249, 1);
    border-top-right-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .feedback_images_list .item_img .demo-upload-list-cover {
    display: none;
  }

  .feedback_images_list .item_img:hover .demo-upload-list-cover {
    display: block;
  }

  .feedback_images_list .demo-upload-list-cover {
    line-height: 90px;
    text-align: center;
    top: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    i {
      color: #ffffff;
    }
  }

  .feedback_modal textarea.ivu-input {
    height: 100px;
    border-radius: 4px;
  }

  .feedback_modal .title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #666666;
    line-height: 20px;
    margin: 20px 0 10px 0;
  }

  .feedback_modal .el-dialog__title:after {
    display: block;
    content: "请在下方留言反馈，系统会及时通知达人经纪人查看";
    font-size: 12px;
    color: #999999;
    font-weight: normal;
    text-align: center;
  }

  .feedback_modal .title span {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999999;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 17px;
  }

  .chat_upload .el-upload--picture-card {
    width: 62px;
    height: 60px;
    line-height: 60px;
  }

  .chat_upload .el-upload-list--picture-card .el-upload-list__item {
    width: 62px;
    height: 60px;
  }

  .chat_upload i {
    font-size: 14px;
  }

  .chat_upload .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
    top: -10px;
    right: 2px;
  }

  .chat_upload .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-preview {
    position: absolute;
    right: 2px;
    bottom: -6px;
  }

  /*支付尾款弹窗*/
  .payment_dialog,
  .pay_deposit_dialog {
    .el-tabs--border-card>.el-tabs__content {
      padding: 34px 15px 21px 15px;
    }

    .qrcode {
      position: relative;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 140px;
      margin: auto;
      border: 1px solid #eeeeee;

      .top_left,
      .top_right,
      .bottom_left,
      .bottom_right {
        position: absolute;
        width: 4px;
        height: 4px;
      }

      .top_left {
        border-top: 1px solid #333333;
        left: -1px;
        top: -1px;
        border-left: 1px solid #333333;
      }

      .top_right {
        border-top: 1px solid #333333;
        right: -1px;
        top: -1px;
        border-right: 1px solid #333333;
      }

      .bottom_left {
        border-bottom: 1px solid #333333;
        left: -1px;
        bottom: -1px;
        border-left: 1px solid #333333;
      }

      .bottom_right {
        border-bottom: 1px solid #333333;
        right: -1px;
        bottom: -1px;
        border-right: 1px solid #333333;
      }
    }

    .el-tabs--border-card {
      border: 1px solid #eeeeee;
      margin-top: 15px;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item+.el-tabs__item {
      margin-left: 0;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child {
      border-right: 1px solid #eeeeee !important;
      margin-left: 0;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      color: #999999;
      font-family: PingFangSC-Semibold, PingFang SC;
      border: none;
      margin-bottom: 1px;
      transition: none;
      height: 42px;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
      font-weight: 600;
      color: #333333;
      background: #f6f5ff;
      border-bottom: 2px solid #796cf3;

      i {
        font-weight: normal;
      }
    }

    .el-tabs--border-card>.el-tabs__header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      overflow: hidden;
      border-bottom: 1px solid #eeeeee;
      background: #ffffff;
    }

    .el-tabs--border-card {
      box-shadow: none;
      border-radius: 10px;
    }

    .el-tabs__nav {
      width: 100%;
      //padding-bottom: 1px;
    }

    .el-tabs__item {
      width: 50%;
      text-align: center;
    }
  }

  /*支付定金弹窗*/
  .pay_deposit_dialog {
    .el-alert {
      padding: 7px 0;

      .el-alert__description {
        margin: 0;
      }
    }

    .el-alert__icon {
      color: #796cf3;
    }

    .el-alert--info.is-light {
      background: #f4f2ff;
      color: #666666;
    }

    .el-alert__title {
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
.el-radio--small.is-bordered {
  height: 191px !important;
  padding: 20px 14px !important;
  width: 208px;
  border-radius: 10px !important;
}

.el-radio--small.is-bordered .el-radio__label {
  font-size: 14px !important;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  line-height: 20px;
}

.el-radio__label ul {
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

.el-radio__label ul li:before {
  display: inline-block;
  content: "";
  width: 4px;
  height: 4px;
  background: #666666;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -2px;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #333333 !important;
}

.radio_style2 .el-radio__input.is-checked .el-radio__inner {
  border: 1px solid #00d9ad !important;
  background: #00d9ad !important;
}

.radio_style2.is-bordered.is-checked {
  border: 2px solid #00d9ad !important;
}

.radio_style1 .el-radio__input.is-checked .el-radio__inner {
  border: 1px solid rgba(121, 108, 243, 1) !important;
  background: rgba(121, 108, 243, 1) !important;
  background-image: url("../../../assets/images/radio_style1_bg.png");
}

.radio_style1.is-bordered.is-checked {
  border: 2px solid rgba(121, 108, 243, 1) !important;
}

/*步骤条样式*/
.el-step.is-vertical .el-step__title {
  font-size: 14px;
  font-weight: 600 !important;
  padding-bottom: 6px !important;
  font-family: PingFangSC-Semibold, PingFang SC;
}

.el-step__head.is-finish {
  color: #02b578 !important;
  border-color: #02b578 !important;
}

.el-step__title.is-finish {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333 !important;
  line-height: 20px;
}

.el-step__description {
  color: #999999 !important;
}

.el-step__description.is-finish {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 17px;
}

.el-step.is-vertical .el-step__main {
  margin-bottom: 15px;
}

/*分页样式*/
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #ffffff !important;
  color: #d161f6 !important;
  border: 1px solid #d161f6;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #ffffff !important;
  border: 1px solid #dcdee2;
  font-weight: normal;
  color: #999999 !important;
}

.el-badge__content.is-dot {
  width: 6px !important;
  height: 6px !important;
  top: 2px !important;
  right: 2px !important;
}

.el-table th.el-table__cell.is-leaf {
  border-bottom: none !important;
  padding: 6px 0;
  background: #f8f8f8 !important;
}

.el-table__body-wrapper {
  width: auto !important;
  border-radius: 4px !important;
  margin-top: 10px;

  .el-table__body {
    width: auto !important;
  }
}

.el-table th.el-table__cell>.cell,
.el-table td.el-table__cell div {
  font-family: PingFangSC-Regular, PingFang SC;
  color: #333333;
}

.order_table {
  .cell {
    text-align: center;
  }
}
</style>
<style lang="less" scoped>
.form_button {
  button {
    margin: auto;
    display: block;
    width: 140px;
    height: 32px;
    border-radius: 16px;
    border: none;
    margin-top: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #ffffff;
    cursor: pointer;
  }
}

#order {
  .item_check_style {
    display: flex;
    align-items: center;
    height: 32px;

    .label_style {
      width: 48px;
      text-align: left;
      color: #666666;
      padding-top: 4px;
    }
  }

  .upload_btn_box {
    .el-button.is-disabled {
      color: #c0c4cc !important;
      cursor: not-allowed !important;
      background-image: none !important;
      background-color: #ebeef5 !important;
      border-color: #ebeef5 !important;
    }
  }

  background: #f5f7f9;
  padding: 20px 30px 0 30px;
  min-height: calc(100vh - 86px);

  .reset_btn {
    margin-left: 30px;
    color: #333333;
    font-size: 14px;

    i {
      color: #796cf3;
      font-size: 16px;
    }
  }

  .content {
    background: #ffffff;
    border-radius: 0px 4px 4px 0px;
    padding-top: 20px;

    .form_search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .title {
        font-size: 14px;
        color: #333333;
        display: flex;
        align-items: center;

        ::v-deep(.el-form-item__content) {
          margin-left: 0px !important;
        }
      }
    }

    .order_table {
      i {
        color: #796cf3;
        font-size: 10px;
      }

      .asin {
        display: flex;
        justify-content: center;

        .asin-img {
          height: 60px;
          width: 60px;
          border-radius: 2px;
          border: 1px solid #eeeeee;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .asin-p {
          text-align: left;
          padding-left: 12px;
          padding-top: 10px;
          width: 150px;

          .p1 {
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .p2 {
            font-size: 12px;
            color: #999999;
            display: flex;

            a {
              text-decoration: none;
            }

            span {
              min-width: 82px;
              display: block;
              margin-right: 5px;
            }

            i {
              cursor: pointer;
            }
          }
        }

        .asin-div {
          line-height: 60px;
          font-weight: 400;
          color: #a06cf3;
          font-size: 12px;
          text-align: left;
          width: 40px;

          span {
            cursor: pointer;
            margin-right: 3px;
          }

          i {
            cursor: pointer;
          }
        }
      }

      .avatar_box {
        display: flex;
        align-items: center;
        justify-content: center;

        >p:first-child {
          width: 40px;
          height: 40px;
          background: #e5e5e5;
          border-radius: 50%;
          line-height: 40px;
          margin-right: 10px;
          flex-shrink: 0;

          img {
            width: 100%;
          }
        }
      }

      .status_style {
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin-right: 6px;
        }
      }

      .operation_btn {
        width: 82px;
        height: 32px;
        border-radius: 4px !important;
      }

      .payment_btn_style {
        color: #a06cf3;
        display: flex;
        justify-content: center;
        border: 1px solid #a06cf3;
      }

      .payment_btn_style:hover {
        color: #fff;
        background: #a06cf3;
      }

      .payment_btn_style2 {
        background: #fff;
        color: #999;
        border: 1px solid #eeeeee;
      }

      .payment_btn_style2:hover {
        background: #eee;
      }

      .normal_style {
        width: 82px;
        color: #333333;
        margin: 0 5px;
      }
    }
  }

  .order-bottom {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 100vw;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 69px;
    padding: 0 60px;
    box-sizing: border-box;
  }

  .payment_content {
    h4 {
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff2c4c;
      line-height: 30px;
      text-align: center;
      padding: 20px 0 6px 0;
    }

    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      text-align: center;
      padding-bottom: 10px;

      span {
        color: #333333;
      }
    }

    ul {
      border-radius: 10px;
      border: 2px solid #f4f2ff;
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
      margin: 15px 35px 16px 35px;

      li {
        div {
          width: 128px;
          height: 128px;
          background: #ffffff;
          border: 1px solid #eeeeee;

          img {
            width: 100%;
          }
        }

        p {
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

          i {
            font-size: 18px;
            margin-right: 6px;
          }
        }
      }
    }
  }

  .return_deposit_dialog {
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 24px;
      text-align: center;
      padding-bottom: 4px;

      b {
        color: #333333;
      }
    }

    .button_box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 24px;

      button {
        padding: 8px 45px;
        border-radius: 16px;
        font-size: 14px;
      }

      .cancel_style {
        border: 1px solid #eeeeee;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #999999;
      }

      .cancel_style:hover {
        background: none;
      }

      .confirm_style {
        border: none;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
      }
    }
  }

  .to_comment_dialog {
    .description {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
      text-align: center;
      margin-bottom: 34px;
    }

    .comment_form {
      .el-form-item {
        margin-bottom: 14px;
      }
    }
  }

  .video_dialog {
    .form_item_title {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999999;
      line-height: 17px;
      margin-bottom: 6px;
    }

    .item_check_style {

      .el-checkbox-group,
      .el-radio-group {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .el-checkbox,
      .el-radio {
        color: #666666;
        padding-top: 5px;
        width: 120px;
        margin-right: 0px;
      }
    }

    .el-form-item--small.el-form-item {
      margin-bottom: 14px !important;
    }

    .video_ruleForm {
      height: 565px;
      padding-top: 10px;
      padding-right: 10px;
      margin: 0 12px;
      overflow: auto;

      .radio_style1 {
        background: rgba(131, 96, 255, 0.04);
        border: 1px solid rgba(131, 96, 255, 1);
        position: relative;

        &:before {
          content: url("../../../assets/images/radio_style1_bg.png");
          width: 60px;
          height: 48px;
          display: block;
          position: absolute;
          right: 12px;
          bottom: 12px;
        }

        .recommend:before {
          position: absolute;
          content: "";
          width: 3px;
          height: 3px;
          background: #ffffff;
          border-radius: 50%;
          top: 50%;
          margin-top: -2px;
          left: 8px;
        }

        .recommend {
          position: absolute;
          text-align: center;
          line-height: 22px;
          right: 0;
          top: 10px;
          width: 40px;
          height: 22px;
          background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
          border-radius: 100px 0px 0px 100px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          padding-left: 8px;
        }
      }

      .radio_style2 {
        position: relative;
        background: rgba(0, 217, 173, 0.04);
        border: 1px solid rgba(0, 217, 173, 1);

        &:before {
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
        .list-group-item {
          position: relative;
          float: left;

          .list-group-index {
            position: absolute;
            top: 6px;
            right: 6px;
            background: #cccccc;
            padding: 0 4px;
            border-radius: 7px 0px 0px 7px;
            font-size: 10px;
            color: #ffffff;
            line-height: 14px;
          }

          &:first-child {
            .list-group-index {
              background: #ff2c4c;
            }
          }

          &:nth-child(2) {
            .list-group-index {
              background: #ff9c17;
            }
          }

          &:nth-child(3) {
            .list-group-index {
              background: #796cf3;
            }
          }
        }

        li {
          width: 77px;
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #eeeeee;
          text-align: center;
          padding: 12px 5px;
          float: left;
          margin-right: 6px;

          div {
            width: 44px;
            height: 44px;
            border-radius: 26px;
            margin: auto;
            overflow: hidden;

            img {
              width: 100%;
              object-fit: cover;
              height: 100%;
            }
          }

          p {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 17px;
            text-align: center;
            margin: 4px 0;
          }

          span {
            display: block;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #796cf3;
            line-height: 17px;
            text-align: center;
          }

          &:last-child li {
            margin-right: 0;
          }
        }
      }
    }
  }

  .submit_dialog {
    .el-form-item--small.el-form-item {
      margin-bottom: 20px !important;
    }

    .submit_form {
      padding: 10px 16px 0 16px;
    }

    .button_box {
      padding-top: 7px;

      button {
        display: block;
        margin: auto;
        width: 140px;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        border-radius: 16px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        padding: 8px 0;
      }
    }
  }

  .pay_deposit_dialog {
    h5 {
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff2c4c;
      line-height: 30px;
      text-align: center;
      margin: 18px 0 1px 0;
    }

    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      text-align: center;
      padding: 5px 0;

      span {
        color: rgba(51, 51, 51, 1);
      }
    }

    ul {
      border-radius: 10px;
      border: 2px solid #f4f2ff;
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
      margin: 15px 35px 16px 35px;

      li {
        div {
          width: 128px;
          height: 128px;
          background: #ffffff;
          border: 1px solid #eeeeee;

          img {
            width: 100%;
          }
        }

        p {
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

          i {
            font-size: 18px;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.group_26 {
  background-color: rgba(244, 242, 255, 1);
  border-radius: 4px;
  width: 100%;
  height: 94px;
}

.image-text_40 {
  width: 392px;
  height: 66px;
  margin: 14px 0 0 14px;
  display: flex;
  padding-top: 15px;
}

.thumbnail_26 {
  width: 15px;
  height: 18px;
}

.text-group_14 {
  width: 369px;
  height: 66px;
  overflow-wrap: break-word;
  font-size: 0;
  font-family: PingFangSC-Regular;
  font-weight: NaN;
  text-align: left;
  line-height: 20px;
  margin-left: 9px;
}

.text_98 {
  width: 369px;
  height: 66px;
  overflow-wrap: break-word;
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: NaN;
  text-align: left;
  line-height: 20px;
}

.text_99 {
  width: 369px;
  height: 66px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 12px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  line-height: 20px;
}

.paragraph_1 {
  width: 369px;
  height: 66px;
  overflow-wrap: break-word;
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: NaN;
  text-align: left;
  line-height: 20px;
}
</style>
<style lang="less" scoped>
.pagination-span {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  margin-right: 15px;
}

.pagination-btn {
  width: 140px;
  height: 32px;
  background: #d161f6;
  border-radius: 4px;
  position: relative;

  .pagination-btn-span {
    width: 79px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}

.pagination-btn:hover {
  background: #d161f6;
}

.paginationBtn {
  width: 140px;
  height: 32px;
  background: rgba(209, 97, 246, 0.4);
  border-radius: 4px;
  color: #ffffff;
  line-height: 8px;
  pointer-events: none;
}

.paginationBtn:hover {
  color: #ffffff;
}
</style>
<style lang="less" scoped>
.elDialogDz {
  width: 90%;
  height: 140px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  margin: 24px auto;
  padding: 12px 16px;
}

.elDialogDz-btn {
  width: 140px;
  height: 32px;
  background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
  border-radius: 16px;
  line-height: 0px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.elDialogDz-btn:hover {
  color: #ffffff;
}

.Thprice {
  // width: 42px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #796cf3;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #796cf3;
  text-align: center;
  position: absolute;
  top: 18px;
  right: 70px;
}
</style>
<style lang="less" scoped>
#order .video_dialog .video_ruleForm {
  height: auto;
}
</style>
<style>
.el-table__row>td>.cell {
  padding-right: 0px;
  padding-left: 0px;
}

.el-table .warning-row {
  border-bottom: 0px dashed #fff !important;
  border-top: 0px dashed #fff !important;
}
</style>
<style lang="less" scoped>
::v-deep .el-form-item--small .el-form-item__label {
  line-height: 22px;
}

::v-deep(.el-table__header-wrapper table) {
  padding: 0 10px 12px;
  background: #fff;
  width: auto !important;
}

::v-deep(.el-textarea__inner) {
  min-height: 120px !important;
}

::v-deep(.el-table td.el-table__cell) {
  border-bottom: none;
}

::v-deep(.el-table__body) {
  border-collapse: collapse !important;
}

::v-deep(.el-table) {
  background: #f5f7f9;
}

::v-deep(.el-table tr) {
  border-top: 6px solid #f5f7f9;
}

::v-deep(.el-table tr td .cell .el-checkbox) {
  padding-left: 17px;
}

::v-deep(.el-table .el-table__cell.gutter) {
  background: #fff;
}

.order_table ::v-deep .el-table__body tr:hover>td {
  background-color: rgb(243, 243, 243) !important;
}
</style>
