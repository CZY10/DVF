<template>
  <div>
    <el-dialog
      title="同事填写，您来提交"
      :visible.sync="InvitationFillingdialogVisble"
      width="432px"
      :before-close="beforeClose"
      center
    >
      <div class="InvitationFillingdialog">
        <div class="step">
          <div class="step-span"><span>① </span>分享链接</div>
          <i class="iconfont icon-step"></i>
          <div class="step-span"><span>② </span>同事填写并保存</div>
          <i class="iconfont icon-step"></i>
          <div class="step-span"><span>③ </span>您统一提交</div>
        </div>

        <div class="title">
          <h1>在线填写链接</h1>
          <span>(同事填写后，会同步到当前页面)</span>
        </div>

        <div class="link">
          <p>{{ link }}</p>
        </div>

        <div class="button">
          <el-button
            :class="{ btn: true, ifcopy: ifcopy }"
            @click="handleCopy"
            :disabled="ifcopy"
            >{{ btnText }}</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [
    "InvitationFillingdialogVisble",
    "InvitationFillingdialogMsg",
    "InvitationFillingdialoglink",
  ], //通过props接收父组件传递的值
  data() {
    return {
      link: "",
      btnText: "复制",
      ifcopy: false,
    };
  },
  mounted() {},
  methods: {
    beforeClose() {
      this.$emit("InvitationFillingdialogMsg", false);
    },

    // 复制
    handleCopy() {
      // 创建一个textarea元素
      let textarea = document.createElement("textarea");
      // 将要复制的内容设置为textarea的值
      textarea.value = this.link;
      // 将textarea添加到DOM中
      document.body.appendChild(textarea);
      // 选择textarea中的文本
      textarea.select();
      // 执行复制命令
      document.execCommand("copy");
      // 从DOM中移除textarea
      document.body.removeChild(textarea);

      this.btnText = "已复制，去分享吧~";
      this.ifcopy = true;
    },
  },
  watch: {
    InvitationFillingdialogVisble(newval) {
      if (newval == true) {
        this.link =
          window.location.origin +
          "/Invitationfilling" +
          this.InvitationFillingdialoglink;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.InvitationFillingdialog {
  .step {
    height: 33px;
    background: #faf6ff;
    border-radius: 1px;
    border: 1px solid #eeeeee;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    .step-span {
      display: flex;
      align-items: center;
      color: #666;
      span {
        margin-bottom: 3px;
        margin-right: 4px;
        font-size: 15px;
      }
    }
    .icon-step {
      font-size: 12px;
      color: #666666;
      transform: scale(0.5);
      // 解决兼容性问题
      -webkit-transform: scale(0.5);
    }
  }

  .title {
    margin-top: 30px;
    display: flex;
    align-items: center;
    h1 {
      font-weight: 600;
      color: #333333;
      font-size: 15px;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
      margin-left: 3px;
    }
  }

  .link {
    width: 372px;
    height: 80px;
    background: #f8f8f8;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    margin-top: 12px;
    padding: 12px;
    color: #333333;
  }

  .button {
    display: flex;
    justify-content: center;
    margin-top: 28px;
    .btn {
      width: 160px;
      height: 32px;
      background: #d161f6;
      border-radius: 5px;
      line-height: 8px;
      color: #fff;
    }

    .ifcopy {
      background: #edc0fb !important;
    }
  }
}
</style>

<style lang="less" scoped>
::v-deep(.el-dialog) {
  background: #fff !important;
}
</style>
