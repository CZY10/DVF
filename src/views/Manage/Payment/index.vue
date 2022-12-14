<template>
    <div id="payment">
        <div class="content">
            <el-form ref="form" class="form_search" size="small" :model="form" label-width="80px">
                <el-form-item label="支付记录" class="title">
                    <el-input placeholder="输入ASIN/订单号" v-model="form.keywords" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="currentPage=1;getPaymentList()"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="form.dateValue"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        @change="currentPage=1;getPaymentList()"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                class="payment_table"
                size="medium"
                :height="tableHeight"
                @sort-change="handlerSort"
                :header-cell-style="{background:'#F6F6F6'}"
                style="width: 100%">
                <el-table-column prop="paytime" label="支付时间" sortable min-width="120"></el-table-column>
                <el-table-column prop="order_id" label="订单号" min-width="110"></el-table-column>
                <el-table-column prop="out_trade_no" label="交易编号" min-width="130"></el-table-column>
                <el-table-column prop="asin" label="Asin及需求详情" min-width="110">
                    <template slot-scope="scope">
                        <p>{{ scope.row.asin}} <a :href="scope.row.url" target="_blank"><i class="iconfont icon-fx" style="font-size: 14px"></i></a></p>
                    </template>
                </el-table-column>
                <el-table-column prop="order_type" label="付款类别">
                    <template slot-scope="scope">
                        {{scope.row.order_type == 0 ? '定金' : scope.row.order_type == 1 ? '尾款' : '全款'}}
                    </template>
                </el-table-column>
                <el-table-column prop="price" sortable label="支付金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.price==''" style="color: #999999;">待反馈</span>
                        <span v-else>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="支付方式">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type === 'alipay'" style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-zhifubao" style="color: #02A9F1;font-size: 20px"></i>支付宝</div>
                        <div v-if="scope.row.type === 'wechat'" style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-weixinzhifu" style="color: #3BCA72;font-size: 20px"></i>微信</div>
                        <div v-if="scope.row.type === 'paypal'" style="display: flex;align-items: center;justify-content: center">PayPal</div>
                        <div v-if="scope.row.type === 'googlepay'" style="display: flex;align-items: center;justify-content: center">GooglePay</div>
                        <div v-if="scope.row.type === 'stripe'" style="display: flex;align-items: center;justify-content: center">Stripe</div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="付款结果">
                    <template slot-scope="scope">
                        {{scope.row.status === 1 ? '已支付': '已退还'}}
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 20px">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 500]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {paymentList} from "@/api";

export default {
    name: "payment",
    data(){
        return{
            form: {
                keywords:'',
                dateValue:[],
            },
            tableData:[],
            tableHeight:document.documentElement.clientHeight-235,
            currentPage:1,
            pageSize:20,
            total:0,
            pageState:true,
            order: '',
            orderType: ''
        }
    },
    mounted() {
        this.getPaymentList();
    },
    methods:{
        //排序
        handlerSort(column){
            column.order == 'ascending' ? this.orderType='asc' : this.orderType='desc';
            this.order = column.prop;
            this.getPaymentList();
        },
        getPaymentList(){
            paymentList({
                keyword: this.form.keywords,
                date: this.form.dateValue,
                pageSize: this.pageSize,
                page: this.currentPage,
                order: this.order,
                orderType: this.orderType
            })
                .then((res) => {
                    if(res.code === 1){
                        this.pageState = true;
                        this.tableData = res.data.data;
                        this.total = res.data.total;
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });
        },
        handleSizeChange(val) {
            this.pageState = false;
            this.pageSize = val;
            this.currentPage = 1;
            if (this.pageState === false) this.getPaymentList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.pageState === true) this.getPaymentList();
        },
    },
}
</script>
<style lang="less">
#payment{
    .el-table__body-wrapper .el-table__body{
        margin-bottom: 30px;
    }
}
</style>
<style lang="less" scoped>
#payment {
    margin-top: 66px;
    background: #F5F7F9;
    padding: 20px 30px 0 30px;
    .content{
        background: #FFFFFF;
        border-radius: 0px 4px 4px 0px;
        border: 1px solid #EEEEEE;
        padding: 20px 30px;
        .form_search{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
            }
        }
        .payment_table{
            i{
                color: #796CF3;
            }
        }
    }
}
</style>
<style lang="less">
#payment{
    .el-table th.el-table__cell > .cell,
    .el-table td.el-table__cell div{
        text-align: center;
    }
}

</style>
