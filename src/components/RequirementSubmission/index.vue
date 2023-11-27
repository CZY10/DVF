<template>
  <div class="RequirementBox">
    <div class="RequirementBoxBanxin">
      <p class="hearder">提交视频拍摄需求</p>
      <div class="RequirementWenben">
        <div class="RequirementWenben-div1">
          <span @click="NotedialogdialogVisible = true">注意事项</span>
          <div></div>
          <span>新手引导</span>
        </div>
        <div class="RequirementWenben-div2">
          <!-- <div class="elIcon2">
            <i class="iconfont icon-fx1"></i>
            <span>邀请填写</span>
          </div> -->
          <div class="elIcon2">
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
          <div class="elIcon2" @click="reloadPage">
            <i class="iconfont icon-sx"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
      <div
        class="loading-area"
        style="
          position: relative;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          height: 640px;
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
          height="640"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="意向达人" width="400">
            <template slot-scope="scope">
              <div v-if="scope.row.influencer_info.length != 0">
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
                    @start="influencer_infoOnStart"
                    ghostClass="ghost"
                    chosenClass="chosen"
                    :forceFallback="true"
                    group="people"
                  >
                    <transition-group>
                      <li
                        class="influencerInfoLi isinfluencerInfoLi"
                        v-for="(item, index) in scope.row.influencer_info"
                        :key="index"
                      >
                        <div style="position: relative">
                          <img
                            :src="item.image"
                            style="
                              display: block;
                              width: 32px;
                              height: 32px;
                              border-radius: 50%;
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
                          <span>NO.{{ item.user_id }}</span>
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
                      </li>
                    </transition-group>
                  </draggable>
                  <li
                    class="influencerInfoLi"
                    v-if="scope.row.influencer_info.length != 5"
                  >
                    <div
                      class="influencerInfo3"
                      @click="
                        Addinfluencers(scope.row.influencer_info, scope.row.id)
                      "
                    >
                      +
                    </div>
                    <div class="influencerInfo2">添加</div>
                  </li>
                </ul>
              </div>
              <div v-else>
                <ul class="influencerInfoUl">
                  <li class="influencerInfoLi">
                    <div class="influencerInfo">
                      <i class="el-icon-user-solid"></i>
                    </div>
                    <div class="influencerInfo2">平台推荐</div>
                  </li>
                  <li class="influencerInfoLi">
                    <div
                      class="influencerInfo3"
                      @click="
                        Addinfluencers(scope.row.influencer_info, scope.row.id)
                      "
                    >
                      +
                    </div>
                    <div class="influencerInfo2">添加</div>
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄要求" width="340">
            <template slot-scope="scope">
              <div v-if="scope.row.flag || scope.row.title == ''">
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div class="addbtn" @click="Fillintherequirements">
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
                    :src="scope.row.image"
                    style="width: 100%; height: 100%; object-fit: cover"
                    v-if="scope.row.image"
                    @click="gocommodity(scope.row.url)"
                  />
                  <img
                    src="@/assets/images/tp.png"
                    v-else
                    style="width: 20px; height: 20px; margin-top: 20px"
                  />
                </div>
                <div>
                  <p
                    style="
                      width: 100px;
                      max-height: 3em;
                      overflow: hidden;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ scope.row.title }}
                  </p>
                  <p
                    style="
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #999999;
                    "
                    v-if="scope.row.url"
                    @click="gocommodity(scope.row.url)"
                  >
                    {{ scope.row.asin }}
                    <img
                      src="@/assets/images/fenx.png"
                      style="width: 10px; height: 10px"
                    />
                  </p>
                  <p v-else>--</p>
                </div>

                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: #a06cf3;
                    margin-left: 15px;
                  "
                  @click="openFillingRequirementsdialog(scope.$index)"
                >
                  <p style="white-space: nowrap">详情</p>
                  <i class="iconfont icon-tx" style="margin-left: 5px"></i>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="视频数量">
            <template slot-scope="scope">
              <div>
                <el-input-number
                  v-model="scope.row.video_num"
                  @change="
                    handleChange(
                      scope.row.budget_tip,
                      scope.row.video_num,
                      scope.row.id
                    )
                  "
                  :min="1"
                  :max="10"
                  size="mini"
                ></el-input-number>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄预算/¥" width="140">
            <template slot-scope="scope">
              <div>
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
                      @blur="budgetBlur(scope.row.budget, scope.row.id)"
                      :disabled="scope.row.title == ''"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <ul
                style="display: flex; justify-content: center"
                v-if="scope.row.flag == 1 || scope.row.title == ''"
              >
                --
              </ul>
              <ul
                v-else
                style="
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                "
              >
                <li class="operate">
                  <span class="operate1" @click="operatedialog(scope.$index)">
                    <i class="iconfont icon-fz"></i> 复制</span
                  >
                </li>
                <li class="operate">
                  <span
                    class="operate2"
                    @click="deletesubmitForm(scope.row.id)"
                  >
                    <i class="iconfont icon-sc"></i> 删除</span
                  >
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <i
          class="el-icon-question"
          @mouseover="flag = true"
          @mouseout="flag = false"
        ></i>
        <div class="RequirementBox-xinx" v-show="flag">
          未选意向达人情况下，默认为 平台推荐达人
          <div class="triangle"></div>
        </div>
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
            border-radius: 16px;
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
            background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
            border-radius: 16px;
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
  </div>
