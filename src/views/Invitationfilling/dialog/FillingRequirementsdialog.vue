<template>
  <div>
    <el-dialog
      :visible.sync="isFillingRequirementsdialogVisible"
      :width="widthVisble"
      center
      :before-close="beforeClose"
      :close-on-click-modal="false"
    >
      <div class="dialog">
        <div class="box">
          <h1>{{ dialogTitle }}</h1>
          <p class="tiele">
            <span style="color: #ed4014">注</span
            >：请勿遗漏或填错，提交后不可再修改，平台不接受事后补充/变更需求
          </p>
          <div class="formitem">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <div class="formitem_div">
                <el-form-item label="产品名称" prop="name" class="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="中文填写，注明变体或型号，例：女性连衣裙（红色）"
                    :disabled="getstate != 0 && determine == 4"
                    ref="ruleForm"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="formitem_div">
                <span class="formitem_span">*</span>
                <el-form-item label="产品链接/图片" prop="link">
                  <div class="formitem_radio">
                    <el-radio
                      v-model="formradioLink"
                      label="1"
                      style="margin-right: 20px"
                      :disabled="getstate != 0 && determine == 4"
                      >有链接</el-radio
                    >
                    <el-radio
                      v-model="formradioLink"
                      label="2"
                      :disabled="getstate != 0 && determine == 4"
                      >无链接</el-radio
                    >
                  </div>
                  <el-input
                    v-model="ruleForm.link"
                    placeholder="请输入产品链接"
                    v-if="formradioLink == '1'"
                    :disabled="getstate != 0 && determine == 4"
                  ></el-input>

                  <div
                    style="display: flex; flex-direction: column; width: 100%"
                    v-else-if="formradioLink == '2'"
                  >
                    <el-upload
                      :action="localhost + '/api/common/upload'"
                      :headers="{ token: token }"
                      list-type="picture-card"
                      :limit="5"
                      :file-list="fileList"
                      :on-change="upload_change"
                      :on-exceed="upload_exceed"
                      :class="{ 'hide-upload-btn': hideUploadBtn }"
                      :disabled="getstate != 0 && determine == 4"
                      :on-success="handleAvatarSuccess"
                      :on-progress="handleAvatarProgress"
                    >
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{ file }">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url"
                          alt=""
                        />
                        <span
                          class="el-upload-list__item-actions"
                          v-if="getstate == 0 || determine != 4"
                        >
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="upload_remove(file)"
                          >
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                    </el-upload>
                    <p style="font-size: 12px; margin-top: 10px; color: #999">
                      {{ handletext }}
                    </p>
                  </div>
                </el-form-item>
              </div>

              <div class="formitem_div">
                <span class="formitem_span">*</span>
                <el-form-item label="拍摄要求" prop="ShootingRequirements">
                  <div class="formitem_radio">
                    <el-radio
                      v-model="formradioRequirements"
                      label="1"
                      style="margin-right: 10px"
                      :disabled="getstate != 0 && determine == 4"
                      >按要求拍摄</el-radio
                    >
                    <el-tooltip effect="dark" placement="right-start">
                      <div slot="content" class="content">
                        <p>视频要点：</p>
                        <p>1、展示儿童鞋子的包装、款式</p>
                        <p>2、重点讲解材质和做工，体现健康、环保、透气、舒适</p>
                        <p>3、需要展示鞋子的试穿效果，体现夜光效果</p>

                        <div style="height: 15px"></div>
                        <p>特殊说明：</p>
                        <p>1、需要2-12岁小孩试穿并出镜</p>
                        <p>2、需要提前吸光，才能体现夜光</p>
                        <p>3、需要提供版权</p>
                      </div>
                      <span
                        style="
                          margin-right: 20px;
                          color: #a06cf3;
                          font-size: 12px;
                        "
                        >示例</span
                      >
                    </el-tooltip>

                    <el-radio
                      v-model="formradioRequirements"
                      label="2"
                      style="margin-right: 7px"
                      :disabled="getstate != 0 && determine == 4"
                      >红人自由发挥</el-radio
                    >
                    <span class="formitem_span1">交付较快</span>
                  </div>
                  <el-input
                    type="textarea"
                    maxlength="350"
                    v-model="ruleForm.ShootingRequirements"
                    :autosize="{ minRows: 7, maxRows: 7 }"
                    resize="none"
                    placeholder="1、简要描述视频要体现的要点，不超过3点
