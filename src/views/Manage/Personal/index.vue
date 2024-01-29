<template>
  <div id="personal" :style="{ height: boxHeight + 'px' }">
    <h5 class="title">个人资料</h5>
    <div class="content" :style="{ height: contentHeight + 'px' }">
      <div class="content_row">
        <div class="avatar" @mouseout="avatarHide = false" @mouseover="avatarHide = true">
          <div><img :src="avatar" alt="" /></div>
          <div v-show="avatarHide" class="editor_avatar">
            <el-upload :action="localhost + '/api/user/avatar'" ref="rebateUpload" :headers="{ token: token }"
              list-type="picture-card" :on-success="handleSuccess" :on-error="handleError">
              <span>修改头像</span>
              <div slot="file">
                <img class="el-upload-list__item-thumbnail" :src="avatar" alt="" />
              </div>
            </el-upload>
          </div>
          <p>我的头像</p>
        </div>
        <div class="user_info">
          <p>账号信息</p>
          <ul>
            <li>
              <label>账号</label>{{ userInfo.mobile || userInfo.email }}<span @click="editPhoneDialog = true">修改</span>
            </li>
            <li v-if="userInfo.isbind === 1">
              <label>微信</label>已绑定<span @click="unbindWeChatDialog = true">解绑</span>
            </li>
            <li v-else>
              <label>微信</label>未绑定<span @click="
                bindWechatDialog = true;
              handlerGetQrCode();
              ">绑定</span>
            </li>
          </ul>
          <p>
            基础信息<i></i><span style="cursor: pointer" @click="isEdit = false">编辑</span>
          </p>
          <el-form ref="form" :model="form" label-position="left" :disabled="isEdit" class="form_box" label-width="76px">
            <el-form-item label="公司名称">
              <el-input size="small" v-model="userInfo.company" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="公司规模">
              <el-select v-model="userInfo.company_size" size="small" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in companySizeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在地">
              <v-distpicker :disabled="isEdit" :province="userInfo.province_code" :city="userInfo.city_code"
                :area="userInfo.area_code" @province="getProvince" @city="getCity" @area="getArea"></v-distpicker>
            </el-form-item>
            <el-form-item label="职位">
              <el-input size="small" v-model="userInfo.position" placeholder="请输入职位"></el-input>
            </el-form-item>
          </el-form>
          <div v-if="!isEdit">
            <el-button class="save_btn" @click="handleEditUserInfo">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--解绑微信-->
    <el-dialog title="解绑微信" :visible.sync="unbindWeChatDialog" :close-on-click-modal="false" width="300px"
      class="dialog_style" center>
      <div style="padding-top: 10px">
        <p>解绑后，将不再支持微信扫码登录</p>
        <div class="button_box">
          <el-button class="cancel_style" @click="unbindWeChatDialog = false">取消</el-button>
          <el-button class="confirm_style" @click="handleUnBindWeChat">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!--修改账号-->
    <el-dialog title="修改账号" :visible.sync="editPhoneDialog" :close-on-click-modal="false" width="388px"
      class="dialog_style" center>
      <div style="padding-top: 10px">
        <el-form :model="editPhoneForm" size="small" :rules="editPhoneRules" class="demo-ruleForm" label-width="86px"
          label-position="left">
          <el-form-item prop="phone" label="新账号">
            <el-input v-model="editPhoneForm.phone" placeholder="请输入新手机号/邮箱" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode" label="验证码">
            <el-input v-model="editPhoneForm.verificationCode" placeholder="请输入验证码">
              <el-button type="text" slot="append" @click="handlerSend"
                :style="{ color: isDisabled ? '#999999' : '#796CF3' }" :disabled="isDisabled">
                {{ verificationCodeText }}
              </el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="button_box">
          <el-button class="confirm_style" @click="handleUpdateAccount">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!--手机绑定成功-->
    <el-dialog :visible.sync="updatePhoneDialog" :close-on-click-modal="false" width="260px" class="dialog_style" center>
      <div slot="title">
        <i style="color: rgba(2, 181, 120, 1); font-size: 20px" class="el-icon-success"></i>
        手机绑定成功
      </div>
      <div>
        <p>您可使用微信扫码登录了</p>
        <div class="button_box">
          <el-button class="confirm_style">我知道了</el-button>
        </div>
      </div>
    </el-dialog>
    <!--绑定微信-->
    <el-dialog :close-on-click-modal="false" title="请用微信扫码进行绑定" :visible.sync="bindWechatDialog" width="328px"
      class="dialog_style" @close="handleClose" center>
      <div>
        <p class="bind_wechat_description">
          绑定后即可使用微信扫码登录，更便捷
        </p>
        <div class="wechat_box">
          <span class="bottom_left"></span>
          <span class="bottom_right"></span>
          <img :src="qrImg" alt="" />
          <div id="refreshQrcode" v-if="isRefresh" @click="handlerGetQrCode">
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
              ">
              <div>
                <i class="el-icon-refresh-right" style="display: block; text-align: center"></i>
                <span>点击刷新</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInfo,
  smsSend,
  userProfile,
  updateAccount,
  unBindWechat,
  bindWechat,
  checkBindWechat,
} from "@/api";
import VDistpicker from "v-distpicker";
import { mapMutations } from "vuex";

