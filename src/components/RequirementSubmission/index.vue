<template>
  <div class="RequirementBox">
    <div class="RequirementBoxBanxin">
      <p class="hearder">提交视频拍摄需求</p>
      <div class="RequirementWenben">
        <div class="RequirementWenben-div1">
          <span @click="NotedialogdialogVisible = true">拍摄须知</span>
          <div></div>
          <span @click="TipsdialogVisible1 = true">新手引导</span>
        </div>
        <div class="RequirementWenben-div2">
          <el-tooltip
            class="item"
            effect="dark"
            content="支持多人同时在线填写"
            placement="top"
          >
            <div
              class="elIcon2 tips7"
              @click="InvitationFillingdialogVisble = true"
            >
              <i class="iconfont icon-fx1"></i>
              <span>邀请填写</span>
            </div>
          </el-tooltip>
          <div class="elIcon2 tips6">
            <el-upload
              action=""
              accept=".xls, .xlsx"
              :show-file-list="false"
              :multiple="false"
              :http-request="httpRequest"
            >
              <i class="iconfont icon-yq"></i>
              <span>批量导入</span>
            </el-upload>
          </div>
          <div class="elIcon2">
            <i class="iconfont icon-mb"></i>
            <a :href="fileDiz" style="cursor: pointer">下载模板</a>
          </div>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击后同步他人填写的需求"
            placement="top"
          >
            <div class="elIcon2 tips8" @click="reloadPage">
              <i class="iconfont icon-sx"></i>
              <span>刷新</span>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div
        class="loading-area"
        style="
          position: relative;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          box-sizing: border-box;
        "
      >
        <el-table
          ref="elTable"
          :data="tableData"
          :header-cell-style="{
            background: '#F6F6F6',
            color: '#333333',
            position: 'relative',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" width="70">
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2" style="padding-right: 30px">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column width="400">
            <template slot="header">
              <div style="display: flex; justify-content: center">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                    <p style="line-height: 20px">
                      默认按排序先后匹配红人，未选 <br />
                      意向红人时，默认为平台推荐
                    </p>
                  </div>
                  <p>意向红人</p>
                </el-tooltip>
                <span style="color: #999999; font-size: 12px; margin-left: 4px"
                  >(可上下左右拖动排序)</span
                >
              </div>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2">
                <ul class="influencerInfoUl">
                  <draggable
                    v-model="scope.row.influencer_info"
                    animation="100"
                    @end="
                      influencer_infoOnEnd(
                        tableData,
                        scope.$index,
                        scope.row.id
                      )
                    "
                    @start="influencer_infoOnStart(scope.row.influencer_info)"
                    ghostClass="ghost"
                    chosenClass="chosen"
                    :forceFallback="true"
                    group="people"
                    handle=".mover"
                  >
                    <transition-group :style="style">
                      <li
                        class="influencerInfoLi isinfluencerInfoLi"
                        v-for="(item, index) in scope.row.influencer_info"
                        :key="index"
                        @mousedown="influencerinfomousedown(item)"
                      >
                        <div
                          v-if="item.ifinfluencerInfo"
                          class="influencerInfoLi_div"
                        >
                          <div class="influencerInfo">
                            <i class="el-icon-user-solid"></i>
                          </div>
                          <div class="influencerInfo2">平台推荐</div>
                        </div>
                        <div v-else class="influencerInfoLi_div mover">
                          <div style="position: relative">
                            <img
                              :src="item.image"
                              style="
                                display: block;
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                object-fit: cover;
                              "
                              @click="gohomepage(item.user_id)"
                            />
                            <i
                              class="el-icon-error delDiv"
                              @click="delDr(item.user_id, scope.row.id)"
                            ></i>
                          </div>
                          <p
                            style="
                              font-size: 12px;
                              font-family: PingFangSC-Regular, PingFang SC;
                              font-weight: 400;
                              color: #999999;
                              max-width: 50px;
                              white-space: nowrap;
                            "
                          >
                            <span>No.{{ item.user_id }}</span>
                          </p>
                          <p
                            style="
                              font-size: 12px;
                              font-weight: 400;
                              color: #796cf3;
                              text-align: center;
                            "
                          >
                            {{ item.price }}
                          </p>
                          <div
                            :class="{
                              indextop: true,
                              indextop1: index == 0,
                              indextop2: index == 1,
                              indextop3: index == 2,
                              indextop4: index == 3,
                              indextop5: index == 4,
                            }"
                          >
                            {{ index + 1 }}
                          </div>
                        </div>
                      </li>
                    </transition-group>
                  </draggable>

                  <li
                    class="influencerInfoLiclass"
                    v-if="scope.row.influencer_info.length != 5"
                  >
                    <div
                      class="influencerInfoLi_div"
                      v-if="scope.row.influencerInfo"
                    >
                      <div class="influencerInfo">
                        <i class="el-icon-user-solid"></i>
                      </div>
                      <div class="influencerInfo2">平台推荐</div>
                    </div>
                    <div class="influencerInfoLi_div2">
                      <div
                        class="influencerInfo3"
                        @click="
                          Addinfluencers(
                            scope.row.influencer_info,
                            scope.row.id
                          )
                        "
                      >
                        +
                      </div>
                      <div class="influencerInfo2">添加</div>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄要求" width="340">
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2">
                <div v-if="scope.row.flag || scope.row.title == ''">
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div
                      class="addbtn"
                      @click="Fillintherequirements(scope.row.id)"
                    >
                      <i class="iconfont icon-tx"></i>
                      填写
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  style="
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    justify-content: center;
                  "
                  class="table-yaoq"
                >
                  <div
                    style="
                      height: 60px;
                      width: 60px;
                      border: 1px solid #f0f0f0;
                      padding: 1px;
                    "
                  >
                    <img
                      :src="scope.row.image[0]"
                      style="width: 100%; height: 100%; object-fit: cover"
                      v-if="scope.row.image.length != 0"
                      @click="gocommodity(scope.row.url)"
                    />
                    <img
                      src="@/assets/images/tp.png"
                      v-else
                      style="width: 20px; height: 20px; margin-top: 20px"
                    />
                  </div>
                  <div style="margin-left: 5px">
                    <p
                      style="
                        width: 100px;
                        max-height: 3em;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        text-overflow: ellipsis;
                        text-align: left;
                        padding-left: 6px;
                        box-sizing: border-box;
                      "
                      :title="scope.row.title"
                    >
                      {{ scope.row.title }}
                    </p>
                    <p
                      style="font-size: 12px; color: #999999"
                      v-if="scope.row.url"
                      @click="gocommodity(scope.row.url)"
                    >
                      {{ scope.row.asin
                      }}<i
                        class="iconfont icon-share"
                        style="
                          color: #a06cf3;
                          font-size: 12px;
                          margin-left: 3px;
                        "
                      ></i>
                    </p>
                    <p v-else style="color: #999999">--</p>
                  </div>

                  <div
                    @click="openFillingRequirementsdialog(scope.$index)"
                    class="tableyaoq-div"
                  >
                    <p>详情</p>
                    <i class="iconfont icon-tx"></i>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="视频数量">
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2" class="inputnumber">
                <div class="tips4">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="减少当前变体/型号的拍摄数量"
                    placement="top"
                  >
                    <button
                      @click="scope.row.video_num--"
                      @mouseup="
                        handleChange(
                          scope.row.budget_tip,
                          scope.row.video_num - 1,
                          scope.row.id,
                          scope.row.budget,
                          scope.$index
                        )
                      "
                      :disabled="
                        scope.row.video_num == 1 || scope.row.title == ''
                      "
                      :class="{
                        disabled:
                          scope.row.video_num == 1 || scope.row.title == '',
                      }"
                    >
                      -
                    </button>
                  </el-tooltip>
                  <input type="text" v-model="scope.row.video_num" readonly />
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="增加当前变体/型号的拍摄数量"
                    placement="top"
                  >
                    <button
                      @click="scope.row.video_num++"
                      @mouseup="
                        handleChange(
                          scope.row.budget_tip,
                          scope.row.video_num + 1,
                          scope.row.id,
                          scope.row.budget,
                          scope.$index
                        )
                      "
                      :disabled="scope.row.title == ''"
                      :class="{
                        disabled: scope.row.title == '',
                      }"
                    >
                      +
                    </button>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄预算/¥" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2" style="padding-left: 25px">
                <el-form
                  :model="scope.row"
                  :ref="'ruleForm' + scope.$index"
                  class="elform"
                >
                  <el-form-item prop="budget">
                    <el-input
                      v-model="scope.row.budget"
                      style="height: 32px; width: 74px"
                      class="elinput"
                      @input="
                        budgetChange(
                          scope.row.budget,
                          scope.$index,
                          scope.row.video_num
                        )
                      "
                      @blur="
                        budgetBlur(
                          scope.row.budget,
                          scope.row.id,
                          scope.$index,
                          scope.row.video_num
                        )
                      "
                      :disabled="scope.row.title == ''"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.flag != 2" style="padding-left: 20px">
                <ul
                  style="
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                  "
                >
                  <li class="operate" v-if="scope.row.title != ''">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="复制后可编辑创建其他变体/型号需求"
                      placement="top"
                    >
                      <span
                        class="operate1"
                        @click="operatedialog(scope.$index)"
                      >
                        <i class="iconfont icon-fz"></i> 复制</span
                      >
                    </el-tooltip>
                  </li>
                  <li class="operate">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除该行内容"
                      placement="top"
                      :enterable="false"
                    >
                      <span
                        class="operate2"
                        @click="deletesubmitForm(scope.row.id, scope.$index)"
                      >
                        <i class="iconfont icon-sc"></i> 删除</span
                      >
                    </el-tooltip>
                  </li>
                </ul>
              </div>

              <div v-else style="padding-left: 25px">
                <div class="adddemand">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="新增一行"
                    placement="top"
                  >
                    <i class="el-icon-circle-plus" @click="adddemand"></i>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div :class="{ ifsubmitTo: ifsubmitTo, RequirementBtn: true }">
        <button @click="submitTo">提交</button>
      </div>
      <div class="elIcon">
        <el-checkbox v-model="checked" style="margin-right: 10px"></el-checkbox>
        <span>我已阅读并同意</span
        ><span style="cursor: pointer; color: #a06cf3" @click="goNote"
          >《平台售后及免责声明》</span
        >
      </div>
    </div>

    <el-dialog
      title="请确认"
      :visible.sync="centerDialogVisibles"
      width="20%"
      center
    >
      <p style="text-align: center">是否删除该拍摄需求？</p>
      <span slot="footer" class="dialog-footer">
        <button
          style="
            width: 120px;
            height: 32px;
            border-radius: 5px;
            border: 1px solid #eeeeee;
            cursor: pointer;
            margin: 0 5px;
            color: #999999;
          "
          @click="centerDialogVisibles = false"
        >
          取 消
        </button>
        <button
          style="
            width: 120px;
            height: 32px;
            background: #d161f6;
            border-radius: 5px;
            cursor: pointer;
            border: none;
            margin: 0 5px;
            color: #ffffff;
          "
          @click="deletecenterDialogVisibles"
        >
          确 定
        </button>
      </span>
    </el-dialog>

    <!-- 达人列表 -->
    <ListOfInfluencersdialog
      :datalistdialogVisible="datalistdialogVisible"
      @setdatalistdialogVisible="getdatalistlogMsg"
      :influencersList="influencersList"
      :influencersListid="influencersListid"
      @getlist="getlist"
    ></ListOfInfluencersdialog>

    <!-- 填写要求弹窗 -->
    <FillingRequirementsdialog
      :isFillingRequirementsdialogVisible="FillingRequirementsdialogVisible"
      @isFillingRequirementsdialogVisible="getChildMsg"
      :reqsearch="reqsearch"
      :determine="determine"
      :RequirementsList="RequirementsList"
      :FillingRequirementid="FillingRequirementid"
    ></FillingRequirementsdialog>

    <!-- 温馨提示 -->
    <Tipsdialog
      :TipsdialogdialogVisible="TipsdialogdialogVisible"
      @getTipsdialogMsg="getTipsdialogMsg"
      :video_id="video_id"
      :reqsearch="reqsearch"
    ></Tipsdialog>

    <!--支付定金-->
    <el-dialog
      title="已提交成功，请尽快支付定金"
      :visible.sync="payDepositDialogVisible"
      width="500px"
      :close-on-click-modal="false"
      class="pay_deposit_dialog"
      center
    >
      <div style="position: relative">
        <el-alert
          title="支付定金后，平台将正式为您对接达人。不满意可随时申请退还定金。"
          center
          style="position: relative"
          :closable="false"
        >
          <i
            class="iconfont icon-tips"
            style="
              position: absolute;
              top: 8px;
              left: 14px;
              font-size: 18px;
              color: #796cf3;
            "
          ></i>
        </el-alert>
        <h5>¥{{ orderData[0].order.price }}</h5>
        <p>定金金额</p>
        <p>
          订单号：
          <span>{{ orderData[0].order.order_id }}</span>
        </p>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span
              slot="label"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
              ><i
                class="iconfont icon-zhifupingtai-weixin"
                style="
                  color: rgba(59, 202, 114, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "
              ></i
              >微信支付</span
            >
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
            <span
              slot="label"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
              ><i
                class="iconfont icon-zhifu-zhifubao"
                style="
                  color: rgba(2, 169, 241, 1);
                  font-size: 20px;
                  margin-right: 6px;
                "
              ></i
              >支付宝支付</span
            >
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

        <div
          style="
            width: 20px;
            height: 20px;
            background: #02b578;
            border-radius: 50%;
            text-align: center;
            color: white;
            position: absolute;
            top: -34px;
            left: 88px;
          "
        >
          √
        </div>
      </div>
    </el-dialog>

    <!--支付完成-->
    <el-dialog
      :title="'定金支付成功'"
      :visible.sync="paymentCompletedDialogVisible"
      width="360px"
      @close="goOrder"
      :close-on-click-modal="false"
      class="payment_completed_dialog"
      center
    >
      <div slot="title">
        <i
          style="color: rgba(2, 181, 120, 1); font-size: 20px"
          class="el-icon-success"
        ></i>
        定金支付成功
      </div>
      <div>
        <p style="line-height: 24px; text-align: center">
          平台将开始匹配并对接达人，预计1-2个工作日会收到反馈，敬请留意
        </p>
        <div class="button_box know_btn">
          <el-button
            @click="
              paymentCompletedDialogVisible = false;
              goOrder();
            "
            >我知道了</el-button
          >
        </div>
      </div>
    </el-dialog>

    <!-- 温馨提示弹窗 -->
    <Notedialog
      @getNotedialogMsg="getNotedialogMsg"
      :NotedialogdialogVisible="NotedialogdialogVisible"
    ></Notedialog>

    <dialogVisibleTips1
      :TipsdialogVisible1="TipsdialogVisible1"
      @getTipsdialogVisible1="getTipsdialogVisible1"
    ></dialogVisibleTips1>

    <!-- 邀请填写弹窗 -->
    <InvitationFillingdialog
      :InvitationFillingdialogVisble="InvitationFillingdialogVisble"
      @InvitationFillingdialogMsg="InvitationFillingdialogMsg"
      :InvitationFillingdialoglink="InvitationFillingdialoglink"
    ></InvitationFillingdialog>
  </div>
</template>

<script>
import {
  search,
  needsDelete,
  needsRemoveInfluencer,
  needsSubmit,
  checkPayment,
  needsTemplate,
  needsVideoNumin,
  needsBudget,
  needsIndex,
  needsSelectInfluencer,
} from "@/api";
import draggable from "vuedraggable";
import FillingRequirementsdialog from "./dialog/FillingRequirementsdialog.vue";
import Tipsdialog from "./dialog/Tipsdialog.vue";
import ListOfInfluencersdialog from "./dialog/ListOfInfluencersdialog.vue";
import Notedialog from "./dialog/notedialog.vue";
import dialogVisibleTips1 from "./dialog/dialogVisibleTips1.vue";
import InvitationFillingdialog from "./dialog/InvitationFillingdialog.vue";
import store from "@/store";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      datalistdialogVisible: false,
      checked: false,
      formId: "",
      centerDialogVisibles: false,
      tableData: [
        {
          flag: 1,
          influencer_info: [],
        },
      ],
      checkWechatPaymentVal: "",
      checkAlipayPaymentVal: "",
      handleSelectionChangeList: [],
      fileDiz: "",
      FillingRequirementsdialogVisible: false,
      determine: 1,
      RequirementsList: {},
      TipsdialogdialogVisible: false,
      video_id: "",
      payDepositDialogVisible: false,
      paymentCompletedDialogVisible: false,
      orderData: [
        {
          order: {
            price: "",
            order_id: "",
          },
        },
      ],
      timer: null,
      influencersList: [],
      influencersListid: 0,
      tableDataTitle: true,
      ifsubmitTo: false,
      NotedialogdialogVisible: false,
      influencerids1: [],
      influencerids2: [],
      differentIndices: [],
      user_id: "",
      FillingRequirementid: 0,
      introOption: {
        // 参数对象
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "完成",
        tooltipClass: "intro-tooltip" /* 引导说明文本框的样式 */,
        // highlightClass: 'intro-highlight', /* 说明高亮区域的样式 */
        exitOnEsc: true /* 是否使用键盘Esc退出 */,
        exitOnOverlayClick: false /* 是否允许点击空白处退出 */,
        keyboardNavigation: true /* 是否允许键盘来操作 */,
        showBullets: false /* 是否使用点显示进度 */,
        showProgress: false /* 是否显示进度条 */,
        scrollToElement: true /* 是否滑动到高亮的区域 */,
        overlayOpacity: 0.5, // 遮罩层的透明度 0-1之间
        positionPrecedence: [
          "bottom",
          "top",
          "right",
          "left",
        ] /* 当位置选择自动的时候，位置排列的优先级 */,
        disableInteraction: true /* 是否禁止与元素的相互关联 */,
        hidePrev: true /* 是否在第一步隐藏上一步 */,
        // hideNext: true, /* 是否在最后一步隐藏下一步 */
        steps: [] /* steps步骤，可以写个工具类保存起来 */,
      },
      tipsImg1: require("../../assets/images/tipsImg/tips1.webp"),
      tipsImg2: require("../../assets/images/tipsImg/tips2.webp"),
      tipsImg3: require("../../assets/images/tipsImg/tips3.webp"),
      tipsImg4: require("../../assets/images/tipsImg/tips4.webp"),
      ifGuide: 0,
      style: "min-height:78px;display: block;",
      TipsdialogVisible1: false,
      deletecenterDialogVisiblesindex: 0,
      InvitationFillingdialogVisble: false,
      InvitationFillingdialoglink: "",
    };
  },
  components: {
    draggable,
    FillingRequirementsdialog,
    Tipsdialog,
    ListOfInfluencersdialog,
    Notedialog,
    dialogVisibleTips1,
    InvitationFillingdialog,
  },
  methods: {
    goOrder() {},
    //删除拍摄需求
    deletesubmitForm(id, index) {
      if (id != undefined) {
        this.centerDialogVisibles = true;
        this.formId = id;
        this.deletecenterDialogVisiblesindex = index;
      } else {
        // 计算删除位置
        var deletePosition = this.tableData.length - 2;
        // 使用splice方法删除元素
        this.tableData.splice(deletePosition, 1);

        let num = localStorage.getItem("addnum");
        num--;
        localStorage.setItem("addnum", num);
      }
    },
    deletecenterDialogVisibles() {
      this.$nextTick(() => {
        this.$refs[
          "ruleForm" + this.deletecenterDialogVisiblesindex
        ].fields[0].validateMessage = "";
        this.$refs[
          "ruleForm" + this.deletecenterDialogVisiblesindex
        ].fields[0].validateState = "";
      });
      needsDelete({
        id: this.formId,
        source: 0,
      }).then((res) => {
        if (res.code == 1) {
          this.reqsearch();
          this.centerDialogVisibles = false;
        }
      });
    },
    //删除达人
    delDr(user_id, id) {
      needsRemoveInfluencer({
        id: id,
        user_id: user_id,
      }).then((res) => {
        if (res.code == 1) {
          this.reqsearch();
        }
      });
    },
    //点击跳转homepage
    gohomepage(id) {
      window.open(
        this.$router.resolve({ path: `/homepage:${id}` }).href,
        "_blank"
      );
    },
    goNote() {
      window.open(this.$router.resolve({ path: `/Note` }).href, "_blank");
    },
    reqsearch() {
      search({
        source: 0,
      }).then((res) => {
        if (res.code == 1) {
          if (res.data.data.length == 0) {
            this.ifsubmitTo = false;
            res.data.data.push({
              flag: 1,
              influencer_info: [],
              title: "",
              video_num: "1",
            });
            localStorage.setItem("addnum", 0);
          } else if (localStorage.getItem("addnum") != 0) {
            let num = localStorage.getItem("addnum") * 1;
            if (num > 0) {
              for (let i = 1; i <= num; i++) {
                res.data.data.push({
                  flag: 1,
                  influencer_info: [],
                  title: "",
                  video_num: "1",
                });
              }
            }
          }

          res.data.data.push({
            flag: 2,
            influencer_info: [],
            title: "",
          });
          this.tableData = res.data.data;
          this.tableData.forEach((item, index) => {
            if (item.influencer_info.length == 0) {
              item.influencer_info.push({ ifinfluencerInfo: true });
            }

            if (item.title != "") {
              this.tableData[index].budget = this.tableData[index].budget * 1;
              if (item.budget * 1 <= item.video_num * 300) {
                item.budget != 0
                  ? (this.tableData[index].budget = item.budget * 1)
                  : (this.tableData[index].budget = "");

                this.budgetChange(item.budget, index, item.video_num);
              }
            } else if (!item.flag && item.flag != undefined) {
              this.tableData[index].budget = "";
              this.budgetChange(item.budget, index, item.video_num);
            } else {
              this.tableData[index].budget = "";
            }
          });
          // console.log(this.tableData);

          this.tableDataTitle = this.tableData.every((item) => {
            return item.title == "";
          });
        }
      });
    },
    //增加需求
    adddemand() {
      // 计算插入位置
      var insertPosition = this.tableData.length - 1;
      // 使用splice方法插入元素
      this.tableData.splice(insertPosition, 0, {
        flag: 1,
        influencer_info: [],
        title: "",
        influencerInfo: true,
        video_num: "1",
      });
      let num = 0;
      if (localStorage.getItem("addnum")) {
        num = localStorage.getItem("addnum") * 1 + 1;
      } else {
        num++;
      }
      localStorage.setItem("addnum", num);
    },

    //提交
    submitTo() {
      if (this.ifsubmitTo) {
        this.ifsubmitTo = false;
        const loading = this.$loading({
          lock: true,
          text: "提交中...",
          spinner: "el-icon-loading",
          background: "#fff",
          target: document.querySelector(".loading-area"), //设置加载动画区域
        });
        const arr = [];
        this.tableData.forEach((item) => {
          if (
            item.id &&
            item.title != "" &&
            item.budget * 1 >= item.video_num * 300
          ) {
            arr.push(item.id);
          }
        });
        const id = arr.join(",");
        needsSubmit({
          id: id,
        })
          .then((res) => {
            if (res.code == 1 && res.data.renew == 0) {
              this.reqsearch();
              loading.close();
              this.payDepositDialogVisible = true;
              this.$nextTick(() => {
                new QRCode(this.$refs.alipayQrCodeUrl, {
                  text: res.data.order[1].order.qrcode,
                  width: 130,
                  height: 130,
                  colorDark: "#000000",
                  colorLight: "#ffffff",
                  correctLevel: QRCode.CorrectLevel.H,
                });
                new QRCode(this.$refs.wechatQrCodeUrl, {
                  text: res.data.order[0].order.qrcode,
                  width: 130,
                  height: 130,
                  colorDark: "#000000",
                  colorLight: "#ffffff",
                  correctLevel: QRCode.CorrectLevel.H,
                });
              });
              this.orderData = res.data.order;
              this.handlerCheckWechatPayment(
                res.data.order[0].order.out_trade_no
              );
              this.handlerCheckAlipayPayment(
                res.data.order[1].order.out_trade_no
              );
            } else {
              loading.close();
              this.reqsearch();
              setTimeout(() => {
                this.ifsubmitTo = true;
                console.log(this.ifsubmitTo);
              }, 1000);
              this.showMessage(res.msg);
            }
          })
          .catch((res) => {
            loading.close();
            this.$message.error(res);
          });
      } else if (this.checked == false) {
        this.showMessage("请先阅读并同意《视频拍摄服务及售后说明》");
      } else {
        this.showMessage("您还没有添加任何需求，请添加需求再提交");
      }
    },
    //跳转商品详情
    gocommodity(url) {
      if (url) {
        window.open(url, "_blank");
      }
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
                clearInterval(_this.checkWechatPaymentVal);
                clearInterval(_this.checkAlipayPaymentVal);
                _this.paymentCompletedDialogVisible = true;
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
                clearInterval(_this.checkAlipayPaymentVal);
                clearInterval(_this.checkWechatPaymentVal);
                _this.paymentCompletedDialogVisible = true;
              }
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }, 3000);
    },
    handleSelectionChange(val) {
      this.handleSelectionChangeList = val;
    },

    //修改视频数量
    handleChange(value, num, id, budget, index) {
      if (localStorage.getItem("handleChange") != "false") {
        localStorage.setItem("handleChange", true);
      }

      if (num >= 5 && localStorage.getItem("handleChange") == "true") {
        const h = this.$createElement;

        let msg = this.$message({
          message: h("p", { style: "display: flex;align-items: center;" }, [
            h(
              "div",
              {
                style:
                  "width: 18px;height: 18px;background: #EDBB32;border-radius: 50%;text-align: center;line-height: 12px;color: white;",
              },
              "¡"
            ),
            h(
              "span",
              { style: "font-size: 12px;color: #FFFFFF;margin:0 10px 0 6px" },
              "目前一个亚马逊Listing只能上传5个关联视频，多余的视频仅在竞品下方展示"
            ),
            h(
              "button",
              {
                class: "el-message-btn",
              },
              "知道了"
            ),
          ]),
          iconClass: "iconfont",
          offset: 140,
          customClass: "customClasssuccess",
        });
        document.querySelectorAll(".el-message-btn").forEach((item) => {
          item.addEventListener("click", function () {
            msg.close();
            localStorage.setItem("handleChange", false);
          });
        });
      }

      if (value == 1) {
        this.TipsdialogdialogVisible = true;
        this.video_id = id;
        this.reqsearch();
      } else {
        this.debounce(async () => {
          const res = await needsVideoNumin({
            id: id + "",
            video_num: num + "",
            source: 0,
          });
          if (res.code == 1) {
            this.budgetChange(budget, index, num);
          }
        }, 500);
      }
    },
    debounce(func, delay) {
      clearTimeout(this.timer);
      this.timer = setTimeout(func, delay);
    },

    //开始拖拽
    influencer_infoOnStart(influencerInfo) {
      this.tableData.forEach((item) => {
        this.influencerids1.push(item.influencer_info.length);
      });
    },
    //列表达人拖拽结束
    influencer_infoOnEnd(list, index, id) {
      this.tableData.forEach((item) => {
        this.influencerids2.push(item.influencer_info.length);
      });
      for (let i = 0; i < this.influencerids1.length; i++) {
        if (this.influencerids1[i] !== this.influencerids2[i]) {
          this.differentIndices.push(i);
        }
      }

      let falg = true;
      let _this = this;
      if (_this.differentIndices != 0) {
        var count1 = list[_this.differentIndices[0]].influencer_info.filter(
          function (value) {
            return value.user_id == _this.user_id;
          }
        ).length;
        var count2 = list[_this.differentIndices[1]].influencer_info.filter(
          function (value) {
            return value.user_id == _this.user_id;
          }
        ).length;
        if (count1 == 2 || count2 == 2) {
          falg = false;
        } else {
          falg = true;
        }
      }
      if (falg) {
        list.forEach((item) => {
          if (item.influencer_info.length > 5) {
            const itempop = item.influencer_info.pop();
            needsSelectInfluencer({
              influencer_ids: itempop.user_id,
            }).then((res) => {
              if (res.code == 1) {
                this.reqsearch();
              }
            });
          }
        });

        if (this.differentIndices.length == 0) {
          let influencerIds1 = this.tableData[index].influencer_info
            .map((item) => item.user_id.toString())
            .join(",");
          this.getneedsSelectInfluencer(id, influencerIds1);
          setTimeout(() => {
            this.reqsearch();
          }, 1000);
        } else {
          let influencerIds1 = this.tableData[
            this.differentIndices[0]
          ].influencer_info
            .map((item) => item.user_id?.toString())
            .join(",");
          let influencerIds2 = this.tableData[
            this.differentIndices[1]
          ].influencer_info
            .map((item) => item.user_id?.toString())
            .join(",");
          if (
            this.tableData[this.differentIndices[1]].influencer_info[0]
              ?.ifinfluencerInfo ||
            this.tableData[this.differentIndices[1]].influencer_info[1]
              ?.ifinfluencerInfo
          ) {
            influencerIds2 = parseInt(influencerIds2.replace(",", "")) + "";
          }
          if (
            this.tableData[this.differentIndices[0]].influencer_info[0]
              ?.ifinfluencerInfo ||
            this.tableData[this.differentIndices[0]].influencer_info[1]
              ?.ifinfluencerInfo
          ) {
            influencerIds1 = parseInt(influencerIds1.replace(",", "")) + "";
          }
          this.getneedsSelectInfluencer(
            this.tableData[this.differentIndices[0]].id,
            influencerIds1
          );
          this.getneedsSelectInfluencer(
            this.tableData[this.differentIndices[1]].id,
            influencerIds2
          );
          setTimeout(() => {
            this.reqsearch();
          }, 1000);
        }
      } else {
        this.reqsearch();
      }
      this.influencerids1 = [];
      this.influencerids2 = [];
      this.differentIndices = [];
    },

    influencerinfomousedown(item) {
      this.user_id = item.user_id;
    },

    //请求拖拽排序接口
    async getneedsSelectInfluencer(id, influencerIds1) {
      await needsSelectInfluencer({
        source: 0,
        id: id,
        influencer_ids: influencerIds1,
      });
    },

    //填写需求
    Fillintherequirements(id) {
      this.FillingRequirementsdialogVisible = true;
      this.FillingRequirementid = id;
      id ? (this.determine = 1) : (this.determine = "3");
    },
    //修改需求
    openFillingRequirementsdialog(index) {
      this.RequirementsList = this.tableData[index];
      this.FillingRequirementsdialogVisible = true;
      this.determine = 2;
    },
    //复制需求
    operatedialog(index) {
      this.RequirementsList = this.tableData[index];
      this.FillingRequirementsdialogVisible = true;
      this.determine = 3;
    },
    //在父组件中声明这个函数，用于接收子组件传回的值
    getChildMsg(msg) {
      this.FillingRequirementsdialogVisible = msg;
    },
    getTipsdialogMsg(msg) {
      this.TipsdialogdialogVisible = msg;
    },
    getdatalistlogMsg(msg) {
      this.datalistdialogVisible = msg;
    },
    getlist(msg) {
      if (msg) {
        this.reqsearch();
      }
    },
    getNotedialogMsg(msg) {
      this.NotedialogdialogVisible = msg;
    },
    getTipsdialogVisible1(msg) {
      this.TipsdialogVisible1 = msg;
    },
    InvitationFillingdialogMsg(msg) {
      this.InvitationFillingdialogVisble = msg;
    },

    //拍摄预算修改
    budgetChange(val, index, num) {
      if (val * 1 < 300 * num) {
        if (this.checked) {
          this.ifsubmitTo = false;
          this.tableData.map((item) => {
            if (item.budget >= item.video_num * 300) {
              this.ifsubmitTo = true;
            }
          });
        }

        this.$nextTick(() => {
          if (val != "") {
            this.$refs[
              "ruleForm" + index
            ].fields[0].validateMessage = `不能低于300元/个`;
          } else {
            this.$refs[
              "ruleForm" + index
            ].fields[0].validateMessage = `请填写预算`;
          }
          this.$refs["ruleForm" + index].fields[0].validateState = "error";
        });
      } else {
        if (this.checked) this.ifsubmitTo = true;
        this.$nextTick(() => {
          this.$refs["ruleForm" + index].fields[0].validateMessage = "";
          this.$refs["ruleForm" + index].fields[0].validateState = "";
        });
      }
    },
    async budgetBlur(val, id, index, num) {
      await needsBudget({
        id: id,
        budget: val,
        source: 0,
      }).then((res) => {
        if (res.code == 1) {
          this.budgetChange(val, index, num);
        }
      });
    },
    Addinfluencers(list, id) {
      if (
        (list[0]?.ifinfluencerInfo && id == undefined) ||
        (list.length == 0 && id == undefined)
      ) {
        this.influencersListid = 0;
        this.influencersList = [];
        this.datalistdialogVisible = true;
      } else {
        if (list[0]?.ifinfluencerInfo) list = [];
        this.influencersList = list;
        this.influencersListid = id;
        this.datalistdialogVisible = true;
      }
    },

    // 导入
    httpRequest(fileLit) {
      const loading = this.$loading({
        lock: true,
        text: "需求导入中...",
        spinner: "el-icon-loading",
        background: "#fff",
        target: document.querySelector(".loading-area"), //设置加载动画区域
      });
      const formData = new FormData();
      formData.append("file", fileLit.file);
      needsTemplate({
        file: fileLit.file,
        id: this.daorid,
      })
        .then((res) => {
          this.reqsearch();
          if (res.code == 1) {
            loading.close();

            this.$message({
              message: "导入成功",
              type: "success",
              offset: 400,
              center: true,
            });
          } else {
            loading.close();

            this.showMessage("导入失败，请检查Excel表格是否按模板格式填写");
          }
        })
        .catch((res) => {
          loading.close();
        });
    },

    //刷新
    reloadPage() {
      window.location.reload();
    },

    //请求拍摄需求首页接口
    async getneedsIndex() {
      let res = await needsIndex({
        source: 0,
      });
      if (res.code == 1) {
        this.fileDiz = res.data.file;
        this.ifGuide = res.data.if_guide;
        this.InvitationFillingdialoglink = res.data.invite_url;
        if (res.data.if_guide == 1) {
          this.NotedialogdialogVisible = true;
        }
      }
    },

    initGuide() {
      // 绑定标签元素的选择器数组
      this.introOption.steps = [
        {
          title: "点击这里，添加意向红人",
          element: ".influencerInfo3",
          intro: `<img src="${this.tipsImg1}" style="width: 540px;height: 304px"/>`,
          position: "right",
        },
        {
          title: "鼠标上下左右拖动，调整红人匹配顺序",
          element: ".influencerInfoUl",
          intro: `<img src="${this.tipsImg2}" style="width: 540px;height: 180px"/>`,
        },
        {
          title: "点击这里，填写产品及拍摄需求",
          element: ".addbtn",
        },
        {
          title: "点击这里，为同一变体或型号添加拍摄数量",
          element: ".tips4",
          intro: `<img src="${this.tipsImg3}" style="width: 540px;height: 180px"/>`,
          position: "left",
        },
        {
          title: `点击 “<i class="iconfont icon-fz" style="font-size: 14px;color: #796cf3"></i> 复制”按钮，为对应变体，快速创建需求`,
          element: ".operate1",
          intro: `<img src="${this.tipsImg4}" style="width: 540px;height: 180px"/>`,
          position: "left",
        },
        {
          title: "点击这里，使用表格批量导入需求",
          element: ".tips6",
          position: "left",
        },
        {
          title: "点击这里，邀请同事填写需求",
          element: ".tips7",
          position: "left",
        },
        {
          title: "点击这里刷新，同步接收同事填写的需求",
          element: ".tips8",
          position: "left",
        },
      ];
      this.$intro()
        .setOptions(this.introOption)
        // 点击结束按钮后执行的事件
        .oncomplete(() => {
          console.log("点击结束按钮后执行的事件");
        })
        // 点击跳过按钮后执行的事件
        .onexit(() => {
          console.log("点击跳过按钮后执行的事件");
        })
        // 确认完毕之后执行的事件
        .onbeforeexit(() => {
          console.log("确认完毕之后执行的事件");
        })
        .start();
    },

    //警告提示
    showMessage(text) {
      const h = this.$createElement;
      this.$message({
        message: h("p", { style: "display: flex" }, [
          h(
            "div",
            {
              style:
                "width: 18px;height: 18px;background: #EDBB32;border-radius: 50%;text-align: center;line-height: 12px;color: white;",
            },
            "¡"
          ),
          h(
            "span",
            { style: "font-size: 12px;color: #FFFFFF;margin:0 0 0 6px" },
            text
          ),
        ]),
        iconClass: "iconfont",
        offset: 140,
        customClass: "customClasssuccess",
      });
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.initGuide(); // 调用新手引导的方法
    // }, 3000);

    if (store.state.Index.ExitFullScreen) {
      this.Addinfluencers(
        store.state.Index.influencersList,
        store.state.Index.influencersListid
      );
      store.commit("Index/setExitFullScreen", false);
    }
    this.reqsearch();
    this.getneedsIndex();
  },
  watch: {
    tableData(newVal) {
      newVal.forEach((item) => {
        if (
          item.title == "" &&
          item.influencer_info[0]?.ifinfluencerInfo == true
        ) {
          if (item.id) {
            needsDelete({
              id: item.id,
              source: 0,
            }).then((res) => {
              if (res.code == 1) {
                this.reqsearch();
              }
            });
          }
        }
      });
    },
    FillingRequirementsdialogVisible(newval) {
      if (newval == false) {
        this.RequirementsList = [];
        this.determine = 0;
      }
    },
    payDepositDialogVisible(newVal) {
      let _this = this;
      if (newVal == false && _this.paymentCompletedDialogVisible == false) {
        clearInterval(_this.checkWechatPaymentVal);
        clearInterval(_this.checkAlipayPaymentVal);
        _this.$router.push("/manage/order");
      }
    },
    paymentCompletedDialogVisible(newVal) {
      if (newVal == false) {
        this.$router.push("/manage/order");
      }
    },
    checked(newval) {
      if (
        newval == true &&
        this.tableDataTitle == false &&
        this.tableData.length != 1
      ) {
        this.tableData.forEach((item) => {
          if (item.budget * 1 >= item.video_num * 300) {
            this.ifsubmitTo = true;
          }
        });
      } else {
        this.ifsubmitTo = false;
      }
    },
    NotedialogdialogVisible(newval) {
      if (newval == false && this.ifGuide == 1) {
        this.initGuide(); // 调用新手引导的方法
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-table__body-wrapper {
  padding: 0 30px 25px 30px;
  border: none;
  box-sizing: border-box;
  margin-top: 0px;
  height: calc(100vh - 365px);
  overflow-y: auto;
}

::v-deep .el-table .cell::before {
  content: "";
  text-align: center;
  line-height: 37px;
}

::v-deep(.elinput > .el-input__inner) {
  height: 100%;
  text-align: center;
  padding: 0 10px;
}
::v-deep(.el-input__inner:focus) {
  border-color: #a06cf3;
}

::v-deep(.el-table__row:nth-child(1)) {
  border: none;
}

::v-deep(.el-dialog__body) {
  position: relative;
}

::v-deep(.el-dialog) {
  background: #f5f7f9;
}

::v-deep(.elform > .el-form-item) {
  margin-top: 16px;
  margin-bottom: 16px;
}
::v-deep(.el-form-item__error) {
  width: 100%;
  color: #f56c6c !important;
}

::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #a06cf3 !important;
  border-color: #a06cf3 !important;
}

::v-deep(.el-checkbox__inner:hover) {
  border-color: #a06cf3;
}

::v-deep(.el-upload) {
  color: #333 !important;
  transition: all 0.3s;
}
::v-deep(.el-upload:hover) {
  color: #a06cf3 !important;
}

::v-deep(.el-loading-spinner .el-loading-text) {
  color: #a06cf3;
}

::v-deep(.el-loading-spinner i) {
  color: #a06cf3;
}
</style>

<style lang="less" scoped>
.RequirementBox {
  background: linear-gradient(
    225deg,
    #e6e9fe 0%,
    #f7f8fa 20%,
    #ecf2ff 60%,
    #eee5fc 100%
  );
  min-height: calc(100vh - 67px);

  .RequirementBoxBanxin {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .hearder {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-top: 30px;
    }

    .RequirementWenben {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 14px;

      .RequirementWenben-div1 {
        font-size: 14px;
        display: flex;
        color: #333333;
        span {
          cursor: pointer;
          transition: all 0.3s;
        }
        div {
          width: 1px;
          height: 13px;
          background: #333333;
          margin: 3px 7px 0;
        }
        span:hover {
          color: #a06cf3;
        }
      }

      .RequirementWenben-div2 {
        display: flex;
        .elIcon2 {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 14px;
          margin-left: 20px;
          transition: all 0.3s;
          cursor: pointer;
          .iconfont {
            margin-right: 5px;
          }
          a {
            text-decoration: none;
            color: #333;
            transition: all 0.3s;
          }
        }
        .elIcon2:hover {
          color: #a06cf3 !important;
        }
        .elIcon2:hover a {
          color: #a06cf3 !important;
        }
      }
    }

    .loading-area {
      .addbtn {
        color: #a06cf3;
        width: 120px;
        height: 32px;
        border-radius: 5px;
        border: 1px solid #a06cf3;
        line-height: 32px;
        cursor: pointer;
      }

      .delDiv {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 25px;
        cursor: pointer;
        transition: all 0.3s;
        color: red;
      }

      .isinfluencerInfoLi:hover .delDiv {
        opacity: 1;
      }

      .operate {
        color: #999999;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        span {
          cursor: pointer;
          transition: all 0.3s;
          .iconfont {
            font-size: 12px;
            margin-right: 3px;
          }
        }
        .operate2:hover {
          color: #f56c6c;
        }
        .operate1:hover {
          color: #a06cf3;
        }
      }
      .inputnumber {
        display: flex;
        justify-content: center;
        padding-left: 15px;
        button {
          width: 18px;
          height: 18px;
          background: #f6f6f6;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover {
          background-color: rgba(199, 179, 230, 0.2);
          color: #a06cf3;
        }
        .disabled:hover {
          background: #f6f6f6 !important;
          color: #b3b3b3 !important;
        }
        input {
          border: none;
          width: 40px;
          text-align: center;
          color: #333333;
        }
        input:focus {
          outline: none;
        }
      }

      .table-yaoq {
        .tableyaoq-div {
          display: flex;
          align-items: center;
          color: #a06cf3;
          margin-left: 15px;
          font-size: 12px;
          p {
            white-space: nowrap;
          }
          .icon-tx {
            transition: all 0.3s;
            margin-left: 5px;
            font-size: 13px;
            opacity: 0;
          }
        }
        .tableyaoq-div:hover .icon-tx {
          opacity: 1;
        }
      }
    }
    .RequirementBtn {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      button {
        transition: all 0.3s;
        width: 160px;
        height: 42px;
        background: #edc0fb;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 10px;
        border: none;
        color: white;
      }
    }

    .ifsubmitTo {
      button {
        background: #d161f6;
      }
    }
    .elIcon {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>

<!-- 达人列表 -->
<style lang="less" scoped>
::v-deep(.el-table th.el-table__cell.is-leaf) {
  background: #f6f6f6 !important;
}

::v-deep(.el-icon-plus) {
  pointer-events: none;
}

::v-deep(.el-table__header-wrapper) {
  margin: 14px 14px 0 14px;
  width: 1170px !important;
}

::v-deep(.el-table__header) {
  width: auto !important;
  border-radius: 4px;
  overflow: hidden;
}

::v-deep(.dialog-footer) {
  display: flex;
  justify-content: center;
}

::v-deep(.el-icon-user-solid) {
  color: white;
}

.influencerInfoUl {
  display: flex;
}

.influencerInfoLi {
  margin: 0 7px;
  position: relative;
  cursor: pointer;
  float: left;
  width: 60px;
  .influencerInfoLi_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 10px;
    .indextop {
      width: 16px;
      height: 14px;
      background: #ff9c17;
      border-radius: 0 7px 7px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      color: #ffffff;
      line-height: 14px;
      text-align: left;
      padding-left: 4px;
      box-sizing: border-box;
    }

    .indextop1 {
      opacity: 1;
    }
    .indextop2 {
      opacity: 0.8;
    }
    .indextop3 {
      opacity: 0.6;
    }
    .indextop4 {
      opacity: 0.4;
    }
    .indextop5 {
      opacity: 0.2;
    }
  }

  .influencerInfo2 {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999 !important;
  }
}
.influencerInfoLiclass {
  display: flex;
  justify-content: center;
  .influencerInfoLi_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    margin: 10px 7px 0;
    .influencerInfo2 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999 !important;
    }
  }
  .influencerInfoLi_div2 {
    width: 60px;
    margin-top: 10px;
    height: 55px;
    .influencerInfo3 {
      width: 32px;
      height: 32px;
      background: #eeeeee;
      border-radius: 50%;
      line-height: 32px;
      cursor: pointer;
      color: #cccccc !important;
      margin: 0 auto;
      transition: all 0.3s;
    }
    .influencerInfo2 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999 !important;
      cursor: pointer;
    }
  }

  .influencerInfoLi_div2:hover .influencerInfo3 {
    color: #a06cf3 !important;
    background-color: rgba(199, 179, 230, 0.2);
  }
  .influencerInfoLi_div2:hover .influencerInfo2 {
    color: #a06cf3 !important;
  }
}

