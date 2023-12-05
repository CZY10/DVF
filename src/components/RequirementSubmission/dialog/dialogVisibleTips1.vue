<template>
  <div>
    <el-dialog
      :visible.sync="TipsdialogVisible1"
      width="570px"
      :before-close="beforeClose"
      :show-close="false"
      center
    >
      <div class="tips1">
        <h1>
          <span v-if="index == 0">
            点击“
            <div>+</div>
            ” 添加按钮，添加意向红人</span
          >
          <span v-if="index == 1"> 鼠标上下左右拖动，调整红人匹配顺序</span>
          <span v-if="index == 2">
            点击“
            <div style="margin-right: 5px">-</div>
            或
            <div style="margin-left: 5px">+</div>
            ”按钮，为同一变体或型号添加拍摄数量</span
          >
          <span v-if="index == 3">
            点击 “<i
              class="iconfont icon-fz"
              style="font-size: 14px; color: #796cf3; margin: 3px 5px 0 0"
            ></i>
            复制”按钮，为对应变体，快速创建需求</span
          >
        </h1>
        <img :src="imgurl[index]" alt="" />
        <div class="btn">
          <button @click="beforeClose">跳过</button>
          <button @click="goOne">下一步</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["TipsdialogVisible1"], //通过props接收父组件传递的值
  data() {
    return {
      imgurl: [
        require("@/assets/images/tipsImg/tips1.webp"),
        require("@/assets/images/tipsImg/step2.webp"),
        require("@/assets/images/tipsImg/tips3.webp"),
        require("@/assets/images/tipsImg/tips4.webp"),
      ],
      index: 0,
    };
  },
  methods: {
    beforeClose() {
      this.$emit("getTipsdialogVisible1", false);
      setTimeout(() => {
        this.index = 0;
      }, 1000);
    },
    goOne() {
      this.index++;
      if (this.index == 4) {
        this.beforeClose();
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep(.el-dialog) {
  border-radius: 8px;
}

::v-deep(.el-dialog__body) {
  padding: 0 !important;
}
</style>

<style lang="less" scoped>
.tips1 {
  h1 {
    color: #333;
    font-weight: 600;
    padding-left: 30px;
    span {
      display: flex;
      div {
        width: 17px;
        height: 17px;
        background: #eeeeee;
        border-radius: 50%;
        text-align: center;
        color: #c5c3c3;
        line-height: 17px;
      }
    }
  }
  img {
    padding: 15px;
  }
  .btn {
    display: flex;
    justify-content: center;
    padding-bottom: 22px;
    button {
      width: 100px;
      height: 32px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      margin: 0 10px;
    }
    button:nth-child(1) {
      background: #ffffff;
      border: 1px solid #cccccc;
      color: #999999;
    }
    button:nth-child(2) {
      background: #d161f6;
      color: #ffffff;
    }
  }
}
</style>
