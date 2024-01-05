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
                <span class="money" v-if="userInfo.price_type == 0"
                  >￥{{ userInfo.price }}</span
                >

                <span class="money" v-else-if="userInfo.price_type == 1">
                  ￥{{ userInfo.lower_price }}-{{ userInfo.highest_price }}
                </span>

                <span class="money" v-else style="font-size: 16px">
                  视产品而定
                </span>
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

            <button @click="addlist" :class="{ Donotclick: Donotclick }">
              <span class="icon">+</span>
              <i class="iconfont icon-gwc"></i>
              <span>{{ Donotclick ? "已选择" : "选择" }}</span>
            </button>
          </div>
        </div>
        <div class="bottom">
          <h1>生活照</h1>

          <ul v-if="Lifephotoslist.length != 0" ref="Lifephotoslistdom">
            <li v-for="(item, index) in Lifephotoslist" :key="index">
              <el-image :src="item.image" :preview-src-list="srcList" />
            </li>
          </ul>

          <div class="emptyimg" v-else>
            <img src="@/assets/images/empty_img.png" />
            <p>暂无照片</p>
          </div>
        </div>
      </div>
      <div class="rigth">
        <div class="top">
          <h1>个人简介</h1>
          <ul>
            <li v-for="(item, index) in userInfo.signature" :key="index">
              <span class="dian"></span> <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="Tabs">
            <div :class="{ ifVideoImages: ifVideoImages }">
              <span @click="ifVideoImages = !ifVideoImages">视频</span>
            </div>
            <div :class="{ ifVideoImages: !ifVideoImages }">
              <span @click="ifVideoImages = !ifVideoImages">图片post</span>
            </div>
          </div>
          <div class="videoimages">
            <div class="switch" ref="switch">
              <div class="video-content">
                <div v-if="videodatas.length > 0">
                  <ul ref="videolistHeigth">
                    <li v-for="item in videodatas" :key="item.id">
                      <div
                        class="cover"
                        @click="addvideoLog(item.file, item.desc)"
                      >
                        <el-image :src="item.coverimage" fit="cover" />
                        <i class="el-icon-caret-right"></i>
                        <div class="masking-out"></div>
                      </div>
                      <p class="desc" :title="item.desc">
                        {{ item.desc }}
                      </p>
                    </li>
                  </ul>
                  <template>
                    <div class="paging">
                      <el-pagination
                        background
                        :page-sizes="[15, 30, 45]"
                        layout="prev, pager, next, sizes, jumper"
                        :total="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                      >
                      </el-pagination>
                    </div>
                  </template>
                </div>

                <div class="emptyimg" v-else>
                  <img src="@/assets/images/empty_img.png" />
                  <p>暂无视频</p>
                </div>
              </div>
              <div class="images-content">
                <div class="emptyimg">
                  <img src="@/assets/images/empty_img.png" />
                  <p>暂无照片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <videoLog
      :videoLog="videoLog"
      @getvideoLog="getvideoLog"
      :videoLogscr="videoLogscr"
      :videoLogtitle="videoLogtitle"
    ></videoLog>
  </div>
</template>

