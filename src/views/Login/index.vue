<template>
    <div>
        <div class="header">
            <el-menu
                :default-active="$route.path"
                class="el-menu-demo"
                router
                mode="horizontal"
                active-text-color="#ffffff"
                text-color="#666666"
            >
                <el-menu-item index="/"><img src="../../assets/images/login_logo.png" alt=""></el-menu-item>

                <el-menu-item style="float: right;" index="2">联系我们</el-menu-item>
                <el-menu-item style="float: right;" index="3"><a href="">新手指南</a></el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <el-row class="content_bg">
                <el-col :span="16" class="left"></el-col>
                <el-col :span="8" class="right"></el-col>
            </el-row>
            <el-row class="content_body">
                <el-col :span="12" class="left">
                    <div class="content_img">
                        <img id="img" src="../../assets/images/login_banner.png" alt="">
                    </div>
                </el-col>
                <el-col :span="12" class="right">
                    <div class="tabs" v-if="hasBindPhone">
                        <h3>注册/登录</h3>
                        <p class="description">未注册时，首次登录系统将自动为您注册</p>
                        <el-tabs v-model="activeName" @tab-click="handleClick">


                            <el-tab-pane label="微信扫码" name="first">
                                <div class="qrcode">
                                    <span class="top"></span><span class="bottom"></span><span class="left"></span><span
                                    class="right"></span>
                                    <img :src="qrImg" alt="">
                                    <div id="refreshQrcode" v-if="isRefresh" @click="handleRefresh">
                                        <div
                                            style="display: flex;align-items: center;justify-content: center;height: 100%">
                                            <div>
                                                <i class="el-icon-refresh-right"></i>
                                                <span>点击刷新</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <p class="privacy_agreement">登录平台即代表同意<a href="">服务条款</a>及<a href="">用户隐私协议</a></p>
                            </el-tab-pane>



                            <el-tab-pane label="验证码" name="second">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                                    <el-form-item prop="phone">
                                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="verificationCode">
                                        <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码">
                                            <el-button slot="append" @click="handlerSend('mobilelogin')" :style="{'color':(isDisabled? '#999999':'#2489F3')}" :disabled="isDisabled" type="text">
                                                {{ verificationCodeText }}
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="submit_btn" :class="{ 'disabled_opacity':phoneError || codeError}" :disabled="phoneError || codeError" @click="submitForm('ruleForm')" round>提交</el-button><!--ruleForm.phone == '' || ruleForm.verificationCode == ''-->
                                    </el-form-item>
                                </el-form>
                                <p class="privacy_agreement">登录平台即代表同意<a href="">服务条款</a>及<a href="">用户隐私协议</a></p>
                            </el-tab-pane>


                        </el-tabs>
                    </div>


                    <div class="tabs" v-else>
                        <h3 style="padding-bottom: 17px">请绑定手机号</h3>
                        <el-form :model="ruleForm" :rules="bindPhoneRules" ref="bindPhoneRuleForm" class="demo-ruleForm">
                            <el-form-item prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="verificationCode">
                                <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码">
                                    <el-button slot="append" @click="handlerSend('register')" :style="{'color':(isDisabled? '#999999':'#2489F3')}" :disabled="isDisabled" type="text">
                                        {{ verificationCodeText }}</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="submit_btn" :class="{ 'disabled_opacity':ruleForm.phone == '' || ruleForm.verificationCode == ''}" :disabled="ruleForm.phone == '' || ruleForm.verificationCode == ''" @click="submitForm('bindPhoneRuleForm')" round>提交</el-button>
                            </el-form-item>
                        </el-form>
                        <p class="privacy_agreement">绑定后即可使用微信扫码登录，更便捷</p>
                    </div>


                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getQrcode, smsSend } from "@/api/index"
