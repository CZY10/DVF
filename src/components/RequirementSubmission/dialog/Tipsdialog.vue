<template>
  <div>
    <el-dialog
      title="温馨提示"
      :visible.sync="TipsdialogdialogVisible"
      width="408px"
      :before-close="beforeClose"
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <p class="prompt_p1">
        1、此处为增加
        <span style="font-weight: 600; color: #333">同一变体或型号</span>
        产品的视频拍摄数量
      </p>

      <p class="prompt_p2">
        2、如需拍摄产品其他变体或型号的视频，请通过
        <span style="font-weight: 600; color: #333">“复制”</span> 按钮进行操作
      </p>

      <div class="prompt_btn">
        <button @click="Dontpromptagain">知道了</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { needsBudgetTip } from "@/api";
export default {
  props: [
    "TipsdialogdialogVisible",
    "getTipsdialogMsg",
    "video_id",
    "reqsearch",
  ], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("getTipsdialogMsg", false);
    },
    async Dontpromptagain() {
      const res = await needsBudgetTip({
        id: this.video_id,
        budget_tip: "2",
      });
      if (res.code == 1) {
        this.reqsearch();
        this.beforeClose();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.prompt_p1 {
  font-size: 14px;
  color: #666666;
}

.prompt_p2 {
  margin-top: 6px;
  line-height: 24px;
}

.prompt_btn {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  button {
    width: 120px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    background: #d161f6;
    color: #fff;
    border-radius: 5px;
  }
}

::v-deep(.el-dialog--center .el-dialog__body) {
  padding: 22px 41px 24px;
}

::v-deep(.el-dialog) {
  background: #fff !important;
}
</style>
