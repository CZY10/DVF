<template>
  <div>
    <el-dialog
      :visible.sync="Successfullyejectedialog"
      width="300px"
      :before-close="beforeClose"
      center
    >
      <div>
        <div class="hearder">
          <i class="iconfont icon-cg"></i>
          <div>上传成功</div>
        </div>

        <div class="content">
          您的需求已上传给提报人，为加快视频交付，请尽快<span>通知提报人</span>下单哦~
        </div>

        <div class="btn">
          <el-button class="button" @click="beforeClose">知道了</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["Successfullyejectedialog", "getSuccessfullyejectedialogMsg"], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("getSuccessfullyejectedialogMsg", false);
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
  .icon-cg {
    margin-right: 60px;
    margin-top: 3px;
  }
  div {
    margin-left: 30px;
  }
}

.content {
  margin-top: 22px;
  text-align: center;
  color: #666666;
  span {
    font-weight: 600;
    color: #333333;
  }
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  .button {
    width: 120px;
    height: 32px;
    background: #d161f6;
    border-radius: 5px;
    line-height: 0px;
    color: #fff;
  }
}

::v-deep(.el-dialog__body) {
  padding: 0 30px 24px;
}

::v-deep(.el-dialog) {
  background: #fff;
}
</style>
