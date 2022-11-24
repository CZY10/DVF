<template>
    <div id="buyer_show" class="buyer_show">
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
                        <el-input placeholder="搜索品类/红人编号/国家" v-model="keyword" class="input-with-select input_radius">
                            <el-button slot="append" style="width: 140px;color: #ffffff;font-size: 20px" icon="el-icon-search" @click="handlerSearchList"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="filter_header">
                    <div class="filter_item">
                        <span>达人性别</span>
                        <el-radio-group v-model="genderValue" @change="handlerSearchList">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="male">男性</el-radio-button>
                            <el-radio-button label="female">女性</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="filter_item">
                        <span>产品品类</span>
                        <el-radio-group v-model="categoryValue" @change="handlerSearchList">
                            <el-radio-button v-for="(item,index) in categoryList" :key="index" :label="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="filter_search">
                    <div>
                        <span style="margin-right: 40px">找到{{total}}个</span>
                        <span>匹配预算<el-input size="small" style="width: 79px;margin: 0 12px" placeholder="" @change="handlerSearchList" v-model="priceValue"></el-input>元</span>
                    </div>
                    <div>
                        <el-checkbox-group v-model="checkType" @change="handlerSearchList">
                            <el-checkbox v-for="(item,index) in checkGroup" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    v-loading="loading"
                    v-if="tableData.length!==0"
                    v-el-table-infinite-scroll="loadTable"
                    :infinite-scroll-immediate="false"
                    :infinite-scroll-disabled="disabled"
                    :header-cell-style="{background:'#F6F6F6',color:'#333333',fontWeight: '600'}"
                    size="mini"
                    :height="800"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;">
                    <el-table-column
                        type="selection"
                        align="center"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        width="290"
                        label="创作达人">
                        <template slot-scope="scope">
                            <div class="people_information_style">
                                <div class="people_img">
                                    <img :src="scope.row.image" alt="">
                                </div>
                                <div>
                                    <p class="people_nickname">NO.{{ scope.row.id }}</p>
                                    <span class="people_type">{{ scope.row.type }}</span>
                                    <p>
                                        <img :src="scope.row.country_id.image" style="margin-right: 10px;width: 14px" alt="">
                                        <img v-if="scope.row.genderdata === 'male'" src="../../../assets/images/male.png" alt="">
                                        <img v-else src="../../../assets/images/female.png" alt="">
                                    </p>
                                    <div class="title_style">
                                        <span v-for="(item,index) in scope.row.category_ids" :style="{color: index % 3 ==0 ? '#4BB1F1' : index % 2 == 0 ? '#F56422 !important':'#00D9AD',background: index % 3 == 0 ? 'rgba(75,177,241,0.1)' : index % 2 == 0 ? 'rgba(245,100,34,0.1) !important':'rgba(0,217,173,0.1)'}" :key="index">{{ item.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="参考作品"
                        align="center"
                        width="160">
                        <template>
                            <div class="people_works">
                                <p>共7个</p>
                                <img src="../../../assets/images/table_video.png" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="交付说明">
                        <template slot-scope="scope">
                            <div class="upload_description">
                                <div>
                                    <p><span>卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>
                                    <p><span>拍摄场景：</span>{{ scope.row.scene_id }}</p>
                                </div>
                                <div>
                                    <p><span>视频上传：</span>{{ scope.row.videoupload_id }}</p>
                                    <p><span>交付周期：</span>{{ scope.row.leadtime_id }}<span style="color: #999999;font-size: 12px">（样品发货后）</span></p>
                                </div>
                            </div>
                            <el-tooltip placement="top" effect="light">
                                <div slot="content" style="max-width: 400px">
                                    {{ scope.row.content }}</div>
                                <div class="other_description">
                                    {{ scope.row.content }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        sortable
                        width="150"
                        align="center"
                        label="参考报价">
                        <template slot-scope="scope">
                            <p class="consult_price">￥<span>{{ scope.row.lower_price }}-{{ scope.row.highest_price }}</span></p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-else :image="require('../../../assets/images/empty_img.png')" description="暂无搜索结果" :image-size="400"style="padding: 80px 0"></el-empty>
            </div>
        </div>
        <Footer></Footer>
        <div ref="getheight" v-show="isShowSelectedPlan" class="foot_box">
            <el-drawer
                :show-close="false"
                style="bottom: 67px"
                :visible.sync="drawer"
                size="354"
                :direction="direction">
                <div style="background: #ffffff;">
                    <div style="max-width: 1200px;margin: auto;padding-top: 16px">
                        <el-table
                            :data="selectedTableData"
                            :header-cell-style="{background:'#F6F6F6',color:'#333333',fontWeight: '600'}"
                            size="mini"
                            class="tableScrollStyle"
                            max-height="275"
                            style="width: 100%;">
                            <el-table-column type="index" align="center" label="方案" width="80"></el-table-column>
                            <el-table-column prop="date" width="200" label="创作达人">
                                <template slot-scope="scope">
                                    <div class="people_information_style">
                                        <div class="people_img">
                                            <img :src="scope.row.image" alt="">
                                        </div>
                                        <p class="people_nickname">NO.{{ scope.row.id }}</p>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="以往作品" align="center" width="180">
                                <template slot-scope="scope">
                                    <div class="people_works">
                                        <img src="../../../assets/images/table_video.png" alt="">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="交付说明">
                                <template slot-scope="scope">
                                    <el-tooltip placement="right" effect="light">
                                        <div slot="content" style="max-width: 400px">
                                            <p><span>卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>
                                            <p><span>拍摄场景：</span>{{ scope.row.scene_id }}</p>
                                            <p><span>视频上传：</span>{{ scope.row.videoupload_id }}</p>
                                            <p><span>交付周期：</span>{{ scope.row.leadtime_id }} <span style="color: rgba(153, 153, 153, 1);font-size: 12px">（样品收货后）</span></p>
                                            <p><span>其他说明：</span>{{ scope.row.description1 }}交付说明默认展示两行，鼠标悬停展示全部交付说明默认展示两行，鼠标悬停展示全部</p>
                                        </div>
                                        <div class="other_description">
                                            <p><span style="color: #999999">卖点呈现：</span>{{ scope.row.sellingpoint_id }}</p>
                                            <p><span style="color: #999999">拍摄场景：</span>{{ scope.row.scene_id }}</p>
                                        </div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" sortable width="150" align="center" label="参考报价">
                                <template slot-scope="scope">
                                    <p class="consult_price">￥<span>{{ scope.row.lower_price }}-{{ scope.row.highest_price }}</span></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <i @click="deleteRow(scope.$index,scope.row.id,selectedTableData,tableData)" style="font-size: 16px;display: block;margin: auto;width: 30px;height: 30px;line-height: 30px" class="el-icon-delete"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-drawer>
            <div>
                <div>
                    <div class="choice_style">已选择：<span>{{ selectedLength }}</span>个意向方案 <i style="color: rgba(51, 51, 51, 1);font-weight: bold;display: inline-block;width: 30px;height: 30px;line-height: 30px;text-align: center;cursor: pointer" @click="drawer = !drawer" :class="drawer ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></div>
                    <div><el-button @click="handleSubmitSelectedPlan">提交拍摄需求</el-button></div>
                </div>
            </div>

        </div>
        <el-backtop style="background: #000827;width: 46px;height: 46px;">
            <div>
                <i class="iconfont icon-fhdb" style="color: #ffffff;font-size: 25px"></i>
            </div>
        </el-backtop>

        <!--登录提示-->
        <el-dialog
            title="温馨提示"
            :visible.sync="loginDialogVisible"
            width="300px"
            class="login_dialog"
            center>
            <div>
                <p>您还没有登录，登录后即可继续操作</p>
                <el-button type="primary" size="small" @click="loginDialogVisible = false;$router.replace('/login')">去登录</el-button>
            </div>
        </el-dialog>

        <!--视频拍摄需求-->
        <el-dialog
            title="视频拍摄需求"
            :visible.sync="videoSubmitDialogVisible"
            width="702px"
            class="video_dialog"
            center>
            <div>
                <el-form size="small" :model="videoRuleForm" :rules="videoRules" ref="videoRules" label-width="125px" class="video_ruleForm">
                    <el-form-item label="选择拍摄类型" prop="selectedType">
                        <div style="padding-bottom: 10px">
                            <el-radio-group v-model="videoRuleForm.selectedType" size="small">
                                <el-radio class="radio_style1" label="0" border>
                                    <p class="recommend">推荐</p>
                                    标准化拍摄
                                    <ul>
                                        <li>达人根据产品卖点自行拍摄</li>
                                        <li>匹配快，成功率高</li>
                                        <li>交付周期5天起</li>
                                        <li>费用实惠</li>
                                        <li>重拍需另行收费</li>
                                    </ul>
                                </el-radio>
                                <el-radio class="radio_style2" label="1" border>
                                    定制化拍摄
                                    <ul>
                                        <li>达人按卖家指定方式及场景拍摄</li>
                                        <li>专业拍摄设备及团队</li>
                                        <li>交付周期10天起</li>
                                        <li>费用是标准化拍摄的数倍</li>
                                        <li>重拍需另行收费</li>
                                    </ul>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="description" style="padding-bottom: 0"><span>注：</span>视频内容不会提及产品售后政策、优惠、站外引流等亚马逊严禁内容</div>
                    </el-form-item>
                    <el-form-item label="产品亚马逊链接" prop="product">
                        <el-input v-model="videoRuleForm.product" placeholder="请输入产品亚马逊链接"></el-input>
                    </el-form-item>
                    <el-form-item label="产品所属品类" prop="category" required>
                        <el-select v-model="videoRuleForm.category" style="width: 100%" placeholder="请选择产品所属品类">
                            <el-option v-for="(item,index) in categoryList" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品核心卖点" prop="selling_point">
                        <div class="description">请用英文简要说明3-4个卖点
                            <el-tooltip class="item" effect="dark" placement="right">
                                <a href="javascript:;;">示例</a>
                                <p slot="content">
                                    例：<br/>
                                    1.Disco modes color changing<br/>
                                    2.Dance hall projection effect<br/>
                                    3. 41FT & 15 Disco Bulbs
                                </p>
                            </el-tooltip>
                        </div>
                        <el-input type="textarea" placeholder="请输入产品核心卖点" v-model="videoRuleForm.selling_point"></el-input>
                    </el-form-item>
                    <el-form-item label="定制需求" prop="demand">
                        <div class="description">请具体说明您的拍摄需求
                            <el-tooltip class="item" effect="dark" placement="right">
                                <a href="javascript:;;">示例</a>
                                <p slot="content">
                                    例：<br/>
                                    1.Disco modes color changing<br/>
                                    2.Dance hall projection effect<br/>
                                    3. 41FT & 15 Disco Bulbs
                                </p>
                            </el-tooltip>
                        </div>
                        <el-input type="textarea" placeholder="请输入您的拍摄需求" v-model="videoRuleForm.demand"></el-input>
                    </el-form-item>
                    <el-form-item label="备注（非必填）">
                        <p class="description">在候选达人匹配失败时，将据此为您推荐其他达人</p>
                        <el-input type="textarea" placeholder="不超过60字，如对达人性别、肤色，小孩或宠物出镜有要求，可备注" v-model="videoRuleForm.remarks"></el-input>
                    </el-form-item>
                    <el-form-item label="候选达人" style="border-top: 1px solid #eeeeee;padding-top: 14px">
                        <ul class="candidate_list">
                            <li v-for="(item,index) in selectedTableData" :key="index">
                                <div>
                                    <img :src="item.image" alt="">
                                </div>
                                <p>NO.{{item.id}}</p>
                                <span>￥{{item.lower_price}}-{{item.highest_price}}</span>
                            </li>
                        </ul>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form_button"><el-button size="small" type="primary" @click="submitForm('videoRules')">提交</el-button></div>
        </el-dialog>

        <!--支付定金-->
        <el-dialog
            title="请尽快支付定金"
            :visible.sync="payDepositDialogVisible"
            width="500px"
            class="pay_deposit_dialog"
            center>
            <div>
                <el-alert
                    title="支付定金后，平台将正式为您对接达人。不满意可随时申请退还定金。"
                    center
                    style="position: relative"
                    :closable="false">
                    <i class="iconfont icon-tips" style="position: absolute;top: 8px;left: 14px;font-size: 18px"></i>
                </el-alert>
                <h5>¥99.00</h5>
                <p>定金金额</p>
                <p>订单号：<span>2022072543SDFDSFWQ</span></p>
                <ul>
                    <li>
                        <div><img src="../../../assets/images/contact_us.png" alt=""></div>
                        <p><i class="iconfont icon-zhifu-zhifubao" style="color: rgba(2, 169, 241, 1)"></i>支付宝支付</p>
                    </li>
                    <li>
                        <div><img src="../../../assets/images/contact_us.png" alt=""></div>
                        <p><i class="iconfont icon-zhifupingtai-weixin" style="color: rgba(59, 202, 114, 1)"></i>微信支付</p>
                    </li>
                </ul>
            </div>
        </el-dialog>
        <!--支付完成-->
        <el-dialog
            title="支付完成"
            :visible.sync="paymentCompletedDialogVisible"
            width="360px"
            class="payment_completed_dialog"
            center>
            <div slot="title">
                <i style="color: rgba(2, 181, 120, 1);font-size: 20px" class="el-icon-success"></i>
                支付完成
            </div>
            <div>
                <p>平台将开始匹配并对接达人，预计1-2个工作日会收到反馈，敬请留意</p>
                <div class="button_box">
                    <el-button>我知道了</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Footer from "@/components/Footer";
import { getCategory, getSearchList, createOrder } from "@/api/index";

export default {
    name: "buyershow",
    data(){
        return{
            loading: false,
            disabled: false,
            pageIndex:0,
            pageSize:5,
            totalCount:0,
            saveDATA:[],
            paymentCompletedDialogVisible: false,
            payDepositDialogVisible:false,
            candidateData:[
                {
                    name:'NO.89',
                    price:'￥850-950',
                    img:require('../../../assets/images/people_header.png'),
                },
                {
                    name:'NO.89',
                    price:'￥850-950',
                    img:require('../../../assets/images/people_header.png'),
                },
                {
                    name:'NO.89',
                    price:'￥850-950',
                    img:require('../../../assets/images/people_header.png'),
                },
                {
                    name:'NO.89',
                    price:'￥850-950',
                    img:require('../../../assets/images/people_header.png'),
                },
                {
                    name:'NO.89',
                    price:'￥850-950',
                    img:require('../../../assets/images/people_header.png'),
                },
            ],
            videoRuleForm: {
                selectedType:'0',
                product:'',
                category:'',
                selling_point:'',
                demand:'',
                remarks:'',
            },
            videoRules: {
                selectedType: [
                    { required: true, message: '请选择拍摄类型', trigger: 'change' }
                ],
                product: [
                    { required: true, message: '请输入产品亚马逊链接', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请选择产品所属品类', trigger: 'change' }
                ],
                selling_point: [
                    { required: true, message: '请输入产品核心卖点', trigger: 'blur' },
                ],
                demand: [
                    { required: true, message: '请输入定制需求', trigger: 'blur' },
                ],
            },
            videoSubmitDialogVisible:false,
            loginDialogVisible:false,
            drawer: false,
            direction: 'btt',
            footerHeight:'',
            keyword:'',
            genderValue:'',
            categoryValue:'',
            categoryList:[],
            checkGroup:[],
            total:105,
            priceValue:'',
            keywords:'',
            checkType: [],
            tableData: [],
            selectedLength:0,
            selectedTableData:[],
            isShowSelectedPlan: false,
        }
    },
    components:{
        Footer,
    },
    created() {
        // this.init();
    },
    computed: {
    },
    mounted() {
        this.footerHeight = this.$refs.getheight.offsetHeight + 'px'
        this.handlerGetCategory('influencer');
        this.handlerGetCategory('type');
        this.handlerSearchList();
    },
    methods:{
        loadTable(){
            this.handlerSearchList();
        },
        //获取搜索分类
        handlerGetCategory(type){
            getCategory({type:type})
                .then((res) => {
                    if(res.code === 1){
                        if(type == 'type'){
                            this.checkGroup = res.data
                        }else {
                            this.categoryList = res.data;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error(err.msg);
                });
        },
        //搜索列表
        handlerSearchList(){
            this.pageIndex ++;
            if(!localStorage.getItem('token') && this.pageIndex!==1){
                this.loginDialogVisible = true;
                return;
            }
            this.disabled = true;
            let data = {
                keyword: this.keyword,
                genderdata: this.genderValue,
                type: this.checkType,
                price: this.priceValue,
                category_id: this.categoryValue,
                page: this.pageIndex,
                pageSize: this.pageSize,
            }
            getSearchList(data)
                .then((res) => {
                    if(res.code === 1){
                        this.disabled = false;
                        this.loading = false;
                        if (!res.data.data || res.data.data.length < this.pageSize) {
                            this.disabled = true
                        }
                        if (this.pageIndex === 1) {
                            this.tableData = res.data.data
                        } else {
                            this.tableData = this.tableData.concat(res.data.data)
                        }
                        this.totalCount = res.data.totalCount;
                    }
                })
                .catch((err) => {
                    this.$message.error(err.msg);
                });

        },

        submitForm(formName) {
            let influencer_id = [];
            this.selectedTableData.forEach((item,index)=>{
                influencer_id.push(item.id)
            })
            console.log(influencer_id)
            let data = {
                shoot: this.videoRuleForm.selectedType,
                influencer_ids: influencer_id,
                category_id: this.videoRuleForm.category,
                custom: this.videoRuleForm.demand,
                url: this.videoRuleForm.product,
                sellingpoint: this.videoRuleForm.selling_point,
                description: this.videoRuleForm.remarks,
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createOrder(data)
                        .then((res) => {
                            if(res.code === 1){
                                console.log(res)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            this.$message.error(err.msg);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },

        handleSelectionChange(val){
            val.length>0 ? this.isShowSelectedPlan=true:this.isShowSelectedPlan=false;
            if(val.length>5){
                this.$message({
                    message: '每个需求请选择3~5个意向方案',
                    type: 'warning'
                });
                let disabledRow = val.splice(5)
                this.$refs.multipleTable.toggleRowSelection(disabledRow[0],false);
                this.selectedTableData = val.splice(0,5);
                this.selectedLength = this.selectedTableData.length;

            }else {
                this.selectedTableData = val
                this.selectedLength = val.length;
            }
        },
        deleteRow(index,id,rows,tab) {
            rows.splice(index, 1);
            this.selectedLength = this.selectedTableData.length;
            for (let key in tab){
                if(tab[key].id == id){
                    console.log(tab[key])
                    this.$refs.multipleTable.toggleRowSelection(tab[key],false);
                }
            }
        },
        //提交拍摄方案
        handleSubmitSelectedPlan(){
            if(this.selectedTableData.length < 3 ){
                this.$message({
                    message: '每个需求请选择3~5个意向方案',
                    type: 'warning'
                });
            }else {
                this.videoSubmitDialogVisible = true;
                this.drawer = false;
            }
        }
    }
}
</script>
<style lang="less">

#buyer_show{
    .el-table__body-wrapper .el-table__body{
        padding-bottom: 20px;
    }
}

.el-tooltip__popper.is-dark{
    font-size: 12px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400 !important;;
    color: #E4E4E4 !important;;
    line-height: 20px !important;;
}
.pay_deposit_dialog {
    .el-alert{
        padding: 7px 0;
        .el-alert__description{
            margin: 0;
        }
    }
    .el-alert__icon{
        color: #796CF3;
    }
    .el-alert--info.is-light{
        background: #F4F2FF;
        color: #666666;
    }
    .el-alert__title{
        font-size: 12px !important;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400 !important;
        color: #666666 !important;
    }
}
.el-form-item__label{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    line-height: 20px;
    text-align: left !important;
}
.el-table__empty-block{
    display: none !important;
}
.el-table th.el-table__cell>.cell .el-checkbox{
    display: none;
}
/* 设置滚动条的样式 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    width:6px;
}
/* 滚动槽 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius:10px;
}
/* 滚动条滑块 */
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb:window-inactive {
    background:#D8D8D8;
}

.el-table th.el-table__cell>.cell{
    text-align: center;
}

.buyer_show{
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
    .el-input-group--append .el-input__inner{
        border: none;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: #796CF3;
        border-color: #796CF3;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #796CF3;
    }
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
.el-tooltip__popper.is-light{
    z-index: 2300 !important;
    border: 1px solid #796CF3 !important;
    color: rgba(51, 51, 51, 1) !important;
    padding: 19px 20px;
    line-height:24px ;
}
.el-tooltip__popper.is-light p{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    text-shadow: 0px 12px 20px rgba(0,0,0,0.1);
    padding: 5px 0;
}
.el-tooltip__popper.is-light p span{
    color: rgba(153, 153, 153, 1);
}

.el-radio--small.is-bordered{
    height: 191px !important;
    padding: 20px 14px !important;
    width: 208px;
    border-radius: 10px !important;
}
.el-radio--small.is-bordered .el-radio__label{
    font-size: 14px !important;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
}
.el-radio__label ul{
    padding-top: 10px;
}
.el-radio__label ul li {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    padding: 4px 0 4px 12px;
    position: relative;
}
.el-radio__label ul li:before{
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    background: #666666;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -2px;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #333333 !important;
}
.radio_style2 .el-radio__input.is-checked .el-radio__inner{
    border: 1px solid #00D9AD !important;
    background: #00D9AD !important;
}
.radio_style2.is-bordered.is-checked{
    border: 2px solid #00D9AD !important;
}
.radio_style1 .el-radio__input.is-checked .el-radio__inner{
    border: 1px solid rgba(121, 108, 243, 1) !important;
    background: rgba(121, 108, 243, 1) !important;
    background-image: url("../../../assets/images/radio_style1_bg.png");
}
.radio_style1.is-bordered.is-checked{
    border: 2px solid rgba(121, 108, 243, 1) !important;
}

</style>
<style lang="less" scoped>
.payment_completed_dialog{
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
        padding: 10px 12px 0 12px;
        text-align: center;
    }
    .button_box{
        margin-top: 28px;
        button{
            display: block;
            margin: auto;
            width: 140px;
            background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            padding: 8px 0;
        }
    }
}
.pay_deposit_dialog{
    h5{
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FF2C4C;
        line-height: 30px;
        text-align: center;
        margin: 18px 0 1px 0;
    }
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        text-align: center;
        margin: 5px 0;
        span{
            color: rgba(51, 51, 51, 1);
        }
    }
    ul{
        border-radius: 10px;
        border: 2px solid #F4F2FF;
        display: flex;
        justify-content: space-between;
        padding: 20px 30px;
        margin: 15px 35px 16px 35px;
        li{
            div{
                width: 140px;
                height: 140px;
                background: #FFFFFF;
                border: 1px solid #EEEEEE;
                img{
                    width: 100%;
                }
            }
            p{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                margin-top: 10px;
                margin-bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 18px;
                    margin-right: 6px;
                }
            }
        }
    }
}
.video_dialog{
    .video_ruleForm{
        height: 500px;
        padding-top: 10px;
        padding-right: 10px;
        margin: 0 12px;
        overflow: auto;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width:6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            border-radius:10px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            border-radius:10px;
            background:rgba(0,0,0,0.1);
        }
        &::-webkit-scrollbar-thumb:window-inactive {
            background:#D8D8D8;
        }
        .radio_style1{
            background: rgba(131,96,255,0.04);
            border: 1px solid rgba(131,96,255,1);
            position: relative;
            &:before{
                content: url("../../../assets/images/radio_style1_bg.png");
                width: 60px;
                height: 48px;
                display: block;
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .recommend:before{
                position: absolute;
                content: '';
                width: 3px;
                height: 3px;
                background: #ffffff;
                border-radius: 50%;
                top: 50%;
                margin-top: -2px;
                left: 8px;
            }
            .recommend{
                position: absolute;
                text-align: center;
                line-height: 22px;
                right: 0;
                top: 10px;
                width: 40px;
                height: 22px;
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 100px 0px 0px 100px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                padding-left: 8px;
            }
        }
        .radio_style2{
            position: relative;
            background: rgba(0,217,173,0.04);
            border: 1px solid rgba(0,217,173,1);
            &:before{
                width: 60px;
                height: 60px;
                content: url("../../../assets/images/radio_style2_bg.png");
                display: block;
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
        }
        .description{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
            padding-bottom: 10px;
            span{
                color: #ED4014;
            }
            a{
                font-weight: 400;
                color: #796CF3;
                text-decoration: none;
            }
        }
        .candidate_list {
            li{
                width: 60px;
                background: #FFFFFF;
                border-radius: 3px;
                border: 1px solid #EEEEEE;
                text-align: center;
                padding: 12px;
                float: left;
                margin-right: 8px;
                div{
                    width: 44px;
                    height: 44px;
                    border-radius: 26px;
                    margin: auto;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                p{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 17px;
                    text-align: center;
                    margin: 4px 0;
                }
                span{
                    display: block;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #796CF3;
                    line-height: 17px;
                    text-align: center;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .form_button{
        button{
            margin: auto;
            display: block;
            width: 140px;
            height: 32px;
            background: #CCCCCC linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
            border-radius: 16px;
            border: none;
            margin-top: 24px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #FFFFFF;
        }
    }
}

.login_dialog{
    p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
        text-align: center;
        padding: 10px 0 28px 0;
    }
    button{
        display: block;
        width: 140px;
        background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
        border-radius: 16px;
        margin: auto;
        border: none;
        font-size: 14px;
    }
}
.foot_box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2200;
    background: #F6F6F6;
    box-shadow: 0px -2px 20px 0px rgba(0,0,0,0.13);
    >div:nth-child(2){

        padding: 13px 0;
        background: rgba(246, 246, 246, 1);
        border-top: 1px solid #eeeeee;
        >div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: auto;
            .choice_style{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
            }
            span{
                font-size: 28px;
                font-family: FetteMittelschrift-Regular, FetteMittelschrift;
                font-weight: 400;
                color: #FF2C4C;
                padding: 0 0 0 3px;
                line-height: 33px;
            }
            button{
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                border-radius: 20px;
                padding: 12px 87px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }
    .people_information_style{
        display: flex;
        align-items: center;
        justify-content: center;
        .people_img{
            width: 64px;
            height: 64px;
            border-radius: 35px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .people_nickname{
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
            margin-left: 12px;
        }

    }
    .people_works{
        width: 72px;
        height: 48px;
        margin: auto;
        img{
            width: 100%;
        }
    }
    .upload_description p{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        span{
            color: #999999;
        }
    }
    .consult_price{
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF2C4C;
        line-height: 21px;
        span{
            font-size: 20px;
        }
    }
}

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
            .title_style{
                height: 46px;
                overflow: hidden;
                span{
                    display: inline-block;
                    background: rgba(245,100,34,0.1);
                    border-radius: 2px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 5px;
                    margin: 1px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #F56422;
                }
            }
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
                margin-bottom: 7px;
            }
        }
        .people_works{
            display: block;
            width: 140px;
            height: 94px;
            border-radius: 4px;
            border: 1px solid;
            position: relative;
            img{
                width: 100%;
            }
            p{
                position: absolute;
                top: 5px;
                left: 5px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 17px;
                background: rgba(0, 0, 0, 0.43);
                border-radius: 10px;
                padding: 1px 6px;
            }
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
            margin-bottom: 18px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            // 下面这句用来控制行数
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
