<template>
  <div class="home">
    <div class="banner">
      <!-- :autoplay="false" -->
      <el-carousel height="825px" :interval="3000">
        <el-carousel-item v-for="(item, index) in 2" :key="item">
          <div style="width: 100%; height: 100%">
            <div class="carousel_item carousel-item0" v-if="index == 0">
              <div class="banner1">
                <div class="left">
                  <h1>Amazon Influencer买家秀视频服务</h1>
                  <p class="title">关联视频/主图视频/A+视频/QA视频/广告视频</p>
                  <div class="dome"></div>
                  <ul>
                    <li><i class="iconfont icon-gx"></i>提升产品转化</li>
                    <li><i class="iconfont icon-gx"></i>增加购买信心</li>
                    <li><i class="iconfont icon-gx"></i>抢夺竞品流量</li>
                    <li><i class="iconfont icon-gx"></i>减少售后及差评</li>
                    <li><i class="iconfont icon-gx"></i>红人引流背书</li>
                  </ul>

                  <div class="btn">
                    <button @click="gobuyershow">挑选红人</button>
                    <a href="/videohome" target="_bannk">了解更多></a>
                  </div>
                </div>
                <div class="rigth">
                  <img src="@/assets/images/home/rens.webp" alt="" />
                </div>
              </div>
            </div>
            <div class="carousel_item carousel-item1" v-if="index == 1">
              <div class="banner1">
                <div class="left" style="position: relative; left: 180px">
                  <h1>亚马逊站外推广服务</h1>
                  <p class="title">
                    Slickdeals/DealNews/Techbargains/Ben's
                    Bargains/Vipon/FB群组...
                  </p>
                  <div class="dome"></div>
                  <ul>
                    <li><i class="iconfont icon-gx"></i>官方Deal联盟</li>
                    <li><i class="iconfont icon-gx"></i>一手推广资源</li>
                    <li><i class="iconfont icon-gx"></i>最快当天上贴</li>
                    <li><i class="iconfont icon-gx"></i>效果可追踪</li>
                    <li><i class="iconfont icon-gx"></i>定制推广方案</li>
                  </ul>

                  <div class="btn">
                    <button class="button2" @click="goPromotion">
                      立即推广
                    </button>
                    <a href="/webDeal" target="_bannk">了解更多></a>
                  </div>
                </div>
                <div class="rigth2">
                  <img src="@/assets/images/home/logs.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--拍买家秀-->
    <div class="buyshow ShootingBuyerShows">
      <div class="description_item">
        <li v-for="(item, index) in items" :key="index">
          <img :src="item.img" />
          <div>
            <p>{{ item.title }}</p>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </div>
      <div class="auto1200">
        <div class="flex_between">
          <div class="flex_style header_style">
            <h5>拍买家秀 <i class="iconfont icon-line"></i></h5>
            <span>500+本土达人 签约合作</span>
          </div>
          <div>
            <ul class="flex_style buyshow_type">
              <li
                v-for="(item, index) in influenceList"
                :key="index"
                @click="activeIndex = index"
                :class="activeIndex == index ? 'activeStyle' : ''"
              >
                {{ item.category_name }}
              </li>
              <a :href="token ? '/buyershow' : '/login'"
                ><li style="color: #999999; display: flex; align-items: center">
                  更多
                  <i class="iconfont icon-more" style="font-size: 12px"></i></li
              ></a>
            </ul>
          </div>
        </div>
        <div class="datastyle">
          <div
            :class="{ flex_style: true, item: activeIndex == index }"
            v-for="(i, index) in influenceList"
            :key="index"
          >
            <a
              target="_blank"
              :href="token ? '/homepage:' + item.id : '/login'"
              v-for="(item, ind) in i.influencerList"
              :key="ind"
              class="buyshowItem"
            >
              <div class="item_img"><img :src="item.image" alt="" /></div>
              <div class="flex_between item_pic">
                <h5>NO.{{ item.id }}</h5>
                <div>
                  <b
                    v-if="item.price != '视产品而定'"
                    style="font-weight: normal"
                    >￥</b
                  ><span>{{ item.price }}</span>
                </div>
              </div>
              <div class="flex_between item_title">
                <div class="title_style">{{ item.type }}</div>
                <span>交付{{ item.order_count }}笔</span>
              </div>
            </a>
          </div>
        </div>
        <div class="flex_between button_box">
          <a :href="token ? '/buyershow' : '/login'"
            ><el-button round>挑选达人拍摄</el-button></a
          >
        </div>
      </div>
    </div>

    <!--vipon自主发帖-->
    <div class="vipon_box">
      <div class="auto1200 pt60 pb100">
        <div class="flex_style header_style">
          <h5>Vipon自助发帖 <i class="iconfont icon-line"></i></h5>
          <span>亚马逊站外Deal网站</span
          ><i
            class="iconfont icon-top"
            style="
              font-size: 20px;
              line-height: 57px;
              margin-left: 3px;
              color: #ff9c17;
            "
          ></i>
        </div>
        <div class="vipon_content flex_style">
          <div class="vipon_img">
            <img src="../../assets/images/home/viponwebp.webp" alt="" />
          </div>
          <div class="vipon_text">
            <h5>清库存，推新品，就用VIPON</h5>
            <div class="subtitle">
              已累计帮助52万+亚马逊卖家，清理3568万+件库存
            </div>
            <ul class="vipon_list flex_between">
              <li>
                <h4>55<span>%</span></h4>
                <div>销量最高提升</div>
              </li>
              <li>
                <h4>78<span>%</span></h4>
                <div>库存周期最高缩短</div>
              </li>
              <li>
                <h4>62<span>%</span></h4>
                <div>新品排名最高提升</div>
              </li>
              <li>
                <h4>31<span>%</span></h4>
                <div>营销成本最高减少</div>
              </li>
            </ul>
            <div class="button_box">
              <a style="color: #ffffff"
                ><el-button class="btn_type" @click="goVipon"
                  >发布促销</el-button
                ></a
              >
              <a
                target="_blank"
                href="https://www.myvipon.cn/"
                style="color: #333333"
                ><el-button class="btn_plain">了解Vipon</el-button></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--FB推广-->
    <div class="buyshow">
      <div class="auto1200 pt60">
        <div class="flex_between">
          <div class="flex_style header_style">
            <h5>FB推广 <i class="iconfont icon-line"></i></h5>
            <span>精选群组 效果保障</span>
          </div>
          <div>
            <ul class="flex_style buyshow_type">
              <li
                v-for="(item, index) in fbList"
                :key="index"
                @click="fbActiveIndex = index"
                :class="fbActiveIndex == index ? 'activeStyle' : ''"
              >
                {{ item.type }}
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex_style"
          v-for="(i, index) in fbList"
          :key="index"
          v-show="fbActiveIndex == index"
          style="
            flex-flow: row wrap;
            align-content: flex-start;
            justify-content: flex-start;
          "
        >
          <!-- href="https://seller.vipona.com/account/login" -->
          <a
            target="_blank"
            v-for="(item, ind) in i.productList"
            :key="ind"
            class="fbItem"
            @click="godetailsFb(item)"
          >
            <div class="user_info flex_style">
              <div class="header_img"><img :src="item.logo" alt="" /></div>
              <div class="info_des">
                <h5 class="name">{{ item.name }}</h5>
                <div class="fan_style">
                  <i
                    class="iconfont icon-fs"
                    style="font-size: 16px; color: #999999; margin-right: 4px"
                  ></i
                  >{{ item.fans }}
                </div>
              </div>
            </div>
            <ul class="flex_style">
              <li v-for="(i, index) in item.label" :key="index">{{ i }}#</li>
            </ul>
            <div class="fb_price">
              <span style="color: #ff2c4c; padding-right: 6px; font-size: 12px"
                >￥<span style="font-size: 20px">{{
                  item.discount_price
                }}</span></span
              ><span
                style="
                  color: #999999;
                  font-size: 12px;
                  text-decoration: line-through;
                "
                >¥{{ item.price }}</span
              >
            </div>
          </a>
        </div>
        <div class="flex_between button_box">
          <!-- href="https://seller.vipona.com/account/login" -->
          <a target="_blank" style="color: #ffffff"
            ><el-button round @click="goFB">查看全部</el-button></a
          >
        </div>
      </div>
    </div>

    <!--Deal推广-->
    <div class="buyshow" style="background: #ffffff">
      <div class="auto1200 pt60">
        <div class="flex_style header_style">
          <h5>Deal推广 <i class="iconfont icon-line"></i></h5>
          <span>官方渠道 一手资源</span>
        </div>
        <div
          class="flex_style"
          style="
            flex-flow: row wrap;
            align-content: flex-start;
            justify-content: flex-start;
            min-height: 665px;
          "
        >
          <!-- href="https://seller.vipona.com/account/login" -->
          <a
            target="_blank"
            v-for="(item, index) in dealList"
            :key="index"
            class="dealItem"
            @click="godetailsDeal(item)"
          >
            <div>
              <div class="deal_head">
                <img :src="item.logo" alt="" />
              </div>
              <h5 class="deal_name">
                {{ item.name }}
              </h5>
              <ul class="flex_style deal_list">
                <li v-for="(j, index) in item.label" :key="index">
                  {{ j }}
                </li>
              </ul>
              <div class="fb_price">
                <span
                  style="color: #ff2c4c; padding-right: 6px; font-size: 12px"
                  >￥<span style="font-size: 20px">{{
                    item.discount_price
                  }}</span></span
                ><span
                  style="
                    color: #999999;
                    font-size: 12px;
                    text-decoration: line-through;
                  "
                  >¥{{ item.price }}</span
                >
              </div>
            </div>
          </a>
        </div>
        <div class="flex_between button_box">
          <a target="_blank" style="color: #ffffff"
            ><el-button round @click="goDeal">查看全部</el-button></a
          >
        </div>
      </div>
    </div>

    <!-- 我们的服务 -->
    <div class="buyshow Ourservices">
      <div class="auto1200" style="padding: 100px 0">
        <div class="flex_style header_style">
          <h5>我们的服务 <i class="iconfont icon-line"></i></h5>
          <span>买家秀视频+Deal站推广，一对一专属服务</span>
        </div>

        <div class="boby">
          <ul class="top">
            <li><span>1000</span><span>+</span><span>红人数量</span></li>
            <li><span>100</span><span>+</span><span>渠道</span></li>
            <li><span>50</span><span>+</span><span>售后团队</span></li>
            <li><span>9</span><span></span><span>年资历</span></li>
          </ul>
          <img src="@/assets/images/home/Ourservices.webp" alt="" />
        </div>
      </div>
    </div>

    <!-- 客户反馈 -->
    <div class="Customerfeedback">
      <div class="auto1200" style="padding: 100px 0">
        <div class="flex_style header_style">
          <h5>客户反馈 <i class="iconfont icon-line"></i></h5>
          <span>效果怎么样，客户说了算</span>
        </div>

        <ul
          ref="grid"
          data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 300 }'
        >
          <li
            v-for="(item, index) in Opiniondata"
            :key="index"
            class="grid-item"
          >
            <img :src="item.image" />
          </li>
        </ul>

        <p class="look" v-if="Opiniondata.length == 8">
          <span @click="gethomehighOpinion(OpiniondataTotal, 1000)"
            >查看全部 <i class="el-icon-arrow-down"></i
          ></span>
        </p>

        <p class="look" v-else>
          <span @click="gethomehighOpinion(8, 50)"
            >收起 <i class="el-icon-arrow-up"></i
          ></span>
        </p>
      </div>
    </div>

    <div class="tag_style" v-show="isShowTag">
      <div class="auto1200 flex_between">
        <h5>
          怎么推广，效果最好？
          <span style="margin-left: 30px"
            >免费领取：价值99元<span style="color: #ff9c17"
              >《产品推广诊断建议》</span
            >+买家秀首单<span style="color: #ff9c17">50元优惠</span></span
          >
        </h5>
        <el-button round @click="isShowDialog = true">立即获取</el-button>
      </div>
      <i class="el-icon-close close_btn" @click="isShowTag = false"></i>
    </div>
    <!--footer-->
    <Footer></Footer>
    <ConsultDialog :visible.sync="isShowDialog"></ConsultDialog>
  </div>