export default {
  name: "personal",
  data() {
    const validatePhone = (rule, value, callback) => {
      const EamiregExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const PhoneregExp = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
      if (PhoneregExp.test(value) || EamiregExp.test(value)) {
        this.isDisabled = false;
        this.phoneError = false;
        callback();
      } else {
        callback(new Error("账号格式错误，请输入正确的账号！"));
        this.isDisabled = true;
        this.phoneError = true;
      }
    };
    const validateVerificationCode = (rule, value, callback) => {
      const regExp = /^[0-9]{4}$/;
      if (!regExp.test(value)) {
        this.codeError = true;
        callback(new Error("验证码格式错误，请输入正确的验证码！"));
      } else {
        this.codeError = false;
        callback();
      }
    };
    return {
      localhost: process.env.VUE_APP_BASE_URL,
      token: "",
      bindWechatDialog: false,
      updatePhoneDialog: false,
      isRefresh: false,
      checkQrCode: "",
      wechatToken: "",
      editPhoneForm: {
        phone: "",
        verificationCode: "",
      },
      verificationCodeText: "获取验证码",
      isDisabled: true,
      editPhoneDialog: false,
      unbindWeChatDialog: false,
      boxHeight: document.documentElement.clientHeight - 88,
      contentHeight: document.documentElement.clientHeight - 250,
      avatarHide: false,
      isEdit: true,
      companySizeOptions: [
        {
          value: "1",
          label: "1~10",
        },
        {
          value: "2",
          label: "11~30",
        },
        {
          value: "3",
          label: "31~50",
        },
        {
          value: "4",
          label: "51~100",
        },
        {
          value: "5",
          label: "101~200",
        },
        {
          value: "6",
          label: "200以上",
        },
      ],
      form: {},
      editPhoneRules: {
        phone: [
          { required: true, message: "请输入账号！", trigger: "change" },
          { validator: validatePhone, trigger: ["change"] },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { validator: validateVerificationCode, trigger: ["change"] },
        ],
      },
      userInfo: {},
      avatar: localStorage.getItem("avatar"),
      qrImg: "",
    };
  },
  components: {
    VDistpicker,
  },
  computed: {
    avatarFn() {
      return this.$store.state.login.avatar;
    },
  },
  watch: {
    avatarFn(newVal) {
      this.avatar = newVal;
      this.$forceUpdate(); // 更新数据
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.getUserInfo();
  },
  methods: {
    ...mapMutations("login", ["setAvatar", "setUserInfo"]),
    //获取用户信息
    getUserInfo() {
      getUserInfo()
        .then((res) => {
          if (res.code === 1) {
            this.userInfo = res.data;
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.setUserInfo(JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //上传头像成功
    handleSuccess(response, file, fileList) {
      localStorage.setItem("avatar", response.data.fullurl);
      this.setAvatar(localStorage.getItem("avatar"));

      console.log(this.$store.state);
    },
    //上传头像失败
    handleError(err, file, fileList) {
      this.$message.error("上传头像失败！");
    },
    getProvince(e) {
      this.userInfo.province = e.value;
      this.userInfo.province_code = e.code;
      this.userInfo.city = undefined;
      this.userInfo.city_code = undefined;
      this.userInfo.area = undefined;
      this.userInfo.area_code = undefined;
    },
    getCity(e) {
      this.userInfo.city = e.value;
      this.userInfo.city_code = e.code;
      this.userInfo.area = undefined;
      this.userInfo.area_code = undefined;
    },
    getArea(e) {
      this.userInfo.area = e.value;
      this.userInfo.area_code = e.code;
    },
    //更新基础信息
    handleEditUserInfo() {
      userProfile({
        company: this.userInfo.company,
        company_size: this.userInfo.company_size,
        province: this.userInfo.province,
        city: this.userInfo.city,
        area: this.userInfo.area,
        province_code: this.userInfo.province_code,
        city_code: this.userInfo.city_code,
        area_code: this.userInfo.area_code,
        position: this.userInfo.position,
      })
        .then((res) => {
          if (res.code === 1) {
            this.isEdit = true;
            this.$message.success("更新成功！");
            this.getUserInfo();
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //检测二维码是否扫码成功
    handleCheckQr() {
      var timer = 0;
      let _this = this;
      let form = new FormData();
      form.append("wechat_token", _this.wechatToken);
      _this.checkQrCode = setInterval(() => {
        checkBindWechat(form)
          .then((res) => {
            if (res.code === 0) {
              //二维码已失效
              _this.isRefresh = true;
              //清除定时脚本
              clearInterval(_this.checkQrCode);
            }
            if (res.code === 1 && res.data.status === 0) {
              //请等待扫码
              timer++;
              if (timer > 60) {
                //等待扫码,超过3分钟未扫描，二维码提示已过期
                _this.isRefresh = true;
                //清除定时脚本
                clearInterval(_this.checkQrCode);
              }
            } else if (res.code === 1 && res.data.status === 1) {
              //绑定微信成功
              this.userInfo.isbind = 1;
              //清除定时脚本
              clearInterval(_this.checkQrCode);
              _this.bindWechatDialog = false;
              this.$message.success("绑定成功！");
            } else if (res.code === 1 && res.data.status === 2) {
              clearInterval(_this.checkQrCode);
              _this.bindWechatDialog = false;
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      }, 3000);
    },
    //清除定时器
    handleClose() {
      clearInterval(this.checkQrCode);
    },
    //发送验证码
    handlerSend() {
      if (this.verificationCodeText == '获取验证码') {
        this.verificationCodeText = '--'
        smsSend({
          account: this.editPhoneForm.phone,
          event: "changeaccount",
        })
          .then((res) => {
            if (res.code == 1) {
              let timeo = 30;
              let _this = this;
              let timeStop = setInterval(function () {
                timeo--;
                if (timeo > 0) {
                  _this.verificationCodeText = timeo + "s后重新获取";
                } else {
                  timeo = 30;
                  _this.verificationCodeText = "获取验证码";
                  clearInterval(timeStop);
                }
              }, 1000);
            } else {
              this.verificationCodeText = "获取验证码";
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      }


    },
    //修改手机号
    handleUpdateAccount() {
      updateAccount({
        account: this.editPhoneForm.phone,
        captcha: this.editPhoneForm.verificationCode,
      })
        .then((res) => {
          if (res.code === 1) {
            this.$message.success("修改成功！");
            this.editPhoneDialog = false;
            this.getUserInfo()
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //解绑微信
    handleUnBindWeChat() {
      unBindWechat()
        .then((res) => {
          if (res.code === 1) {
            this.$message.success("微信解绑成功！");
            this.unbindWeChatDialog = false;
            this.getUserInfo();
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    //绑定微信
    handlerGetQrCode() {
      bindWechat()
        .then((res) => {
          if (res.code === 1) {
            this.qrImg = res.data.qrcode_url;
            this.wechatToken = res.data.wechat_token;
            this.isRefresh = false;
            this.handleCheckQr();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
  },
};
</script>
<style lang="less">
#personal {
  select:disabled {
    background-color: #f5f7fa;
  }

  .distpicker-address-wrapper select {
    padding: 5px 10px;
    height: auto;
    font-size: 14px;
  }

  .el-upload--picture-card {
    background: none;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    line-height: 120px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    transition: none;

    >div {
      height: 100%;
    }
  }

  .form_box {
    width: 570px;
    padding-left: 20px;

    .el-form-item__content {
      display: flex;
    }

    .el-form-item {
      margin-bottom: 6px;
    }

    .el-form-item__label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }

  .el-input-group__append {
    background: none;
    padding: 0 30px;
    width: 29px;
    height: 30px;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 31px;
    border: none;
  }
}
</style>
<style lang="less" scoped>
#personal {
  background: #f5f7f9;
  padding: 20px 30px 0 30px;

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
    background: #ffffff;
    padding: 26px 30px 20px 30px;
    border: 1px solid #eeeeee;
  }

  .content {
    background: #ffffff;
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #eeeeee;
    padding: 39px 70px;
    border-top: none;

    .content_row {
      display: flex;
      justify-content: center;

      .avatar {
        position: relative;
        width: 120px;
        margin-right: 60px;
        flex-shrink: 0;
        height: 120px;

        >div {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        >p {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 20px;
          margin-top: 10px;
          text-align: center;
        }

        .editor_avatar {
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.6);
          text-align: center;
          line-height: 120px;
        }
      }

      .user_info {
        p {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 20px;
          position: relative;
          padding-left: 12px;
          margin-bottom: 22px;

          &:before {
            position: absolute;
            content: "";
            width: 2px;
            height: 12px;
            left: 0;
            top: 50%;
            margin-top: -6px;
            background: #333333 linear-gradient(233deg, #776cf3 0%, #ea5ef7 100%);
            border-radius: 1px;
          }

          i {
            display: inline-block;
            width: 470px;
            height: 1px;
            background: #eeeeee;
            margin: 0 12px 4px 12px;
          }

          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #796cf3;
            line-height: 20px;
          }
        }

        ul {
          padding-bottom: 18px;

          li {
            display: flex;
            padding-left: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
            padding-bottom: 14px;

            label {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 20px;
              margin-right: 20px;
              display: inline-block;
              width: 56px;
              flex-shrink: 0;
            }

            span {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #796cf3;
              line-height: 20px;
              padding: 0 10px;
              cursor: pointer;
            }
          }
        }

        .save_btn {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
          border-radius: 16px;
          padding: 9px 46px;
          border: none;
          display: block;
          margin: auto;
          margin-top: 16px;
        }
      }
    }
  }

  .dialog_style {
    p {
      text-align: center;
      line-height: 24px;
      color: #666666;
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

      .confirm_style {
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
      }
    }

    .bind_wechat_description {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999999;
      line-height: 17px;
      padding-bottom: 22px;
    }

    .wechat_box {
      position: relative;
      width: 220px;
      height: 220px;
      border: 1px solid #eeeeee;
      margin: auto;
      //padding: 7px;
      margin-bottom: 15px;

      img {
        width: 100%;
        height: 100%;
      }

      >span {
        display: block;
        width: 7px;
        height: 7px;
        position: absolute;
        bottom: -1px;
      }

      &:after {
        position: absolute;
        top: -1px;
        left: -1px;
        content: "";
        width: 7px;
        height: 7px;
        border-left: 1px solid #333333;
        border-top: 1px solid #333333;
      }

      &:before {
        position: absolute;
        top: -1px;
        right: -1px;
        content: "";
        width: 7px;
        height: 7px;
        border-right: 1px solid #333333;
        border-top: 1px solid #333333;
      }

      .bottom_left {
        left: 0;
        border-left: 1px solid #333333;
        border-bottom: 1px solid #333333;
      }

      .bottom_right {
        right: 0;
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
      }

      #refreshQrcode {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        cursor: pointer;

        i {
          font-size: 40px;
        }

        span {
          display: block;
          margin-top: 4px;
        }
      }
    }
  }
}


::v-deep(.el-input-group--append .el-input__inner) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
