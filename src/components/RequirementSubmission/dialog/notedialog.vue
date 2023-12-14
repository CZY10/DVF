<template>
  <div>
    <el-dialog
      :visible.sync="NotedialogdialogVisible"
      width="880px"
      :show-close="true"
      center
    >
      <div class="notedialog">
        <div class="notedialog-left">
          <ul>
            <li
              @click="getscrollTop(0)"
              :class="{ notedialogLi: notedialogLi[0] }"
            >
              • 业务流程
            </li>
            <li
              @click="getscrollTop(90)"
              :class="{ notedialogLi: notedialogLi[1] }"
            >
              • 红人匹配
            </li>
            <li
              @click="getscrollTop(250)"
              :class="{ notedialogLi: notedialogLi[2] }"
            >
              • 多个视频拍摄
            </li>
            <li
              @click="getscrollTop(350)"
              :class="{ notedialogLi: notedialogLi[3] }"
            >
              • 付款问题
            </li>
            <li
              @click="getscrollTop(450)"
              :class="{ notedialogLi: notedialogLi[4] }"
            >
              • 视频交付
            </li>
            <li
              @click="getscrollTop(627)"
              :class="{ notedialogLi: notedialogLi[5] }"
            >
              • 交付周期
            </li>
            <li
              @click="getscrollTop(747)"
              :class="{ notedialogLi: notedialogLi[6] }"
            >
              • 视频版权
            </li>
            <li
              @click="getscrollTop(867)"
              :class="{ notedialogLi: notedialogLi[7] }"
            >
              • 免责声明
            </li>
          </ul>
        </div>
        <div class="notedialog-rigth">
          <h1>拍摄须知</h1>
          <ul
            :scroll-top="scrollTop"
            @scroll="updateScroll"
            ref="scrollContainer"
          >
            <li>
              <h2>一、业务流程</h2>
              <p>
                <span>①</span>
                提交需求并支付定金><span>②</span> 匹配红人><span>③</span>
                确认红人并支付订单><span>④</span>
                寄送样品并反馈物流信息><span>⑤</span>视频拍摄><span>⑥</span>
                交付完成
              </p>
              <p>
                其中，<span class="spanbj">
                  <span>①、②、④</span>
                  需要您配合并及时完成
                </span>
                ，请您留意平台消息及账号经理的反馈
              </p>
            </li>
            <li>
              <h2>二、红人匹配</h2>
              <p>
                <span>① </span>若<span class="spanbj">未选择意向红人</span
                >，平台将根据产品及拍摄要求为您推荐最合适的红人，该方式有利于加快交付
              </p>
              <p>
                <span>② </span>
                <span
                  >若选择了意向红人，平台将按顺序为您匹配意向红人，如果所有意向红人均未匹配成功，则会根据产品及拍摄要求为您推荐最合适的红人</span
                >
              </p>
            </li>
            <li>
              <h2>三、多个视频拍摄</h2>
              <p>
                <span>① </span>若如需要为<span class="spanbj"
                  >同变体或同型号</span
                >的产品拍摄多个视频，请通过数字键“
                <span class="spanbj">+</span>
                ”进行设置添加，系统将自动创建多笔订单信息
              </p>
              <p>
                <span>② </span>
                如需需要为产品的<span class="spanbj">不同变体或不同型号</span
                >拍摄多个视频，请通过“<span class="spanbj">复制</span
                >”按钮创建变体拍摄需求
              </p>
            </li>
            <li>
              <h2>四、付款问题</h2>
              <p>
                <span>① </span
                >每个视频的定金为9.9元，定金随时可申请退还，支付定金后平台才正式开始匹配红人
              </p>
              <p>
                <span>② </span>
                在达人匹配成功后，请您及时确认并支付订单金额，<span
                  class="spanbj"
                  >支付订单时系统将自动原路退还定金</span
                >
              </p>
              <p>
                <span>③ </span>
                系统目前支持支付宝及微信支付，如需转账或其他方式付款，请联系账号经理
              </p>
            </li>
            <li>
              <h2>五、视频交付</h2>
              <p>
                <span>① </span
                >视频拍摄完后，您可以在“订单信息”中查看并下载该视频，通常7天内有效
              </p>
              <p>
                <span>② </span>
                亚马逊影响力者拍摄的视频通常会由该红人账号上传到亚马逊，并关联到对应的产品，<span
                  class="spanbj"
                  >如您不希望上传至亚马逊请在需求中注明</span
                >
              </p>
              <p>
                <span>③ </span>
                国内用户（使用不可信VPN的)
                可能无法直接在产品关联视频中查看到红人所上传的视频，这是由于亚马逊的风控规则所导致的，不会影响海外买家的正常查看
              </p>
            </li>
            <li>
              <h2>六、交付周期</h2>
              <p>
                <span>① </span>交付时长主要受样品到货时间、红人排期影响，请
                <span class="spanbj">注意及时寄送样品并反馈物流单号信息</span>
              </p>
              <p>
                <span>② </span>
                视频通常会在样品到货后1~3周内完成交付
              </p>
              <p>
                <span>③ </span>
                选择“平台推荐”红人及“红人自由发挥”通常可以缩短交付周期
              </p>
            </li>
            <li>
              <h2>七、视频版权</h2>
              <p>
                <span>① </span>如果你需要视频版权，
                <span class="spanbj">建议选择“含版权专区”的红人</span
                >，这部分红人视频报价已包含版权费用，且可下载源视频
              </p>
              <p>
                <span>② </span>
                如果你选择的不是“含版权专区”的红人，您
                <span class="spanbj"
                  >也可以在“拍摄要求”中注明需要提供视频版权</span
                >
                但通常需要额外支付版权费用
              </p>
            </li>
            <li>
              <h2>八、免责声明</h2>
              <p>
                <span>① </span>提交需求前，请您认真仔细阅读
                <span class="spanbj">《平台售后及免责声明》</span
                >，并确保所提需求符合售后服务规范要求
              </p>
              <p>
                <span>② </span>
                请您务必认真、准确地填写拍摄需求，并在提交前仔细确认，
                <span class="spanbj"
                  >平台不接受任何事后的需求补充及变更行为</span
                >
              </p>
              <p>
                <span>③ </span>
                若您提交的需求存在遗漏、错误，或者表述不明确，由此造成的后果平台将概不负责，平台也
                <span class="spanbj">不接受以此为由申请补拍、重拍或退款</span>
              </p>
            </li>
            <li style="height: 220px"></li>
          </ul>

          <div style="display: flex; justify-content: center; margin-top: 28px">
            <button @click="beforeClose">知道了</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["NotedialogdialogVisible"], //通过props接收父组件传递的值
  data() {
    return {
      scrollTop: 0,
      notedialogLi: [true, false, false, false, false, false, false, false],
    };
  },
  methods: {
    beforeClose() {
      this.$emit("getNotedialogMsg", false);
    },
    updateScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
    getscrollTop(target) {
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const start = this.$refs.scrollContainer.scrollTop;
      const change = target - start;
      const duration = 500;
      let startTime;

      const animateScroll = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = easeInOutQuad(Math.min(elapsed / duration, 1));
        this.$refs.scrollContainer.scrollTop = start + change * progress;
        if (elapsed < duration) requestAnimationFrame(animateScroll);
      };

      requestAnimationFrame(animateScroll);
    },
  },
  mounted() {},
  watch: {
    scrollTop(newval) {
      newval < 90
        ? (this.notedialogLi[0] = true)
        : (this.notedialogLi[0] = false);
      newval < 200 && newval >= 90
        ? (this.notedialogLi[1] = true)
        : (this.notedialogLi[1] = false);
      newval >= 200 && newval < 300
        ? (this.notedialogLi[2] = true)
        : (this.notedialogLi[2] = false);
      newval >= 300 && newval < 400
        ? (this.notedialogLi[3] = true)
        : (this.notedialogLi[3] = false);
      newval >= 400 && newval < 627
        ? (this.notedialogLi[4] = true)
        : (this.notedialogLi[4] = false);
      newval >= 627 && newval < 747
        ? (this.notedialogLi[5] = true)
        : (this.notedialogLi[5] = false);
      newval >= 747 && newval < 867
        ? (this.notedialogLi[6] = true)
        : (this.notedialogLi[6] = false);
      newval >= 867
        ? (this.notedialogLi[7] = true)
        : (this.notedialogLi[7] = false);
    },
    NotedialogdialogVisible(newval) {
      if (newval == false) {
        this.$emit("getNotedialogMsg", false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.notedialog {
  display: flex;
  .notedialog-left {
    width: 182px;
    background: #f1f2f3;
    height: 590px;
    ul {
      padding: 74px 0 0 46px;
      li {
        cursor: pointer;
        margin-bottom: 20px;
        color: #999;
        transition: all 0.3s;
      }

      .notedialogLi {
        font-weight: 600;
        color: #333333;
      }
    }
  }
  .notedialog-rigth {
    flex: 1;
    height: 590px;
    background: #fff;
    h1 {
      margin-top: 30px;
      text-align: center;
      font-weight: 600;
      color: #333333;
      font-size: 16px;
      margin-bottom: 22px;
    }
    ul {
      padding: 0 46px 0 40px;
      height: 430px;
      overflow: auto;
      li {
        line-height: 23px;
        margin-bottom: 20px;
        h2 {
          font-weight: 600;
          color: #333333;
        }
        p {
          .spanbj {
            color: #a06cf3;
          }
        }
      }
    }
  }

  button {
    width: 120px;
    height: 32px;
    background: #d161f6;
    border-radius: 5px;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}
</style>

<style lang="less" scoped>
::v-deep(.el-dialog__header) {
  padding-top: 0px !important;
}

::v-deep(.el-dialog--center .el-dialog__body) {
  padding: 0 !important;
}

::v-deep(.el-dialog) {
  overflow: hidden;
}

::v-deep(.el-dialog__headerbtn) {
  z-index: 1000;
}
</style>
