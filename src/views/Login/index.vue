<template>
  <div>
    <div class="header">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        router
        mode="horizontal"
        active-text-color="#ffffff"
        text-color="#666666"
      >
        <el-menu-item index="/" style="width: 237px"
          ><img :src="logoImg" alt="" style="width: 100%"
        /></el-menu-item>

        <el-menu-item style="float: right" @click="dialogVisible = true"
          >加群交流</el-menu-item
        >
        <!--                <el-menu-item style="float: right;" index="3"><a href="">新手指南</a></el-menu-item>-->
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
            <img id="img" src="../../assets/images/login_banner.png" alt="" />
          </div>
        </el-col>

        <el-col :span="12" class="right max_right">
          <div class="tabs" v-if="!hasBindPhone">
            <h3>注册/登录</h3>
            <p class="description">未注册时，首次登录系统将自动为您注册</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="微信扫码" name="first">
                <div class="qrcode">
                  <span class="top"></span><span class="bottom"></span
                  ><span class="left"></span><span class="right"></span>
                  <img :src="qrImg" alt="" />
                  <div
                    id="refreshQrcode"
                    v-if="isRefresh"
                    @click="handleRefresh"
                  >
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                      "
                    >
                      <div>
                        <i class="el-icon-refresh-right"></i>
                        <span>点击刷新</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="privacy_agreement">
                  登录平台即代表同意
                  <router-link target="_blank" to="/tos"
                    >《用户使用协议》</router-link
                  >
                </p>
              </el-tab-pane>

              <el-tab-pane label="验证码" name="second">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="phone">
                    <el-input
                      v-model="ruleForm.phone"
                      placeholder="请输入手机号码"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="verificationCode">
                    <el-input
                      v-model="ruleForm.verificationCode"
                      placeholder="请输入验证码"
                    >
                      <el-button
                        slot="append"
                        @click="handlerSend('mobilelogin')"
                        :style="{ color: isDisabled ? '#999999' : '#2489F3' }"
                        :disabled="isDisabled"
                        type="text"
                      >
                        {{ verificationCodeText }}
                      </el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      class="submit_btn"
                      :class="{ disabled_opacity: phoneError || codeError }"
                      :disabled="phoneError || codeError"
                      @click="handleSubmitForm('ruleForm')"
                      round
                      >提交</el-button
                    ><!--ruleForm.phone == '' || ruleForm.verificationCode == ''-->
                  </el-form-item>
                </el-form>
                <p class="privacy_agreement">
                  登录平台即代表同意
                  <router-link target="_blank" to="/tos"
                    >《用户使用协议》</router-link
                  >
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabs" v-else>
            <h3 style="padding-bottom: 17px">请绑定手机号</h3>
            <el-form
              :model="ruleForm"
              :rules="bindPhoneRules"
              ref="bindPhoneRuleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input
                  v-model="ruleForm.verificationCode"
                  placeholder="请输入验证码"
                >
                  <el-button
                    slot="append"
                    @click="handlerSend('mobilelogin')"
                    :style="{ color: isDisabled ? '#999999' : '#2489F3' }"
                    :disabled="isDisabled"
                    type="text"
                  >
                    {{ verificationCodeText }}</el-button
                  >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submit_btn"
                  :class="{ disabled_opacity: phoneError || codeError }"
                  :disabled="phoneError || codeError"
                  @click="handleBindPhone('bindPhoneRuleForm')"
                  round
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
            <p class="privacy_agreement">绑定后即可使用微信扫码登录，更便捷</p>
          </div>
        </el-col>

        <el-col :span="12" class="right min_right">
          <div class="tabs" v-if="!hasBindPhone">
            <h3>注册/登录</h3>
            <p class="description">未注册时，首次登录系统将自动为您注册</p>
            <div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="phone">
                  <el-input
                    v-model="ruleForm.phone"
                    placeholder="请输入手机号码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                  <el-input
                    v-model="ruleForm.verificationCode"
                    placeholder="请输入验证码"
                  >
                    <el-button
                      slot="append"
                      @click="handlerSend('mobilelogin')"
                      :style="{ color: isDisabled ? '#999999' : '#2489F3' }"
                      :disabled="isDisabled"
                      type="text"
                    >
                      {{ verificationCodeText }}
                    </el-button>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="submit_btn"
                    :class="{ disabled_opacity: phoneError || codeError }"
                    :disabled="phoneError || codeError"
                    @click="handleSubmitForm('ruleForm')"
                    round
                    >提交</el-button
                  ><!--ruleForm.phone == '' || ruleForm.verificationCode == ''-->
                </el-form-item>
              </el-form>
              <p class="privacy_agreement">
                登录平台即代表同意
                <router-link target="_blank" to="/tos"
                  >《用户使用协议》</router-link
                >
              </p>
            </div>
          </div>
          <div class="tabs" v-else>
            <h3 style="padding-bottom: 17px">请绑定手机号</h3>
            <el-form
              :model="ruleForm"
              :rules="bindPhoneRules"
              ref="bindPhoneRuleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input
                  v-model="ruleForm.verificationCode"
                  placeholder="请输入验证码"
                >
                  <el-button
                    slot="append"
                    @click="handlerSend('mobilelogin')"
                    :style="{ color: isDisabled ? '#999999' : '#2489F3' }"
                    :disabled="isDisabled"
                    type="text"
                  >
                    {{ verificationCodeText }}</el-button
                  >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submit_btn"
                  :class="{ disabled_opacity: phoneError || codeError }"
                  :disabled="phoneError || codeError"
                  @click="handleBindPhone('bindPhoneRuleForm')"
                  round
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
            <p class="privacy_agreement">绑定后即可使用微信扫码登录，更便捷</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="微信咨询"
      :visible.sync="dialogVisible"
      center
      width="320px"
    >
      <div class="contact_us_box">
        <span></span><span></span><span></span><span></span>
        <img :src="configData.wechat" style="width: 260px" />
      </div>
      <div class="contact_us_foot">
        <p>
          <i class="iconfont icon-phone-call"></i><span>电话：</span
          >{{ configData.phone }}
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
import {
  getQrcode,
  smsSend,
  mobileLogin,
  bindPhone,
  checkQr,
  getConfig,
} from "@/api/index";
import login from "@/store/modules/login";
import { log } from "video.js";
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
      logoImg: require("../../assets/images/logo.png"),
      disabledText: {
        color: "#999999",
      },
      ruleForm: {
        phone: "",
        verificationCode: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码！", trigger: "blur" },
          { validator: validatePhone, trigger: ["blur", "change"] },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateVerificationCode, trigger: ["blur", "change"] },
        ],
      },
      bindPhoneRules: {
        phone: [
          { required: true, message: "请输入手机号码！", trigger: "blur" },
          { validator: validatePhone, trigger: ["blur", "change"] },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateVerificationCode, trigger: ["blur", "change"] },
        ],
      },
      wechatToken: "",
      fromPath: localStorage.getItem("loginFromPath"),
      configData: {},
    };
  },
  created() {},
  mounted() {
    this.handlerGetQrcode();
    this.verifyToken();
    if (localStorage.getItem("configObj")) {
      this.configData = JSON.parse(localStorage.getItem("configObj"));
    } else {
      this.getContent();
    }
    if (localStorage.getItem("logo")) {
      this.logoImg = localStorage.getItem("logo");
    } else {
      this.getContent();
    }
    this.source =
      this.$route.query.source || localStorage.getItem("source") || "";
    this.action =
      this.$route.query.action || localStorage.getItem("action") || "";
  },
  methods: {
    ...mapMutations("login", [
      "setUserInfo",
      "setToken",
      "setAvatar",
      "setExpiretime",
    ]),
    ...mapMutations("login", ["setLogo"]),
    //获取公共配置信息
    getContent() {
      getConfig()
        .then((res) => {
          if (res.code === 1) {
            this.logoImg = res.data.logo;
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
            this.qrImg = res.data.qrcode_url;
            this.wechatToken = res.data.wechat_token;
            this.isRefresh = false;
            // this.startCron();
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
            let hrefLink = "https://www.viponm.com";
            //登录成功,即将跳转
            clearInterval(_this.checkQrCode);
            localStorage.setItem("userInfo", JSON.stringify(res.data.userinfo));
            localStorage.setItem("token", res.data.userinfo.token);
            localStorage.setItem("avatar", res.data.userinfo.avatar);
            localStorage.setItem("expiretime", res.data.userinfo.expiretime);
            this.setExpiretime(res.data.userinfo.expiretime);
            this.setUserInfo(JSON.stringify(res.data.userinfo));
            this.setToken(res.data.userinfo.token);
            this.setAvatar(res.data.userinfo.avatar);
            console.log("jump", res.data.jump);
            if (res.data.jump) {
              await new Promise((resolve) => {
                window.open(res.data.jump, "_blank");
                setTimeout(() => {
                  resolve();
                }, 1000);
              });
            } else {
              this.$router.push(this.fromPath);
            }

            if (process.env.NODE_ENV == "production") {
              hrefLink = `https://www.viponm.com`;
            } else if (process.env.NODE_ENV == "development") {
              hrefLink = `http://testai.blhltd.com`;
            } else {
              hrefLink = `http://localhost:8088`;
            }

            localStorage.removeItem("source");
            localStorage.removeItem("active");
            window.location.href = hrefLink;
          }
        } catch (err) {
          this.$message.error(err.msg);
        }
      }, 3000);
    },

    handleClick(tab) {
      if (tab.index == 0) {
        this.handleCheckQr();
      } else {
        clearInterval(this.checkQrCode);
      }
    },
    //发送验证码
    handlerSend(even) {
      smsSend({
        mobile: this.ruleForm.phone,
        event: even,
      })
        .then((res) => {})
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
            let hrefLink = "https://www.viponm.com";
            if (res.data.type == "register") {
              this.$message.success(res.msg);
            }
            clearInterval(this.checkQrCode);
            localStorage.setItem("userInfo", JSON.stringify(res.data.userinfo));
            localStorage.setItem("token", res.data.userinfo.token);
            localStorage.setItem("avatar", res.data.userinfo.avatar);
            localStorage.setItem("expiretime", res.data.userinfo.expiretime);
            this.setExpiretime(res.data.userinfo.expiretime);
            this.setUserInfo(JSON.stringify(res.data.userinfo));
            this.setToken(res.data.userinfo.token);
            this.setAvatar(res.data.userinfo.avatar);

            if (process.env.NODE_ENV == "production") {
              hrefLink = `https://www.viponm.com`;
            } else if (process.env.NODE_ENV == "development") {
              hrefLink = `http://testai.blhltd.com`;
            } else {
              hrefLink = `http://localhost:8088`;
            }
            if (res.data.jump) {
              await new Promise((resolve) => {
                window.open(res.data.jump, "_blank");
                setTimeout(() => {
                  resolve();
                }, 1000);
              });
            } else {
              this.$router.push(this.fromPath);
            }
            localStorage.removeItem("source");
            localStorage.removeItem("active");
            window.location.href = hrefLink;
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
                clearInterval(this.checkQrCode);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.userinfo)
                );
                localStorage.setItem("token", res.data.userinfo.token);
                localStorage.setItem("avatar", res.data.userinfo.avatar);
                localStorage.setItem(
                  "expiretime",
                  res.data.userinfo.expiretime
                );
                this.setExpiretime(res.data.userinfo.expiretime);
                this.setUserInfo(JSON.stringify(res.data.userinfo));
                this.setToken(res.data.userinfo.token);
                this.setAvatar(res.data.userinfo.avatar);
                res.data.jump
                  ? (window.location.href = res.data.jump)
                  : this.$router.push(this.fromPath);
              } else if (res.code === 0 && res.data.status === 0) {
                // this.$message.error(res.msg);
                this.hasBindPhone = false;
              }
            })
            .catch((err) => {
              console.log(err);
              // this.$message.error(err.msg);
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
    //已登录状态下不跳转至登录页
    verifyToken() {
      let tokenStr = login.state.token;
      if (tokenStr) {
        this.$router.push({ path: "/" });
      } else {
        // this.$message.error('请登录!')
      }
    },
  },
};
</script>