.influencerInfo {
  width: 32px;
  height: 32px;
  background: #a06cf3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.el-textarea__inner) {
  height: 120px;
}

.liBtn1 {
  width: 89px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #796cf3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 12px;
}

.liBtn1div {
  width: 89px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #796cf3 !important;
}

.liBtn2 {
  width: 89px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #796cf3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #796cf3;
}

::v-deep(.el-table__header-wrapper table) {
  height: 46px;
  padding: 0;
}

::v-deep(.el-table td.el-table__cell div) {
  box-sizing: border-box;
  text-align: center;
}

::v-deep(.el-table__row:last-child > .el-table__cell) {
  border-bottom: none;
}

::v-deep(.el-table th.el-table__cell > .cell) {
  text-align: center;
}

.ghost {
  opacity: 0;
}

.chosen {
  background-color: rgba(255, 255, 255, 0.1);
}

.adddemand {
  i {
    font-size: 24px;
    color: #a06cf3;
    cursor: pointer;
    transition: all, 0.3s;
    opacity: 0.4;
  }
  i:hover {
    opacity: 1;
  }
}

::v-deep(.el-table) {
  height: 100%;
}
</style>

<style lang="less" scoped>
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

.group_26 {
  background-color: rgba(244, 242, 255, 1);
  border-radius: 4px;
  width: 420px;
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

/*支付尾款弹窗*/
.payment_dialog,
.pay_deposit_dialog {
  .el-tabs--border-card > .el-tabs__content {
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

  .el-tabs--border-card > .el-tabs__header .el-tabs__item + .el-tabs__item {
    margin-left: 0;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item:first-child {
    border-right: 1px solid #eeeeee !important;
    margin-left: 0;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
    margin-left: 0;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: #999999;
    font-family: PingFangSC-Semibold, PingFang SC;
    border: none;
    margin-bottom: 1px;
    transition: none;
    height: 42px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
  .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
    font-weight: 600;
    color: #333333;
    background: #f6f5ff;
    border-bottom: 2px solid #796cf3;

    i {
      font-weight: normal;
    }
  }

  .el-tabs--border-card > .el-tabs__header {
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

  ::v-deep(.el-tabs__nav) {
    width: 100%;
  }

  ::v-deep(.el-tabs__item) {
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
}

::v-deep(.el-alert__content) {
  padding: 0 0 0 35px;
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

.know_btn {
  padding-top: 20px;

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
</style>

<style lang="less">
.customClasswarning {
  width: 373px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.47);
  border-radius: 6px;
}

.el-message-btn {
  width: 48px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  border: 1px solid #ffffff;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
}

.el-table {
  // 每行鼠标经过得样式
  .el-table__body tr:hover > td {
    background-color: #ffffff !important;
  }
  .el-table__body tr.current-row > td {
    background-color: #fff !important;
  }
}
</style>

<!-- 新手引导提示样式 -->
<style lang="less">
.introjs-helperLayer {
  box-shadow: rgba(33, 33, 33, 0.8) 0px 0px 1px 0px,
    rgba(33, 33, 33, 0.5) 0px 0px 0px 5000px !important;
  outline: 2px dashed #fff;
}
.new-tips {
  color: #409eff;
  line-height: 80px;
  cursor: pointer;
}
.introjs-tooltip-title {
  font-size: 16px !important;
  width: 80%;
  color: #333;
}
.warper {
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid saddlebrown;
}
/* 重置引导组件样式(类似element-ui个人使用) */
.intro-tooltip {
  color: #ffff;
  background: #2c3e50;
}
/* 引导提示框的位置 */
.introjs-bottom-left-aligned {
  left: 45% !important;
}
.introjs-right,
.introjs-left {
  top: -30%;
}
.intro-highlight {
  background: rgba(255, 255, 255, 0.5);
}
.introjs-arrow {
  // display: none !important;
}
.introjs-arrow.left {
  border-right-color: #fff !important;
}
.introjs-arrow.top {
  border-bottom-color: #fff !important;
}
.introjs-arrow.right {
  border-color: transparent transparent transparent #fff !important;
}
.introjs-arrow.bottom {
  border-top-color: #2c3e50;
}
.introjs-tooltip {
  background: #fff !important;
  max-width: none !important;
  min-width: 320px !important;
}
/* 提示框头部区域 */
.introjs-tooltip-header {
  padding-top: 24px !important;
}
.introjs-skipbutton {
  color: #999 !important;
  font-size: 14px !important;
  font-weight: normal !important;
  //   padding: 8px 10px !important ;
  margin-top: 12px;
  margin-right: 8px;
}

.introjs-tooltiptext {
  font-size: 14px !important;
  padding: 15px 15px 12px !important;
  color: #000;
}
/* 提示框按钮 */
.introjs-tooltipbuttons {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  padding-bottom: 22px !important;
}
.introjs-button {
  text-align: center;
  padding: 4px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  border-radius: 5px !important;
  border: none !important;
  width: 92px !important;
  height: 24px !important;
  line-height: 24px;
}
.introjs-button:last-child {
  margin-left: 10px;
  background: #d161f6 !important;
}
.introjs-prevbutton {
  color: #606266 !important;
  background: #fff !important;
  border: 1px solid #dcdfe6 !important;
}
.introjs-nextbutton {
  color: #fff !important;
}
.introjs-disabled {
  color: #9e9e9e !important;
  border-color: #bdbdbd !important;
  background-color: #f4f4f4 !important;
}
</style>
