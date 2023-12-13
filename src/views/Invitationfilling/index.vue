<template>
  <div class="RequirementBox">
    <div class="headertop">
      <a href="/" target="_blank">
        <img src="@/assets/images/home/logo.webp" />
      </a>
    </div>

    <Transition enter-active-class="li2show" leave-active-class="li2hide">
      <div class="headertitle" v-show="ifsubmitTo">
        <p>
          <i class="iconfont icon-tips" style="font-size: 14px"></i>
          温馨提示：填写完后记得及时上传，否则提报人无法接收哦～
        </p>
      </div>
    </Transition>

    <div class="RequirementBoxBanxin">
      <p class="hearder">提交视频拍摄需求</p>
      <div class="RequirementWenben">
        <div class="RequirementWenben-div1">
          <span @click="NotedialogdialogVisible = true">拍摄须知</span>
          <div></div>
          <span @click="TipsdialogVisible1 = true">新手引导</span>
        </div>
        <div class="RequirementWenben-div2">
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
        </div>
      </div>
      <div
        class="loading-area"
        style="
          position: relative;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          box-sizing: border-box;
          height: calc(100vh - 270px);
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
                              @click="delDr(item.id, scope.row.id)"
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
                      "
                      :title="scope.row.title"
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
                      <i
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
        <button @click="submitTo">上传</button>
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

    <!-- 温馨提示弹窗 -->
    <Notedialog
      @getNotedialogMsg="getNotedialogMsg"
      :NotedialogdialogVisible="NotedialogdialogVisible"
    ></Notedialog>

    <dialogVisibleTips1
      :TipsdialogVisible1="TipsdialogVisible1"
      @getTipsdialogVisible1="getTipsdialogVisible1"
    ></dialogVisibleTips1>

    <!-- 上传成功弹窗 -->
    <Successfullyejectedialog
      :Successfullyejectedialog="Successfullyejectedialog"
      @getSuccessfullyejectedialogMsg="getSuccessfullyejectedialogMsg"
    ></Successfullyejectedialog>
  </div>
</template>

