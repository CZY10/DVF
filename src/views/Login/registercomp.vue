<template>
    <div class="registercomp">
        <h1>添加/重置密码</h1>
        <p class="title1">通过以下步骤为账号设置新密码</p>

        <el-form :model="resetPasswordForm" :rules="resetPasswordRules" class="demo-ruleForm">
            <el-form-item prop="accountVal">
                <el-input v-model="resetPasswordForm.accountVal" placeholder="请输入注册手机号/邮箱" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
                <el-input v-model="resetPasswordForm.verificationCode" placeholder="请输入验证码">
                    <el-button slot="append" @click="handlerSend('resetpwd')"
                        :style="{ color: accountpasswordDisabled1 ? '#D161F6' : '#999' }"
                        :disabled="!accountpasswordDisabled1" type="text">
                        {{ verificationCodeText }}
                    </el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="passwordVal" style="position: relative;">
                <el-input placeholder="请输入新密码" v-model="resetPasswordForm.passwordVal"
                    :type="passwordflag ? 'text' : 'password'"></el-input>
                <div @click="passwordflag = !passwordflag"
                    style="position: absolute;right: 15px;top: 5px;cursor: pointer;width: 20px;height:20px">
                    <img src="@/assets/images/preview-open.svg" v-if="passwordflag" style="width: 100%;" />
                    <img src="@/assets/images/preview-close.svg" v-else style="width: 100%;" />
                </div>
            </el-form-item>
            <el-form-item prop="passwordValtow" style="position: relative;margin-bottom: 10px;">
                <el-input placeholder="请再次输入新密码" v-model="resetPasswordForm.passwordValtow"
                    :type="passwordflagtow ? 'text' : 'password'"></el-input>
                <div @click="passwordflagtow = !passwordflagtow"
                    style="position: absolute;right: 15px;top: 5px;cursor: pointer;width: 20px;height:20px">
                    <img src="@/assets/images/preview-open.svg" v-if="passwordflagtow" style="width: 100%;" />
                    <img src="@/assets/images/preview-close.svg" v-else style="width: 100%;" />
                </div>
            </el-form-item>
        </el-form>

        <el-button class="submit_btn" style="margin:30px 0 10px" @click="reqlogin('resetpwd')"
            :class="{ disabled_opacity: !accountpasswordDisabled1 || !accountpasswordDisabled2 || !accountpasswordDisabled3 }"
            :disabled="!accountpasswordDisabled1 || !accountpasswordDisabled2 || !accountpasswordDisabled3"
            round>确认</el-button>

        <p class="bark">
            <span @click="triggerAnimationReturn">返回登录</span>
        </p>

    </div>
</template>