// import login from "@/store/modules/login";
export default {
    name: "login",
    data() {
        /**
         * 校验手机号
         */
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
        return {
            phoneError:true,
            codeError:true,
            isSubmitDisabled:true,
            isRefresh: false,
            qrImg:'',
            activeName: 'second',
            hasBindPhone: true,
            isDisabled:true,
            isBindPhoneDisabled:false,
            verificationCodeText:'获取验证码',
            disabledText:{
                color:'#999999'
            },
            ruleForm: {
                phone: '',
                verificationCode: '',
            },
            rules: {
                phone: [
                    {required: true, message: '请输入手机号码！', trigger: 'blur'},
                    {validator: validatePhone, trigger: ['blur', 'change']}
                ],
                verificationCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {validator: validateVerificationCode, trigger: ['blur', 'change']}
                ]
            },
            bindPhoneRules: {
                phone: [
                    {required: true, message: '请输入手机号码！', trigger: 'blur'},
                    {validator: validatePhone, trigger: ['blur', 'change']}
                ],
                verificationCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {validator: validateVerificationCode, trigger: ['blur', 'change']}
                ]
            },
        }
    },
    created() {

    },
    mounted() {
        this.handlerGetQrcode();
    },
    methods: {
        //获取微信二维码
        handlerGetQrcode(){
            getQrcode()
                .then((res) => {
                    if(res.code === 1){
                        this.qrImg = res.data.qrcode_url;
                        this.isRefresh = false;
                        this.startCron();
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error(err.msg);
                });
        },
        ...mapMutations('login', ["setUserInfo"]),
        handleLogin() {
            let obj = {
                user: '13691209081',
                token: '1267524687646fh2dfhjhgsdg'
            }
            this.setUserInfo(obj)
            localStorage.setItem('userInfo', JSON.stringify(obj))
            this.$router.push('/')
        },
        handleSelect() {

        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        //发送验证码
        handlerSend(even) {

            let params ={
                mobile: this.ruleForm.phone,
                event: even
            }
            smsSend({
                mobile: this.ruleForm.phone,
                event: even
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
            // let timeo = 30;
            // let _this = this;
            // let timeStop = setInterval(function (){
            //     timeo--;
            //     if(timeo > 0){
            //         _this.verificationCodeText = timeo + 's后重新获取'
            //         _this.isDisabled = true;
            //     }else {
            //         timeo = 30;
            //         _this.verificationCodeText = '获取验证码'
            //         _this.isDisabled = false;
            //         clearInterval(timeStop);
            //     }
            // },1000)
        },
        //确认
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //刷新二维码
        handleRefresh() {
            this.handlerGetQrcode();
        },
        startCron(){
            var timer=0;
            let _this = this;
            var intervalId=setInterval(function () {
                timer++;
                if(timer>60){
                    //等待扫码,超过3分钟未扫描，二维码提示已过期
                    _this.isRefresh = true;
                    //清除定时脚本
                    clearInterval(intervalId);
                }
            },3000)
        }
    },
}
</script>


<style lang="less" scoped>
.disabled_opacity{
    opacity: .5;
}
.header {
    > ul {
        max-width: 1200px;
        margin: auto;
        align-items: center;
        border-bottom: none;

        a {
            color: #666666;
        }
    }
}

.content {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    .content_bg {
        margin-top: 66px;
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .left {
            background: #1D255A;
        }

        .right {
            background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
        }
    }

    .content_body {
        max-width: 1200px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-top: 66px;
        .left {
            .content_img {
                img {
                    width: 100%;
                    height: auto;
                }
            }
        }

        .right {
            .tabs {
                max-width: 320px;
                background: white;
                padding: 60px 86px;
                box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.04);
                border-radius: 14px;
                text-align: center;
                margin: auto;

                h3 {
                    font-size: 24px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 33px;
                }

                .description {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 17px;
                    padding: 6px 0 16px 0;
                }

                .qrcode {
                    margin: 19px 20px 20px 20px;
                    border: 1px solid #EEEEEE;
                    padding: 8px;
                    position: relative;

                    img {
                        width: 100%;
                    }

                    > span {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                    }

                    .top {
                        border-left: 1px solid #333;
                        border-top: 1px solid #333;
                        left: -1px;
                        top: -1px;
                    }

                    .bottom {
                        border-right: 1px solid #333;
                        border-bottom: 1px solid #333;
                        right: -1px;
                        bottom: -1px;
                    }

                    .left {
                        border-left: 1px solid #333;
                        border-bottom: 1px solid #333;
                        left: -1px;
                        bottom: -1px;
                    }

                    .right {
                        border-right: 1px solid #333;
                        border-top: 1px solid #333;
                        right: -1px;
                        top: -1px;
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

                .privacy_agreement {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 20px;

                    a {
                        color: #2489F3;
                    }
                }

                .demo-ruleForm {
                    padding-top: 15px;

                    .submit_btn {
                        background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
                        width: 100%;
                        color: #ffffff;
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}

</style>
<style>
.el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
}

.el-tabs__item.is-active {
    color: #333333;
    font-weight: bold;
}

.el-tabs__active-bar {
    background: #333333;
}

.el-tabs__item {
    color: #666666;
    font-size: 16px;
}

.el-input-group > .el-input__inner {
    border-right: none;
}

.demo-ruleForm .el-input-group__append {
    background: #ffffff;
    padding: 0 30px;
    color: #2489F3;
}

.el-form-item.is-error .el-input__inner {
    border-right: 1px solid #F56C6C;
}

.demo-ruleForm .el-form-item:last-child {
    margin-bottom: 16px;
}

</style>