<template>
  <div>
    <div class="footer">
      <el-row
        :gutter="54"
        style="max-width: 1200px; margin: auto; padding-bottom: 28px"
      >
        <!--                <el-col :span="5" style="padding-left: 0">-->
        <!--                    <div style="max-width: 180px;margin: auto">-->
        <!--                        <img :src="formData.footerlogo" alt="">-->
        <!--                    </div>-->
        <!--                    <p style="text-align: center;margin-top: 10px">{{ formData.name }}</p>-->
        <!--                </el-col>-->
        <el-col :span="14">
          <p class="title">关于我们</p>
          <p>
            微胖联盟是由百佬汇旗下vipon与行业内资深合作伙伴共同发起的组织，旨在规范跨境行业服务标准，为亚马逊卖家提供专业的站外推广及买家秀视频拍摄服务。
          </p>
          <p>
            我们拥有多家官方渠道deal资源与500+本土签约达人，为客户提供一手报价，并严格把关交付质量。
          </p>
          <p>
            我们秉承以优质服务赢取客户信赖，以满意效果换取客户复购的经营理念，始终致力于提升服务水平，为客户创造更大的价值。
          </p>
        </el-col>
        <el-col :span="5">
          <p class="title">联系我们</p>
          <p><span>客服</span>{{ formData.phone }}</p>
          <p><span>合作</span>{{ formData.cooperation }}</p>
          <!-- <p><span>邮箱</span>{{ formData.email }}</p> -->
          <p><span>邮箱</span>ceo@viponltd.com</p>
        </el-col>
        <el-col :span="4" style="padding-right: 0">
          <el-col :span="12" style="padding: 0">
            <div class="qr_code">
              <img :src="formData.wechat" />
            </div>
            <p style="text-align: center; margin-top: 8px">微信咨询</p>
          </el-col>
          <el-col :span="12" style="padding: 0">
            <div class="qr_code"><img :src="formData.chat" alt="" /></div>
            <p style="text-align: center; margin-top: 8px">公众号</p>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="footer" style="padding-top: 0">
      <el-row style="max-width: 1200px; margin: auto">
        <p class="keep_on_record">
          © 2022. {{ formData.companyname }}版权所有
          <a href="https://beian.miit.gov.cn/" target="_blank">{{
            formData.beian
          }}</a>
        </p>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getConfig } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "index",
  data() {
    return {
      formData: {},
    };
  },
  mounted() {
    if (localStorage.getItem("configObj")) {
      this.formData = JSON.parse(localStorage.getItem("configObj"));
    } else {
      this.getContent();
    }
  },
  methods: {
    //获取公共配置信息
    getContent() {
      getConfig()
        .then((res) => {
          if (res.code === 1) {
            this.formData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  background: rgba(0, 8, 39, 1);
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  padding-top: 50px;
  img {
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #e6e8eb;
    line-height: 22px;
    padding-bottom: 19px;
  }
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(204, 208, 215, 0.8);
    line-height: 24px;
    padding-bottom: 19px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #e6e8eb;
      line-height: 20px;
      margin-right: 16px;
    }
  }
  .qr_code {
    padding: 4px;
    max-width: 72px;
    max-height: 72px;
    box-sizing: border-box;
    background: #ffffff;
    margin: auto;
    img {
      width: 100%;
      height: auto;
    }
  }
  .keep_on_record {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ccd0d7;
    line-height: 20px;
    padding: 20px 0;
    a {
      color: #ccd0d7;
      text-decoration: none;
    }
  }
}
</style>