<style lang="less" scoped>
.disabled_opacity {
  opacity: 0.5;
}
.header {
  > ul {
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
      background: linear-gradient(
        233deg,
        #ffa373 0%,
        #ea5ef7 48%,
        #776cf3 100%
      );
    }
  }

  .content_body {
    max-width: 1200px;
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
        max-width: 320px;
        background: white;
        padding: 60px 86px;
        box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.04);
        border-radius: 14px;
        text-align: center;
        margin: auto;

        h3 {
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 33px;
        }

        .description {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
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

          img {
            width: 100%;
          }

          > span {
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
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          a {
            color: #2489f3;
          }
          a:hover {
            text-decoration: none;
          }
        }

        .demo-ruleForm {
          padding-top: 15px;

          .submit_btn {
            background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
            width: 100%;
            color: #ffffff;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            margin-top: 10px;
          }
        }
      }
    }
    .min_right {
      display: none;
    }
    .max_right {
      display: block;
    }
  }
}

@media screen and (max-width: 600px) {
  .header {
    > ul {
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
<style>
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

.el-tabs__item.is-active {
  color: #333333;
  font-weight: bold;
}

.el-tabs__active-bar {
  background: #333333;
  height: 3px;
}
.el-tabs__nav-wrap::after {
  height: 1px;
}
.el-tabs__item {
  color: #666666;
  font-size: 16px;
}

.demo-ruleForm .el-input-group__append {
  background: #ffffff;
  padding: 0 30px;
  color: #2489f3;
}

.el-form-item.is-error .el-input__inner {
  border-right: 1px solid #f56c6c;
}

.demo-ruleForm .el-form-item:last-child {
  margin-bottom: 16px;
}
</style>

<style>
.el-tabs__item {
  width: 120px;
}
</style>