<script>
import { smsSend, passwordRegister } from '@/api/index'
export default {
    data() {
        const validateEmaiPhone = (rule, value, callback) => {
            const EamiregExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const PhoneregExp = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
            if (PhoneregExp.test(value) || EamiregExp.test(value)) {
                this.accountpasswordDisabled1 = true
                callback()
            } else {
                this.accountpasswordDisabled1 = false
                callback(new Error())
            }
        }
        const validatePassword = (rule, value, callback) => {
            const EamiregExp = /^.{4,10}$/
            if (EamiregExp.test(value)) {
                this.accountpasswordDisabled2 = true
                callback()
            } else {
                this.accountpasswordDisabled2 = false
                callback(new Error())
            }
        }
        const validatePasswordtow = (rule, value, callback) => {
            if (this.resetPasswordForm.passwordVal == this.resetPasswordForm.passwordValtow) {
                this.accountpasswordDisabled3 = true
                callback()
            } else {
                this.accountpasswordDisabled3 = false
                callback(new Error())
            }
        }
        return {
            passwordflag: false,
            passwordflagtow: false,
            accountpasswordDisabled1: false,
            accountpasswordDisabled2: false,
            accountpasswordDisabled3: false,
            verificationCodeText: "获取验证码",
            timeStop: null,
            resetPasswordForm: {
                accountVal: '',
                passwordVal: '',
                verificationCode: '',
                passwordValtow: ""
            },
            resetPasswordRules: {
                accountVal: [
                    { required: true, message: "请输入账号！", trigger: "change" },
                    { validator: validateEmaiPhone, message: "请输入正确的手机号或邮箱", trigger: ['change'] }
                ],
                passwordVal: [
                    { required: true, message: "请输入密码", trigger: "change" },
                    { validator: validatePassword, message: '长度在 4 到 10 个字符', trigger: 'change' }
                ],
                passwordValtow: [
                    { required: true, message: "请输入密码", trigger: "change" },
                    { validator: validatePasswordtow, message: '俩次密码不一致', trigger: 'change' }
                ]
            },
        }
    },
    methods: {
        beforeClose() {
            this.$emit("getisoneMsg", true);
        },
        //切换登录
        triggerAnimationReturn() {

            let element = document.querySelector(".registercomp")
            element.style.animationPlayState = 'running';
            setTimeout(() => {
                this.beforeClose()
            }, 500)
        },
        //发送验证码
        async handlerSend(even) {
            let _this = this;
            if (_this.timeStop == null) {
                _this.timeStop = true
                let isdata = {
                    account: this.resetPasswordForm.accountVal,
                    event: even,
                }
                const { code } = await smsSend(isdata)
                if (code == 1) {
                    let timeo = 30;
                    _this.timeStop = setInterval(function () {
                        timeo--;
                        if (timeo > 0) {
                            _this.verificationCodeText = timeo + "s后重新获取";

                        } else {
                            timeo = 30;
                            _this.verificationCodeText = "获取验证码";
                            clearInterval(_this.timeStop);
                            _this.timeStop = null
                        }
                    }, 1000);
                }
            } else if (_this.timeStop == true) {
                _this.timeStop = null
            }

        },
        //修改密码
        async reqlogin(event) {
            let data = {
                account: this.resetPasswordForm.accountVal,
                captcha: this.resetPasswordForm.verificationCode,
                password: this.resetPasswordForm.passwordVal,
                re_password: this.resetPasswordForm.passwordValtow,
                event,
            }

            const res = await passwordRegister(data)
            if (res.code == 1) {
                const h = this.$createElement;
                this.$message({
                    message: h("p", { style: "display: flex" }, [
                        h(
                            "div",
                            {
                                style:
                                    "width: 13px;height: 13px;background: #fff;border-radius: 50%;margin-top: 1px;position: relative;",
                            },
                            [
                                h(
                                    "i",
                                    {
                                        class: "iconfont icon-cg",
                                        style: "",
                                    },
                                    ""
                                ),
                            ]
                        ),

                        h(
                            "span",
                            { style: "font-size: 12px;color: #FFFFFF;margin:0 0 0 8px" },
                            "新密码设置成功"
                        ),
                    ]),
                    iconClass: "iconfont",
                    offset: 140,
                    customClass: "customClasssuccess",
                });

                setTimeout(() => {
                    this.triggerAnimationReturn()
                }, 1000)
            }

        }

    }
}
</script>

<style lang="less" scoped>
.disabled_opacity {
    opacity: 0.5;
}

@keyframes explode2 {
    0% {
        opacity: 1;
    }

    100% {
        transform: translateX(200px);
        opacity: 0;
    }
}

.registercomp {
    animation-name: explode2;
    animation-duration: .3s;
    animation-fill-mode: forwards;
    animation-play-state: paused;
    background: #fff;

    h1 {
        font-weight: 600;
        color: #333333;
        font-size: 24px;
    }

    .title1 {
        color: #999999;
        font-size: 12px;
        margin-top: 6px;
    }

    .demo-ruleForm {
        margin: 18px 0 16px;
    }

    .submit_btn {
        margin-top: 18px !important;
        width: 100%;
        height: 42px;
        background: linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);
        border-radius: 5px;
        color: #fff;
    }

    .bark {
        color: #666666;

        span {
            cursor: pointer;
        }
    }
}
</style>

<style lang="less" scoped>
::v-deep(.el-form-item) {
    margin-bottom: 20px;
}
</style>