2、特殊情形/要求，请说明：
     ①. 产品特殊，如仅适配特定配件或型号
     ②. 要求特定场地的，如：汽车、泳池、海滩等
     ③. 要求小孩或宠物出境
     ④. 要求实际安装，真实使用并演示
     ⑤. 要求提供版权"
                    show-word-limit
                    v-if="formradioRequirements == 1"
                    :disabled="getstate != 0 && determine == 4"
                  ></el-input>

                  <div class="formitem_text" v-else>
                    <li>
                      <div></div>
                      红人将根据产品特点自由发挥拍摄，通常包括开箱演示+卖点讲解
                      <br />
                    </li>
                    <div style="font-size: 12px; margin: 0 0 0 11px">
                      +效果展示等内容，交付周期相对较短
                    </div>
                    <li>
                      <div></div>
                      此模式下，<span style="font-weight: 600; color: #000"
                        >不可重拍或退款</span
                      >
                    </li>
                  </div>
                </el-form-item>
              </div>

              <div class="formitem_div">
                <span class="formitem_span" style="width: 6.38px"></span>
                <el-form-item label="敏感信息备注" prop="notes">
                  <el-input
                    v-model="ruleForm.notes"
                    placeholder="如涉及红人敏感信息请备注，如：要年轻漂亮的，不要胖子/瘦子/黑人"
                    :disabled="getstate != 0 && determine == 4"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>

            <div
              style="
                display: flex;
                justify-content: center;
                padding: 24px;
                width: 461px;
                box-sizing: border-box;
              "
            >
              <button
                @click="submitForm(ruleForm)"
                :class="{ ifsubmitbtn: ifsubmitbtn, submitbtn: true }"
                v-if="getstate == 0 || determine != 4"
              >
                {{ submitFormText }}
              </button>
              <button class="submitbtn" v-else>
                {{ submitFormText }}
              </button>
            </div>
          </div>
        </div>
        <div class="Boundary">
          <div class="xian" style="margin-bottom: 15px" v-show="ifxian">
            &ensp;
          </div>
          <span @click="addwidthVisble">模板填写</span>
          <i
            class="iconfont icon-anniu-jiantouxiangyou"
            @click="addwidthVisble"
            v-if="widthVisble == '500px'"
          ></i>
          <i
            class="iconfont icon-anniu_jiantouxiangzuo"
            @click="addwidthVisble"
            v-else
          ></i>
          <div class="xian" style="margin-top: 15px" v-show="ifxian">
            &ensp;
          </div>
        </div>
        <div class="box2" v-if="widthVisble == '900px'">
          <div v-show="ifwidthVisble">
            <h1>模板填写</h1>
            <div class="Fillinthetemplate">
              <textarea
                id="textarea"
                v-model="Fillinthetemplateval"
                placeholder="使用方法：
1、复制模板
2、按格式编辑内容
3、将内容粘贴到此区域
4、一键填写"
              ></textarea>
            </div>

            <div class="box2btns">
              <button
                :class="{ btn1: true, ifbtn1: ifbtn1 }"
                @click="OneClickFilling(Fillinthetemplateval)"
              >
                一键填写
              </button>
              <button
                :class="{ btn1: true, ifbtn1: ifbtn1 }"
                style="margin: 0 10px"
                @click="Fillinthetemplateval = ''"
              >
                清空
              </button>
              <button class="btn2" @click="handleCopy">复制模板</button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createOrder, needsPaste, needsEdit, orderEdit } from "@/api";
