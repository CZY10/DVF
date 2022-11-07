<template>
    <div id="buyer_show">
        <div class="banner">
            <h2>服务流程</h2>
            <div class="service_steps">
                <div>
                    <div class="service_item">
                        <i class="iconfont icon-fa"></i>
                        <div>
                            <p>选择3-5款意向方案</p>
                            <p>提交需求并支付定金</p>
                        </div>
                        <i class="iconfont icon-bz" style="color: #ffffff"></i>
                    </div>
                    <div class="service_item">
                        <i class="iconfont icon-bj"></i>
                        <div>
                            <p>等待达人</p>
                            <p>反馈报价</p>
                        </div>
                        <i class="iconfont icon-bz" style="color: #ffffff"></i>
                    </div>
                    <div class="service_item">
                        <i class="iconfont icon-yp"></i>
                        <div>
                            <p>补缴尾款</p>
                            <p>寄送样品</p>
                        </div>
                        <i class="iconfont icon-bz" style="color: #ffffff"></i>
                    </div>
                    <div class="service_item">
                        <i class="iconfont icon-sp"></i>
                        <div>
                            <p>上传视频</p>
                            <p>交付完成</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="content">
                <h2>查找适合你的拍摄方案</h2>
                <div style="background: linear-gradient(180deg, rgba(121, 108, 243, 1), rgba(223, 96, 247, 1));border-radius: 23px;padding: 2px">
                    <div class="search_style">
                        <el-input placeholder="搜索品类/红人编号/国家" v-model="searchVal" class="input-with-select input_radius">
                            <el-button slot="append" style="width: 140px;color: #ffffff;font-size: 20px" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="filter_header">
                    <div class="filter_item">
                        <span>达人性别</span>
                        <el-radio-group v-model="genderRadio">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="男性"></el-radio-button>
                            <el-radio-button label="女性"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="filter_item">
                        <span>产品品类</span>
                        <el-radio-group v-model="typeRadio">
                            <el-radio-button v-for="(item,index) in categoryList" :key="index" :label="item"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="filter_search">
                    <div>
                        <span style="margin-right: 40px">找到{{total}}个</span>
                        <span>匹配预算<el-input size="small" style="width: 79px;margin: 0 12px" placeholder="" v-model="keywords"></el-input>元</span>
                    </div>
                    <div>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="Amazon Influencer"></el-checkbox>
                            <el-checkbox label="社媒红人"></el-checkbox>
                            <el-checkbox label="素人"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#F6F6F6',color:'#333333',fontWeight: '600'}"
                    size="mini"
                    style="width: 100%;">
                    <el-table-column
                        type="selection"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        width="340"
                        label="创作达人">
                        <template>
                            <div class="people_information_style">
                                <div class="people_img"></div>
                                <div>
                                    <p class="people_nickname">NO.123</p>
                                    <span class="people_type">Amazon Influencer</span>
                                    <p>
                                        <img src="../../../assets/images/country.png" style="margin-right: 10px" alt="">
                                        <img src="../../../assets/images/male.png" alt="">
                                    </p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="以往作品"
                        width="180">
                        <template>
                            <div class="people_works">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="交付说明">
                        <template>
                            <div class="upload_description">
                                <div>
                                    <p><span>卖点呈现：</span>通常纯展示</p>
                                    <p><span>拍摄场景：</span>自行发挥</p>
                                </div>
                                <div>
                                    <p><span>视频上传：</span>达人账号上传并关联listing</p>
                                    <p><span>交付周期：</span>7-14天（样品发货后）</p>
                                </div>
                            </div>
                            <el-tooltip content="交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部..." placement="top">
                                <div class="other_description">其他说明：交付说明默认展示两行，鼠标悬停展示全部...交付说明默认展示两行，鼠标悬停展示全部...</div>
                            </el-tooltip>

                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        sortable
                        width="150"
                        label="参考报价">
                        <template>
                            <p class="consult_price">￥<span>500-900</span></p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "buyershow",
    data(){
        return{
            searchVal:'',
            genderRadio:'全部',
            typeRadio:'家居1',
            categoryList:['服装','家居','数码','厨具','美妆','儿童','家电','户外','彩妆','家居','服装','家居','服装','家居','服装','家居','服装','家居','服装','家居',],
            total:105,
            keywords:'',
            checkList: [],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'￥500-900',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'￥850-900',
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'￥400-600',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'￥550-950',
            }],
        }
    }
}
</script>
<style>
.el-input-group--append .el-input__inner{
    border-radius: 23px;
    border-right: none;
}
.el-input-group__append{
    border-radius: 23px !important;
    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
    border: none;
}
.el-radio-button__inner{
    border: none !important;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #666666;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    font-weight: 600;
    color: #333333 !important;
    background: none !important;
    box-shadow:none !important;
}
.el-table__header-wrapper{
    border-radius: 10px;
}