<script>
import {
  influencerDetail,
  carOperate,
  carList,
  getLifephotos,
  getInfluencerVideo,
} from "@/api";
import { mapState } from "vuex";
import store from "@/store";
import videoLog from "./HomepageLog/videoLog.vue";
export default {
  name: "homepage",
  data() {
    return {
      id: "",
      userInfo: {},
      Donotclick: false,
      Lifephotoslist: [],
      srcList: [],
      ifVideoImages: true,
      videodatas: [],
      videoLog: false,
      videoLogscr: "",
      videoLogtitle: "",
      total: 0,
      currentPage: 1,
      pageSize: 15,
      LifephotospageSize: 20,
      Lifephotospage: 1,
      scrollHandler: null,
    };
  },
  computed: {
    ...mapState({
      requirementList: (state) => state.Index.RequirementList,
    }),
  },
  mounted() {
    this.id = window.location.href.substr(
      window.location.href.lastIndexOf(":") + 1
    );
    this.getInfluencerDetail();
    this.getLifephotos();
    this.getvideos();
  },
  methods: {
    //获取红人信息
    getInfluencerDetail() {
      influencerDetail({
        id: this.id,
      })
        .then((res) => {
          if (res.code === 1) {
            this.userInfo = res.data;

            this.Donotclick = this.requirementList.flat().some((item) => {
              return item.user_id == res.data.user_id;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取生活照
    async getLifephotos() {
      let _this = this;
      let data = {
        influencer_id: this.id,
        pageSize: this.LifephotospageSize,
        page: this.Lifephotospage,
      };

      const res = await getLifephotos(data);
      if (res.code == 1) {
        res.data.data.forEach((item) => {
          this.Lifephotoslist.push(item);
          this.srcList.push(item.image);
        });
        if (
          res.data.total >= this.Lifephotoslist.length &&
          this.scrollHandler == null &&
          res.data.total > 20
        ) {
          this.scrollHandler = () => {
            let element = this.$refs.Lifephotoslistdom;
            var scrollBottomDistance =
              element.scrollHeight - element.scrollTop - element.clientHeight;
            if (scrollBottomDistance <= 0) {
              this.Lifephotospage++;
              this.getLifephotos();
            }
          };
          this.$nextTick(() => {
            let element = this.$refs.Lifephotoslistdom;
            element.addEventListener("scroll", this.scrollHandler);
          });
        } else {
          let element = this.$refs.Lifephotoslistdom;
          element?.removeEventListener("scroll", this.scrollHandler);
        }
      }
    },

    //获取视频列表
    async getvideos() {
      let data = {
        influencer_id: this.id,
        page: this.currentPage,
        pageSize: this.pageSize,
      };

      const res = await getInfluencerVideo(data);
      if (res.code == 1) {
        this.videodatas = res.data.data;
        this.total = res.data.total;
        this.$nextTick(() => {
          document.getElementsByClassName(
            "el-pagination__jump"
          )[0].childNodes[0].nodeValue = "跳转";
        });
      }
    },

    //添加需求
    async addlist() {
      if (this.Donotclick == false) {
        this.Donotclick = true;
        this.createBall(event.clientX - 20, event.clientY - 20);
        const res = await carOperate({
          influencer_id: this.userInfo.user_id,
          type: 1,
        });
        if (res.code == 1) {
          carList().then((res) => {
            store.commit("Index/setRequirementList", res.data.list);
            store.commit("Index/setRequirementFirst", res.data.first);
          });
        }
      }
    },

    //播放视频
    addvideoLog(url, name) {
      this.videoLogscr = url;
      this.videoLogtitle = name;
      this.videoLog = true;
    },

    createBall(left, top) {
      const bar = document.createElement("ball");
      bar.style.position = "fixed";
      bar.style.left = left + "px";
      bar.style.top = top + "px";
      bar.style.width = "30px";
      bar.style.height = "30px";
      bar.style.borderRadius = "50%";
      bar.style.backgroundColor = "#d161f6";
      bar.style.transition =
        "left .6s linear, top .6s cubic-bezier(0.5, 0.5, 1, 1)";
      document.body.appendChild(bar);
      setTimeout(() => {
        const x = document.body.clientWidth - 400;
        const y = 0;
        bar.style.top = y + "px";
        bar.style.left = x + "px";
      }, 0);
      bar.ontransitionend = function () {
        this.remove();
      };
    },

    getvideoLog(val) {
      this.videoLog = val;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getvideos();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getvideos();
    },
  },
  watch: {
    requirementList(newValue) {
      this.Donotclick = newValue.flat().some((item) => {
        return item.user_id == this.userInfo.user_id;
      });
    },
    ifVideoImages(newValue) {
      if (newValue) {
        this.$refs.switch.style.left = 0;
      } else {
        this.$refs.switch.style.left = "-820px";
      }
    },
    pageSize(newval) {
      switch (newval) {
        case 30:
          this.$refs.videolistHeigth.style.maxHeight = 2000 + "px";
          break;
        case 45:
          this.$refs.videolistHeigth.style.maxHeight = 3000 + "px";
          break;
        default:
          this.$refs.videolistHeigth.style.maxHeight = 1000 + "px";
          break;
      }
    },
  },
  components: {
    videoLog,
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
            transition: all 0.3s;
            padding-right: 13px;
            i {
              margin-right: 3px;
            }
            .icon {
              font-weight: 900;
              margin-bottom: 2px;
              opacity: 0;
              transition: all 0.3s;
              margin-right: 2px;
            }
          }

          button:hover {
            background: #c034ee;
          }
          button:hover .icon {
            opacity: 1;
          }

          .Donotclick {
            background: #ccc;
          }
          .Donotclick:hover {
            background: #ccc;
          }
          .Donotclick:hover .icon {
            opacity: 0;
          }
        }
      }
      .bottom {
        height: 500px;
        background: #fff;
        margin-top: 20px;
        padding: 15px 20px 20px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        h1 {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          padding-bottom: 15px;
        }

        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          height: 428px;
          // height: 200px;
          overflow-y: auto;
          width: 101%;
          padding-right: 13px;
          li {
            width: 104px;
            height: 104px;
            margin-bottom: 4px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .emptyimg {
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          img {
            width: 200px;
          }
          p {
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
    .rigth {
      width: 820px;
      .top {
        width: 100%;
        padding: 16px 20px 26px;
        background: #ffffff;
        border-radius: 6px;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        h1 {
          font-weight: 600;
          color: #333333;
          font-size: 16px;
        }

        ul {
          margin-top: 30px;
          padding-left: 20px;
          li {
            display: flex;
            align-items: center;
            color: #666666;
            margin-bottom: 10px;
            .dian {
              width: 4px;
              height: 4px;
              display: block;
              background: #666666;
              border-radius: 50%;
              margin-right: 6px;
            }
          }
        }
      }

      .bottom {
        margin-top: 20px;
        width: 100%;
        padding-bottom: 20px;
        .Tabs {
          height: 58px;
          background: #ffffff;
          border-radius: 6px;
          display: flex;
          padding: 0 30px;
          div {
            line-height: 58px;
            margin-right: 30px;
            color: #999999;
            font-size: 16px;
            transition: all 0.3s;
            border-bottom: 2px solid #fff;
            span {
              cursor: pointer;
            }
          }
          .ifVideoImages {
            font-weight: 600;
            color: #333333;
            border-bottom: 2px solid #333333;
          }
        }

        .videoimages {
          width: 100%;
          overflow: hidden;
          margin-top: 10px;
          .switch {
            width: 1640px;
            display: flex;
            position: relative;
            left: 0;
            transition: all 0.5s ease 0s;

            div {
              width: 820px;
              .emptyimg {
                height: 700px;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                background: #ffffff;

                img {
                  width: 200px;
                }
                p {
                  color: #999999;
                  font-size: 12px;
                }
              }
            }
            .video-content {
              border-radius: 6px;
              ul {
                max-height: 1000px;
                min-height: 1000px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-content: flex-start;
                transition: all 0.3s;
                overflow: hidden;
                li {
                  width: 266px;
                  height: 190px;
                  background: #fff;
                  border-radius: 6px;
                  overflow: hidden;
                  margin-bottom: 10px;
                  .cover {
                    width: 100%;
                    height: 149px;
                    position: relative;
                    cursor: pointer;
                    .el-image {
                      width: 100%;
                      height: 100%;
                    }
                    .masking-out {
                      width: 266px;
                      height: 80px;
                      background: linear-gradient(
                        360deg,
                        rgba(0, 0, 0, 0.89) 0%,
                        rgba(0, 0, 0, 0) 100%
                      );
                      z-index: 10;
                      position: absolute;
                      bottom: 0;
                      pointer-events: none;
                    }
                    .el-icon-caret-right {
                      width: 30px;
                      height: 30px;
                      background: rgba(0, 0, 0, 0.4);
                      border-radius: 50%;
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      margin: auto;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    .el-icon-caret-right:before {
                      color: #fff;
                      font-size: 22px;
                    }
                  }
                }
              }
              .desc {
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 20px;
                color: #333333;
                font-size: 12px;
                margin-top: 12px;
              }

              .paging {
                margin-top: 20px;
                .el-pagination {
                  display: flex;
                  justify-content: center;
                }
              }
            }
            .images-content {
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
::v-deep(.el-pagination__jump) {
  margin-left: 0;
}

::v-deep(.el-pagination__sizes .el-input .el-input__inner:hover) {
  border-color: #d161f6;
}

::v-deep(.el-input .el-input__inner:focus) {
  border-color: #d161f6;
}
</style>
