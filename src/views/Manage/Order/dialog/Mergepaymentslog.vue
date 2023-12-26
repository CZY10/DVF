<template>
  <div>
    <el-dialog
      :visible.sync="MergepaymentslogVisible"
      width="360px"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      center
    >
      <div class="Mergepayments">
        <div class="title">
          <span class="iconfont icon-cg"></span
          ><span class="titletext">支付成功</span>
        </div>

        <ul>
          <li>
            <div></div>
            请尽快将样品寄送给红人(收货地址见“查看地址”)，如已寄送，请及时上传样品寄送信息；
          </li>
          <li>
            <div></div>
            定金支付后平台将开始匹配并对接红人，预计1-2个工作日会收到反馈，敬请留意~
          </li>
        </ul>

        <div class="btn">
          <button @click="beforeClose">知道了</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["MergepaymentslogVisible", "getMergepaymentslogMsg"], //通过props接收父组件传递的值
  data() {
    return {};
  },
  methods: {
    beforeClose() {
      this.$emit("getMergepaymentslogMsg", false);
    },
  },
};
</script>

<style lang="less" scoped>
.Mergepayments {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 18px;
    .icon-cg {
      position: static !important;
    }
    .titletext {
      margin-left: 5px;
      margin-bottom: 1px;
      font-weight: 600;
      color: #333333;
      font-size: 16px;
    }
  }
  ul {
    margin-top: 22px;
    li {
      color: #666666;
      margin-bottom: 15px;
      padding-right: 4px;
      div {
        width: 4px;
        height: 4px;
        background: #666666;
        border-radius: 50%;
        float: left;
        margin-top: 7px;
        margin-right: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 28px;
    button {
      width: 120px;
      height: 32px;
      background: #d161f6;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      border: none;
    }
  }
}
</style>

<style lang="less" scoped>
::v-deep(.el-dialog__header) {
  padding: 0 !important;
}
</style>
