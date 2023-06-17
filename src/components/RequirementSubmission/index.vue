<template>
  <div class="RequirementBox">
    <div class="navmenu">
      <img
        src="	https://api.viponm.com/uploads/20230208/729c6923d894d9e7689a0ba1137c8918.svg"
        style="width: 180px; height: 100%; padding: 0 20px"
      />
    </div>
    <div class="RequirementBoxBanxin">
      <p class="hearder">提交视频拍摄需求</p>
      <div class="RequirementWenben">
        <div class="RequirementWenben-div1">待提交的需求</div>
        <div class="RequirementWenben-div2">
          <div class="elIcon2">
            <img src="@/assets/images/excel4.png" />
            <a :href="fileDiz" style="cursor: pointer">下载模板</a>
          </div>
        </div>
      </div>
      <div
        style="
          position: relative;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          height: 650px;
        "
      >
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{
            background: '#F6F6F6',
            color: '#333333',
          }"
          max-height="600"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" :selectable="selectable">
          </el-table-column>
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column label="意向达人" width="275">
            <template slot-scope="scope">
              <div v-if="scope.row.influencer_info.length != 0">
                <ul class="influencerInfoUl">
                  <li
                    class="influencerInfoLi isinfluencerInfoLi"
                    v-for="(item, index) in scope.row.influencer_info"
                    :key="index"
                  >
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
                    <p
                      style="
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #999999;
                      "
                    >
                      <span>NO.{{ item.user_id }}</span>
                    </p>
                    <div
                      class="delDiv"
                      @click="delDr(item.user_id, scope.row.id)"
                    >
                      x
                    </div>
                  </li>
                  <li
                    class="influencerInfoLi"
                    v-if="scope.row.influencer_info.length != 5"
                  >
                    <div
                      class="influencerInfo3"
                      @click="addDrs(scope.row.influencer_info, scope.row.id)"
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
                      @click="addDrs(scope.row.influencer_info, scope.row.id)"
                    >
                      +
                    </div>
                    <div class="influencerInfo2">添加</div>
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.flag || scope.row.title == ''">--</div>
              <div v-else style="display: flex; cursor: pointer">
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
                  <p style="width: 100px; margin-top: 10px">
                    {{ scope.row.title }}
                  </p>
                  <p
                    style="
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #999999;
                    "
                    v-if="scope.row.asin"
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
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄预算/¥" width="160">
            <template slot-scope="scope">
              <div v-if="scope.row.flag || scope.row.title == ''">--</div>
              <div v-else style="width: 100%">{{ scope.row.budget }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="yesN" label="是否通过达人账号上传" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.flag || scope.row.title == ''">--</div>
              <div v-else>
                <div v-if="scope.row.method == 1">是</div>
                <div v-else-if="scope.row.method == 0">否</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍摄要求" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.flag == 1 || scope.row.title == ''">--</div>
              <div
                v-else
                style="color: #796cf3; cursor: pointer"
                @click="looksubmitForm(scope.row.id, scope.$index)"
              >
                查看
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <ul
                style="display: flex; justify-content: center"
                v-if="scope.row.flag == 1 || scope.row.title == ''"
              >
                <li
                  class="liBtn1"
                  @mouseover="flags = true"
                  @mouseout="flags = false"
                >
                  <el-tooltip
                    class="items"
                    effect="dark"
                    content="请按模板格式导入,支持多笔需求一同导入"
                    placement="bottom"
                  >
                    <el-upload
                      action=""
                      accept=".xls, .xlsx"
                      :show-file-list="false"
                      :multiple="false"
                      :http-request="httpRequest"
                    >
                      <div class="liBtn1div" @click="daoRid(scope.row.id)">
                        <img
                          src="@/assets/images/excel4.png"
                          style="width: 20px; margin-right: 5px"
                        />

                        <span>导入</span>
                      </div>
                    </el-upload>
                  </el-tooltip>
                </li>
                <li class="liBtn2" @click="addRequireList(scope.row.id)">
                  手动添加
                </li>
              </ul>

              <ul v-else style="display: flex; justify-content: center">
                <li
                  style="color: #796cf3; cursor: pointer"
                  @click="modifysubmitForm(scope.row.id, scope.$index)"
                >
                  修改
                </li>
                <li
                  style="margin: 0 15px; color: #796cf3; cursor: pointer"
                  @click="copysubmitForm(scope.row.id)"
                >
                  克隆
                </li>
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
        <div class="RequirementBox-xinx" v-if="flag">
          未选意向达人情况下，默认为 平台推荐达人
          <div class="triangle"></div>
        </div>
      </div>
      <el-button
        icon="el-icon-delete"
        circle
        @click="deleteList"
        style="background-color: white"
      ></el-button>
      <div class="RequirementBtn">
        <button
          v-if="tableData.length == 1"
          style="background: #cccccc"
          @click="tiso"
        >
          提交
        </button>
        <button
          v-else-if="tableDataTitle"
          style="background: #cccccc"
          @click="tist"
        >
          提交
        </button>
        <button
          v-else-if="checked == false"
          style="background: #cccccc"
          @click="tiss"
        >
          提交
        </button>
        <button @click="submitTo" v-else>提交</button>
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
      title="视频拍摄需求"
      :visible.sync="videoSubmitDialogVisible"
      width="702px"
      :close-on-click-modal="false"
      class="video_dialog"
      center
    >
      <div>
        <el-form
          size="small"
          :model="videoRuleForm"
          :rules="videoRules"
          ref="videoRules"
          label-width="125px"
          class="video_ruleForm"
          label-position="left"
        >
          <el-form-item label="产品名称" prop="category">
            <el-input
              v-model="videoRuleForm.category"
              placeholder="请输入产品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品亚马逊链接">
            <el-input
              v-model="videoRuleForm.product"
              placeholder="如产品尚未上架，则不用填写"
            ></el-input>
          </el-form-item>
          <el-form-item label="拍摄预算 ¥" prop="copper" style="width: 350px">
            <el-input
              v-model="videoRuleForm.copper"
              placeholder="请填写该产品的预算金额"
            >
            </el-input>
          </el-form-item>
          <span style="position: absolute; top: 115px; left: 355px">元</span>
          <el-form-item
            label="需重点体现的产品卖点/功能/特性"
            prop="selling_point"
          >
            <div class="description">
              请用英文说明，不超过3个
              <el-tooltip class="item" effect="dark" placement="right">
                <a href="javascript:;;">示例</a>
                <p slot="content">
                  例：<br />
                  1.Disco modes color changing<br />
                  2.Dance hall projection effect<br />
                  3. 41FT & 15 Disco Bulbs
                </p>
              </el-tooltip>
            </div>
            <el-input
              type="textarea"
              placeholder="注意： 
1、请勿填写过多信息，否则在极短的时间内视频将无法凸显重点；
2、如无特别要求，请填写“自由发挥”，达人将结合产品listing自由创作。"
              show-word-limit
              maxlength="350"
              v-model="videoRuleForm.selling_point"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="定制需求"
            v-if="videoRuleForm.selectedType == 1"
            prop="demand"
          >
            <div class="description">
              请具体说明您的拍摄需求
              <el-tooltip class="item" effect="dark" placement="right">
                <a href="javascript:;;">示例</a>
                <p slot="content">
                  例：<br />
                  1. 介绍包装内容，并开箱展示天线安装、电源适配器连接，手机
                  APP连接等安装使用步骤；<br />
                  2.
                  介绍30X光学变焦功能：将摄像机安装在室外，放大并查看远处的景物或动物，以展示摄像机能看清楚很远处的风景；<br />
                  3.
                  介绍人形跟踪功能：将摄像机安装在室外，为摄像机开启人形跟踪功能，然后人在摄像机的镜头前走动，以展示摄像机的人形跟踪功能。<br />
                </p>
              </el-tooltip>
            </div>
            <el-input
              type="textarea"
              placeholder="请输入您的拍摄需求"
              v-model="videoRuleForm.demand"
            ></el-input>
          </el-form-item>
          <el-form-item label="拍摄要素" class="is-required">
            <div>
              <div class="form_item_title">
                在候选达人匹配失败时，将据此为您推荐其他达人
              </div>
              <div
                class="item_check_style"
                v-for="(item, index) in listArray"
                :key="index"
              >
                <div class="label_style">{{ item.title }}</div>
                <el-checkbox-group
                  v-if="item.type == 'check'"
                  v-model="item.checkList"
                  @change="checkRequirement"
                >
                  <el-checkbox
                    v-for="(i, index) in item.list"
                    :key="index"
                    :label="i"
                  ></el-checkbox>
                </el-checkbox-group>
                <el-radio-group
                  v-else
                  v-model="item.checkList"
                  @change="checkRequirement"
                >
                  <el-radio v-for="(i, j) in item.list" :label="i">{{
                    i
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div class="error_style" v-if="errorShow">{{ errorText }}</div>
            </div>
          </el-form-item>
          <el-form-item label="其他拍摄说明">
            <div class="description">未填写则视为无其他未尽事项</div>
            <el-input
              type="textarea"
              maxlength="100"
              show-word-limit
              placeholder="以下情形请详细说明，如： 
1、产品仅适配特定配件/型号的；
2、要求特定场景的，如：汽车、泳池、卧室、海滩等
3、其他特殊要求，如：需要安装演示、需要3~6岁小孩出镜等"
              v-model="videoRuleForm.remarks"
            ></el-input>
            <p class="description2">
              <span>注</span>：对于特殊、复杂的需求，如涉及定制化拍摄，将<span
                >按另行价格收费</span
              >
            </p>
          </el-form-item>
          <el-form-item label="是否通过达人账号上传">
            <p class="description">视频通过达人上传会在达人主页展示</p>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="0">否</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="form_button"
        v-if="
          videoRuleForm.category ||
          videoRuleForm.copper ||
          videoRuleForm.selling_point
        "
      >
        <el-button size="small" type="primary" @click="submitForm('videoRules')"
          >保存</el-button
        >
      </div>
      <div class="form_button" v-else>
        <el-button
          size="small"
          type="primary"
          style="background: rgb(204, 204, 204)"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="添加意向达人"
      :visible.sync="centerDialogVisible"
      width="32%"
      center
    >
      <div class="elDialogDR">
        <p class="elDialogDR-p">
          <span style="color: #333">注意: </span>
          若您添加了意向达人，我们将优先为您匹配意向达人；若您未添加意向达人，我们将自行挑选并匹配最合适的达人。
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-top: 22px">
        <p style="margin-right: 20px">添加意向达人</p>
        <div style="width: 300px; position: relative">
          <el-input
            v-model="input"
            style="width: 100%"
            placeholder="请输入达人编号"
            :disabled="disabled"
          ></el-input>
          <ul
            style="
              max-height: 200px;
              position: absolute;
              width: 100%;
              overflow: auto;
              z-index: 1000000000;
            "
          >
            <li
              class="InfluencerList"
              v-for="(item, index) in InfluencerList"
              :key="index"
              @click="addperson(item)"
            >
              <img
                :src="item.image"
                style="width: 36px; height: 36px; border-radius: 50%"
              />
              <span style="margin-left: 12px; font-size: 12px"
                >NO.{{ item.user_id }}</span
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        style="
          height: 160px;
          background: #f6f6f6;
          border-radius: 4px;
          margin-top: 40px;
          padding: 20px;
        "
      >
        <p style="margin-bottom: 20px">
          已选达人<span style="font-size: 12px; color: #999; margin-left: 5px"
            >默认按以下顺序为您匹配，拖动可调整</span
          >
        </p>
        <draggable
          v-model="myArray"
          group="people"
          animation="100"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item" v-for="(element, index) in myArray" :key="index">
              <div class="itemElement">
                <img :src="element.image" class="item-img" />
                <p class="item-p">NO.{{ element.user_id }}</p>
                <div class="item-index1" v-if="index == 0">01</div>
                <div class="item-index2" v-if="index == 1">02</div>
                <div class="item-index3" v-if="index == 2">03</div>
                <div class="item-index4" v-if="index == 3">04</div>
                <div class="item-index4" v-if="index == 4">05</div>
                <div class="delitemElement" @click="delitemElement(index)">
                  x
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>

      <button
        style="
          width: 140px;
          height: 32px;
          background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
          border-radius: 16px;
          border: none;
          color: white;
          cursor: pointer;
          margin: 40px 205px 0;
        "
        @click="isaddperson"
      >
        保存
      </button>
    </el-dialog>

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

    <!--支付定金-->
    <el-dialog
      title="请尽快支付定金"
      :visible.sync="payDepositDialogVisible"
      v-if="payDepositDialogVisible"
      width="500px"
      :close-on-click-modal="false"
      class="pay_deposit_dialog"
      center
    >
      <div>
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
        <div class="group_26 flex-row">
          <div class="image-text_40 flex-row justify-between">
            <img
              class="thumbnail_26"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngadd69f7b6dbb5a1080befad2c5168f68a6705b339b5967fdd3f737c59baf4d89"
            />
            <div class="text-group_14">
              <span class="text_98">1、订单支付成功后，</span>
              <span class="text_99">定金</span>
              <span class="paragraph_1"
                >将原路退回至您的「支付宝/微信」账户；<br />2、完成订单支付，代表服务正式生效。在完成交付之前，平台不会将你的款项支付给达人。</span
              >
            </div>
          </div>
        </div>
      </div>
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
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      checked: false,
      tableDataTitle: true,
      orderData: [
        {
          order: {
            price: "",
            order_id: "",
          },
        },
      ],
      payDepositDialogVisible: false,
      disabled: false,
      flags: false,
      ispersonid: "",
      myArray: [],
      InfluencerList: [],
      input: "",
      formId: "",
      centerDialogVisible: false,
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
      listArray: [],
      videoSubmitDialogVisible: false,
      isvideoSubmitDialogVisible: 0,
      videoRuleForm: {
        product: "",
        category: "",
        selling_point: "",
        demand: "",
        remarks: "",
        copper: "",
      },
      videoRules: {
        selectedType: [
          { required: true, message: "请选择拍摄类型", trigger: "change" },
        ],
        copper: [
          { required: true, message: "请输入拍摄预算", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择产品名称", trigger: "blur" },
        ],
        selling_point: [
          {
            required: true,
            message: "请输入需重点体现的产品卖点",
            trigger: "blur",
          },
        ],
        demand: [
          { required: true, message: "请输入定制需求", trigger: "blur" },
        ],
      },
      checkWechatPaymentVal: "",
      checkAlipayPaymentVal: "",
      fileList: [],
      handleSelectionChangeList: [],
      daorid: "",
      fileDiz: "",
    };
  },
  components: {
    draggable,
  },
  methods: {
    httpRequest(fileLit) {
      const formData = new FormData();
      // for (const key in fileLit.file) {
      //   formData.append(key, fileLit.file[key]);
      // }
      console.log(fileLit);
      formData.append("file", fileLit.file);
      needsTemplate({
        file: fileLit.file,
        id: this.daorid,
      })
        .then((res) => {
          console.log(res);
          this.reqsearch();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    daoRid(id) {
      this.daorid = id;
      console.log(id);
    },

    // 开始拖拽事件
    onStart() {
      // to do
    },
    // 拖拽结束事件
    onEnd() {
      // to do
      console.log(this.myArray);
    },
    //获取拍摄场景列表
    getShootRequireList() {
      getShootRequire()
        .then((res) => {
          console.log(res);
          if (res.code === 1) {
            this.listArray = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //拍摄要求检验
    checkRequirement() {
      for (let k in this.listArray) {
        if (this.listArray[k].type == "check") {
          if (this.listArray[k].checkList.length <= 0) {
            this.errorText = "请先选择" + this.listArray[k].title;
            this.errorShow = true;
            this.requirementValidator = false;
            return;
          } else {
            this.errorShow = false;
            this.errorText = "";
          }
        } else {
          if (
            this.listArray[k].checkList == "" ||
            this.listArray[k].checkList == null
          ) {
            this.errorText = "请先选择" + this.listArray[k].title;
            this.errorShow = true;
            this.requirementValidator = false;
            return;
          } else {
            this.errorShow = false;
            this.errorText = "";
          }
        }
        this.requirementValidator = true;
      }
    },
    addRequireList(id) {
      (this.videoRuleForm = {
        product: "",
        category: "",
        selling_point: "",
        demand: "",
        remarks: "",
        copper: "",
      }),
        this.getShootRequireList();
      this.videoSubmitDialogVisible = true;
      this.isvideoSubmitDialogVisible = 0;
      if (id == undefined) {
        this.isvideoSubmitDialogVisible = 0;
      } else {
        this.isvideoSubmitDialogVisible = 1;
        this.formId = id;
      }
    },
    //保存拍摄需求
    submitForm(formName) {
      if (this.isvideoSubmitDialogVisible == 0) {
        let data = {
          influencer_ids: [],
          url: this.videoRuleForm.product,
          description: this.videoRuleForm.remarks,
          shootrequire: this.listArray,
          title: this.videoRuleForm.category,
          budget: this.videoRuleForm.copper,
          point: this.videoRuleForm.selling_point,
          method: this.radio * 1,
        };
        this.$refs[formName].validate((valid) => {
          this.checkRequirement();
          if (valid) {
            if (this.requirementValidator) {
              create(data).then((res) => {
                console.log(res);
                this.reqsearch();
                (this.videoRuleForm = {
                  product: "",
                  category: "",
                  selling_point: "",
                  demand: "",
                  remarks: "",
                  copper: "",
                }),
                  (this.videoSubmitDialogVisible = false);
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.isvideoSubmitDialogVisible == 1) {
        let data = {
          url: this.videoRuleForm.product,
          description: this.videoRuleForm.remarks,
          shootrequire: this.listArray,
          title: this.videoRuleForm.category,
          budget: this.videoRuleForm.copper,
          point: this.videoRuleForm.selling_point,
          method: this.radio * 1,
          id: this.formId,
        };
        this.$refs[formName].validate((valid) => {
          this.checkRequirement();
          if (valid) {
            if (this.requirementValidator) {
              needsEdit(data).then((res) => {
                console.log(res);
                this.reqsearch();
                (this.videoRuleForm = {
                  product: "",
                  category: "",
                  selling_point: "",
                  demand: "",
                  remarks: "",
                  copper: "",
                }),
                  (this.videoSubmitDialogVisible = false);
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    //修改拍摄需求
    modifysubmitForm(id, index) {
      (this.videoRuleForm = {
        product: this.tableData[index].url,
        remarks: this.tableData[index].description,
        category: this.tableData[index].title,
        copper: this.tableData[index].budget,
        selling_point: this.tableData[index].point,
      }),
        (this.listArray = this.tableData[index].shootrequire);
      this.radio = this.tableData[index].method + "";
      this.formId = id;
      this.isvideoSubmitDialogVisible = 1;
      this.videoSubmitDialogVisible = true;
    },
    //copy拍摄需求
    copysubmitForm(id) {
      needsCopy({
        id: id,
      }).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.reqsearch();
        }
      });
    },
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
    //查看拍摄需求
    looksubmitForm(id, index) {
      (this.videoRuleForm = {
        product: this.tableData[index].url,
        remarks: this.tableData[index].description,
        category: this.tableData[index].title,
        copper: this.tableData[index].budget,
        selling_point: this.tableData[index].point,
      }),
        (this.listArray = this.tableData[index].shootrequire);
      this.formId = id;
      this.radio = this.tableData[index].method + "";
      this.isvideoSubmitDialogVisible = 1;
      this.videoSubmitDialogVisible = true;
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
    //添加达人
    addDrs(influencer_info, id) {
      this.myArray = influencer_info;
      this.ispersonid = id;
      this.centerDialogVisible = true;
    },
    addperson(item) {
      console.log(item);
      this.myArray.push(item);
      this.input = "";
    },
    isaddperson() {
      const arr = [];
      this.myArray.forEach((item) => {
        arr.push(item.user_id);
      });
      const influencer_ids = arr.join(",");
      needsSelectInfluencer({
        influencer_ids: influencer_ids,
        id: this.ispersonid,
      }).then((res) => {
        if (res.code == 1) {
          this.centerDialogVisible = false;
          this.reqsearch();
        }
      });
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
          console.log(this.tableData);
          this.fileDiz = res.data.file;
          this.tableDataTitle = this.tableData.every((item) => {
            return item.title == "";
          });
        }
      });
    },
    //提交
    submitTo() {
      this.payDepositDialogVisible = true;
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
      }).then((res) => {
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
        this.orderData = res.data.order;
        // console.log(this.orderData);
        // console.log(this.orderData[0].order.price);
        this.handlerCheckWechatPayment(res.data.order[0].order.out_trade_no);
        this.handlerCheckAlipayPayment(res.data.order[1].order.out_trade_no);
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
                _this.payDepositDialogVisible = false;
                clearInterval(_this.checkWechatPaymentVal);
                clearInterval(_this.checkAlipayPaymentVal);
                _this.$router.push("/manage/order");
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
                _this.$router.push("/manage/order");
              }
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }, 3000);
    },
    delitemElement(index) {
      this.myArray.splice(index, index);
    },
    handleSelectionChange(val) {
      this.handleSelectionChangeList = val;
      console.log(val);
    },
    selectable(row) {
      if (row.flag == 1) {
        return false;
      } else {
        return true;
      }
    },
    deleteList() {
      if (this.handleSelectionChangeList.length > 0) {
        var idList = [];
        this.handleSelectionChangeList.forEach((item) => {
          idList.push(item.id);
        });
        const influencer_ids = idList.join(",");
        this.centerDialogVisibles = true;
        this.formId = influencer_ids;
      }
    },
    tiso() {
      this.$message("您还没有添加然后需求，请添加需求在提交");
    },
    tist() {
      this.$message("您还没有添加然后需求，请添加需求在提交");
    },
    tiss() {
      this.$message("请先阅读同意《视频拍摄服务及售后说明》");
    },
  },
  mounted() {
    this.reqsearch();
  },
  watch: {
    input(newInput) {
      if (newInput == "") {
        this.InfluencerList = [];
      } else {
        needsInfluencerList().then((res) => {
          const arr = res.data.data.filter((item) => {
            const str = item.user_id.toString().includes(newInput);
            return str;
          });
          this.InfluencerList = arr;
        });
      }
    },
    myArray(newInput) {
      if (newInput.length == 5) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    centerDialogVisible(newVal) {
      console.log(newVal);
      if (newVal == false) {
        this.reqsearch();
      }
    },
    payDepositDialogVisible(newVal) {
      if (newVal == false) {
        this.reqsearch();
      }
    },
  },
};
</script>

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
}
</style>

<style>
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: 2px solid #aa68e7;
}
.el-tabs__item {
  width: 220px;
}
.el-alert__title {
  font-size: 12px !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400 !important;
  color: #666666 !important;
}
.items {
  margin: 4px;
}
.item {
  cursor: pointer;
  float: left;
}
.itemElement {
  width: 88px;
  height: 88px;
  background: #ffffff;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  border: 1px solid #eeeeee;
  margin-right: 10px;
  position: relative;
}
.delitemElement {
  display: none;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
  color: white !important;
  font-size: 12px;
  line-height: 6px;
  cursor: pointer;
  text-align: center;
}
.itemElement:hover .delitemElement {
  display: block;
}
.item-img {
  width: 44px;
  height: 44px;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  margin: 12px 22px 5px;
}
.item-p {
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666 !important;
}
.item-index1 {
  width: 20px;
  height: 14px;
  background: #ff2c4c;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 7px 0px 0px 7px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 14px;
  position: absolute;
  top: 0;
  right: 0;
}
.item-index2 {
  width: 20px;
  height: 14px;
  background: #ff9c17;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 7px 0px 0px 7px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 14px;
  position: absolute;
  top: 0;
  right: 0;
}
.item-index3 {
  width: 20px;
  height: 14px;
  background: #796cf3;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 7px 0px 0px 7px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 14px;
  position: absolute;
  top: 0;
  right: 0;
}
.item-index4 {
  width: 20px;
  height: 14px;
  background: #cccccc;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 7px 0px 0px 7px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 14px;
  position: absolute;
  top: 0;
  right: 0;
}
.isinfluencerInfoLi:hover .delDiv {
  display: block;
}
.InfluencerList {
  background-color: white;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.InfluencerList:hover {
  background: #f4f2ff;
}
.delDiv {
  display: none;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 35px;
  color: white !important;
  font-size: 12px;
  line-height: 6px;
  cursor: pointer;
}
</style>

<style>
.dialog-footer {
  display: flex;
  justify-content: center;
}

.elDialogDR {
  background: #f4f2ff;
  border-radius: 4px;
  padding: 14px;
  box-sizing: border-box;
}
.elDialogDR-p {
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #9e9d9d;
  line-height: 20px;
}

.el-icon-user-solid {
  color: white;
}
.influencerInfoUl {
  display: flex;
  justify-content: center;
}
.influencerInfoLi {
  /* width: 48px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 7px;
  position: relative;
  cursor: pointer;
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
.el-table__body-wrapper {
  padding: 0 20px;
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

.el-table__header-wrapper table {
  height: 46px;
  padding: 0 20px;
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
  top: 13px;
  left: 278px;
  cursor: pointer;
}
</style>

<style lang="less" scoped>
.video_dialog {
  .error_style {
    position: absolute;
    color: #f56c6c;
    font-size: 12px;
    bottom: -18px;
  }
  .form_item_title {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999999;
    line-height: 17px;
    margin-top: 5px;
    margin-bottom: 6px;
  }
  .item_check_style {
    display: flex;
    align-items: center;
    height: 32px;
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #666666;
    }
    .label_style {
      width: 48px;
      text-align: left;
      color: #666666;
      padding-top: 4px;
    }
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
  .video_ruleForm {
    padding-top: 10px;
    padding-right: 10px;
    margin: 0 12px;
    overflow: auto;
    position: relative;
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
      background: #d8d8d8;
    }
    .radio_style1 {
      background: rgba(131, 96, 255, 0.04);
      border: 1px solid rgba(131, 96, 255, 1);
      position: relative;
      &:before {
        content: url("../../assets/images/radio_style1_bg.png");
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
        content: url("../../assets/images/radio_style2_bg.png");
        display: block;
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
    }
    .description {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      padding-bottom: 10px;
      span {
        color: #ed4014;
      }
      a {
        font-weight: 400;
        color: #796cf3;
        text-decoration: none;
      }
    }
    .description2 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      padding-bottom: 10px;
      span {
        color: #796cf3;
      }
    }
    .candidate_list {
      padding-top: 6px;
      .list-group-item {
        position: relative;
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
            height: 100%;
            object-fit: cover;
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
      overflow: auto;
    }
  }
  .form_button {
    button {
      margin: auto;
      display: block;
      width: 140px;
      height: 32px;
      background: #cccccc linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
      border-radius: 16px;
      border: none;
      margin-top: 24px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
    }
  }
}
</style>

<style lang="less" scoped>
::v-deep .el-table .has-gutter .el-checkbox .el-checkbox__inner {
  display: none;
}

::v-deep .el-table .cell::before {
  content: "";
  text-align: center;
  line-height: 37px;
}
</style>

<style lang="less" scoped>
.navmenu {
  padding: 0 10px;
  background: #ffffff;
  height: 67px;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  box-sizing: border-box;
}
.RequirementBoxBanxin {
  width: 1200px;
  margin: 0 auto;
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
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .RequirementWenben-div2 {
      display: flex;
      .elIcon2 {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          margin-right: 5px;
        }
        a {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #796cf3;
          text-decoration: none;
        }
      }
    }
  }
  .RequirementBox-xinx {
    width: 180px;
    height: 60px;
    background: #000000;
    border-radius: 5px;
    position: absolute;
    top: -60px;
    left: 195px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #e4e4e4;
    padding: 9px 12px;
    box-sizing: border-box;
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

  .tableBtn {
    display: flex;
    justify-content: end;
    margin-top: 5px;
    .tableBtn1 {
      width: 200px;
      height: 46px;
      border-radius: 4px;
      border: 1px dashed #796cf3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      cursor: pointer;
      div {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #796cf3;
        margin-left: 5px;
      }
    }
    .tableBtn2 {
      width: 200px;
      height: 46px;
      border-radius: 4px;
      border: 1px solid #796cf3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      cursor: pointer;
      div {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #796cf3;
        margin-left: 5px;
      }
    }
  }
}
</style>