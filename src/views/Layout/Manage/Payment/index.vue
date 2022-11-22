<template>
    <div id="payment">
        <div class="content">
            <el-form ref="form" class="form_search" size="small" :model="form" label-width="80px">
                <el-form-item label="订单记录" class="title">
                    <el-input placeholder="输入ASIN/订单号" v-model="form.keywords" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="form.dateValue"
                        type="daterange"
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
                :header-cell-style="{background:'#F6F6F6'}"
                style="width: 100%">
                <el-table-column prop="date" label="支付时间" sortable min-width="100"></el-table-column>
                <el-table-column prop="order" label="订单号" min-width="110"></el-table-column>
                <el-table-column prop="asin" label="Asin及需求详情" min-width="110">
                    <template slot-scope="scope">
                        <p>{{ scope.row.asin}} <a href="" target="_blank"><i class="iconfont icon-fx" style="font-size: 14px"></i></a></p>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="付款类别">
                    <template slot-scope="scope">
                        {{scope.row.status == 0 ? '定金' : '尾款'}}
                    </template>
                </el-table-column>
                <el-table-column prop="price" sortable label="支付金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.price==''" style="color: #999999;">待反馈</span>
                        <span v-else>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="支付方式">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 0" style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-zhifubao" style="color: #02A9F1;font-size: 20px"></i>支付宝</div>
                        <div v-else style="display: flex;align-items: center;justify-content: center"><i class="iconfont icon-weixinzhifu" style="color: #3BCA72;font-size: 20px"></i>微信</div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="付款结果">
                    <template slot-scope="scope">
                        {{scope.row.status == 0 ? '成功' : '已退还'}}
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 20px">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "payment",
    data(){
        return{
            form: {
                keywords:'',
                dateValue:'',
            },
            tableData:[
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:1,
                },
                {
                    date: '2022-07-07 15:30',
                    order: 'HD20220722HWW7',
                    asin: 'B08CXHHWW7',
                    price:'¥500.00',
                    status:0,
                },
            ],
            tableHeight:document.documentElement.clientHeight-235,
            currentPage:2,
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
}
</script>

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
