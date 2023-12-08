<template>
  <div id="consult_dialog">
    <div class="dialog" v-show="visible">
      <div class="dialog_content">
        <span class="dialog_close" @click="handleClose">
          <!--                    <img src="../../assets/images/home/close.png" alt="">-->
        </span>
        <h3>扫码添加账号经理</h3>
        <div class="qr_code">
          <img src="../../assets/images/home/contact_me_qr.png" alt="" />
          <span class="left"></span>
          <span class="right"></span>
        </div>
        <p class="description_title">您可获取以下福利</p>
        <ul class="dialog_description">
          <li>
            <span class="dialog_no">01</span>价值<b
              ><span style="font-size: 14px">￥</span>99</b
            >元《产品推广诊断建议》
          </li>
          <li>
            <span class="dialog_no">02</span>买家秀首单优惠<b
              ><span style="font-size: 14px">￥</span>50</b
            >元
          </li>
          <li>
            <span class="dialog_no">03</span>买家团购买10单<b
              ><span style="font-size: 14px">免</span>1<span
                style="font-size: 14px"
                >单</span
              ></b
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isShowDialog: this.visible,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="less">
#consult_dialog {
  .dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: grid;
    align-items: center;
    .dialog_content {
      width: 382px;
      height: 545px;
      position: relative;
      background: #fff;
      //box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      box-sizing: border-box;
      border-radius: 20px;
      margin: 0 auto !important;
      background: url("../../assets/images/home/dialog_bg.webp");
      background-size: 100% 100%;
      .dialog_close {
        position: absolute;
        right: 51px;
        top: 20px;
        width: 12px;
        height: 12px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h3 {
        padding: 30px 0 22px 0;
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
        text-align: center;
      }
      .qr_code {
        width: 220px;
        height: 220px;
        background: #ffffff;
        border: 1px solid #eeeeee;
        margin: auto;
        position: relative;
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          top: -1px;
          border-top: 1px solid #333333;
        }
        &::before {
          left: -1px;
          border-left: 1px solid #333333;
        }
        &::after {
          right: -1px;
          border-right: 1px solid #333333;
        }
        .left,
        .right {
          position: absolute;
          width: 7px;
          height: 7px;
          bottom: -1px;
          border-bottom: 1px solid #333333;
        }
        .left {
          left: -1px;
          border-left: 1px solid #333333;
        }
        .right {
          right: -1px;
          border-right: 1px solid #333333;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .description_title {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        padding: 57px 0 0 0;
        text-align: center;
      }
      .dialog_description {
        margin: auto;
        width: 265px;
        padding-left: 20px;
        li {
          box-sizing: border-box;
          width: 265px;
          height: 36px;
          line-height: 34px;
          font-family: GothamHTF, PingFangSC-Regular, PingFang SC, "微软雅黑",
            Verdana, Arial, Helvetica, sans-serif;
          background: rgba(255, 255, 255, 0.21);
          border-radius: 0px 100px 100px 0px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          margin-top: 10px;
          position: relative;
          padding-left: 30px;
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          .dialog_no {
            position: absolute;
            left: -20px;
            top: -1px;
            width: 36px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: #ffb070;
            font-size: 16px;
            font-family: Montreal-Bold, Montreal;
            font-weight: bold;
            color: #ffffff;
            border-radius: 50%;
          }
          > b {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC, "微软雅黑", Verdana,
              Arial, Helvetica, sans-serif;
            color: #fffa00;
          }
        }
      }
    }
  }
}
</style>
