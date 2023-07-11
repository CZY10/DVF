<template>
  <div>
    <div class="header">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        id="menu_box"
        router
        mode="horizontal"
        active-text-color="#333333"
        text-color="#666666"
      >
        <a
          href="/"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 180px;
            padding: 0 20px;
          "
          ><img :src="logoImg" style="width: 100%; height: 100%" alt=""
        /></a>
        <el-menu-item index="/" style="margin: 0 20px">首页</el-menu-item>
        <el-menu-item index="/videohome" style="margin: 0 20px"
          >视频服务站</el-menu-item
        >
        <el-menu-item index="/buyershow" style="margin: 0 20px"
          >拍买家秀</el-menu-item
        >
        <el-menu-item index="/webDeal" style="margin: 0 20px"
          >海外Deal站</el-menu-item
        >
        <el-menu-item style="margin: 0 20px"
          ><a target="_blank" style="width: 100%" @click="goVipon"
            >站外推广</a
          ></el-menu-item
        >
        <!-- <el-menu-item index="/chatgpt">ChatGPT</el-menu-item> -->
        <el-menu-item
          v-if="!isLogin"
          style="float: right; margin-left: 20px"
          index="/login"
          ><el-button class="login_btn" round
            >登陆/注册</el-button
          ></el-menu-item
        >
        <el-submenu
          v-else
          index="/manage"
          style="float: right; border-radius: 10px"
        >
          <template slot="title"
            ><span class="user_info_box"
              ><img :src="avatar" width="36px" height="36px" alt="" /></span
          ></template>
          <div style="padding: 0 6px">
            <el-menu-item index="/manage/order">订单信息</el-menu-item>
            <el-menu-item index="/manage/payment">支付记录</el-menu-item>
            <el-menu-item index="/manage/personal">个人资料</el-menu-item>
            <el-menu-item @click="handlerLogOut">退出</el-menu-item>
          </div>
        </el-submenu>

        <el-menu-item
          class="icon_hover_style"
          style="float: right; padding: 0; margin: 0 10px 0 0px"
          index="/manage/order"
          @click="changeIsMessage"
        >
          <el-badge
            :value="messageCount"
            :hidden="messageCount == 0"
            class="item"
          >
            <i
              class="el-icon-chat-dot-round"
              style="color: #666666; font-size: 18px; margin-right: 3px"
            ></i>
            <span>消息</span>
          </el-badge>
        </el-menu-item>

        <!-- <el-menu-item style="float: right"
          ><a
            href="https://peseeazfwl.feishu.cn/wiki/wikcnMyh2Kpl0beLaynqfWT3Vuc"
            target="_blank"
            >新手指南</a
          ></el-menu-item
        > -->
        <!-- <el-menu-item style="float: right" @click="handlerClick"
          >联系我们</el-menu-item
        > -->

        <el-menu-item
          v-if="token"
          style="
            float: right;
            padding-left: 0;
            width: 100px;
            margin-right: 20px;
          "
        >
          <el-popover
            placement="bottom"
            popper-class="menu_popover"
            trigger="click"
          >
            <div
              slot="reference"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                style="
                  width: 30px;
                  height: 30px;
                  margin-right: 8px;
                  border-radius: 50%;
                "
                :src="serviceInfoList.service_avatar"
                alt=""
              />
              <span style="padding-top: 1px">VIP服务</span>
            </div>
            <div>
              <div class="avatar_userInfo">
                <div class="avatar">
                  <img :src="serviceInfoList.service_avatar" alt="" />
                </div>
                <ul>
                  <li>
                    帐号经理：<span>{{ serviceInfoList.service_name }}</span>
                  </li>
                  <li>
                    交付订单：<span>{{ serviceInfoList.pay_order }}</span>
                  </li>
                  <li>
                    客户评价：<el-rate
                      v-model="serviceInfoList.customer_reviews"
                      disabled
                      :colors="['#796CF3', '#796CF3', '#796CF3']"
                    ></el-rate>
                  </li>
                  <li>
                    客户投诉：<span>{{ serviceInfoList.customer_report }}</span>
                  </li>
                </ul>
              </div>
              <div class="service_info">
                <div>
                  <div class="service_qr">
                    <img :src="serviceInfoList.qr_code" alt="" />
                  </div>
                  <div class="service_qr_description">扫码快速获取服务</div>
                </div>
                <ul>
                  <li><i class="iconfont icon-xy"></i>7x8小时响应</li>
                  <li><i class="iconfont icon-jf"></i>全程交付跟踪</li>
                  <li><i class="iconfont icon-ys"></i>视频交付预审</li>
                  <li><i class="iconfont icon-bz1"></i>无忧售后保障</li>
                </ul>
              </div>
            </div>
          </el-popover>
        </el-menu-item>

        <el-submenu style="float: right">
          <template slot="title">
            <i class="el-icon-video-play" style="margin-right: 0px"></i
            ><span>帮助</span></template
          >
          <el-menu-item style="width: 139px">
            <li class="menu-item-li" @click="centerDialogVisible = true">
              视频教程
              <i class="el-icon-video-play" style="margin-right: 0px"></i></li
          ></el-menu-item>
          <el-menu-item
            ><li class="menuitemli" @click="goviponltd">
              操作文档
            </li></el-menu-item
          >
          <el-menu-item @click="gopeseeazfwl"
            ><li class="menuitemli">常见问题</li></el-menu-item
          >
        </el-submenu>

        <el-menu-item
          style="float: right; display: flex; align-items: center"
          index="/Requirement"
        >
          <div
            style="
              width: 148px;
              height: 35px;
              padding: 1px;
              background: linear-gradient(to bottom, #796cf3, #df60f7);
              border-radius: 18px;
              display: flex;
            "
          >
            <button
              style="
                width: 100%;
                height: 100%;
                border-radius: 18px;
                background: #fff;
                color: #796cf3;
                border: none;
                cursor: pointer;
              "
            >
              <img src="@/assets/images/pens.png" alt="" />
              <span style="margin-left: 10px">提交拍摄需求</span>
            </button>
          </div>
        </el-menu-item>
      </el-menu>
    </div>

    <el-dialog
      :visible="dialog"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :lock-scroll="false"
      :fullscreen="true"
      center
      class="weComDialog"
      height="100%"
      width="100%"
    >
      <a
        href="javascript:;;"
        style="
          padding: 22px 0 0 30px;
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
        "
        ><img :src="logoWhite" style="width: 100%; height: 100%" alt=""
      /></a>
      <div class="content">
        <div>
          <p class="head">
            为提升服务体验，保障交付质量，请您扫码<span>添加专属账号经理</span>
          </p>
          <div style="display: flex; justify-content: center">
            <div class="body">
              <div style="margin-right: 40px">
                <p class="title">微信扫码</p>
                <p class="description">添加专属账号经理</p>
                <div class="weChatcode">
                  <img :src="contactMeQr" alt="" />
                </div>
                <div
                  style="
                    text-align: center;
                    color: #ffffff;
                    padding-top: 24px;
                    font-size: 16px;
                  "
                >
                  扫码添加后，等待<span style="color: #fffa00">3-5s</span
                  >即可自动跳转
                </div>
              </div>
              <div>
                <div class="weCom_img">
                  <img src="../../assets/images/weCom.png" alt="" />
                </div>
                <div class="weCom_description">
                  <p>通过后，您还将获得以下福利</p>
                  <ul>
                    <li>首单优惠 <span>¥50.00</span></li>
                    <li>团购买10单 <span>免1单</span></li>
                    <li>最新AI教程资料，<span>免费赠送</span></li>
                    <li>VIP专属 <span>1对1</span> 服务</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="centerDialogVisible" width="50%" center>
      <video
        width="100%"
        height="100%"
        autoplay
        controls
        preload="none"
        ref="myVideo"
        @play="onPlay"
        @pause="onPause"
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <div class="video_img" @click="videoplay" v-show="!video_img"></div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  chatCount,
  addWeCom,
  checkQr,
  checkEnterpriseQr,
  serviceInfo,
  getConfig,
} from "../../api/index";
import store from "@/store";