<script>
import {
  search,
  needsDelete,
  inviteRemoveInfluencer,
  inviteSubmit,
  needsVideoNumin,
  needsBudget,
  needsIndex,
  inviteSelectInfluencer,
  inviteTemplate,
} from "@/api";
import draggable from "vuedraggable";
import FillingRequirementsdialog from "./dialog/FillingRequirementsdialog.vue";
import Tipsdialog from "./dialog/Tipsdialog.vue";
import ListOfInfluencersdialog from "./dialog/ListOfInfluencersdialog.vue";
import Notedialog from "./dialog/notedialog.vue";
import dialogVisibleTips1 from "./dialog/dialogVisibleTips1.vue";
import Successfullyejectedialog from "./dialog/Successfullyejectedialog.vue";
import store from "@/store";
import { v4 as uuidv4 } from "uuid";
import router from "@/router";
export default {
  data() {
    return {
      datalistdialogVisible: false,
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
      errorShow: false,
      isvideoSubmitDialogVisible: 0,
      fileList: [],
      handleSelectionChangeList: [],
      fileDiz: "",
      iscg: false,
      FillingRequirementsdialogVisible: false,
      determine: 1,
      RequirementsList: {},
      TipsdialogdialogVisible: false,
      video_id: "",
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
      style: "min-height:78px;display: block;",
      TipsdialogVisible1: false,
      deletecenterDialogVisiblesindex: 0,
      Successfullyejectedialog: false,
    };
  },
  components: {
    draggable,
    FillingRequirementsdialog,
    Tipsdialog,
    ListOfInfluencersdialog,
    Notedialog,
    dialogVisibleTips1,
    Successfullyejectedialog,
  },
  methods: {
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
        source: 1,
        auth: localStorage.getItem("token"),
      }).then((res) => {
        if (res.code == 1) {
          this.reqsearch();
          this.centerDialogVisibles = false;
        }
      });
    },
    //删除达人
    delDr(user_id, id) {
      inviteRemoveInfluencer({
        id: id,
        influencer_id: user_id,
        auth: localStorage.getItem("token"),
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
    reqsearch() {
      let url = new URL(window.location.href);
      let needs = url.searchParams.get("needs");

      search({
        url_mark: needs,
        source: 1,
        auth: localStorage.getItem("token"),
      }).then((res) => {
        if (res.code == 1) {
          if (res.data.data.length == 0) {
            res.data.data.push({
              flag: 1,
              influencer_info: [],
              title: "",
              video_num: "1",
            });
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
        } else {
          localStorage.clear();
          router.push("/");
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
        let url = new URL(window.location.href);
        let needs = url.searchParams.get("needs");
        inviteSubmit({
          id: id,
          url_mark: needs,
          auth: localStorage.getItem("token"),
        })
          .then((res) => {
            if (res.code == 1) {
              this.reqsearch();
              this.Successfullyejectedialog = true;
              this.ifsubmitTo = false;
              loading.close();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((res) => {
            loading.close();
            this.$message.error(res);
          });
      } else if (this.tableData.length == 1 || this.tableDataTitle == true) {
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
              "您还没有添加任何需求，请添加需求再提交"
            ),
          ]),
          iconClass: "iconfont",
          offset: 140,
          customClass: "customClasssuccess",
        });
      }
    },
    //跳转商品详情
    gocommodity(url) {
      if (url) {
        window.open(url, "_blank");
      }
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
            source: 1,
            auth: localStorage.getItem("token"),
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
            let url = new URL(window.location.href);
            let needs = url.searchParams.get("needs");
            const itempop = item.influencer_info.pop();
            inviteSelectInfluencer({
              influencer_ids: itempop.id,
              url_mark: needs,
              auth: localStorage.getItem("token"),
            }).then((res) => {
              if (res.code == 1) {
                this.reqsearch();
              }
            });
          }
        });

        if (this.differentIndices.length == 0) {
          let influencerIds1 = this.tableData[index].influencer_info
            .map((item) => item.id.toString())
            .join(",");
          this.getneedsSelectInfluencer(id, influencerIds1);
          setTimeout(() => {
            this.reqsearch();
          }, 1000);
        } else {
          let influencerIds1 = this.tableData[
            this.differentIndices[0]
          ].influencer_info
            .map((item) => item.id?.toString())
            .join(",");
          let influencerIds2 = this.tableData[
            this.differentIndices[1]
          ].influencer_info
            .map((item) => item.id?.toString())
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
      let url = new URL(window.location.href);
      let needs = url.searchParams.get("needs");
      await inviteSelectInfluencer({
        url_mark: needs,
        id: id,
        influencer_ids: influencerIds1,
        auth: localStorage.getItem("token"),
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
    getSuccessfullyejectedialogMsg(msg) {
      this.Successfullyejectedialog = msg;
    },

    //拍摄预算修改
    budgetChange(val, index, num) {
      if (val * 1 < 300 * num) {
        this.ifsubmitTo = false;
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
        let flag = true;
        this.tableData.map((item) => {
          if (item.budget < item.video_num * 300 && item.title != "") {
            flag = false;
          }
        });
        if (flag) this.ifsubmitTo = true;
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
        source: 1,
        auth: localStorage.getItem("token"),
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

      let url = new URL(window.location.href);
      let needs = url.searchParams.get("needs");
      inviteTemplate({
        file: fileLit.file,
        url_mark: needs,
        auth: localStorage.getItem("token"),
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
                  "导入失败，请检查Excel表格是否按模板格式填写"
                ),
              ]),
              iconClass: "iconfont",
              offset: 140,
              customClass: "customClasssuccess",
            });
          }
        })
        .catch((res) => {
          loading.close();
        });
    },

    //请求拍摄需求首页接口
    async getneedsIndex() {
      if (localStorage.getItem("token") == null) {
        let said = uuidv4();
        localStorage.setItem("token", said);
        var date = new Date();
        date.setMonth(date.getMonth() + 6); // 设置日期为半年后
        document.cookie =
          `auth=${localStorage.getItem("token")}; expires=` +
          date.toUTCString();
      }
      let res = await needsIndex({
        source: 1,
        auth: localStorage.getItem("token"),
      });
      if (res.code == 1) {
        this.fileDiz = res.data.file;
        this.reqsearch();
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
              source: 1,
              auth: localStorage.getItem("token"),
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
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-table__body-wrapper {
  padding: 0 30px 25px 30px;
  border: none;
  box-sizing: border-box;
  margin-top: 0px;
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
  min-height: 100vh;
  margin-top: -67px;

  .headertop {
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    background: #ffffff;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 0 30px;
    img {
      cursor: pointer;
    }
  }

  .li2show {
    animation: box-enter2 0.3s cubic-bezier(0, 0, 1, 1);
  }

  @keyframes box-enter2 {
    0% {
      height: 0;
    }

    100% {
      height: 30px;
    }
  }

  /*离开的动画*/
  .li2hide {
    animation: box-leave2 0.3s cubic-bezier(0, 0, 1, 1);
  }

  @keyframes box-leave2 {
    0% {
      height: 30px;
    }

    100% {
      height: 0;
    }
  }
  .headertitle {
    width: 100%;
    height: 30px;
    background: #faebff;
    border-radius: 0px 0px 10px 10px;
    line-height: 30px;
    overflow: hidden;
    position: fixed;
    p {
      width: 1200px;
      margin: 0 auto;
      color: #d161f6;
      font-size: 12px;
    }
  }

  .RequirementBoxBanxin {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    min-height: calc(100vh - 97px);
    .hearder {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-top: 40px;
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
