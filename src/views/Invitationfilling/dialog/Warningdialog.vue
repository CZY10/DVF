<template>
  <div>
    <el-dialog
      :visible.sync="Warningdialog"
      width="320px"
      :before-close="beforeClose"
      center
    >
      <div>
        <div class="hearder">
          <i class="el-icon-warning"></i>
          <div>注意</div>
        </div>

        <div class="content">您的需求还未上传，提报人无法接收</div>

        <div class="btn">
          <button class="outbtn" @click="closeWindow">离开</button>
          <el-button class="button" @click="beforeClose">立即上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["Warningdialog", "getWarningdialogMsg"], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("getWarningdialogMsg", false);
    },

    /**
     * 关闭浏览器窗口
     */
    closeWindow() {
      var userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") !== -1 ||
        userAgent.indexOf("Chrome") !== -1
      ) {
        window.location.replace("about:blank");
      } else {
        window.opener = null;
        window.open("", "_self");
      }
      window.close();
    },
  },
};
</script>

<style lang="less" scoped>
.hearder {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-warning {
    margin-right: 5px;
    color: #ed5832;
    font-size: 18px;
  }
}

.content {
  margin-top: 22px;
  text-align: center;
  color: #666666;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 52px;
  .button {
    width: 120px;
    height: 32px;
    background: #d161f6;
    border-radius: 5px;
    line-height: 0px;
    color: #fff;
    margin: 0 5px;
  }
  .outbtn {
    width: 120px;
    height: 32px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    cursor: pointer;
    background: #fff;
    color: #999;
    margin: 0 5px;
  }
}

::v-deep(.el-dialog__body) {
  padding: 0 30px 24px;
}

::v-deep(.el-dialog) {
  background: #fff;
}
</style>