</style>
<style lang="less" scoped>
#buyer_show{
    .banner{
        margin-top: 66px;
        height: 340px;
        background: #000827;
        h2{
            font-family: GothamHTF;
            font-size: 40px;
            font-weight: 900;
            color: #FFFFFF;
            line-height: 42px;
            padding: 60px 0 38px 0;
            text-align: center;
        }
        .service_steps{
            background: linear-gradient(233deg, rgba(255,163,115,0.1) 0%, rgba(234, 94, 247, 0.48) 48%, rgba(119,108,243,0) 100%);
            backdrop-filter: blur(22px);
            padding: 37px 0;
            border-top: 1px solid;
            border-image: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%) 1;
            >div{
                max-width: 1200px;
                display: flex;
                margin: auto;
                justify-content: center;
                .service_item{
                    display: flex;
                    align-items: center;
                    i:last-child{
                        margin-right: 34px;
                    }
                    i:first-child{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 54px;
                        height: 54px;
                        border-radius: 50%;
                        margin-right: 18px;
                        font-size: 26px;
                        color: #ffffff;
                    }
                    div{
                        margin-right: 34px;
                        font-size: 14px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 600;
                        color: #FFFFFF;
                        line-height: 24px;
                    }
                    &:first-child i:first-child{
                        background: #FF9C17;
                    }
                    &:nth-child(2) i:first-child{
                        background: #24DEB8;
                    }
                    &:nth-child(3) i:first-child{
                        background: #00B2FF;
                    }
                    &:nth-child(4) i:first-child{
                        background: #E6401F;
                    }
                }
            }

        }
    }
    .content{
        max-width: 1200px;
        margin: auto;
        h2{
            font-family: GothamHTF;
            font-size: 40px;
            font-weight: 900;
            color: #333333;
            line-height: 42px;
            text-align: center;
            padding-top: 73px;
            padding-bottom: 50px;
        }
        .search_style{
            clip-path: inset(0 round 23px);
            background: white;
        }
        .filter_header{
            border-radius: 10px;
            border: 1px solid #EEEEEE;
            margin-top: 30px;
            padding: 16px 30px;
            .filter_item{
                display: flex;
                align-items: baseline;
                padding: 1px 0;
                span{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 20px;
                    padding-right: 24px;
                    border-right: 1px solid #eeeeee;
                    flex-shrink:0;
                    position: relative;
                    top: 5px;
                }
            }
        }
        .filter_search{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 24px;
            margin-bottom: 20px;
            span:first-child{
                color: #333333;
                font-weight: 600;
            }
        }
        .people_information_style{
            display: flex;
            align-items: center;
            .people_img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid;
                flex-shrink:0;
                margin-right: 24px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .people_nickname{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                margin-bottom: 8px;
            }
            .people_type{
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #00D9AD;
                line-height: 17px;
                background: rgba(0,217,173,0.1);
                border-radius: 9px;
                padding: 1px 5px;
                display: inline-block;
                margin-bottom: 11px;
            }
        }
        .people_works{
            display: block;
            width: 140px;
            height: 94px;
            border-radius: 4px;
            border: 1px solid;
        }
        .upload_description{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed #eeeeee;
            margin-bottom: 10px;
            p{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
                padding-bottom: 10px;
                span{
                    color: #999999;
                }
            }
        }
        .other_description{
            padding-bottom: 18px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
        }
        .consult_price{
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FF2C4C;
            line-height: 21px;
            span{
                font-weight: 600;
                font-size: 20px;
            }
        }
    }
}

</style>
