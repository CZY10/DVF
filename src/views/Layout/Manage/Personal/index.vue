<template>
    <div id="personal" :style="{height:boxHeight+'px'}">
        <h5 class="title">个人资料</h5>
        <div class="content" :style="{height:contentHeight+'px'}">
            <div class="content_row">
                <div class="avatar" @mouseout="avatarHide=false" @mouseover="avatarHide=true">
                    <div><img :src="avatarImg" alt=""></div>
                    <div v-show="avatarHide" class="editor_avatar">
                        <el-upload
                            action="#"
                            ref="rebateUpload"
                            list-type="picture-card"
                            :on-change="uploadAvatarSuccess"
                            :on-exceed="exceedUpload"
                            :limit="1"
                            :auto-upload="false">
                            <span>修改头像</span>
                            <div slot="file" slot-scope="{file}">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
                                >
                            </div>
                        </el-upload>
                    </div>
                    <p>我的头像</p>
                </div>
                <div class="user_info">
                    <p>账号信息</p>
                    <ul>
                        <li><label>账号</label>18175888288<span>修改</span></li>
                        <li><label>微信</label>已绑定<span>解绑</span></li>
                    </ul>
                    <p>基础信息<i></i><span style="cursor:pointer;" @click="isEdit=false">编辑</span></p>
                    <el-form ref="form" :model="form" label-position="left" :disabled="isEdit" class="form_box" label-width="76px">
                        <el-form-item label="公司名称">
                            <el-input size="small" v-model="form.companyName" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公司规模">
                            <el-select v-model="form.optionsValue" size="small" placeholder="请选择" style="width: 100%">
                                <el-option
                                    v-for="item in companySizeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在地">
                            <el-select v-model="form.optionsValue" size="small" placeholder="请选择" style="width: 50%">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="form.optionsValue" size="small" placeholder="请选择" style="width: 50%;margin-left: 10px">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职位">
                            <el-input size="small" v-model="form.companyName" placeholder="请输入职位"></el-input>
                        </el-form-item>
                    </el-form>
                    <div v-if="!isEdit"><el-button class="save_btn">保存</el-button></div>
                </div>
            </div>
        </div>
        <!--解绑微信-->
        <el-dialog
            title="解绑微信"
            :visible.sync="unbindWeChatDialog"
            width="300px"
            class="dialog_style"
            center>
            <div style="padding-top: 10px">
                <p>解绑后，将不再支持微信扫码登录</p>
                <div class="button_box">
                    <el-button class="cancel_style">取消</el-button>
                    <el-button class="confirm_style">确认</el-button>
                </div>
            </div>
        </el-dialog>
        <!--解绑微信-->
        <el-dialog
            title="修改手机号"
            :visible.sync="editPhoneDialog"
            width="388px"
            class="dialog_style"
            center>
            <div style="padding-top: 10px">
                <el-form :model="editPhoneForm" size="small" :rules="editPhoneRules" class="demo-ruleForm" label-width="86px" label-position="left">
                    <el-form-item prop="phone" label="新手机号">
                        <el-input v-model="editPhoneForm.phone" placeholder="请输入手机号码"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="verificationCode" label="验证码">
                        <el-input v-model="editPhoneForm.verificationCode" placeholder="请输入验证码">
                            <el-button type="text" slot="append" @click="handlerSend" :style="{'color':(isDisabled? '#999999':'#796CF3')}" :disabled="isDisabled">
                                {{ verificationCodeText }}
                            </el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="button_box">
                    <el-button class="confirm_style">确认</el-button>
                </div>
            </div>
        </el-dialog>
        <!--手机绑定成功-->
        <el-dialog
            :visible.sync="updatePhoneDialog"
            width="260px"
            class="dialog_style"
            center>
            <div slot="title">
                <i style="color: rgba(2, 181, 120, 1);font-size: 20px" class="el-icon-success"></i>
                手机绑定成功
            </div>
            <div>
                <p>您可使用微信扫码登录了</p>
                <div class="button_box">
                    <el-button class="confirm_style">我知道了</el-button>
                </div>
            </div>
        </el-dialog>
        <!--绑定微信-->
        <el-dialog
            title="请用微信扫码进行绑定"
            :visible.sync="bindWechartDialog"
            width="328px"
            class="dialog_style"
            center>
            <div>
                <p class="bind_wechart_description">绑定后即可使用微信扫码登录，更便捷</p>
                <div class="wechart_box">
                    <span class="bottom_left"></span>
                    <span class="bottom_right"></span>
                    <img src="../../../../assets/images/qr.png" alt="">
                    <div id="refreshQrcode" v-if="isRefresh" @click="handlerGetQrcode">
                        <div
                            style="display: flex;align-items: center;justify-content: center;height: 100%">
                            <div>
                                <i class="el-icon-refresh-right" style="display: block;text-align: center"></i>
                                <span>点击刷新</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {checkQr, getQrcode, smsSend} from "@/api";
