<template>
  <div id="buyershow">
    <div class="banxin">
      <!-- 搜索 -->
      <div class="searchfor">
        <el-input
          v-model="searchforval"
          placeholder="输入产品名称/品类/红人编号"
          class="inp"
        ></el-input>
        <el-button class="searchforbtn">搜索</el-button>
      </div>

      <!-- 筛选 -->
      <div class="screen">
        <div class="filter_header">
          <div class="filter_item">
            <span>达人性别</span>
            <el-radio-group
              v-model="genderValue"
              @change="handlerSearchList('reset')"
            >
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="male">男性</el-radio-button>
              <el-radio-button label="female">女性</el-radio-button>
            </el-radio-group>
          </div>
          <div class="filter_item" style="margin-top: 10px">
            <span>产品品类</span>
            <el-radio-group
              v-model="categoryValue"
              @change="handlerSearchList('reset')"
            >
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.id"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div style="height: 1px; background-color: #eee"></div>

          <div class="filter_item" style="margin-top: 10px">
            <span>主题专区</span>
            <el-radio-group
              v-model="themeValue"
              @change="handlerSearchList('reset')"
            >
              <el-radio-button label=""> 全部 </el-radio-button>
              <el-radio-button
                v-for="(item, index) in themeList"
                :key="index"
                :label="item.id"
              >
                <div style="display: flex; align-items: center">
                  <img
                    src="@/assets/images/sp.png"
                    style="margin: 0 3px 3px 0"
                  />
                  {{ item.name }}
                </div>
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>

      <!-- 查找 -->
      <div class="seek">
        <div class="seek_div">
          <div class="seek_div_span">找到 {{ total }} 个</div>
          <div class="seek_divd">
            <span>价格 ≤</span>
            <el-input v-model="priceval" class="priceinp"></el-input>
            <span>元</span>
          </div>
        </div>
      </div>

      <!-- 分类产品 -->
      <div class="product">
        <ul class="product_ul">
          <li class="product_li" v-for="item in datalist" :key="item.id">
            <div class="product_li_img"><img :src="item.image" /></div>
            <div class="product_list">
              <div class="product_list_div1">
                <div class="product_list_left">
                  <div class="product_list_no">NO.{{ item.user_id }}</div>
                  <div
                    v-if="item.type == 'Amazon Influencer'"
                    class="product_list_typelv"
                  >
                    {{ item.type }}
                  </div>
                  <div
                    v-if="item.type == '社媒红人'"
                    class="product_list_typeho"
                  >
                    {{ item.type }}
                  </div>
                  <div
                    v-if="item.type == '数字人'"
                    class="product_list_typelan"
                  >
                    {{ item.type }}
                  </div>
                </div>

                <div class="product_list_rigth" v-if="item.price_type == 0">
                  ￥{{ item.price }}
                </div>

                <div
                  class="product_list_rigth"
                  v-else-if="item.price_type == 1"
                >
                  ￥<span>{{ item.lower_price }}-{{ item.highest_price }}</span>
                </div>

                <div class="product_list_rigth" v-else style="font-size: 11px">
                  视产品而定
                </div>
              </div>

              <div
                class="product_list_div2"
                v-if="item.category_ids.length <= 5"
              >
                <li v-for="(item, index) in item.category_ids" :key="index">
                  {{ item.name }}
                </li>
              </div>
              <div v-else style="display: flex">
                <div class="product_list_div2">
                  <li v-for="(item, index) in item.category_ids" :key="index">
                    {{ item.name }}
                  </li>
                </div>
                <span>...</span>
              </div>

              <div
                style="height: 1px; background-color: #eee; margin-top: 15px"
              ></div>

              <ul class="product_list_videos">
                <li v-for="item in item.videos" :key="item.id">
                  <i class="el-icon-video-play" style="font-size: 14px"></i>
                  <span> {{ item.desc }}</span>
                </li>

                <li
                  style="
                    width: 22px;
                    text-align: center;
                    display: block;
                    background: linear-gradient(
                        270deg,
                        #ffffff 0%,
                        #f1f0fd 100%
                      ),
                      linear-gradient(270deg, #ffffff 0%, #fcf3ff 100%);
                    border-radius: 4px;
                  "
                  v-if="item.videos.length > 12"
                >
                  . . .
                </li>
              </ul>
            </div>
            <div class="product_btn">
              <span class="icon">+</span>
              <i class="el-icon-shopping-cart-2"></i>
              <span>选择</span>
            </div>
          </li>
        </ul>
      </div>

      <template>
        <div class="paging">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[12, 24, 48, 96]"
            :page-size="per_page"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination></div
      ></template>
    </div>
  </div>
</template>
<script>
import {
  getCategory,
  getSearchList,
  createOrder,
  payOrder,
  checkPayment,
  getShootRequire,
  needsSelectInfluencer,
} from "@/api";

export default {
  name: "buyershow",
  data() {
    return {
      searchforval: "",
      genderValue: "",
      categoryValue: "",
      themeValue: "",
      categoryList: [],
      themeList: [],
      total: 0,
      per_page: 0,
      priceval: "",
      datalist: [],
      currentPage: 1,
    };
  },
  components: {},
  created() {},
  computed: {},
  mounted() {
    document.getElementsByClassName(
      "el-pagination__jump"
    )[0].childNodes[0].nodeValue = "跳转";
    this.handlerGetCategory("influencer");
    this.handlerGetCategory("theme_area");
    this.getdata();
  },
  beforeUpdate() {},
  methods: {
    //获取搜索分类
    handlerGetCategory(type) {
      getCategory({ type: type })
        .then((res) => {
          if (res.code === 1) {
            switch (type) {
              case "influencer":
                this.categoryList = res.data;
                break;
              case "theme_area":
                this.themeList = res.data;

              default:
                break;
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },

    //搜索列表
    handlerSearchList(value) {
      console.log(value);
    },

    //获取数据
    getdata() {
      let data = {
        keyword: "",
        genderdata: "",
        type: [],
        price: "",
        category_id: "",
        page: 1,
        pageSize: 12,
        order: "",
        orderType: "",
      };
      getSearchList(data)
        .then((res) => {
          if (res.code == 1) {
            this.total = res.data.total;
            this.per_page = res.data.per_page;
            this.datalist = res.data.data;
            console.log(this.datalist);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
#buyershow {
  background: #f7f8fa;

  .banxin {
    width: 1200px;
    margin: 0 auto;
    min-height: 200px;
    overflow: hidden;

    .searchfor {
      height: 46px;
      background: #ffffff;
      border-radius: 6px;
      border: 1px solid #eeeeee;
      margin-top: 40px;
      display: flex;

      .searchforbtn {
        width: 140px;
        height: 46px;
        background: linear-gradient(233deg, #ea5ef7 0%, #776cf3 100%) #d161f6;
        border-radius: 0px 6px 6px 0px;
        color: white;
      }
    }

    .screen {
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #eeeeee;
      margin-top: 20px;

      .filter_header {
        padding: 16px 30px;

        .filter_item {
          display: flex;
          align-items: baseline;
          padding: 1px 0;

          span {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
            padding-right: 24px;
            border-right: 1px solid #eeeeee;
            flex-shrink: 0;
            position: relative;
            top: 5px;
          }
        }
      }
    }

    .seek {
      height: 60px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #eeeeee;
      margin-top: 20px;
      padding: 15px 30px;
      box-sizing: border-box;

      .seek_div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .seek_div_span {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
        }

        .seek_divd {
          display: flex;
          align-items: center;

          span {
            white-space: nowrap;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }

          .priceinp {
            margin: 0 10px;
            height: 30px !important;
            width: 80px;
          }
        }
      }
    }

    .product {
      .product_ul {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .product_li {
          height: 448px;

          flex: 0 0 calc(25% - 20px);
          margin-bottom: 30px;
          border-radius: 6px;
          background: white;
          overflow: hidden;
          position: relative;

          .product_li_img {
            width: 100%;
            height: 287px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .product_list {
            height: 131px;
            // height: 295px;
            background: #fff;
            transition: all 0.3s ease-in-out;
            position: absolute;
            width: 280px;
            box-sizing: border-box;
            bottom: 30px;
            padding: 20px 16px;
            .product_list_div1 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;

              .product_list_left {
                display: flex;
                align-items: center;

                .product_list_no {
                  font-size: 16px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #333333;
                  margin-right: 5px;
                }

                .product_list_typelv {
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #00d9ad;
                  border: 1px solid #00d9ad;
                  padding: 0 5px;
                  border-radius: 5px;
                  font-size: 11px;
                }

                .product_list_typeho {
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #f44eff;
                  border: 1px solid #f44eff;
                  padding: 0 5px;
                  border-radius: 5px;
                  font-size: 11px;
                }

                .product_list_typelan {
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #00b2ff;
                  border: 1px solid #00b2ff;
                  padding: 0 5px;
                  border-radius: 5px;
                  font-size: 11px;
                }
              }

              .product_list_rigth {
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 600;
                color: #ff2c4c;
              }
            }
            .product_list_div2 {
              display: flex;
              white-space: nowrap;
              overflow: hidden;

              li {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                padding-right: 5px;
                border-right: 2px solid #c5c5c5;
                margin-right: 5px;
              }

              li:last-child {
                border-right: none;
              }
            }

            .product_list_videos {
              margin-top: 16px;
              height: 185px;
              overflow: hidden;
              li {
                background: linear-gradient(270deg, #ffffff 0%, #f1f0fd 100%),
                  linear-gradient(270deg, #ffffff 0%, #fff0f9 100%),
                  linear-gradient(270deg, #ffffff 0%, #f1f0fd 100%),
                  linear-gradient(270deg, #ffffff 0%, #fcf3ff 100%);
                border-radius: 4px;
                color: #d161f6;
                font-size: 12px;
                margin: 0 20px 15px 0;
                cursor: pointer;
                display: flex;
                float: left;
                overflow: hidden;
                max-width: 103px;
                i {
                  margin: 1px 3px 0 0;
                }

                span {
                  overflow: hidden; /* 隐藏超出的部分 */
                  text-overflow: ellipsis; /* 当文本超出时显示为省略号 */
                  white-space: nowrap; /* 不换行 */
                }
              }
            }
          }

          .product_btn {
            height: 30px;
            background: #d161f6;
            border-radius: 0px 0px 6px 6px;
            position: absolute;
            width: 280px;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            i {
              margin-right: 5px;
            }

            .icon {
              font-weight: 900;
              margin-bottom: 2px;
              opacity: 0;
              transition: all 0.3s;
            }
          }

          .product_btn:hover .icon {
            opacity: 1;
          }

          .product_list:hover {
            height: 295px;
          }
        }
      }
    }

    .paging {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }
  }
}
</style>

<style lang="less" scoped>
.searchfor {
  .inp {
    ::v-deep(.el-input__inner) {
      height: 100%;
    }
  }
}

.priceinp {
  ::v-deep(.el-input__inner) {
    height: 100%;
  }
}

::v-deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background: rgba(209, 97, 246, 0.1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #d161f6;
  border: none;
  box-shadow: none;
}

::v-deep(.el-radio-button:first-child .el-radio-button__inner) {
  border: none;
}

::v-deep(.el-radio-button__inner) {
  border: none;
}

::v-deep(.el-radio-button__inner):hover {
  color: #d161f6;
}

::v-deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  border: 1px solid #d161f6;
}

::v-deep(.el-pagination.is-background .el-pager li) {
  border-radius: 5px !important;
}

::v-deep(.el-select .el-input.is-focus .el-input__inner) {
  border-color: #d161f6;
}

::v-deep(.el-input__inner:focus) {
  border-color: #d161f6;
}

::v-deep(.el-pagination__jump) {
  margin-left: 0;
}
</style>

<style>
.el-select-dropdown__item.selected {
  color: #d161f6 !important;
}

.el-input__inner:hover {
  border: 1px solid #d161f6 !important;
}
</style>