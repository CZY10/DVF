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
      <p class="hearder">填写视频拍摄需求</p>
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
                        color: #999999;
                        min-width: 105px;
                        text-align: left;
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
                    <p v-else style="color: #999999; min-width: 105px">--</p>
                  </div>

                  <div
                    @click="openFillingRequirementsdialog(scope.$index)"
                    class="tableyaoq-div"
                    v-if="scope.row.url != '' || scope.row.image.length != 0"
                  >
                    <p>详情</p>
                    <i class="iconfont icon-tx"></i>
                  </div>

                  <div
                    @click="openFillingRequirementsdialog(scope.$index)"
                    class="tableyaoq-div2"
                    v-else
                  >
                    <p>详情</p>
                    <i class="el-icon-warning"></i>
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
                          scope.row.video_tip,
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
                          scope.row.video_tip,
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
import Notedialog from "@/components/RequirementSubmission/dialog/notedialog.vue";
import dialogVisibleTips1 from "@/components/RequirementSubmission/dialog/dialogVisibleTips1.vue";
import Successfullyejectedialog from "./dialog/Successfullyejectedialog.vue";
import store from "@/store";
import { v4 as uuidv4 } from "uuid";
import router from "@/router";

export default {
  data() {
    return {
      datalistdialogVisible: false,
      formId: "",
      centerDialogVisibles: false,
      tableData: [
        {
          flag: 1,
          influencer_info: [],
        },
      ],
      handleSelectionChangeList: [],
      fileDiz: "",
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
      num: 0,
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
        auth: localStorage.getItem("said"),
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
        auth: localStorage.getItem("said"),
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
        auth: localStorage.getItem("said"),
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
              item.budget != 0
                ? (this.tableData[index].budget = item.budget * 1)
                : (this.tableData[index].budget = "");

              this.budgetChange(item.budget, index, item.video_num);
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

          if (this.ifGuide == 1) this.NotedialogdialogVisible = true;
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
        this.ifsubmitTo = false;
        const loading = this.$loading({
          lock: true,
          text: "上传中...",
          spinner: "el-icon-loading",
          background: "#fff",
          target: document.querySelector(".loading-area"), //设置加载动画区域
        });
        const arr = [];
        this.tableData.forEach((item) => {
          if (
            item.id &&
            item.title != "" &&
            item.budget * 1 >= item.video_num * 300 &&
            item.url != ""
          ) {
            arr.push(item.id);
          }
        });
        const id = arr.join(",");
        let url = new URL(window.location.href);
        let needs = url.searchParams.get("needs");
        inviteSubmit({
          id: id,
          url_mark: needs,
          auth: localStorage.getItem("said"),
        })
          .then((res) => {
            if (res.code == 1) {
              this.reqsearch();
              this.Successfullyejectedialog = true;
              loading.close();
            } else {
              loading.close();
              this.showMessage(res.msg);
            }
          })
          .catch((res) => {
            loading.close();
            this.$message.error(res);
          });
      } else if (this.tableData.length == 1 || this.tableDataTitle == true) {
        this.showMessage("您还没有添加任何需求，请添加需求再提交");
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
            auth: localStorage.getItem("said"),
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
              auth: localStorage.getItem("said"),
            });
          }
        });

        if (this.differentIndices.length == 0) {
          let influencerIds1 = this.tableData[index].influencer_info
            .map((item) => item.id.toString())
            .join(",");
          this.getneedsSelectInfluencer(id, influencerIds1);
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
        auth: localStorage.getItem("said"),
      });

      let comma = ",";
      let flag = true;
      if (influencerIds1.toLowerCase().includes(comma.toLowerCase())) {
        console.log("字符串（忽略大小写）包含逗号");
      } else {
        this.reqsearch();
        flag = false;
      }

      if (influencerIds1 == "" && flag) this.reqsearch();
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
        this.tableData.map((item) => {
          if (
            (item.budget >= item.video_num * 300 && item.url != "") ||
            (item.budget >= item.video_num * 300 && item.image.length != 0)
          ) {
            this.ifsubmitTo = true;
          }
        });

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
        let flag = false;
        this.tableData.map((item) => {
          if (
            (item.budget >= item.video_num * 300 &&
              item.title != "" &&
              item.url != "") ||
            (item.budget >= item.video_num * 300 &&
              item.title != "" &&
              item.image.length != 0)
          ) {
            flag = true;
          }
        });
        flag ? (this.ifsubmitTo = true) : (this.ifsubmitTo = false);
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
        auth: localStorage.getItem("said"),
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
        auth: localStorage.getItem("said"),
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

    //请求拍摄需求首页接口
    async getneedsIndex() {
      // 获取所有的 cookie
      var allCookies = document.cookie;
      // 将所有的 cookie 分割成一个数组
      var cookieArray = allCookies.split("; ");

      let flge = true;
      // 遍历数组，找到您想要的 cookie
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        var name = cookie.split("=")[0]; // cookie 的名称
        var value = cookie.split("=")[1]; // cookie 的值

        if (name === "auth") {
          flge = false;
          if (!localStorage.getItem("said"))
            localStorage.setItem("said", value);
        }
      }

      if (flge) {
        let said = uuidv4();
        localStorage.setItem("said", said);
        var date = new Date();
        date.setMonth(date.getMonth() + 6); // 设置日期为半年后
        document.cookie =
          `auth=${localStorage.getItem("said")}; expires=` + date.toUTCString();
      }
      let res = await needsIndex({
        source: 1,
        auth: localStorage.getItem("said"),
      });
      if (res.code == 1) {
        this.fileDiz = res.data.file;
        this.ifGuide = res.data.if_guide;
        this.reqsearch();
      }
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
          if (item.id && this.num != item.id) {
            this.num = item.id;
            needsDelete({
              id: item.id,
              source: 1,
              auth: localStorage.getItem("said"),
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
    NotedialogdialogVisible(newval) {
      if (newval == false && this.ifGuide == 1) {
        this.ifGuide = 0;
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
        .tableyaoq-div2 {
          display: flex;
          align-items: center;
          color: #ed4014;
          margin-left: 15px;
          font-size: 12px;
          p {
            white-space: nowrap;
          }
          .el-icon-warning {
            margin-left: 3px;
            margin-top: 1px;
            font-size: 16px;
          }
        }
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
