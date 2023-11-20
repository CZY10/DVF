<template>
  <div class="RequirementBox">
    <div class="RequirementBoxBanxin">
      <p class="hearder">提交视频拍摄需求</p>
      <div class="RequirementWenben">
        <div class="RequirementWenben-div1">
          <span>注意事项</span>
          <div></div>
          <span>新手引导</span>
        </div>
        <div class="RequirementWenben-div2">
          <div class="elIcon2">
            <i class="iconfont icon-fx1"></i>
            <span>邀请填写</span>
          </div>
          <div class="elIcon2">
            <i class="iconfont icon-yq"></i>
            <span>批量导入</span>
          </div>
          <div class="elIcon2">
            <i class="iconfont icon-mb"></i>
            <a :href="fileDiz" style="cursor: pointer">下载模板</a>
          </div>
          <div class="elIcon2">
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
          height="600"
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
                    @end="influencer_infoOnEnd(tableData)"
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
                      @click="datalistdialogVisible = true"
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
                      @click="datalistdialogVisible = true"
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
                  <div class="addbtn">
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
                  style="height: 60px; width: 60px; border: 1px solid #f0f0f0"
                >
                  <img
                    :src="scope.row.image"
                    style="width: 100%; height: 100%"
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
                >
                  <p style="white-space: nowrap">详情</p>
                  <i class="iconfont icon-tx" style="margin-left: 5px"></i>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="视频数量">
            <template slot-scope="scope">
              <el-input-number
                v-model="video_num"
                @change="handleChange"
                :min="1"
                :max="10"
                size="mini"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="拍摄预算/¥">
            <template slot-scope="scope">
              <el-input
                v-model="Shootingbudgetinput"
                style="height: 32px; width: 74px"
              ></el-input>
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
              <ul v-else style="display: flex; justify-content: center">
                <li
                  style="color: #999999; cursor: pointer"
                  @click="deletesubmitForm(scope.row.id)"
                >
                  删除
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
      <div class="RequirementBtn">
        <button @click="submitTo">提交</button>
      </div>
      <div class="elIcon">
        <el-checkbox v-model="checked" style="margin-right: 10px"></el-checkbox>
        <span>我已阅读并同意</span
        ><span style="cursor: pointer; color: #796cf3" @click="goNote"
          >《视频拍摄服务及售后说明》</span
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
    <el-dialog :visible.sync="datalistdialogVisible" width="983px">
      <i class="el-icon-full-screen" v-screenfull></i>
    </el-dialog>
  </div>
</template>

<script>
import {
  getShootRequire,
  search,
  create,
  needsEdit,
  needsCopy,
  needsDelete,
  needsRemoveInfluencer,
  needsInfluencerList,
  needsSelectInfluencer,
  needsSubmit,
  checkPayment,
  needsTemplate,
} from "@/api";
import draggable from "vuedraggable";
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
      getneedsInfluencerList: [],
      video_num: 0,
      Shootingbudgetinput: "",
    };
  },
  components: {
    draggable,
  },
  methods: {
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
          // console.log(this.tableData);
          this.fileDiz = res.data.file;
        }
      });
    },
    //提交
    submitTo() {
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
          console.log(res.data.order[1].order.qrcode);
          setTimeout(() => {
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
          this.handlerCheckWechatPayment(res.data.order[0].order.out_trade_no);
          this.handlerCheckAlipayPayment(res.data.order[1].order.out_trade_no);
        })
        .catch((res) => {
          loading.close();
          this.$message.error(res);
        });
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
    handleSelectionChange(val) {
      this.handleSelectionChangeList = val;
      console.log(val);
    },
    handleChange(value) {
      console.log(value);
    },

    //列表达人拖拽结束
    influencer_infoOnEnd(list) {
      console.log(list);
      list.forEach((item) => {
        console.log(item.influencer_info);
        if (item.influencer_info.length > 5) {
          item.influencer_info.pop();
        }
      });
    },
  },
  mounted() {
    this.reqsearch();
    //搜索列表请求
    needsInfluencerList()
      .then((res) => {
        this.getneedsInfluencerList = res.data.data;
      })
      .catch((err) => {
        console.error(err);
      });
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
  },
};
</script>

<!-- 列表样式 -->
<style>
.dialog-footer {
  display: flex;
  justify-content: center;
}

.el-icon-user-solid {
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

.el-textarea__inner {
  height: 120px;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #796cf3 !important;
  background-color: #796cf3 !important;
}

.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #796cf3 !important;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #796cf3 !important;
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

.el-table__header-wrapper {
  margin: 14px 14px 0 14px;
  width: 1170px !important;
}

.el-table__header-wrapper table {
  height: 46px;
  padding: 0;
}

.el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}

.el-table th.el-table__cell > .cell {
  text-align: center;
}

.el-icon-question {
  position: absolute;
  top: 24px;
  left: 285px;
  cursor: pointer;
}
</style>

<style lang="less" scoped>
::v-deep .el-table__body-wrapper {
  padding: 0 15px 25px 15px;
  border: none;
}
::v-deep .el-table .has-gutter .el-checkbox .el-checkbox__inner {
  display: none;
}

::v-deep .el-table .cell::before {
  content: "";
  text-align: center;
  line-height: 37px;
}

::v-deep .el-form-item__label {
  margin-top: 5px;
}

::v-deep .el-form-item--small .el-form-item__label {
  line-height: 22px;
}

::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: revert;
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

::v-deep(.el-input__inner) {
  height: 100%;
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
        div {
          width: 2px;
          height: 13px;
          background: #ba91fc;
          margin: 3px 7px 0;
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
          .iconfont {
            margin-right: 5px;
          }
          a {
            text-decoration: none;
            color: #a06cf3;
          }
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
        width: 160px;
        height: 42px;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        border-radius: 21px;
        cursor: pointer;
        margin: 0 10px;
        border: none;
        color: white;
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
.el-icon-full-screen {
  position: absolute;
  top: -8px;
  right: 45px;
}

.ghost {
  opacity: 0;
}

.chosen {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