export default {
    name: "personal",
    data(){
        const validatePhone = (rule, value, callback) => {
            const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            if (!regExp.test(value)) {
                callback(new Error('手机号码格式错误，请输入正确的手机号码！'))
                this.isDisabled=true;
                this.phoneError=true;

            } else {
                this.isDisabled=false;
                this.phoneError=false;
                callback()
            }
        }
        const validateVerificationCode = (rule, value, callback) => {
            const regExp = /^[0-9]{4}$/;
            if (!regExp.test(value)) {
                this.codeError=true;
                callback(new Error('验证码格式错误，请输入正确的验证码！'))
            } else {
                this.codeError=false;
                callback()
            }
        }
        return{
            bindWechartDialog:false,
            updatePhoneDialog:false,
            isRefresh: false,
            checkQrCode:'',
            wechatToken:'',
            editPhoneForm:{
                phone:'',
                verificationCode:'',
            },
            verificationCodeText:'获取验证码',
            isDisabled:true,
            editPhoneDialog:false,
            unbindWeChatDialog:false,
            boxHeight:document.documentElement.clientHeight-88,
            contentHeight:document.documentElement.clientHeight-250,
            avatarHide: false,
            isEdit:true,
            form:{
                companyName:'',
                optionsValue:'',
            },
            avatarImg:require('../../../../assets/images/avatar.png'),
            companySizeOptions:[
                {
                    value: '1',
                    label: '1~10'
                },
                {
                    value: '2',
                    label: '11~30'
                },
                {
                    value: '3',
                    label: '31~50'
                },
                {
                    value: '4',
                    label: '51~100'
                },
                {
                    value: '5',
                    label: '101~200'
                },
                {
                    value: '6',
                    label: '200以上'
                }

            ],
            options: [
                {
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
                }
            ],
            editPhoneRules: {
                phone: [
                    {required: true, message: '请输入手机号码！', trigger: 'blur'},
                    {validator: validatePhone, trigger: ['blur', 'change']}
                ],
                verificationCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {validator: validateVerificationCode, trigger: ['blur', 'change']}
                ]
            }
        }
    },
    mounted() {
        // this.handlerGetQrcode();
    },
    methods:{
        //获取微信二维码
        handlerGetQrcode(){
            getQrcode()
                .then((res) => {
                    if(res.code === 1){
                        this.qrImg = res.data.qrcode_url;
                        this.wechatToken = res.data.wechat_token;
                        this.isRefresh = false;
                        this.handleCheckQr();
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error(err.msg);
                });
        },
        //检测二维码是否扫码成功
        handleCheckQr(){
            var timer=0;
            let _this = this;
            let form = new FormData();
            form.append('wechat_token',_this.wechatToken)
            _this.checkQrCode = setInterval(()=>{
                checkQr(form)
                    .then((res) => {
                        if(res.code === 0){ //二维码已失效
                            _this.isRefresh = true;
                            //清除定时脚本
                            clearInterval(_this.checkQrCode)
                        }
                        if(res.code === 1 && res.data.status === 0){//请等待扫码
                            timer++;
                            if(timer>60){
                                //等待扫码,超过3分钟未扫描，二维码提示已过期
                                _this.isRefresh = true;
                                //清除定时脚本
                                clearInterval(_this.checkQrCode);
                            }
                        }else if(res.code === 1 && res.data.status === 1){//扫码成功，请绑定手机号
                            //清除定时脚本
                            clearInterval(_this.checkQrCode);
                            _this.bindWechartDialog = false;
                        }else if(res.code === 1 && res.data.status === 2){//登录成功,即将跳转
                            clearInterval(_this.checkQrCode);
                            _this.bindWechartDialog = false;
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        this.$message.error(err.msg);
                    });
            },3000)
        },
        uploadAvatarSuccess(file, fileList){
            console.log(file, fileList)
            this.avatarHide = false;
            this.avatarImg = file.url;
        },
        exceedUpload(files, fileList){
            console.log(files, fileList)
            this.$set(fileList[0], 'raw', files[0]);
            this.$set(fileList[0], 'name', files[0].name);
            this.$refs['rebateUpload'].clearFiles();//清除文件
            this.$refs['rebateUpload'].handleStart(files[0]);//选择文件后的赋值方法
        },
        //发送验证码
        handlerSend(even) {
            smsSend({
                mobile: this.editPhoneForm.phone,
                event: 'mobilelogin'
            })
                .then((res) => {
                    if(res.code === 1){
                        console.log(res)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error(err.msg);
                });
            let timeo = 30;
            let _this = this;
            let timeStop = setInterval(function (){
                timeo--;
                if(timeo > 0){
                    _this.verificationCodeText = timeo + 's后重新获取'
                    // _this.isDisabled = true;
                }else {
                    timeo = 30;
                    _this.verificationCodeText = '获取验证码'
                    // _this.isDisabled = false;
                    clearInterval(timeStop);
                }
            },1000)
        },
    }
}
</script>
<style lang="less">
#personal{
    .el-upload--picture-card{
        background: none;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        line-height: 120px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        position: absolute;
        left: 0;
        top: 0;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: none;
        >div{
            height: 100%;
        }
    }
    .form_box{
        width: 488px;
        padding-left: 20px;
        .el-form-item__content{
            display: flex;
        }
        .el-form-item{
            margin-bottom: 6px;
        }
        .el-form-item__label{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
        }
    }
    .el-input-group__append{
        background: none;
        padding: 0 30px;
    }
    .el-input-group--append .el-input__inner{
        border-right: none;
    }
}
</style>
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
                position: relative;
                width: 120px;
                margin-right: 60px;
                flex-shrink: 0;
                height: 120px;
                >div{
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                >p{
                    font-size: 14px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 20px;
                    margin-top: 10px;
                    text-align: center;
                }
                .editor_avatar{
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.60);
                    text-align: center;
                    line-height: 120px;
                }
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
                .save_btn{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                    border-radius: 16px;
                    padding: 9px 46px;
                    border: none;
                    display: block;
                    margin: auto;
                    margin-top: 16px;
                }
            }
        }
    }
    .dialog_style{
        p{
            text-align: center;
            line-height: 24px;
            color: #666666;
        }
        .button_box{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 24px;
            button{
                padding: 8px 45px;
                border-radius: 16px;
                font-size: 14px;
            }
            .cancel_style{
                border: 1px solid #EEEEEE;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #999999;
            }
            .confirm_style{
                background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                font-family: PingFangSC-Regular, PingFang SC;
                color: #FFFFFF;
            }
        }
        .bind_wechart_description{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #999999;
            line-height: 17px;
            padding-bottom: 22px;
        }
        .wechart_box{
            position: relative;
            width: 205px;
            height: 205px;
            border: 1px solid #EEEEEE;
            margin: auto;
            padding: 7px;
            margin-bottom: 15px;
            img{
                width: 100%;
                height: 100%;
            }
            >span{
                display: block;
                width: 7px;
                height: 7px;
                position: absolute;
                bottom: -1px;
            }
            &:after{
                position: absolute;
                top: -1px;
                left: -1px;
                content: '';
                width: 7px;
                height: 7px;
                border-left: 1px solid #333333;
                border-top: 1px solid #333333;
            }
            &:before{
                position: absolute;
                top: -1px;
                right: -1px;
                content: '';
                width: 7px;
                height: 7px;
                border-right: 1px solid #333333;
                border-top: 1px solid #333333;
            }
            .bottom_left{
                left: 0;
                border-left: 1px solid #333333;
                border-bottom: 1px solid #333333;
            }
            .bottom_right{
                right: 0;
                border-right: 1px solid #333333;
                border-bottom: 1px solid #333333;
            }
            #refreshQrcode {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.9);
                cursor: pointer;

                i {
                    font-size: 40px;
                }

                span {
                    display: block;
                    margin-top: 4px;
                }

            }
        }
    }
}
</style>