export default {
  name: "NavMenu",
  inject: ["reload"],
  data() {
    return {
      dialog: false,
      isLogin: true,
      avatar: localStorage.getItem("avatar") || this.$store.state.login.avatar,
      messageCount: 0,
      logoImg: localStorage.getItem("logo"),
      configData: {},
      token: localStorage.getItem("token"),
      logoWhite: "",
      rateVal: 3,
      userId: "",
      isBindEnterpriseQr: null,
      serviceInfoList: {
        customer_reviews: null,
        customer_report: "",
        pay_order: "",
        qr_code: "",
        service_avatar: require("../../assets/images/customer_header.png"),
        service_name: "",
      },
      contactMeQr: "",
      DealHook: "",
      ViponSrc: "",
      DealSrc: "",
      FbSrc: "",
      centerDialogVisible: false,
      videoUrl: "" || window.localStorage.getItem("videoUrl"),
      video_img: true,
    };
  },
  computed: {
    avatarFn() {
      return this.$store.state.login.avatar;
    },
    messageFn() {
      return this.$store.state.order.isRead;
    },
    logoFn() {
      return this.$store.state.login.logo;
    },
  },
  watch: {
    avatarFn(newVal) {
      this.avatar = newVal;
      this.$forceUpdate(); // 更新数据
    },
    messageFn(newVal) {
      if (newVal === 1) {
        if (this.messageCount > 0) {
          this.messageCount--;
          this.setMessage(this.messageCount);
        }
      }
    },
    logoFn(newVal) {
      this.logoImg = newVal;
    },
    centerDialogVisible(newVal) {
      if (newVal == false) {
        const video = this.$refs.myVideo;
        video.pause();
        this.video_img = false;
      }
    },
  },
  created() {
    if (this.token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    window.addEventListener("setItem", () => {
      //这里就可以根据具体情况调用或刷新需要的操作
      this.avatar = localStorage.getItem("avatar"); //获取监听的值
    });

    //海外Deal站跳转
    this.DealHook = "https://hkatest.myvipon.com";
    if (process.env.NODE_ENV == "production") {
      this.DealHook = "https://seller.vipona.com";
    } else if (process.env.NODE_ENV == "development") {
      this.DealHook = "https://hkatest.myvipon.com";
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("configObj")).video_tutorial) {
    } else {
      this.getContent();
    }
    this.getMessage();

    if (JSON.parse(localStorage.getItem("configObj")))
      this.logoWhite = JSON.parse(localStorage.getItem("configObj")).footerlogo;

    if (localStorage.getItem("userInfo"))
      this.userId = JSON.parse(localStorage.getItem("userInfo")).user_id;

    if (localStorage.getItem("isBindEnterpriseQr")) {
      this.isBindEnterpriseQr = localStorage.getItem("isBindEnterpriseQr");
      if (this.isBindEnterpriseQr == 1) {
        this.dialog = true;
        this.handleCheckEnterpriseQr();
        document
          .querySelector("body,html")
          .classList.add("el-popup-parent--hidden");
      } else {
        this.dialog = false;
        document
          .querySelector("body,html")
          .classList.remove("el-popup-parent--hidden");
        localStorage.setItem("isBindEnterpriseQr", 0);
      }
    } else if (this.isBindEnterpriseQr == null && this.token) {
      this.handleAddWeCom();
    } else if (this.isBindEnterpriseQr == null) {
      this.dialog = false;
    }

    if (JSON.parse(localStorage.getItem("configObj"))) {
      this.logoWhite = JSON.parse(localStorage.getItem("configObj")).footerlogo;
    } else {
      this.getContent();
    }
    if (localStorage.getItem("serviceInfoQrCode")) {
      this.contactMeQr = localStorage.getItem("serviceInfoQrCode");
    } else if (this.token) {
      this.handleAddWeCom();
    }
    if (JSON.parse(localStorage.getItem("serviceInfoList"))) {
      this.serviceInfoList = JSON.parse(
        localStorage.getItem("serviceInfoList")
      );
    } else if (this.token) {
      this.getServiceInfo();
    }

    //获取导航栏高度
    document.getElementById("app").style.paddingTop =
      document.getElementById("menu_box").offsetHeight + "px";
    window.onresize = () => {
      return (() => {
        //获取导航栏高度
        document.getElementById("app").style.paddingTop =
          document.getElementById("menu_box").offsetHeight + "px";
      })();
    };
  },
  methods: {
    ...mapMutations("order", ["setIsMessage", "setMessage", "setIsRead"]),
    ...mapMutations("login", ["setLogo"]),

    //播放视频
    videoplay() {
      const video = this.$refs.myVideo;
      video.play();
      this.video_img = true;
    },

    //视频开始播放
    onPlay() {
      this.video_img = true;
    },
    //视频暂停
    onPause() {
      this.video_img = false;
    },

    gopeseeazfwl() {
      window.open(
        "https://peseeazfwl.feishu.cn/wiki/wikcnMyh2Kpl0beLaynqfWT3Vuc",
        "_branck"
      );
    },
    goviponltd() {
      window.open(
        "https://viponltd.feishu.cn/wiki/MOBFw6XAeiFLowkms3GcF5KFnod",
        "_branck"
      );
    },
    //获取企业客服信息
    getServiceInfo() {
      serviceInfo({
        id: this.userId,
      })
        .then((res) => {
          if (res.code == 1) {
            this.serviceInfoList = res.data;
            localStorage.setItem("serviceInfoList", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //引导添加企业微信
    handleAddWeCom() {
      let _this = this;
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        _this.userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
      }
      addWeCom({
        id: _this.userId,
      })
        .then((res) => {
          if (res.code == 1 && res.data.pop_ups == 1) {
            _this.dialog = true;
            _this.handleCheckEnterpriseQr();
            document
              .querySelector("body,html")
              .classList.add("el-popup-parent--hidden");
          } else {
            _this.dialog = false;
            document
              .querySelector("body,html")
              .classList.remove("el-popup-parent--hidden");
          }
          if (res.code == 1) {
            localStorage.setItem("isBindEnterpriseQr", res.data.pop_ups);
            localStorage.setItem("serviceInfoQrCode", res.data.qr_code);
            this.contactMeQr = res.data.qr_code;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取消息条数
    getMessage() {
      chatCount()
        .then((res) => {
          this.messageCount = res.data.count;
          this.setMessage(this.messageCount);
        })
        .catch();
    },
    //点击消息传参
    changeIsMessage() {
      this.setIsMessage(1);
    },
    //退出登录
    handlerLogOut() {
      this.$confirm("您真的要退出本次登录吗？", "退出登录")
        .then(() => {
          this.$store.commit("login/clearUserInfo");
          localStorage.clear("serviceInfoList");
          switch (this.$route.name) {
            case "order":
              window.location.href = "/";
              break;
            case "payment":
              window.location.href = "/";
              break;
            case "personal":
              window.location.href = "/";
              break;
            case "chatgpt":
              window.location.href = "/";
              break;
            default:
              window.location.href = this.$route.fullPath;
          }
          this.reload();
        })
        .catch((err) => {});
    },
    //检测是否添加企业微信
    handleCheckEnterpriseQr() {
      var timer = 0;
      let _this = this;
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        _this.userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
      }
      _this.checkEnterpriseQr = setInterval(() => {
        checkEnterpriseQr({
          id: _this.userId,
        })
          .then((res) => {
            if (res.code === 1 && res.data.static === 0) {
              //请等待扫码
              timer++;
              _this.dialog = true;
            } else if (res.code === 1 && res.data.static === 1) {
              //扫码成功
              //渲染绑定手机页面
              _this.dialog = false;
              this.getServiceInfo();
              //清除定时脚本
              clearInterval(_this.checkEnterpriseQr);
              localStorage.setItem("isBindEnterpriseQr", 0);
            }
          })
          .catch((err) => {
            this.$message.error(err.msg);
          });
      }, 3000);
    },
    //获取公共配置信息
    getContent() {
      getConfig()
        .then((res) => {
          if (res.code === 1) {
            this.logoWhite = res.data.footerlogo;
            localStorage.setItem("logo", res.data.logo);
            localStorage.setItem("configObj", JSON.stringify(res.data));
            this.setLogo(res.data.logo);
            this.videoUrl = res.data.video_tutorial;
            window.localStorage.setItem("videoUrl", res.data.video_tutorial);
            console.log(this.videoUrl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //   vipon自助发帖跳转
    goVipon() {
      if (process.env.NODE_ENV == "production") {
        this.ViponSrc = "https://seller.vipona.com/hot/fb";
      } else if (process.env.NODE_ENV == "development") {
        this.ViponSrc = "https://hkatest.myvipon.com/hot/fb";
      }
      if (window.localStorage.getItem("token")) {
        localStorage.removeItem("source");
        localStorage.removeItem("active");
        // window.location.href = this.ViponSrc;
        window.open(this.ViponSrc, "_blank");
      } else {
        window.open(this.ViponSrc, "_blank");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.video_img:after {
  box-sizing: border-box;
  font-family: element-icons;
  position: absolute;
  content: "\e791";
  width: 100px;
  height: 100px;
  font-size: 62px;
  background: #fff;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 7%);
  border: 2px solid #fff;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.menu-item-li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}
.menu-item-li:hover {
  background: #f4f2ff !important;
  color: #796cf3;
}
.menu-item-li:hover i {
  color: #796cf3;
}
.menuitemli {
  text-align: left;
  padding: 0 12px;
}
.menuitemli:hover {
  background: #f4f2ff !important;
  color: #796cf3;
}

::v-deep(.el-submenu__icon-arrow) {
  margin-top: 0px !important;
}
</style>

<style lang="less">
.menu_popover {
  background: linear-gradient(
    180deg,
    #f2f0fe 0%,
    #ffffff 43%,
    #ffffff 100%
  ) !important;
  padding: 24px !important;
  margin-top: -6px !important;
  .el-rate__icon {
    margin-right: 0 !important;
  }
  .avatar_userInfo {
    display: flex;
    .avatar {
      width: 114px;
      height: 114px;
      background: #ffffff;
      margin-right: 20px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    ul li {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      padding-bottom: 12px;
      display: flex;
      span {
        font-weight: 600;
        color: #333333;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
  .service_info {
    display: flex;
    width: 256px;
    height: 131px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #eeeeee;
    padding: 15px 20px;
    margin-top: 25px;
    .service_qr {
      width: 98px;
      height: 98px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-right: 28px;
      position: relative;
      padding: 5px;
      &:before {
        content: "";
        width: 1px;
        height: 124px;
        background: #eeeeee;
        position: absolute;
        right: -14px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .service_qr_description {
      font-size: 12px;
      color: #333333;
      line-height: 17px;
      text-align: center;
      margin-right: 28px;
      margin-top: 6px;
    }
    ul {
      padding-top: 3px;
    }
    li {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      &:last-child {
        padding-bottom: 0;
      }
      i {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(121, 108, 243, 0.06);
        margin-right: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #796cf3;
      }
    }
  }
}
.el-popup-parent--hidden {
  overflow: hidden;
}
.weComDialog {
  border-radius: 0;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    height: 100%;
    padding: 0 !important;
  }
  .el-dialog.is-fullscreen {
    border-radius: 0 !important;
    background: #1d255a;
    background-image: url("../../assets/images/fullscreen_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .content {
    background: #1d255a;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .head {
      font-size: 32px;
      font-family: GothamHTF, "微软雅黑", Verdana, Arial, Helvetica, sans-serif;
      font-weight: 900;
      color: #ffffff;
      line-height: 34px;
      padding-bottom: 50px;
      text-align: center;
      span {
        color: #ff9c17;
      }
    }
    .body {
      max-width: 890px;
      background-image: url("../../assets/images/body_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 571px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px 0 70px;
      .weCom_img {
        padding-left: 19px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .weChatcode {
        box-sizing: border-box;
        width: 354px;
        height: 354px;
        border-radius: 8px;
        border: 2px solid rgba(255, 255, 255, 0.17);
        padding: 17px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .weCom_description {
        background-image: url("../../assets/images/weCom_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 457px;
        height: 312px;
        p {
          text-align: center;
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          line-height: 30px;
          padding: 27px 0;
          margin: 0 48px 0 69px;
          border-bottom: 1px dashed #ffffff;
        }
        ul {
          padding-top: 23px;
          padding-left: 103px;
          li {
            font-size: 16px;
            font-weight: 400;
            color: #ffffff;
            line-height: 22px;
            padding-bottom: 12px;
            position: relative;
            span {
              color: rgba(255, 250, 0, 1);
            }
            &:before {
              content: url("../../assets/images/right.png");
              width: 16px;
              height: 16px;
              position: absolute;
              left: -28px;
              top: 50%;
              margin-top: -15px;
            }
          }
        }
      }
      .title {
        font-size: 24px;
        font-weight: 600;
        color: #ffffff;
        line-height: 33px;
        padding-bottom: 8px;
        text-align: center;
      }
      .description {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        padding-bottom: 30px;
        text-align: center;
      }
    }
  }
}
.icon_hover_style:hover {
  i {
    color: #333333 !important;
    font-weight: bold;
  }
}
.el-menu-demo .el-badge__content {
  height: 14px;
  line-height: 14px;
  font-weight: normal;
}
.el-menu-demo .el-badge__content.is-fixed {
  top: 25px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  padding: 0;
}
.el-menu--popup-bottom-start {
  margin-top: 0;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%) !important;
  border-radius: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff !important;
}

.el-menu,
.el-menu--horizontal .el-menu .el-menu-item {
  background: none !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu.el-menu--horizontal {
  border-bottom: 1px solid #eeeeee;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none !important;
}
.el-menu-item {
  transition: none !important;
  padding: 0 0 !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-menu-item.is-active {
  color: #333333 !important;
  font-weight: bold;
  background: none !important;
}
.el-menu--horizontal .el-menu .el-menu-item:hover,
.el-menu--horizontal .el-menu .el-menu-item:focus,
.el-menu--horizontal .el-menu .el-menu-item:active {
  background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%) !important;
  border-radius: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: none !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title,
.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal > .el-menu-item {
  height: 66px !important;
  line-height: 66px !important;
}

.el-submenu__title i {
  color: #666666 !important;
}

.el-menu--popup {
  min-width: 100px !important;
  text-align: center;
}
.el-menu--horizontal {
  //background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
  background: #ffffff;
  border-radius: 4px;
}

.header {
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  .user_info_box {
    display: inline-flex;
    width: 36px;
    height: 36px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  > ul {
    //max-width: 1200px;
    margin: 0 10px;
    align-items: center;
    border-bottom: none;
    a {
      float: left;
      height: 66px;
      line-height: 66px;
      width: 61px;
      text-decoration: none;
      color: #ffffff;
    }
    li {
      font-family: PingFangSC-Semibold, PingFang SC;
      line-height: 66px;
      height: 66px;
      .login_btn {
        color: #ffffff;
        background: #001238
          linear-gradient(233deg, #ffa373 0%, #ea5ef7 48%, #776cf3 100%);
        padding: 10px 28px;
        border: none;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .header > ul {
    margin: 10px;
    padding-bottom: 10px;
    margin-bottom: 0;
  }
  .header > ul li {
    height: 40px !important;
    line-height: 40px !important;
  }
  .header > ul a {
    height: 40px !important;
    line-height: 40px !important;
    padding: 0 10px !important;
  }
  .el-menu-item {
    padding: 0 6px !important;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title,
  .el-submenu.is-active .el-submenu__title,
  .el-menu--horizontal > .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
}
</style>