export default {
  name: "FillingRequirementsdialog",
  props: [
    "isFillingRequirementsdialogVisible",
    "reqsearch",
    "determine",
    "RequirementsList",
    "FillingRequirementid",
    "getstate",
  ], //通过props接收父组件传递的值
  data() {
    return {
      dialogTitle: "产品及拍摄要求",
      submitFormText: "确认",
      widthVisble: "500px",
      ruleForm: {
        name: "",
        link: "",
        notes: "",
        ShootingRequirements: "",
      },
      rules: {
        name: [
          { required: true, message: "请填写产品名称", trigger: "blur" },
          {
            max: 25,
            message: "长度在25个字符以内",
            trigger: "change",
          },
        ],
      },
      formradioLink: "1",
      formradioRequirements: "1",
      Fillinthetemplateval: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      upload_List: [],
      ifsubmitbtn: false,
      localhost: process.env.VUE_APP_BASE_URL,
      token: "",
      ifbtn1: true,
      ifwidthVisble: false,
      RequirementID: 0,
      objold: {},
      ifxian: false,
      hideUploadBtn: false,
      handletext: "请上传图片，不超过5M，支持jpg/png",
    };
  },
  methods: {
    handleAvatarProgress() {
      console.log("开始");
      this.handletext = "图片正在上传中......";
    },
    handleAvatarSuccess() {
      console.log("成功");
      this.handletext = "请上传图片，不超过5M，支持jpg/png";
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    upload_change: function (file, fileList) {
      if (file.raw.type == "image/jpeg" || file.raw.type == "image/png") {
        // 判断 > 5M
        if (file.size > 5242880) {
          fileList.pop();
          let msg_size = `图片过大，请重新上传`;
          this.$message.error(msg_size);
          setTimeout(() => {
            this.handletext = "请上传图片，不超过5M，支持jpg/png";
          }, 1000);
          return false;
        }
        // 判断重名文件
        let repeat_judge = this.fileList.find((item) => {
          return item.name == file.name;
        });
        if (repeat_judge) {
          fileList.pop();
          let msg_repeat = `您上传的${file.name}，该文件有重名文件，请您重新上传。`;
          this.$message.error(msg_repeat);
          setTimeout(() => {
            this.handletext = "请上传图片，不超过5M，支持jpg/png";
          }, 1000);
          return false;
        }
        if (file?.response?.code == 1) {
          this.upload_List.push(file);
          this.fileList = JSON.parse(JSON.stringify(fileList));
        } else if (file?.response?.code == 0) {
          fileList.pop();
          this.$message.error(file.response.msg);
          setTimeout(() => {
            this.handletext = "请上传图片，不超过5M，支持jpg/png";
          }, 1000);
          return false;
        }
      } else {
        this.$message.error("图片格式错误，请重新上传");
        setTimeout(() => {
          this.handletext = "请上传图片，不超过5M，支持jpg/png";
        }, 1000);
        fileList.pop();
      }

      if (fileList.length >= 5) {
        this.hideUploadBtn = true;
      } else {
        this.hideUploadBtn = false;
      }
    },

    //删除文件
    upload_remove(file) {
      this.upload_List.forEach((item, index) => {
        if (item.url == file.url) {
          this.upload_List.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      });

      setTimeout(() => {
        this.hideUploadBtn = false;
      }, 1000);
    },
    //超出上传的文件
    upload_exceed(files, fileList) {
      this.$message.error("您最多只能上传5个文件!");
    },

    beforeClose() {
      this.$emit("isFillingRequirementsdialogVisible", false);
    },
    addwidthVisble() {
      if (
        (this.widthVisble == "500px" && this.getstate == 0) ||
        (this.determine != 4 && this.widthVisble == "500px")
      ) {
        this.widthVisble = "900px";
        setTimeout(() => {
          this.ifwidthVisble = true;
          this.ifxian = true;
        }, 1000);
      } else {
        this.widthVisble = "500px";
        this.ifwidthVisble = false;
        this.ifxian = false;
      }
    },

    //修改拍摄要求
    async submitForm(formName) {
      if (this.ifsubmitbtn && this.determine == 1) {
        let image = [];
        this.upload_List.forEach((item) =>
          image.push(item.response.data.fullurl)
        );
        let str = image.join(",");
        let data = {
          url: formName.link,
          description: formName.notes,
          title: formName.name,
          photograph_guide: this.formradioRequirements,
          if_product_link: this.formradioLink,
          photograph_demand: formName.ShootingRequirements,
          image: str,
          id: this.FillingRequirementid,
          source: 1,
          auth: localStorage.getItem("said"),
        };
        const res = await needsEdit(data);
        if (res.code == 1) {
          this.beforeClose();
          this.reqsearch();
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.ifsubmitbtn && this.determine == 2) {
        let image = [];
        this.upload_List.forEach((item) => {
          if (item.response) {
            image.push(item.response.data.fullurl);
          } else {
            image.push(item.url);
          }
        });
        let str = image.join(",");
        // console.log(image);
        let data = {
          id: this.RequirementID,
          title: formName.name,
          url: formName.link,
          description: formName.notes,
          if_product_link: this.formradioLink,
          photograph_guide: this.formradioRequirements,
          photograph_demand: formName.ShootingRequirements,
          image: str,
          source: 1,
          auth: localStorage.getItem("said"),
        };
        const res = await needsEdit(data);
        if (res.code == 1) {
          this.beforeClose();
          this.reqsearch();
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.ifsubmitbtn && this.determine * 1 == 3) {
        if (
          this.objold.description == formName.notes &&
          this.objold.url == formName.link &&
          this.objold.title == formName.name &&
          this.objold.photograph_guide == this.formradioRequirements &&
          this.objold.if_product_link == this.formradioLink &&
          this.objold.photograph_demand == formName.ShootingRequirements
        ) {
          this.ifsubmitbtn = false;

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
                "请修改后保存"
              ),
            ]),
            iconClass: "iconfont",
            offset: 140,
            customClass: "customClasssuccess",
          });
          return;
        } else {
          let image = [];
          this.upload_List.forEach((item) => {
            if (item.response) {
              image.push(item.response.data.fullurl);
            } else {
              image.push(item.url);
            }
          });
          let str = image.join(",");

          let url = new URL(window.location.href);
          let needs = url.searchParams.get("needs");

          let data = {
            url: formName.link,
            description: formName.notes,
            title: formName.name,
            photograph_guide: this.formradioRequirements,
            if_product_link: this.formradioLink,
            photograph_demand: formName.ShootingRequirements,
            image: str,
            source: 1,
            url_mark: needs,
            auth: localStorage.getItem("said"),
          };
          const res = await createOrder(data);
          if (res.code == 1) {
            this.beforeClose();
            this.reqsearch();
            let num = localStorage.getItem("addnum") - 1;
            if (num <= 0) num = 0;
            localStorage.setItem("addnum", num);
          } else {
            this.$message.error(res.msg);
          }
        }
      } else if (this.ifsubmitbtn && this.determine == 4) {
        let image = [];
        this.upload_List.forEach((item) =>
          image.push(item.response?.data.fullurl || item.url)
        );
        let str = image.join(",");
        let data = {
          url: formName.link,
          description: formName.notes,
          title: formName.name,
          photograph_guide: this.formradioRequirements,
          if_product_link: this.formradioLink,
          photograph_demand: formName.ShootingRequirements,
          image: str,
          id: this.FillingRequirementid,
        };
        const res = await orderEdit(data);
        if (res.code == 1) {
          this.reqsearch();
          this.beforeClose();
        } else {
          this.$message.error(res.msg);
        }
      }
    },

    // 一键复制
    handleCopy() {
      // 假设你要复制的内容在一个名为content的变量中
      let content = `【产品名称】
 儿童滑轮鞋（带夜光）
//产品中文名+（变体/型号）//


【产品链接】
https://www.amazon.com/gp/product/B0C3375GZL?m=A1LDY0ENXBBJ38&th=1
//没有链接则不填//


【拍摄要求】
视频要点1：展示儿童鞋子的包装、款式...
视频要点2：重点讲解材质和做工，体现健康、环保、透气、舒适...
视频要点3：需要展示鞋子的试穿效果，体现夜光效果...

特殊说明1：需要2-12岁小孩试穿并出镜...
特殊说明2：需要提前吸光，才能体现夜光...
特殊说明3：需要提供版权...

//视频要点+特殊说明//

【敏感信息备注】
 不要肥胖及银色头发的...

//不便直接传达给红人的敏感信息//`;

      // 创建一个textarea元素
      let textarea = document.createElement("textarea");

      // 将要复制的内容设置为textarea的值
      textarea.value = content;

      // 将textarea添加到DOM中
      document.body.appendChild(textarea);

      // 选择textarea中的文本
      textarea.select();

      // 执行复制命令
      document.execCommand("copy");

      // 从DOM中移除textarea
      document.body.removeChild(textarea);
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },

    //一键填写
    async OneClickFilling(text) {
      if (text.length > 50) {
        const res = await needsPaste({ str: text });
        if (res.code == 1) {
          this.ruleForm.name = res.data.name;
          this.ruleForm.link = res.data.link;
          this.ruleForm.ShootingRequirements = res.data.request?.replace(
            /\\n/g,
            "\n"
          );
          this.ruleForm.notes = res.data.desc?.replace(/\\n/g, "\n");
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.$message.error("解析失败");
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
  watch: {
    ruleForm: {
      handler(newVal, oldVal) {
        if (
          newVal.name != "" &&
          newVal.link != "" &&
          newVal.ShootingRequirements != ""
        ) {
          this.ifsubmitbtn = true;
        } else if (
          newVal.name != "" &&
          this.upload_List.length != 0 &&
          this.formradioRequirements != "1"
        ) {
          this.ifsubmitbtn = true;
        } else if (
          newVal.name != "" &&
          newVal.link != "" &&
          this.formradioRequirements != "1"
        ) {
          this.ifsubmitbtn = true;
        } else if (
          newVal.name != "" &&
          this.upload_List.length != 0 &&
          newVal.ShootingRequirements != ""
        ) {
          this.ifsubmitbtn = true;
        } else {
          this.ifsubmitbtn = false;
        }

        if (this.determine == 3) {
          if (
            newVal.name == this.RequirementsList.title &&
            newVal.link == this.RequirementsList.url &&
            newVal.ShootingRequirements ==
              this.RequirementsList.photograph_demand &&
            newVal.notes == this.RequirementsList.description
          )
            this.ifsubmitbtn = false;
        }
        // 当obj发生变化时，这里的代码会被执行
      },
      immediate: true,
      deep: true, // 可以深度检测到 obj 对象的属性值的变化
    },
    upload_List(newval) {
      if (newval.length >= 5) {
        this.hideUploadBtn = true;
        // console.log(newval, this.hideUploadBtn);
      } else {
        this.hideUploadBtn = false;
      }

      if (
        (this.formradioLink == "2" &&
          newval.length != 0 &&
          this.ruleForm.name != "" &&
          this.formradioRequirements == "2") ||
        (this.formradioLink == "2" &&
          newval.length != 0 &&
          this.ruleForm.name != "" &&
          this.ruleForm.ShootingRequirements != "")
      ) {
        this.ifsubmitbtn = true;
      } else {
        this.ifsubmitbtn = false;
      }
    },
    formradioRequirements(newval) {
      if (
        newval == "2" &&
        this.ruleForm.name != "" &&
        this.ruleForm.link != ""
      ) {
        this.ifsubmitbtn = true;
      } else if (
        newval == "2" &&
        this.ruleForm.name != "" &&
        this.upload_List.length != 0
      ) {
        this.ifsubmitbtn = true;
      } else if (this.ruleForm.ShootingRequirements == "") {
        this.ifsubmitbtn = false;
      }

      if (this.determine == 3) {
        if (
          this.ruleForm.name == this.RequirementsList.title &&
          this.ruleForm.link == this.RequirementsList.url &&
          this.ruleForm.notes == this.RequirementsList.description &&
          this.RequirementsList.photograph_guide == newval
        )
          this.ifsubmitbtn = false;
      }
    },
    Fillinthetemplateval(newval) {
      newval != "" ? (this.ifbtn1 = false) : (this.ifbtn1 = true);
    },
    determine(newval) {
      if (newval === 3) {
        setTimeout(() => {
          this.ifsubmitbtn = false;
          this.dialogTitle = "复制成功，请修改后保存";
          this.submitFormText = "保存";
        }, 100);
      } else {
        this.submitFormText = "确认";
        this.dialogTitle = "产品及拍摄要求";
      }
    },
    RequirementsList(newval) {
      if (newval.length != 0) {
        this.objold = newval;
        this.RequirementID = newval.id;
        this.ruleForm.name = newval.title;
        this.ruleForm.link = newval.url;
        this.ruleForm.notes = newval.description;
        this.ruleForm.ShootingRequirements = newval.photograph_demand;
        this.formradioLink = newval.if_product_link + "";
        this.formradioRequirements = newval.photograph_guide + "";
        if (newval.image.length != 0 && Array.isArray(newval.image)) {
          this.fileList = newval.image.map((item) => ({ ["url"]: item }));
          this.upload_List = newval.image.map((item) => ({ ["url"]: item }));
        } else {
          if (newval.image != "") {
            let arr = newval.image.split(",");
            this.fileList = arr.map((item) => ({ ["url"]: item }));
            this.upload_List = arr.map((item) => ({ ["url"]: item }));
          }
        }
      }
    },
    isFillingRequirementsdialogVisible(newval) {
      if (newval == false) {
        this.upload_List == [];
        this.formradioLink = "1";
        this.formradioRequirements = "1";
        this.ruleForm.name = "";
        this.ruleForm.link = "";
        this.ruleForm.notes = "";
        this.ruleForm.ShootingRequirements = "";
        this.widthVisble = "500px";
        this.ifwidthVisble = false;
        this.Fillinthetemplateval = "";
        this.rules.name[0].required = false;
        this.ifxian = false;
        this.fileList = [];
        this.upload_List = [];
        this.$nextTick(() => {
          this.$refs["ruleForm"].fields[0].validateMessage = "";
          this.$refs["ruleForm"].fields[0].validateState = "";
        });
      } else {
        this.rules.name[0].required = true;
      }
    },
    formradioLink(newval) {
      if (newval == 1) {
        this.fileList = [];
        this.upload_List.forEach((item) => {
          if (item.response) {
            this.fileList.push({ ["url"]: item.response.data.url });
          } else {
            this.fileList.push({ ["url"]: item.url });
          }
        });
        this.upload_List = this.fileList;
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep(.el-dialog--center .el-dialog__body) {
  padding: 0;
}

::v-deep(.el-dialog__header) {
  padding-top: 0 !important;
}

::v-deep(.el-dialog__headerbtn) {
  z-index: 1000;
}

::v-deep(.el-dialog) {
  transition: all 1s !important;
}

::v-deep(.el-form-item) {
  margin-bottom: 0px;
  flex: 1;
}

::v-deep(.el-form-item__label) {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

::v-deep(.el-input__inner) {
  height: 32px !important;
  background: #f8f8f8;
  border: 1px solid #eeeeee;
  font-size: 12px;
  padding: 0 12px;
  &::placeholder {
    color: rgb(194, 194, 194); /* 谷歌 */
  }
}

::v-deep(.el-input__inner:focus) {
  border-color: #d161f6;
}

::v-deep(.el-textarea__inner) {
  background: #f8f8f8;
  border: 1px solid #eeeeee;
  font-size: 12px;
  padding: 12px;
  &::placeholder {
    color: rgb(194, 194, 194); /* 谷歌 */
  }
}
::v-deep(.el-textarea__inner:focus) {
  border-color: #d161f6;
}

::v-deep(.el-form-item__content) {
  line-height: 0;
  width: 397px;
}

::v-deep(.name) {
  .el-input {
    padding-left: 9px;
  }
}

::v-deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #d161f6;
  background: #d161f6;
}

::v-deep(.el-radio__inner:hover) {
  border-color: #d161f6;
}

::v-deep(.el-radio__label) {
  padding-left: 5px;
}

::v-deep(.el-radio) {
  color: #333333;
  font-weight: 400;
}

::v-deep(.el-textarea .el-input__count) {
  bottom: 15px;
}

::v-deep(.el-button--primary) {
  width: 140px;
  height: 32px;
  line-height: 0.5px;
}

::v-deep(.el-upload--picture-card) {
  width: 62px;
  height: 60px;
  line-height: 67px;
  border: 1px solid #eeeeee;
  transition: all 0.3s;
}

::v-deep(.el-upload--picture-card:hover) {
  border-color: #d161f6;
}
::v-deep(.el-upload--picture-card:focus) {
  border-color: #eee;
}

::v-deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 62px;
  height: 60px;
}

.hide-upload-btn {
  ::v-deep(.el-upload--picture-card) {
    display: none;
  }
}

::v-deep(.el-form-item__error) {
  margin-left: 10px;
}
</style>

<style lang="less" scoped>
.dialog {
  display: flex;
  background: #fff !important;
  border-radius: 20px;
  .box {
    flex: 1;
    padding-left: 22px;
    h1 {
      text-align: center;
      margin-top: 28px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      width: 461px;
    }
    .tiele {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 4px;
      width: 461px;
    }
    .formitem {
      margin-top: 10px;
      .formitem_div {
        margin-bottom: 10px;
        display: flex;
        padding: 0 24px;
        .formitem_span {
          margin-top: 10px;
          margin-right: 4px;
          color: #ed4014;
        }
        .formitem_radio {
          margin-top: 13px;
          .formitem_span1 {
            background: rgba(0, 214, 131, 0.1);
            border-radius: 2px;
            color: #00d683;
            font-size: 12px;
          }
        }

        .formitem_text {
          height: 92px;
          width: 365px;
          background: #f8f8f8;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 14px;
          li {
            display: flex;
            align-items: center;
            color: #666666;
            font-size: 12px;
            div {
              width: 5px;
              height: 5px;
              background: #666666;
              border-radius: 50%;
              margin-right: 6px;
            }
          }
        }
      }
      .submitbtn {
        width: 140px;
        height: 32px;
        background: #cccccc;
        border-radius: 5px;
        border: none;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
      }
      .ifsubmitbtn {
        background: #d161f6 !important;
      }
    }
  }
  .Boundary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 12px;
    margin-right: 5px;
    color: #b6b6b6;
    .xian {
      flex: 1;
      border-left: 1px dashed #ccc;
    }
    span {
      cursor: pointer;
      margin-right: 8px;
      font-size: 12px;
      transition: all 0.3s;
    }

    span:hover {
      color: #333;
    }
    i {
      cursor: pointer;
      font-size: 20px;
      color: #b6b6b6;
      margin-right: 8px;
      transition: all 0.3s;
    }
  }
  .box2 {
    width: 400px;
    h1 {
      font-weight: 600;
      color: #333333;
      margin-top: 74px;
      text-align: center;
      font-size: 14px;
    }
    .Fillinthetemplate {
      width: 350px;
      height: 400px;
      background: #f8f8f8;
      border-radius: 4px;
      border: 1px solid #eeeeee;
      margin: 10px auto;
      overflow: auto;
      #textarea {
        padding: 13px;
        height: 92%;
        width: 92%;
        resize: none;
        outline: none;
        border: none;
        background: #f8f8f8;
      }
      textarea::-webkit-input-placeholder {
        color: rgb(194, 194, 194); /* 谷歌 */
        font-size: 12px;
      }
    }
    .box2btns {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      button {
        border: none;
        background: none;
        width: 80px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
      .btn1 {
        background: #d161f6;
        color: #fff;
        transition: all 0.3s;
      }

      .ifbtn1 {
        background: #cccccc !important;
      }
      .btn2 {
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #ececec;
        color: #666666;
      }
    }
  }
}
</style>

<style scoped>
.content > p {
  margin-bottom: 7px;
  color: #e4e4e4 !important;
}
.el-upload-list__item-delete {
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>
