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
          <h1>填写产品及拍摄要求</h1>
          <p class="tiele">
            <span style="color: #ed4014">注</span
            >：请勿遗漏或填错，平台不接受事后补充/变更需求，亦不接受重拍/退款
          </p>

          <div class="formitem">
            <el-form :model="ruleForm" ref="ruleForm">
              <div class="formitem_div">
                <span class="formitem_span">*</span>
                <el-form-item label="产品名称" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="中文填写，注明变体或型号，例：女性连衣裙（红色）"
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
                      >有链接</el-radio
                    >
                    <el-radio v-model="formradioLink" label="2"
                      >无链接</el-radio
                    >
                  </div>
                  <el-input
                    v-model="ruleForm.link"
                    placeholder="请输入产品链接"
                    v-if="formradioLink == '1'"
                  ></el-input>

                  <div
                    style="display: flex; flex-direction: column; width: 100%"
                    v-else-if="formradioLink == '2'"
                  >
                    <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      :limit="5"
                      :file-list="fileList"
                      :on-change="upload_change"
                      :on-exceed="upload_exceed"
                    >
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{ file }">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url"
                          alt=""
                        />
                        <span class="el-upload-list__item-actions">
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
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                    <p style="font-size: 12px; margin-top: 10px; color: #999">
                      请上传图片，不超过5M，支持jpg/png
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
                      <span style="margin-right: 20px; color: #a06cf3"
                        >示例</span
                      >
                    </el-tooltip>

                    <el-radio
                      v-model="formradioRequirements"
                      label="2"
                      style="margin-right: 7px"
                      >红人自由发挥</el-radio
                    >
                    <span class="formitem_span1">交付较快</span>
                  </div>
                  <el-input
                    type="textarea"
                    maxlength="350"
                    v-model="ruleForm.ShootingRequirements"
                    :autosize="{ minRows: 7 }"
                    placeholder="1、简要描述视频要体现的要点，不超过3点
2、特殊情形/要求，请说明：
     ①. 产品特殊，如仅适配特定配件或型号
     ②. 要求特定场地的，如：汽车、泳池、海滩等
     ③. 要求小孩或宠物出境
     ④. 要求实际安装，真实使用并演示
     ⑤. 要求提供版权"
                    show-word-limit
                    v-if="formradioRequirements == 1"
                  ></el-input>

                  <div class="formitem_text" v-else>
                    <li>
                      <div></div>
                      红人将根据产品特点自由发挥拍摄，通常包括开箱演示+卖点讲解
                      <br />
                    </li>
                    <div style="font-size: 12px; margin: 0 0 0 11px">
                      +效果展示等内容，交付周期相对较短。
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
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>

            <div style="display: flex; justify-content: center; padding: 24px">
              <button
                @click="submitForm(ruleForm)"
                :class="{ ifsubmitbtn: ifsubmitbtn, submitbtn: true }"
              >
                确认
              </button>
            </div>
          </div>
        </div>
        <div class="Boundary">
          <span @click="addwidthVisble">模板填写</span>
          <div class="elicon" @click="addwidthVisble">
            <i class="el-icon-arrow-right" v-if="widthVisble == '500px'"></i>
            <i class="el-icon-arrow-left" v-else></i>
          </div>
        </div>
        <div class="box2" v-if="widthVisble == '900px'">
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
            <button class="btn1">一键填写</button>
            <button class="btn1" style="margin: 0 10px">清空</button>
            <button class="btn2">复制模板</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FillingRequirementsdialog",
  props: ["isFillingRequirementsdialogVisible"], //通过props接收父组件传递的值
  data() {
    return {
      widthVisble: "500px",
      ruleForm: {
        name: "",
        link: "",
        notes: "",
        ShootingRequirements: "",
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
    };
  },
  methods: {
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    upload_change: function (file, fileList) {
      //判断格式
      if (file.raw.type == "image/jpeg" || file.raw.type == "image/png") {
        // 判断 > 1M
        if (file.size > 5242880) {
          fileList.pop();
          let msg_size = `您上传的${file.name}，该文件大于5M，请您重新上传。`;
          this.$message.error(msg_size);
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
          return false;
        }
        this.fileList = JSON.parse(JSON.stringify(fileList));
        this.upload_List.push(file);
      } else {
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
        fileList.pop();
      }
    },
    //删除文件
    upload_remove(file) {
      this.upload_List.forEach((item, index) => {
        if (item.name == file.name) {
          this.upload_List.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      });
    },
    //超出上传的文件
    upload_exceed(files, fileList) {
      this.$message.error("您最多只能上传5个文件!");
    },

    beforeClose() {
      this.$emit("isFillingRequirementsdialogVisible", false);
    },
    addwidthVisble() {
      this.widthVisble == "500px"
        ? (this.widthVisble = "900px")
        : (this.widthVisble = "500px");
    },
    submitForm(formName) {
      if (this.ifsubmitbtn) {
        console.log(formName);
      }
    },
  },
  mounted() {},
  watch: {
    ruleForm: {
      handler(newVal, oldVal) {
        if (
          newVal.name != "" &&
          newVal.link != "" &&
          newVal.ShootingRequirements != ""
        ) {
          this.ifsubmitbtn = true;
          console.log(this.ifsubmitbtn);
        } else {
          this.ifsubmitbtn = false;
        }
        // 当obj发生变化时，这里的代码会被执行
      },
      immediate: true,
      deep: true, // 可以深度检测到 obj 对象的属性值的变化
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
  transition: all 0.3s !important;
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
    color: #999999;
  }
}
::v-deep(.el-input__inner:focus) {
  border-color: #d161f6;
}

::v-deep(.el-textarea__inner.el-textarea__inner) {
  background: #f8f8f8;
  border: 1px solid #eeeeee;
  font-size: 12px;
  padding: 12px;
  &::placeholder {
    color: #999999;
  }
}
::v-deep(.el-textarea__inner:focus) {
  border-color: #d161f6;
}

::v-deep(.el-form-item__content) {
  line-height: 0;
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
      margin-top: 30px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
    .tiele {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 4px;
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
    width: 12px;
    margin-right: 10px;
    span {
      cursor: pointer;
    }
    .elicon {
      cursor: pointer;
      margin-top: 6px;
      width: 12px;
      height: 12px;
      border: 1px solid #999999;
      border-radius: 50%;
      text-align: center;
      line-height: 12px;
      i {
        font-size: 12px;
      }
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
      width: 334px;
      height: 400px;
      background: #f8f8f8;
      border-radius: 4px;
      border: 1px solid #eeeeee;
      margin: 10px auto;
      #textarea {
        padding: 13px;
        height: 100%;
        width: 92%;
        resize: none;
        outline: none;
        border: none;
        background: #f8f8f8;
      }
      textarea::-webkit-input-placeholder {
        color: #999999;
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
</style>