</template>

<script>
import {
  getShootRequire,
  search,
  create,
  needsDelete,
  needsRemoveInfluencer,
  needsSubmit,
  checkPayment,
  needsTemplate,
  needsVideoNumin,
  needsBudget,
  needsIndex,
  carOperate,
  needsSelectInfluencer,
} from "@/api";
import draggable from "vuedraggable";
import FillingRequirementsdialog from "./dialog/FillingRequirementsdialog.vue";
import Tipsdialog from "./dialog/Tipsdialog.vue";
import ListOfInfluencersdialog from "./dialog/ListOfInfluencersdialog.vue";
import Notedialog from "./dialog/notedialog.vue";
import store from "@/store";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      datalistdialogVisible: false,
      checked: false,
      flags: false,
      ispersonid: "",
      input: "",
      formId: "",
      centerDialogVisibles: false,
      radio: "1",
      tableData: [
        {
          flag: 1,
          influencer_info: [],
        },
      ],
      flag: false,
      errorShow: false,
      isvideoSubmitDialogVisible: 0,
      checkWechatPaymentVal: "",
      checkAlipayPaymentVal: "",
      fileList: [],
      handleSelectionChangeList: [],
      fileDiz: "",
      iscg: false,
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
      iffuleform: false,
      timer: null,
      influencersList: [],
      influencersListid: 0,
      tableDataTitle: true,
      ifsubmitTo: false,
      NotedialogdialogVisible: false,
      influencerids1: [],
      influencerids2: [],
      differentIndices: [],
    };
  },
  components: {
    draggable,
    FillingRequirementsdialog,
    Tipsdialog,
    ListOfInfluencersdialog,
    Notedialog,
  },
  methods: {
    goOrder() {},
    //删除拍摄需求
    deletesubmitForm(id) {
      this.centerDialogVisibles = true;
      this.formId = id;
    },
    deletecenterDialogVisibles() {
      needsDelete({
        id: this.formId,
      }).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.reqsearch();
          this.centerDialogVisibles = false;
        }
      });
    },
    //删除达人
    delDr(user_id, id) {
      console.log(user_id, id);
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
      search().then((res) => {
        if (res.code == 1) {
          res.data.data.push({
            flag: 1,
            influencer_info: [],
            title: "",
          });
          this.tableData = res.data.data;
          this.tableData.forEach((item, index) => {
            if (item.title != "" && item.budget * 1 <= item.video_num * 300) {
              this.tableData[index].budget = item.video_num * 300;
              this.budgetBlur(
                this.tableData[index].budget,
                this.tableData[index].id
              );
            } else if (
              item.title != "" &&
              item.budget * 1 > item.video_num * 300
            ) {
              this.tableData[index].budget = item.budget * 1;
            } else {
              this.tableData[index].budget = "";
            }
          });

          this.tableDataTitle = this.tableData.every((item) => {
            return item.title == "";
          });
        }
      });
    },
    //提交
    submitTo() {
      if (this.ifsubmitTo) {
        const loading = this.$loading({
          lock: true,
          text: "提交中...",
          spinner: "el-icon-loading",
          background: "#fff",
          target: document.querySelector(".loading-area"), //设置加载动画区域
        });
        const arr = [];
        this.tableData.forEach((item) => {
          if (item.id && item.title != "") {
            arr.push(item.id);
          }
        });
        const id = arr.join(",");
        console.log(id);
        needsSubmit({
          id: id,
        })
          .then((res) => {
            loading.close();
            this.payDepositDialogVisible = true;
            console.log(res.data.order[1].order.qrcode);
            this.$nextTick(() => {
              console.log(this.$refs.alipayQrCodeUrl);
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
          })
          .catch((res) => {
            loading.close();
            this.$message.error(res);
          });
      } else if (this.tableData.length == 1 || this.tableDataTitle == true) {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "font-size: 12px;color: #FFFFFF;margin:0 0px 0 6px" },
              "您还没有添加任何需求，请添加需求再提交"
            ),
          ]),
          iconClass: "el-icon-warning",
          offset: 140,
          customClass: "customClasssuccess",
        });
      } else if (this.checked == false) {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "font-size: 12px;color: #FFFFFF;margin:0 0px 0 6px" },
              "请先阅读并同意《视频拍摄服务及售后说明》"
            ),
          ]),
          iconClass: "el-icon-warning",
          offset: 140,
          customClass: "customClasssuccess",
        });
      }
    },
    //跳转商品详情
    gocommodity(url) {
      console.log(url);
      window.open(url, "_blank");
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
      console.log(val);
    },
    handleChange(value, num, id) {
      if (value == 1) {
        this.TipsdialogdialogVisible = true;
        this.video_id = id;
        this.reqsearch();
      } else {
        this.debounce(async () => {
          const res = await needsVideoNumin({
            id: id + "",
            video_num: num + "",
          });
          console.log(res);
          if (res.code == 1) {
            this.reqsearch();
          }
        }, 500);
      }

      if (num == 10) {
        const h = this.$createElement;
        let msg = this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "font-size: 12px;color: #FFFFFF;margin:0 10px 0 6px" },
              "目前一个亚马逊Listing只能上传10个关联视频哦~"
            ),
            h(
              "button",
              {
                class: "el-message-btn",
              },
              "知道了"
            ),
          ]),
          iconClass: "el-icon-warning",
          offset: 140,
          customClass: "customClasswarning",
        });
        document
          .querySelector(".el-message-btn")
          .addEventListener("click", function () {
            msg.close();
          });
      }
    },
    debounce(func, delay) {
      clearTimeout(this.timer);
      this.timer = setTimeout(func, delay);
    },

    //开始拖拽
    influencer_infoOnStart() {
      this.tableData.forEach((item) => {
        this.influencerids1.push(item.influencer_info.length);
      });
    },
    //列表达人拖拽结束
    async influencer_infoOnEnd(list, index, id) {
      this.tableData.forEach((item) => {
        this.influencerids2.push(item.influencer_info.length);
      });
      for (let i = 0; i < this.influencerids1.length; i++) {
        if (this.influencerids1[i] !== this.influencerids2[i]) {
          this.differentIndices.push(i);
        }
      }

      list.forEach((item) => {
        if (item.influencer_info.length > 5) {
          const itempop = item.influencer_info.pop();
          this.tableData[index].influencer_info.unshift(itempop);
        }
      });

      let influencerIds1 = this.tableData[index].influencer_info
        .map((item) => item.user_id.toString())
        .join(",");

      if (this.differentIndices.length == 0) {
        this.getneedsSelectInfluencer(id, influencerIds1);
      } else {
        let influencerIds1 = this.tableData[
          this.differentIndices[0]
        ].influencer_info
          .map((item) => item.user_id.toString())
          .join(",");
        let influencerIds2 = this.tableData[
          this.differentIndices[1]
        ].influencer_info
          .map((item) => item.user_id.toString())
          .join(",");
        this.getneedsSelectInfluencer(
          this.tableData[this.differentIndices[0]].id,
          influencerIds1
        );
        this.getneedsSelectInfluencer(
          this.tableData[this.differentIndices[1]].id,
          influencerIds2
        );
      }

      this.influencerids1 = [];
      this.influencerids2 = [];
      this.differentIndices = [];
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
    Fillintherequirements() {
      this.FillingRequirementsdialogVisible = true;
      this.determine = 1;
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

    //拍摄预算修改
    budgetChange(val, index, num) {
      console.log(val);
      if (val * 1 < 300 * num) {
        this.$refs[
          "ruleForm" + index
        ].fields[0].validateMessage = `请填写预算，不低于${300 * num}`;
        this.$refs["ruleForm" + index].fields[0].validateState = "error";
        this.iffuleform = false;
      } else {
        this.iffuleform = true;
        this.$refs["ruleForm" + index].fields[0].validateMessage = "";
        this.$refs["ruleForm" + index].fields[0].validateState = "";
      }
    },
    async budgetBlur(val, id) {
      await needsBudget({
        id: id,
        budget: val,
      });
    },
    Addinfluencers(list, id) {
      this.influencersList = list;
      this.influencersListid = id;
      this.datalistdialogVisible = true;
    },

    // 导入
    httpRequest(fileLit) {
      const formData = new FormData();
      formData.append("file", fileLit.file);
      needsTemplate({
        file: fileLit.file,
        id: this.daorid,
      })
        .then((res) => {
          this.reqsearch();
          if (res.code == 1) {
            this.$message({
              message: "导入成功",
              type: "success",
              offset: 400,
              center: true,
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },

    //刷新
    reloadPage() {
      window.location.reload();
    },

    //请求拍摄需求首页接口
    async getneedsIndex() {
      let res = await needsIndex();
      if (res.code == 1) {
        this.fileDiz = res.data.file;
        if (res.data.if_guide == 1) {
          this.NotedialogdialogVisible = true;
        }
      }
    },
  },
  mounted() {
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
        if (item.title == "" && item.influencer_info.length == 0) {
          if (item.id) {
            needsDelete({
              id: item.id,
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
        this.ifsubmitTo = true;
      } else {
        this.ifsubmitTo = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-table__body-wrapper {
  padding: 0 15px 25px 15px;
  border: none;
  box-sizing: border-box;
}

::v-deep .el-table .cell::before {
  content: "";
  text-align: center;
  line-height: 37px;
}

::v-deep(.el-input-number--mini) {
  width: 65px;
  line-height: 20px;
}

::v-deep(.el-input-number--mini .el-input-number__increase) {
  width: 18px;
  height: 20px;
  line-height: 20px;
  background: #f6f6f6 !important;
  border-left: none;
}

::v-deep(.el-input-number--mini .el-input-number__decrease) {
  width: 18px;
  height: 20px;
  line-height: 20px;
  background: #f6f6f6 !important;
  border-right: none;
}

::v-deep(.el-input-number--mini .el-input__inner) {
  padding-left: 0px;
  padding-right: 0px;
}

::v-deep(.el-input--mini .el-input__inner) {
  height: 22px;
  line-height: 22px;
  border: none;
}

::v-deep(.elinput > .el-input__inner) {
  height: 100%;
  text-align: center;
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

::v-deep(.el-upload) {
  color: #a06cf3 !important;
}

::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #a06cf3 !important;
  border-color: #a06cf3 !important;
}

::v-deep(.el-checkbox__inner:hover) {
  border-color: #a06cf3;
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
  height: calc(100vh - 67px);
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
        color: #a06cf3;
        span {
          cursor: pointer;
          transition: all 0.3s;
        }
        div {
          width: 2px;
          height: 13px;
          background: #ba91fc;
          margin: 3px 7px 0;
        }
        span:hover {
          color: #853ff7;
        }
      }

      .RequirementWenben-div2 {
        display: flex;
        .elIcon2 {
          display: flex;
          align-items: center;
          color: #a06cf3;
          font-size: 14px;
          margin-left: 20px;
          transition: all 0.3s;
          cursor: pointer;
          .iconfont {
            margin-right: 5px;
          }
          a {
            text-decoration: none;
            color: #a06cf3;
            transition: all 0.3s;
          }
        }
        .elIcon2:hover {
          color: rgb(127, 52, 248) !important;
        }
        .elIcon2:hover a {
          color: rgb(127, 52, 248) !important;
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
        span {
          cursor: pointer;
          transition: all 0.3s;
          .iconfont {
            font-size: 12px;
            margin-right: 7px;
          }
        }
        .operate2:hover {
          color: #f56c6c;
        }
        .operate1:hover {
          color: #a06cf3;
        }
      }
    }

    .RequirementBox-xinx {
      width: 180px;
      height: 60px;
      background: #000000;
      border-radius: 5px;
      position: absolute;
      top: -50px;
      left: 202px;
      font-size: 12px;
      color: #e4e4e4;
      padding: 9px 12px;
      box-sizing: border-box;
      transition: all 0.3s;
      .triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #000;
        position: absolute;
        bottom: -10px;
        left: 80px;
      }
    }

    .RequirementBtn {
      margin-top: 20px;
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
::v-deep(.el-table__header-wrapper) {
  margin: 14px 14px 0 14px;
  width: 1170px !important;
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
  justify-content: center;
}

.influencerInfoLi {
  margin: 0 7px;
  position: relative;
  cursor: pointer;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.influencerInfo3 {
  width: 32px;
  height: 32px;
  background: #eeeeee;
  border-radius: 50%;
  line-height: 32px;
  cursor: pointer;
  color: #cccccc !important;
}

.influencerInfo2 {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999 !important;
}

.influencerInfo {
  width: 32px;
  height: 32px;
  background: #796cf3;
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

::v-deep(.el-table th.el-table__cell > .cell) {
  text-align: center;
}

.el-icon-question {
  position: absolute;
  top: 24px;
  left: 285px;
  cursor: pointer;
}

.ghost {
  opacity: 0;
}

.chosen {
  background-color: rgba(255, 255, 255, 0.1);
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

<style>
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
</style>
