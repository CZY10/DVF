<template>
  <div id="homepage">
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="img">
            <img :src="userInfo.image" />

            <div class="logo_id">
              <p>
                <i class="iconfont icon-bq"></i>
                <span>含版权</span>
              </p>
            </div>
          </div>

          <div class="information">
            <div class="id-money">
              <div class="id-moneyleft">
                <span class="id">No.{{ userInfo.user_id }}</span>
                <div
                  :class="{
                    yxlz: userInfo.type == '影响力者',
                    smhr: userInfo.type == '社媒红人',
                    sr: userInfo.type == '素人',
                    szr: userInfo.type == '数字人',
                  }"
                >
                  {{ userInfo.type }}
                </div>
              </div>
              <p class="id-moneyrigth">
                <span class="money">￥1203</span>
              </p>
            </div>

            <ul class="classification">
              <li v-for="(item, index) in userInfo.category_ids" :key="index">
                {{ item.name }}
              </li>
            </ul>

            <hr />

            <div class="Introductionitem">
              <div class="name">国家</div>
              <div class="content1">
                <img :src="userInfo.country_id?.image" />
                <span>{{ userInfo.country_id?.name }}</span>
              </div>
            </div>
            <div class="Introductionitem">
              <div class="name">性别</div>
              <div class="content2">
                <i
                  class="el-icon-female"
                  v-if="userInfo.genderdata == 'female'"
                ></i>
                <i class="el-icon-male" v-else></i>
                <span>{{ userInfo.genderdata == "female" ? "女" : "男" }}</span>
              </div>
            </div>
            <div class="Introductionitem">
              <div class="name">年龄</div>
              <div class="content1">
                <span style="margin-right: 2px">{{ userInfo.age }}</span
                ><span>岁</span>
              </div>
            </div>
            <div class="Introductionitem">
              <div class="name">社交平台</div>
              <ul class="content3">
                <li v-for="(item, index) in userInfo.platform" :key="index">
                  <img :src="item.image" />
                </li>
              </ul>
            </div>
            <div class="Introductionitem">
              <div class="name">交付周期</div>
              <div class="content4">
                <span>{{ userInfo.leadtime_id }}</span
                ><b>（样品收货后）</b>
              </div>
            </div>

            <button>
              <i class="iconfont icon-gwc"></i>
              <span>选择</span>
            </button>
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
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        .img {
          width: 100%;
          height: 364px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-right-radius: 8px;
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

        .information {
          padding: 20px;
          .id-money {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .id-moneyleft {
              display: flex;
              align-items: center;
              .id {
                font-weight: 600;
                color: #333333;
                font-size: 22px;
              }
              div {
                font-size: 12px;
                height: 22px;
                line-height: 22px;
                padding: 0 5px;
                margin-left: 12px;
                border-radius: 2px;
              }
              .yxlz {
                border: 1px solid #daeee9;
                color: #00d9ad;
              }
              .smhr {
                border: 1px solid #eedae9;
                color: #f44eff;
              }
              .sr {
                border: 1px solid #eee4da;
                color: #f56422;
              }
              .szr {
                border: 1px solid #dae6ee;
                color: #00b2ff;
              }
            }
            .id-moneyrigth {
              .money {
                font-weight: 600;
                color: #ff2c4c;
                font-size: 22px;
              }
            }
          }

          .classification {
            margin-top: 12px;
            overflow: hidden;
            li {
              height: 20px;
              line-height: 20px;
              background: #f2f3f5;
              border-radius: 2px;
              padding: 0 6px;
              color: #666666;
              font-size: 12px;
              margin-right: 6px;
              float: left;
            }
          }
          hr {
            border: none;
            border-top: 1px solid #eee;
            margin: 16px 0 18px;
          }

          .Introductionitem {
            height: 20px;
            line-height: 20px;
            margin-bottom: 14px;
            display: flex;
            .name {
              width: 90px;
              color: #666666;
            }
            .content1 {
              display: flex;
              align-items: center;
              color: #333333;
              img {
                width: 14px;
                margin-right: 3px;
              }
            }
            .content2 {
              color: #333333;
              .el-icon-female {
                color: #f44eff;
              }
              .el-icon-male {
                color: #00b2ff;
              }
              span {
                margin-left: 5px;
              }
            }
            .content3 {
              display: flex;
              li {
                width: 24px;
                height: 24px;
                margin-right: 7px;
                border: 1px solid #eeeeee;
                border-radius: 50%;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
            .content4 {
              span {
                color: #333333;
              }
              b {
                font-size: 12px;
                font-weight: 400;
                color: #999;
              }
            }
          }

          button {
            height: 34px;
            background: #d161f6;
            border-radius: 4px;
            width: 100%;
            margin-top: 4px;
            border: none;
            cursor: pointer;
            color: #fff;
            i {
              margin-right: 3px;
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
