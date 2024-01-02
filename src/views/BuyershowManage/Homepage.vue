<template>
  <div id="homepage">
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="img">
            <img :src="userInfo.image" alt="" />

            <div class="logo_id">
              <p>
                <i class="iconfont icon-bq"></i>
                <span>含版权</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="rigth"></div>
    </div>
  </div>
</template>

<script>
import { influencerDetail } from "@/api";
export default {
  name: "homepage",
  data() {
    return {
      id: "",
      userInfo: {},
    };
  },
  mounted() {
    this.id = window.location.href.substr(
      window.location.href.lastIndexOf(":") + 1
    );
    this.getInfluencerDetail();
  },
  methods: {
    getInfluencerDetail() {
      influencerDetail({
        id: this.id,
      })
        .then((res) => {
          if (res.code === 1) {
            this.userInfo = res.data;
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
#homepage {
  min-height: calc(100vh - 66px);
  background: #f1f4f7
    linear-gradient(225deg, #e6e9fe 0%, #f7f8fa 20%, #ecf2ff 60%, #eee5fc 100%);
  overflow: hidden;
  .content {
    width: 1200px;
    margin: 30px auto 0;
    display: flex;
    justify-content: space-between;
    .left {
      width: 360px;
      .top {
        height: 744px;
        background: beige;
        border-radius: 6px;
        overflow: hidden;
        .img {
          width: 100%;
          height: 364px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .logo_id {
            position: absolute;
            right: -2px;
            top: 0;
            p {
              position: relative;
              i {
                color: #ffdd99;
                font-size: 23px;
                position: absolute;
                right: 0;
              }
              span {
                position: absolute;
                right: 7px;
                top: 3px;
                white-space: nowrap;
                color: #4e3003;
                font-size: 12px;
              }
            }
          }
        }
      }
      .bottom {
        height: 501px;
        background: darkcyan;
        margin-top: 20px;
      }
    }
    .rigth {
      width: 820px;
      background: saddlebrown;
    }
  }
}
</style>