</template>

<script>
import {
  influenceData,
  fbData,
  dealData,
  getConfig,
  homehighOpinion,
} from "@/api";
import Footer from "@/components/Footer";
import ConsultDialog from "@/components/ConsultDialog";
import Masonry from "masonry-layout"; // Vue项目的引入方式
import router from "@/router";
export default {
  name: "index",
  components: {
    Footer,
    ConsultDialog,
  },
  data() {
    return {
      activeIndex: 0,
      fbActiveIndex: 0,
      dealList: [],
      fbList: [],
      isShowTag: true,
      token: "",
      influenceList: {},
      formData: {},
      isShowDialog: false,
      fbbaseURLC: `https://hkatest.myvipon.com/hot/fb-detail?id=`,
      ViponSrc: "",
      DealSrc: "",
      FbSrc: "",
      items: [
        {
          title: "上市企业",
          description: "隶属浔兴股份，实力护航",
          img: require("@/assets/images/home/ssqy.webp"),
        },
        {
          title: "签约红人",
          description: "签约本土1000+优质红人",
          img: require("@/assets/images/home/qyhr.webp"),
        },
        {
          title: "严审质量",
          description: "平台严格把控视频质量",
          img: require("@/assets/images/home/yszl.webp"),
        },
        {
          title: "服务保障",
          description: "专业海外团队一对一服务",
          img: require("@/assets/images/home/fwbz.webp"),
        },
        {
          title: "快速交付",
          description: "收货后约1~3周完成交付",
          img: require("@/assets/images/home/ksjf.webp"),
        },
        {
          title: "包含版权",
          description: "200+影响者视频无需另付版权费",
          img: require("@/assets/images/home/bhbq.webp"),
        },
        {
          title: "指定标题/封面",
          description: "支持指定视频标题/封面",
          img: require("@/assets/images/home/zdbt.webp"),
        },
        {
          title: "图片POST",
          description: "支持通过影响者发布产品图片",
          img: require("@/assets/images/home/tppost.webp"),
        },
      ],
      Opiniondata: [],
      OpiniondataTotal: 8,
    };
  },
  created() {
    this.gethomehighOpinion(8, 3000);
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.isShowTag = this.token ? false : true;
    this.handleTakePlanList();
    this.getFBData();
    this.getDealData();
    if (localStorage.getItem("configObj")) {
      this.formData = JSON.parse(localStorage.getItem("configObj"));
    } else {
      this.getContent();
    }
  },

  methods: {
    //   vipon自助发帖跳转
    goVipon() {
      if (window.localStorage.getItem("token")) {
        if (process.env.NODE_ENV == "production") {
          this.ViponSrc = "https://seller.vipona.com/promotion/index";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.ViponSrc, "_black");
        } else if (process.env.NODE_ENV == "development") {
          this.ViponSrc = "https://hkatest.myvipon.com/promotion/index";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.ViponSrc, "_black");
        }
      } else {
        this.$router.push("/login?source=vipon_deal&action=promotion/index");
      }
    },

    goFB() {
      if (window.localStorage.getItem("token")) {
        if (process.env.NODE_ENV == "production") {
          this.FbSrc = "https://seller.vipona.com/hot/fb";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.FbSrc, "_black");
        } else if (process.env.NODE_ENV == "test") {
          this.FbSrc = "https://hkatest.myvipon.com/hot/fb";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.FbSrc, "_black");
        }
      } else {
        this.$router.push("/login?source=vipon_deal&action=hot/fb");
      }
    },
    goDeal() {
      if (window.localStorage.getItem("token")) {
        if (process.env.NODE_ENV == "production") {
          this.DealSrc = "https://seller.vipona.com/hot/deal";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.DealSrc, "_black");
        } else if (process.env.NODE_ENV == "development") {
          this.DealSrc = "https://hkatest.myvipon.com/hot/deal";
          localStorage.removeItem("source");
          localStorage.removeItem("active");
          window.open(this.DealSrc, "_black");
        }
      } else {
        this.$router.push("/login?source=vipon_deal&action=hot/deal");
      }
    },
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
    //获取拍买家秀
    handleTakePlanList() {
      influenceData()
        .then((res) => {
          this.influenceList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取FB推广
    getFBData() {
      fbData()
        .then((res) => {
          if (res.code == 1) {
            this.fbList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取DEAL推广
    getDealData() {
      dealData()
        .then((res) => {
          if (res.code == 1) {
            if (res.data.length > 0) {
              this.dealList = res.data[0].productList;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取主页好评数据
    async gethomehighOpinion(pageSize, time) {
      if (time == 1000) {
        let offsetHeight = this.$refs.grid.offsetHeight;
        this.$refs.grid.style.minHeight = offsetHeight + 1000 + "px";
      }
      if (time == 50) this.$refs.grid.style.minHeight = "auto";

      const res = await homehighOpinion({
        page: 1,
        pageSize,
      });
      if (res.code == 1) {
        this.Opiniondata = res.data.data;
        this.OpiniondataTotal = res.data.total;
        setTimeout(() => {
          new Masonry(this.$refs.grid, {
            // options...
            itemSelector: ".grid-item",
            columnWidth: 300,
          });
          this.$refs.grid.style.opacity = "1";
        }, time);
      }
    },
    gobuyershow() {
      router.push("/buyershow");
    },
    goPromotion() {
      process.env.NODE_ENV == "production"
        ? window.open("https://seller.vipona.com/hot/fb")
        : window.open("https://hkatest.myvipon.com/hot/fb");
    },

    //fb详情页
    godetailsFb(item) {
      let loginHref = `http://testai.blhltd.com`;
      if (process.env.NODE_ENV == "production") {
        this.fbbaseURLC = `https://seller.vipona.com`;
        loginHref = `https://www.viponm.com`;
      } else if (process.env.NODE_ENV == "development") {
        this.fbbaseURLC = `https://hkatest.myvipon.com`;
        loginHref = `http://testai.blhltd.com`;
      } else {
        this.fbbaseURLC = `https://hkatest.myvipon.com`;
        loginHref = `http://localhost:8088`;
      }

      if (localStorage.getItem("token")) {
        window.open(this.fbbaseURLC + `/hot/fb-detail?id=${item.id}`, "_black");
        this.fbbaseURLC = `${this.fbbaseURLC} + /hot/fb-detail?id=`;
      } else {
        window.location.href =
          loginHref +
          `/login?source=vipon_deal&action=hot/fb-detail&id=${item.id}`;
      }
    },
    //Deal详情页
    godetailsDeal(item) {
      let loginHref = `http://testai.blhltd.com`;
      if (process.env.NODE_ENV == "production") {
        this.fbbaseURLC = `https://seller.vipona.com`;
        loginHref = `https://www.viponm.com`;
      } else if (process.env.NODE_ENV == "development") {
        this.fbbaseURLC = `https://hkatest.myvipon.com`;
        loginHref = `http://testai.blhltd.com`;
      } else {
        this.fbbaseURLC = `https://hkatest.myvipon.com`;
        loginHref = `http://localhost:8088`;
      }

      if (localStorage.getItem("token")) {
        window.open(
          this.fbbaseURLC + `/hot/deal-detail?id=${item.id}`,
          "_black"
        );
        this.fbbaseURLC = `${this.fbbaseURLC} + /hot/deal-detail?id=`;
      } else {
        window.location.href =
          loginHref +
          `/login?source=vipon_deal&action=hot/deal-detail&id=${item.id}`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pb100 {
  padding-bottom: 100px;
}
.pt60 {
  padding-top: 60px;
}
.auto1200 {
  max-width: 1200px !important;
  margin: auto;
}
.flex_between {
  display: flex;
  justify-content: space-between;
}
.flex_style {
  display: flex;
}
.home {
  a {
    text-decoration: none !important;
  }
  .header_style {
    padding-bottom: 30px;
    h5 {
      font-size: 32px;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
      position: relative;
      i {
        position: absolute;
        right: 0;
        bottom: -14px;
        color: #999999;
        font-size: 12px;
        font-weight: normal;
      }
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 57px;
      margin-left: 16px;
    }
  }
  .banner {
    .carousel_item {
      height: 100%;
      width: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .banner1 {
        height: 100%;
        display: flex;
        justify-content: center;

        .left {
          margin-top: 144px;
          width: 620px;
          h1 {
            font-size: 38px;
            font-weight: bold;
            color: #ffffff;
            font-style: oblique;
            white-space: nowrap;
          }
          .title {
            font-size: 19px;
            color: #d3d3d3;
            margin-top: 22px;
          }
          .dome {
            width: 36px;
            height: 5px;
            background: #ffffff;
            border-radius: 3px;
            margin-top: 29px;
          }
          ul {
            width: 440px;
            margin-top: 49px;
            li {
              font-size: 21px;
              color: #ffffff;
              float: left;
              margin-right: 59px;
              margin-bottom: 24px;
              i {
                color: #fef76d;
                margin-right: 5px;
              }
            }
          }
          .btn {
            margin-top: 245px;
            font-size: 18px;
            button {
              width: 206px;
              height: 45px;
              background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
              border-radius: 6px;
              cursor: pointer;
              color: #fff;
              border: none;
              font-size: 18px;
              margin-right: 38px;
            }

            a {
              color: #c3c3c3;
            }
            .button2 {
              background: #ff9c17 !important;
            }
          }
        }
        .rigth {
          margin-top: 81px;
        }
        .rigth2 {
          margin-top: 60px;
        }
      }
    }
    .carousel-item0 {
      background-image: url("../../assets/images/home/banner1.webp");
    }
    .carousel-item1 {
      background-image: url("../../assets/images/home/banner2.webp");
    }
  }
  .buyshow {
    background: linear-gradient(225deg, #f2edfa 0%, #f7f8fa 27%, #f7f8fa 100%);
    .description_item {
      position: relative;
      top: -120px;
      z-index: 99;
      margin: 0 auto;
      width: 1200px;
      height: 196px;
      background: #ffffff;
      box-shadow: 0px 10px 12px 0px rgba(162, 164, 166, 0.08);
      border-radius: 12px;
      padding: 30px 45px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      li {
        display: flex;
        width: 21%;
        img {
          width: 70px;
          height: 52px;
        }
        div {
          padding-left: 14px;
          p:nth-child(1) {
            margin: 3px 0 8px 0;
            font-weight: 600;
            color: #333333;
            font-size: 16px;
          }
          p:nth-child(2) {
            font-size: 12px;
            color: #999999;
            white-space: nowrap;
          }
        }
      }
    }
    .buyshow_type {
      li {
        padding: 24px 20px 4px 20px;
        cursor: pointer;
        font-size: 14px;
        color: #666666;
      }
    }
    .activeStyle {
      font-size: 14px;
      font-weight: 600;
      color: #333333 !important;
      position: relative;
      &:before {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        content: "";
        width: 18px;
        height: 3px;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        border-radius: 2px;
      }
    }
    .buyshowItem {
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px #f1f4f7;
      border-radius: 10px;
      padding: 8px;
      width: 216px;
      margin: 0 12px 30px 12px;
      position: relative;
      top: 0;
      cursor: pointer;
      border-bottom: 3px solid #fff;
      transition: all 0.2s;
      .item_img {
        height: 154px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 154px;
          object-fit: cover;
        }
      }
      .item_pic {
        padding: 16px 8px 9px 8px;
        align-items: center;
        h5 {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
        }
        > div {
          font-size: 15px;
          color: #ff2c4c;
          span {
            font-size: 20px;
          }
        }
      }
      .item_title {
        padding: 0 8px 8px 8px;
        line-height: 17px;
        .title_style {
          background: rgba(0, 217, 173, 0.1);
          border-radius: 9px;
          font-size: 12px;
          color: #00d9ad;
          padding: 1px 6px;
          text-align: center;
        }
        > span {
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .buyshowItem:hover {
      border-bottom: 3px solid #796cf3;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      top: -7px;
      .item_title {
        padding-bottom: 5px !important;
      }
    }
    .button_box {
      justify-content: center;
      padding-bottom: 100px;
      .el-button {
        background: #3442ff linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        border-radius: 6px;
        font-size: 14px;
        color: #ffffff;
        width: 300px;
        height: 40px;
        border: none;
      }
    }
    /*FB推广*/
    .fbItem {
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px #f1f4f7;
      border-radius: 10px;
      padding: 20px 20px 54px 20px;
      width: 216px;
      height: 345px;
      margin: 0 12px 30px 12px;
      position: relative;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 3px solid #fff;
      top: 0;
      .user_info {
        .header_img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid #ffffff;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .info_des {
        margin-left: 14px;
        flex: 1;
        .name {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
          margin-bottom: 8px;
        }
        .fan_style {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
        }
      }
      > ul {
        flex-flow: row wrap;
        justify-content: center;
        padding: 17px 0 30px 0;
        li {
          box-sizing: border-box;
          border-radius: 16px;
          border: 1px solid #eeeeee;
          padding: 4px 10px;
          margin: 3px;
          font-size: 12px;
          color: #999999;
          transition: all 0.2s;
          &:hover {
            border: 1px solid #796cf3;
            color: #796cf3;
          }
        }
      }
      .fb_price {
        padding-top: 14px;
        text-align: center;
        position: absolute;
        bottom: 14px;
        left: 20px;
        right: 20px;
        border-top: 1px solid #eeeeee;
      }
      &:after {
        content: "";
        width: 29px;
        height: 3px;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
        border-radius: 2px;
        position: absolute;
        top: -3px;
        left: 24px;
      }
    }
    .fbItem:hover {
      border-bottom: 3px solid #796cf3;
      top: -7px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      > ul {
        padding-bottom: 20px !important;
      }
    }
    //Deal推广
    .dealItem {
      padding: 14px;
      margin: 0 15px 40px 15px;
      width: 210px;
      display: inline-flex;
      justify-content: center;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 3px solid #fff;
      top: 0;
      > div {
        width: 182px;
        position: relative;
        top: 17px;
        padding-bottom: 40px;
        .deal_head {
          position: absolute;
          width: 70px;
          height: 70px;
          background: #ffffff;
          box-shadow: 0px 4px 8px 0px #f1f4f7;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
          top: -1px;
          overflow: hidden;
          padding: 16px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: auto;
            height: auto;
            max-width: 38px;
            max-height: 38px;
          }
        }
        .deal_name {
          padding-top: 45px;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
          text-align: center;
          padding-left: 14px;
          padding-right: 14px;
        }
        .deal_list {
          flex-flow: row wrap;
          justify-content: center;
          padding: 17px 0;
          margin-bottom: 2px;
          padding-left: 14px;
          padding-right: 14px;
          li {
            box-sizing: border-box;
            border-radius: 16px;
            border: 1px solid #eeeeee;
            padding: 5px 10px;
            margin: 3px;
            font-size: 12px;
            cursor: pointer;
            font-weight: 200;
            cursor: pointer;
            color: #999999;
            transition: all 0.2s;
            &:hover {
              border: 1px solid #796cf3;
              color: #796cf3;
            }
          }
        }
        .fb_price {
          text-align: center;
          position: absolute;
          bottom: 14px;
          left: 20px;
          right: 20px;
          padding-top: 14px;
        }
      }
    }
    .dealItem:before {
      position: absolute;
      left: 8px;
      top: 0;
      right: 8px;
      bottom: -11px;
      display: block;
      content: "";
      padding: 14px;
      box-shadow: 0px 4px 8px 0px #f1f4f7;
      border-radius: 10px;
      border: 1px solid #eeeeee;
      transform: perspective(800px) rotateX(30deg);
    }
    .dealItem:hover {
      border-bottom: 3px solid #796cf3;
      border-radius: 10px;
      top: -7px;
      .deal_list {
        padding-bottom: 15px !important;
      }
    }
    .dealItem:hover:before {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
  }
  .vipon_box {
    .vipon_img {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .vipon_text {
      margin-left: 68px;
      width: 544px;
      h5 {
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        line-height: 40px;
        padding: 66px 0 15px 0;
      }
      .subtitle {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        padding-bottom: 40px;
      }
      .vipon_list {
        margin-right: 15px;
        li {
          padding: 0 20px;
          position: relative;
          h4 {
            font-size: 42px;
            color: #333333;
            font-family: FetteMittelschrift-Regular, FetteMittelschrift;
            span {
              font-size: 24px;
              position: relative;
              &:before {
                position: absolute;
                right: -11px;
                top: -16px;
                content: url("../../assets/images/home/down.png");
              }
            }
          }
          > div {
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            padding-top: 4px;
            white-space: nowrap;
          }
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            padding-right: 0;
          }
          &:after {
            content: "";
            position: absolute;
            width: 1px;
            height: 60px;
            background: #eeeeee;
            top: 7px;
            right: 0;
          }

          &:nth-child(1) {
            h4 span {
              &:before {
                content: url("../../assets/images/home/up.png");
              }
            }
          }
          &:nth-child(3) {
            h4 span {
              &:before {
                content: url("../../assets/images/home/up.png");
              }
            }
          }
          &:last-child {
            &:after {
              content: none;
            }
          }
        }
      }
      .button_box {
        padding-top: 60px;
        .el-button {
          width: 180px;
          height: 40px;
          font-size: 14px;
          border-radius: 6px;
        }
        .btn_type {
          background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%);
          color: #ffffff;
          border: none;
        }
        .btn_plain {
          border: 1px solid #796cf3;
          color: #333333;
          margin-left: 20px;
        }
      }
    }
  }
  .tag_style {
    background: #796cf3;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    > div {
      height: 100%;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      padding-left: 168px;
      &:after {
        content: url("../../assets/images/home/gift.png");
        position: absolute;
        left: 0;
        top: -22px;
      }
      h5 {
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
        line-height: 30px;
        span {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          line-height: 22px;
        }
      }
      .el-button {
        background: #ff9c17;
        padding: 11px 72px;
        border: none;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        position: relative;
        &::after {
          content: url("../../assets/images/home/cursor.png");
          width: 26px;
          height: 29px;
          position: absolute;
          right: 16px;
          bottom: -11px;
        }
      }
    }
    .close_btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      text-align: center;
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
<style>
.el-carousel__arrow {
  background-color: #f0f0f0 !important;
  color: #333333 !important;
  font-size: 14px;
}
</style>
<style lang="less" scoped>
.home {
  // 拍买家秀
  .ShootingBuyerShows {
    background: linear-gradient(
      225deg,
      #eceefa 0%,
      #f7f8fa 20%,
      #f7f8fa 61%,
      #f2edfa 100%
    ) !important;
    .auto1200 {
      .datastyle {
        position: relative;
        min-height: 565px;
        .flex_style {
          position: absolute;
          flex-flow: row wrap;
          align-content: flex-start;
          justify-content: flex-start;
          opacity: 0;
          transition: all 0.3s;
        }
        .item {
          opacity: 1;
          z-index: 100;
        }
      }
    }
  }

  //我们的服务
  .Ourservices {
    .auto1200 {
      .boby {
        width: 1200px;
        height: 551px;
        background: #ffffff;
        border-radius: 20px;
        padding: 30px 60px 0;
        box-sizing: border-box;
        .top {
          width: 1080px;
          height: 96px;
          background: rgba(209, 97, 246, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          span:nth-child(1) {
            color: #d161f6;
            font-size: 43px;
          }
          span:nth-child(2) {
            color: #d161f6;
            position: relative;
            top: -23px;
          }
          span:nth-child(3) {
            color: #666666;
            margin-left: 8px;
          }
        }

        img {
          margin-top: 38px;
        }
      }
    }
  }

  //客户反馈
  .Customerfeedback {
    overflow: hidden;
    .auto1200 {
      ul {
        opacity: 0;
        li {
          width: 277px;
          margin-bottom: 30px;
          border-radius: 20px;
          transition: all 0.2s;
          img {
            width: 100%;
          }
        }
        li:hover {
          box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
          transform: scale(1.1);
        }
      }

      .look {
        text-align: center;
        margin-top: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less" scoped>
::v-deep(.el-carousel__indicators--horizontal) {
  bottom: 140px;
}
</style>
