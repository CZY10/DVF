<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="TipsdialogdialogVisible"
      width="30%"
      :before-close="beforeClose"
    >
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["TipsdialogdialogVisible", "getTipsdialogMsg"], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("getTipsdialogMsg", false);
    },
  },
};
</script>

<style></style>
