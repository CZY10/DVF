<template>
  <div>
    <div class="header">
      <el-menu :default-active="$route.path" class="el-menu-demo" router mode="horizontal" active-text-color="#ffffff"
        text-color="#666666">
        <el-menu-item index="/" style="width: 237px"><img src="@/assets/images/home/logo.webp" alt="" /></el-menu-item>

        <el-menu-item style="float: right" @click="dialogVisible = true">加群交流</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <el-row class="content_bg">
        <el-col :span="16" class="left"></el-col>
        <el-col :span="8" class="right"></el-col>
      </el-row>
      <el-row class="content_body">
        <el-col :span="12" class="left">
          <div class="content_img">
            <img id="img" src="../../assets/images/login_banner.webp" alt="" />
          </div>
        </el-col>

        <el-col :span="12" class="right max_right" v-if="isone">
          <div class="tabs" v-if="!hasBindPhone">
            <div class="myElementOut">
              <h3>注册/登录</h3>
              <p class="description">未注册时，首次登录系统将自动为您注册</p>
              <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane label="微信扫码" name="first">
                  <div class="qrcode" v-loading="loading" element-loading-custom-class="qrcodeloaging">
                    <span class="top"></span><span class="bottom"></span><span class="left"></span><span
                      class="right"></span>
                    <img :src="qrImg" alt="" />
                    <div id="refreshQrcode" v-if="isRefresh" @click="handleRefresh">
                      <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                      ">
                        <div>
                          <i class="el-icon-refresh-right"></i>
                          <span>点击刷新</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="手机验证码" name="second">
                  <el-form :model="ruleForm" :rules="bindPhoneRules" class="demo-ruleForm">
                    <el-form-item prop="phone">
                      <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="verificationCode">
                      <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" class="noborder"
                        @keyup.enter.native="handleSubmitForm('ruleForm')">
                        <el-button slot="append" @click="handlerSend('mobilelogin')"
                          :style="{ color: isDisabled ? '#999999' : '#D161F6' }" :disabled="isDisabled" type="text">
                          {{ verificationCodeText }}
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="submit_btn" :class="{ disabled_opacity: phoneError || codeError }"
                        :disabled="phoneError || codeError" @click="handleSubmitForm('ruleForm')" round>确认</el-button>
                    </el-form-item>
                  </el-form>

                </el-tab-pane>

                <el-tab-pane label="账号密码" name="accountpassword">
                  <el-form :model="accountPasswordForm" :rules="accountPasswordRules" class="demo-ruleForm">
                    <el-form-item prop="accountVal">
                      <el-input v-model="accountPasswordForm.accountVal" placeholder="请输入手机号/邮箱"
                        autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwordVal" style="position: relative;margin-bottom: 10px;">
                      <el-input placeholder="请输入密码" v-model="accountPasswordForm.passwordVal"
                        :type="passwordflag ? 'text' : 'password'" @keyup.enter.native="accountlogin"></el-input>
                      <div @click="passwordflag = !passwordflag"
                        style="position: absolute;right: 15px;top: 5px;cursor: pointer;width: 20px;height:20px">
                        <img src="@/assets/images/preview-open.svg" v-if="passwordflag" style="width: 100%;" />
                        <img src="@/assets/images/preview-close.svg" v-else style="width: 100%;" />
                      </div>
                    </el-form-item>
                  </el-form>
                  <p style="text-align:right"><span style="font-size:12px;color:#999">还没有密码或已忘记？</span><span
                      style='font-size:12px;color:#D161F6;cursor: pointer;' @click="isone = false">去设置</span></p>
                  <el-button class="submit_btn" style="margin:30px 0 10px" @click="accountlogin"
                    :class="{ disabled_opacity: !accountpasswordDisabled1 || !accountpasswordDisabled2 }"
                    :disabled="!accountpasswordDisabled1 || !accountpasswordDisabled2" round>确认</el-button>
                </el-tab-pane>
              </el-tabs>

              <p class="privacy_agreement">
                登录平台即代表同意<router-link target="_blank" to="/tos"><span>服务条款及用户隐私协议</span></router-link>
              </p>
            </div>
          </div>
          <div class="tabs" v-else>
            <h3 style="padding-bottom: 17px">请绑定手机号</h3>
            <el-form :model="ruleForm" :rules="bindPhoneRules" ref="bindPhoneRuleForm" class="demo-ruleForm">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码">
                  <el-button slot="append" @click="handlerSend('mobilelogin')"
                    :style="{ color: isDisabled ? '#999999' : '#D161F6' }" :disabled="isDisabled" type="text">
                    {{ verificationCodeText }}</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit_btn" :class="{ disabled_opacity: phoneError || codeError }"
                  :disabled="phoneError || codeError" @click="handleBindPhone('bindPhoneRuleForm')" round>确认</el-button>
              </el-form-item>
            </el-form>
            <p class="privacy_agreement">绑定后即可使用微信扫码登录，更便捷</p>
          </div>
        </el-col>
        <el-row :span="12" class="right max_right" v-else>
          <div class="tabs">
            <registercomp :isone="isone" @getisoneMsg="getisoneMsg"></registercomp>
          </div>
        </el-row>

        <el-col :span="12" class="right min_right">
          <div class="tabs" v-if="!hasBindPhone">
            <h3>注册/登录</h3>
            <p class="description">未注册时，首次登录系统将自动为您注册</p>
            <div>
              <el-form :model="ruleForm" :rules="bindPhoneRules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                  <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码">
                    <el-button slot="append" @click="handlerSend('mobilelogin')"
                      :style="{ color: isDisabled ? '#999999' : '#D161F6' }" :disabled="isDisabled" type="text">
                      {{ verificationCodeText }}
                    </el-button>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="submit_btn" :class="{ disabled_opacity: phoneError || codeError }"
                    :disabled="phoneError || codeError" @click="handleSubmitForm('ruleForm')" round>确认</el-button>
                </el-form-item>
              </el-form>
              <p class="privacy_agreement">
                登录平台即代表同意<router-link target="_blank" to="/tos"><span>服务条款</span>及<span>用户隐私协议</span></router-link>
              </p>
            </div>
          </div>
          <div class="tabs" v-else>
            <h3 style="padding-bottom: 17px">请绑定手机号</h3>
            <el-form :model="ruleForm" :rules="bindPhoneRules" ref="bindPhoneRuleForm" class="demo-ruleForm">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码">
                  <el-button slot="append" @click="handlerSend('mobilelogin')"
                    :style="{ color: isDisabled ? '#999999' : '#D161F6' }" :disabled="isDisabled" type="text">
                    {{ verificationCodeText }}</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit_btn" :class="{ disabled_opacity: phoneError || codeError }"
                  :disabled="phoneError || codeError" @click="handleBindPhone('bindPhoneRuleForm')" round>确认</el-button>
              </el-form-item>
            </el-form>
            <p class="privacy_agreement">绑定后即可使用微信扫码登录，更便捷</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="微信咨询" :visible.sync="dialogVisible" center width="320px">
      <div class="contact_us_box">
        <span></span><span></span><span></span><span></span>
        <img :src="configData.wechat" style="width: 260px" />
      </div>
      <div class="contact_us_foot">
        <p>
          <i class="iconfont icon-phone-call"></i><span>电话：</span>{{ configData.phone }}
        </p>
        <p>
          <i class="iconfont icon-mail"></i><span>邮箱：</span>ceo@viponltd.com
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import registercomp from './registercomp.vue'
import {
  getQrcode,
  smsSend,
  mobileLogin,
  bindPhone,
  checkQr,
  getConfig,
  accountLogin
} from "@/api/index";
import login from "@/store/modules/login";
import router from "@/router";
export default {
  name: "login",
  data() {
    const validatePhone = (rule, value, callback) => {
      const regExp =
        /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
      if (!regExp.test(value)) {
        callback(new Error("手机号码格式错误，请输入正确的手机号码！"));
        this.isDisabled = true;
        this.phoneError = true;
      } else {
        this.isDisabled = false;
        this.phoneError = false;
        callback();
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
    const validateEmaiPhone = (rule, value, callback) => {
      const EamiregExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const PhoneregExp = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
      if (PhoneregExp.test(value) || EamiregExp.test(value)) {
        this.accountpasswordDisabled1 = true
        callback()
      } else {
        this.accountpasswordDisabled1 = false
        callback(new Error())
      }
    }
    return {
      source: "",
      action: "",
      dialogVisible: false,
      phoneError: true,
      codeError: true,
      isSubmitDisabled: true,
      isRefresh: false,
      qrImg: "",
      activeName: "first",
      checkQrCode: "",
      hasBindPhone: false,
      isDisabled: true,
      isBindPhoneDisabled: false,
      verificationCodeText: "获取验证码",
      disabledText: {
        color: "#999999",
      },
      ruleForm: {
        phone: "",
        verificationCode: "",
      },
      bindPhoneRules: {
        phone: [
          { required: true, message: "请输入手机号码！", trigger: "change" },
          { validator: validatePhone, trigger: ["change"] },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { validator: validateVerificationCode, trigger: ["change"] },
        ],
      },
      accountPasswordForm: {
        accountVal: "",
        passwordVal: ""
      },
      accountPasswordRules: {
        accountVal: [
          { required: true, message: "请输入账号！", trigger: "change" },
          { validator: validateEmaiPhone, message: "请输入正确的手机号或邮箱", trigger: ['change'] }
        ],
        passwordVal: [
          { required: true, message: "请输入密码", trigger: "change" },
        ]
      },
      wechatToken: "",
      fromPath: localStorage.getItem("loginFromPath"),
      configData: {},
      loading: true,
      passwordflag: false,
      accountpasswordDisabled1: false,
      accountpasswordDisabled2: false,
      isone: true,
    };
  },
  watch: {
    'accountPasswordForm.passwordVal': function (newVal, oldVal) {
      newVal ? this.accountpasswordDisabled2 = true : this.accountpasswordDisabled2 = false
    }
  },
  mounted() {
    this.handlerGetQrcode();
    localStorage.getItem("configObj") ? this.configData = JSON.parse(localStorage.getItem("configObj")) : this.getContent()
    if (!localStorage.getItem("logo")) this.getContent()
    this.source = this.$route.query.source || localStorage.getItem("source") || "";
    this.action = this.$route.query.action || localStorage.getItem("action") || "";

    //已登录状态下不跳转至登录页
    if (login.state.token) this.$router.push({ path: "/" })
  },
  methods: {
    ...mapMutations("login", [
      "setUserInfo",
      "setToken",
      "setAvatar",
      "setExpiretime",
    ]),
    ...mapMutations("login", ["setLogo"]),
    getisoneMsg(msg) {
      this.isone = msg
    },

    //获取公共配置信息
    getContent() {
      getConfig()
        .then((res) => {
          if (res.code === 1) {
            localStorage.setItem("logo", res.data.logo);
            localStorage.setItem("configObj", JSON.stringify(res.data));
            this.setLogo(res.data.logo);
            this.configData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取微信二维码
    handlerGetQrcode() {
      getQrcode()
        .then((res) => {
          if (res.code === 1) {
            this.loading = false
            this.qrImg = res.data.qrcode_url;
            this.wechatToken = res.data.wechat_token;
            this.isRefresh = false;
            this.startCron();
            this.handleCheckQr();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },

    async handleCheckQr() {
      var timer = 0;
      let _this = this;
      let form = new FormData();
      let id = this.$route.query.id || "";
      form.append("wechat_token", _this.wechatToken);
      form.append("source", _this.source);
      form.append("action", _this.action);
      form.append("id", id);
      _this.checkQrCode = setInterval(async () => {
        try {
          const res = await checkQr(form);
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
            //扫码成功，请绑定手机号 //渲染绑定手机页面
            _this.hasBindPhone = true;
            //清除定时脚本
            clearInterval(_this.checkQrCode);
          } else if (res.code === 1 && res.data.status === 2) {
            this.setData(res.data)
          }
        } catch (err) {
          this.$message.error(err.msg);
        }
      }, 3000);
    },

    // 跳转 不会被拦截
    openUrl(url) {
      var a = document.createElement("a"); //创建a对象
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("id", "camnpr");
      document.body.appendChild(a);
      a.click(); //执行当前对象
    },

    handleClick(tab) {
      tab.index == 0 ? this.handleCheckQr() : clearInterval(this.checkQrCode)
    },
    //发送验证码
    handlerSend(even) {
      smsSend({
        account: this.ruleForm.phone,
        event: even,
      })
        .then((res) => { })
        .catch((err) => {
          this.$message.error(err.msg);
        });
      let timeo = 30;
      let _this = this;
      let timeStop = setInterval(function () {
        timeo--;
        if (timeo > 0) {
          _this.verificationCodeText = timeo + "s后重新获取";
          _this.isDisabled = true;
        } else {
          timeo = 30;
          _this.verificationCodeText = "获取验证码";
          _this.isDisabled = false;
          clearInterval(timeStop);
        }
      }, 1000);
    },

    //短信登录注册
    async handleSubmitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await mobileLogin({
            source: this.source,
            mobile: this.ruleForm.phone,
            captcha: this.ruleForm.verificationCode,
            action: this.action,
            id: this.$route.query.id || "",
          });

          if (res.code === 1) {
            if (res.data.type == "register") {
              this.$message.success(res.msg);
            }
            this.setData(res.data)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //绑定手机号
    handleBindPhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          bindPhone({
            mobile: this.ruleForm.phone,
            captcha: this.ruleForm.verificationCode,
            wechat_token: this.wechatToken,
            source: this.source,
            action: this.action,
          })
            .then((res) => {
              if (res.code === 1) {
                this.setData(res.data);
              } else if (res.code === 0 && res.data.status === 0) {
                this.hasBindPhone = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //刷新二维码
    handleRefresh() {
      this.handlerGetQrcode();
    },
    startCron() {
      var timer = 0;
      let _this = this;
      var intervalId = setInterval(function () {
        timer++;
        if (timer > 60) {
          //等待扫码,超过3分钟未扫描，二维码提示已过期
          _this.isRefresh = true;
          //清除定时脚本
          clearInterval(intervalId);
        }
      }, 3000);
    },

    //账号密码登录
    async accountlogin() {

      const data = {
        account: this.accountPasswordForm.accountVal,
        password: this.accountPasswordForm.passwordVal,
        id: this.$route.query.id || "",
        source: this.source,
        action: this.action,
      };

      const res = await accountLogin(data);
      if (res.code == 1) this.setData(res.data)
    },

    //登录成功要存的数据
    async setData(data) {
      //登录成功,即将跳转
      clearInterval(this.checkQrCode);
      localStorage.setItem("userInfo", JSON.stringify(data.userinfo));
      localStorage.setItem("token", data.userinfo.token);
      localStorage.setItem("avatar", data.userinfo.avatar);
      localStorage.setItem("expiretime", data.userinfo.expiretime);
      this.setExpiretime(data.userinfo.expiretime);
      this.setUserInfo(JSON.stringify(data.userinfo));
      this.setToken(data.userinfo.token);
      this.setAvatar(data.userinfo.avatar);
      if (data.jump) {
        await new Promise((resolve) => {
          this.openUrl(data.jump);
          setTimeout(() => {
            router.push("/");
            resolve();
          }, 1000);
        });
      } else {
        router.push(this.fromPath);
      }
      localStorage.removeItem("source");
      localStorage.removeItem("active");
    },
  },
  beforeDestroy() {
    clearInterval(this.checkQrCode);
  },
  components: {
    registercomp,
  }
};
</script>

<style lang="less" scoped>
::v-deep(.el-button) {
  border: none;
}

.noborder {
  ::v-deep(.el-input__inner) {
    border-right: none;
  }
}

.disabled_opacity {
  opacity: 0.5;
}

.header {
  >ul {
    margin: auto;
    align-items: center;
    border-bottom: none;
    padding: 0 10px;

    a {
      color: #666666;
    }
  }
}

.content {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;

  .content_bg {
    margin-top: 66px;
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .left {
      background: #1d255a;
    }

    .right {
      background: linear-gradient(233deg,
          #ffa373 0%,
          #ea5ef7 48%,
          #776cf3 100%);
    }
  }

  .content_body {
    max-width: 1400px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top: 66px;

    .left {
      display: block;

      .content_img {
        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .right {

      .tabs {
        width: 320px;
        background: white;
        padding: 60px 81px;
        box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.04);
        border-radius: 14px;
        text-align: center;
        margin: auto;

        h3 {
          font-size: 24px;
          font-weight: 600;
          color: #333333;
          line-height: 33px;
        }

        .description {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          line-height: 17px;
          padding: 6px 0 16px 0;
        }

        .qrcode {
          margin: 19px 20px 20px 20px;
          border: 1px solid #eeeeee;
          padding: 8px;
          position: relative;
          min-height: 266px;

          img {
            width: 100%;
          }

          >span {
            position: absolute;
            width: 8px;
            height: 8px;
          }

          .top {
            border-left: 1px solid #333;
            border-top: 1px solid #333;
            left: -1px;
            top: -1px;
          }

          .bottom {
            border-right: 1px solid #333;
            border-bottom: 1px solid #333;
            right: -1px;
            bottom: -1px;
          }

          .left {
            border-left: 1px solid #333;
            border-bottom: 1px solid #333;
            left: -1px;
            bottom: -1px;
          }

          .right {
            border-right: 1px solid #333;
            border-top: 1px solid #333;
            right: -1px;
            top: -1px;
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

        .privacy_agreement {
          color: #666666;

          span {
            color: #D161F6;
          }

          a {
            text-decoration: none;
            color: inherit;
          }
        }

        .demo-ruleForm {
          padding-top: 5px;
        }
      }
    }


    .submit_btn {
      background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
      border-radius: 5px;
      width: 100%;
      color: #fff;
    }

    .min_right {
      display: none;
    }

    .max_right {
      display: block;
      width: 50%;
    }
  }
}

@media screen and (max-width: 600px) {
  .header {
    >ul {
      display: flex;
    }
  }

  .content {
    .content_body {
      .left {
        display: none;
      }

      .right {
        width: 100%;
        margin: 0 40px;

        .tabs {
          padding: 30px 20px;

          h3 {
            font-size: 18px;
          }
        }
      }

      .min_right {
        display: block;
      }

      .max_right {
        display: none;
      }
    }
  }
}
</style>

<!-- 标签栏样式 -->
<style lang="less" scoped>
::v-deep(.el-tabs__nav) {
  width: 100%;
}


::v-deep(.el-tabs--card>.el-tabs__header) {
  border-bottom: none;
}

::v-deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
  background: #eee;
  border-radius: 5px;
  border: none;
  overflow: hidden;
  padding: 3px;
}

::v-deep(.el-tabs__item) {
  color: #999;
  padding: 0 22px;
}

::v-deep(.el-tabs__item.is-active) {
  font-weight: 600;
  color: #333;
}

::v-deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
  border-bottom-color: transparent;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  transition: all .3s;
}

::v-deep(.el-input__inner) {
  border: 1px solid #EEEEEE;
}

::v-deep(.el-input-group__append) {
  padding: 0 40px;
  background: #fff;
  border: 1px solid #f3f3f3;

}

//设置图标颜色
::v-deep(.qrcodeloaging) {
  .el-loading-spinner {
    .path {
      stroke: #d161f6;
    }
  }
}
</style>