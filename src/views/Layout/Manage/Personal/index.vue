<template>
    <div id="personal">
        <h5 class="title">个人资料</h5>
        <div class="content">
            <div class="content_row">
                <div class="avatar">我的头像</div>
                <div class="user_info">
                    <p>账号信息</p>
                    <ul>
                        <li><label>账号</label>18175888288<span>修改</span></li>
                        <li><label>微信</label>已绑定<span>解绑</span></li>
                    </ul>
                    <p>基础信息<i></i><span>编辑</span></p>
                    <ul>
                        <li><label>公司名称</label><el-input size="small" v-model="companyName" placeholder="请输入公司名称"></el-input></li>
                        <li>
                            <label>公司规模</label>
                            <el-select v-model="optionsValue" size="small" placeholder="请选择" style="width: 100%">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>所在地</label>
                            <el-select v-model="optionsValue" size="small" placeholder="请选择" style="width: 50%">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="optionsValue" size="small" placeholder="请选择" style="width: 50%;margin-left: 10px">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li><label>职位</label><el-input size="small" v-model="companyName" placeholder="请输入职位"></el-input></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "personal",
    data(){
        return{
            companyName:'',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            optionsValue:'',
        }
    }
}
</script>

<style lang="less" scoped>
#personal{
    margin-top: 66px;
    background: #F5F7F9;
    padding: 20px 30px 0 30px;
    .title{
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 20px;
        background: #ffffff;
        padding: 26px 30px 20px 30px;
        border: 1px solid #eeeeee;
    }
    .content{
        background: #FFFFFF;
        border-radius: 0px 4px 4px 0px;
        border: 1px solid #EEEEEE;
        padding: 39px 70px;
        border-top: none;
        .content_row{
            display: flex;
            .avatar{
                width: 120px;
                margin-right: 60px;
                flex-shrink: 0;
            }
            .user_info{
                p{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 20px;
                    position: relative;
                    padding-left: 12px;
                    margin-bottom: 22px;
                    &:before{
                        position: absolute;
                        content: '';
                        width: 2px;
                        height: 12px;
                        left: 0;
                        top: 50%;
                        margin-top: -6px;
                        background: #333333 linear-gradient(233deg, #776CF3 0%, #EA5EF7 100%);
                        border-radius: 1px;
                    }
                    i{
                        display: inline-block;
                        width: 388px;
                        height: 1px;
                        background: #eeeeee;
                        margin: 0 12px 4px 12px;
                    }
                    span{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #796CF3;
                        line-height: 20px;
                    }
                }
                ul li{
                    display: flex;
                    padding-left: 20px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 20px;
                    padding-bottom: 14px;
                    label{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #999999;
                        line-height: 20px;
                        margin-right: 20px;
                        display: inline-block;
                        width: 56px;
                        flex-shrink: 0;
                    }
                    span{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #796CF3;
                        line-height: 20px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
</style>
