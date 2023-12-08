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
          <div class="step-span"><span>② </span>同事填写并保存</div>
          <div class="step-span"><span>③ </span>您统一提交</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["InvitationFillingdialogVisble", "InvitationFillingdialogMsg"], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("InvitationFillingdialogMsg", false);
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
  }
}
</style>

<style lang="less" scoped>
::v-deep(.el-dialog) {
  background: #fff !important;
}
</style>
