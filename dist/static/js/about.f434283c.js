"use strict";(self["webpackChunkvideoproject"]=self["webpackChunkvideoproject"]||[]).push([[443],{9223:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var a=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"header"},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.$route.path,router:"",mode:"horizontal","active-text-color":"#ffffff","text-color":"#666666"}},[t("el-menu-item",{attrs:{index:"/"}},[t("img",{attrs:{src:r(1444),alt:""}})]),t("el-menu-item",{staticStyle:{float:"right"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("联系我们")]),t("el-menu-item",{staticStyle:{float:"right"},attrs:{index:"3"}},[t("a",{attrs:{href:""}},[e._v("新手指南")])])],1)],1),t("div",{staticClass:"content"},[t("el-row",{staticClass:"content_bg"},[t("el-col",{staticClass:"left",attrs:{span:16}}),t("el-col",{staticClass:"right",attrs:{span:8}})],1),t("el-row",{staticClass:"content_body"},[t("el-col",{staticClass:"left",attrs:{span:12}},[t("div",{staticClass:"content_img"},[t("img",{attrs:{id:"img",src:r(4798),alt:""}})])]),t("el-col",{staticClass:"right",attrs:{span:12}},[e.hasBindPhone?t("div",{staticClass:"tabs"},[t("h3",{staticStyle:{"padding-bottom":"17px"}},[e._v("请绑定手机号")]),t("el-form",{ref:"bindPhoneRuleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.bindPhoneRules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText))])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleBindPhone("bindPhoneRuleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v("绑定后即可使用微信扫码登录，更便捷")])],1):t("div",{staticClass:"tabs"},[t("h3",[e._v("注册/登录")]),t("p",{staticClass:"description"},[e._v("未注册时，首次登录系统将自动为您注册")]),t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"微信扫码",name:"first"}},[t("div",{staticClass:"qrcode"},[t("span",{staticClass:"top"}),t("span",{staticClass:"bottom"}),t("span",{staticClass:"left"}),t("span",{staticClass:"right"}),t("img",{attrs:{src:e.qrImg,alt:""}}),e.isRefresh?t("div",{attrs:{id:"refreshQrcode"},on:{click:e.handleRefresh}},[t("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center",height:"100%"}},[t("div",[t("i",{staticClass:"el-icon-refresh-right"}),t("span",[e._v("点击刷新")])])])]):e._e()]),t("p",{staticClass:"privacy_agreement"},[e._v("登录平台即代表同意"),t("a",{attrs:{href:""}},[e._v("服务条款")]),e._v("及"),t("a",{attrs:{href:""}},[e._v("用户隐私协议")])])]),t("el-tab-pane",{attrs:{label:"验证码",name:"second"}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText)+" ")])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleSubmitForm("ruleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v("登录平台即代表同意"),t("a",{attrs:{href:""}},[e._v("服务条款")]),e._v("及"),t("a",{attrs:{href:""}},[e._v("用户隐私协议")])])],1)],1)],1)])],1)],1),t("el-dialog",{attrs:{title:"微信咨询",visible:e.dialogVisible,center:"",width:"320px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("div",{staticClass:"contact_us_box"},[t("span"),t("span"),t("span"),t("span"),t("img",{attrs:{src:r(6501),alt:""}})]),t("div",{staticClass:"contact_us_foot"},[t("p",[t("i",{staticClass:"iconfont icon-phone-call"}),t("span",[e._v("电话：")]),e._v("0755-84861340")]),t("p",[t("i",{staticClass:"iconfont icon-mail"}),t("span",[e._v("邮箱：")]),e._v("support@amztracker.com")])])])],1)},s=[],o=(r(7658),r(629)),i=r(586),n={name:"login",data(){const e=(e,t,r)=>{const a=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;a.test(t)?(this.isDisabled=!1,this.phoneError=!1,r()):(r(new Error("手机号码格式错误，请输入正确的手机号码！")),this.isDisabled=!0,this.phoneError=!0)},t=(e,t,r)=>{const a=/^[0-9]{4}$/;a.test(t)?(this.codeError=!1,r()):(this.codeError=!0,r(new Error("验证码格式错误，请输入正确的验证码！")))};return{dialogVisible:!1,phoneError:!0,codeError:!0,isSubmitDisabled:!0,isRefresh:!1,qrImg:"",activeName:"first",checkQrCode:"",hasBindPhone:!1,isDisabled:!0,isBindPhoneDisabled:!1,verificationCodeText:"获取验证码",disabledText:{color:"#999999"},ruleForm:{phone:"",verificationCode:""},rules:{phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"},{validator:e,trigger:["blur","change"]}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{validator:t,trigger:["blur","change"]}]},bindPhoneRules:{phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"},{validator:e,trigger:["blur","change"]}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{validator:t,trigger:["blur","change"]}]},wechatToken:"",fromPath:localStorage.getItem("loginFromPath")}},created(){},mounted(){this.handlerGetQrcode()},methods:{...(0,o.OI)("login",["setUserInfo"]),handlerGetQrcode(){(0,i.fN)().then((e=>{1===e.code&&(this.qrImg=e.data.qrcode_url,this.wechatToken=e.data.wechat_token,this.isRefresh=!1,this.handleCheckQr())})).catch((e=>{console.log(e),this.$message.error(e.msg)}))},handleCheckQr(){var e=0;let t=this,r=new FormData;r.append("wechat_token",t.wechatToken),t.checkQrCode=setInterval((()=>{(0,i.Zm)(r).then((r=>{0===r.code&&(t.isRefresh=!0,clearInterval(t.checkQrCode)),1===r.code&&0===r.data.status?(e++,e>60&&(t.isRefresh=!0,clearInterval(t.checkQrCode))):1===r.code&&1===r.data.status?(t.hasBindPhone=!0,clearInterval(t.checkQrCode)):1===r.code&&2===r.data.status&&(clearInterval(t.checkQrCode),this.setUserInfo(r.data.userinfo),localStorage.setItem("userInfo",JSON.stringify(r.data.userinfo)),localStorage.setItem("token",r.data.userinfo.token),this.$router.push(this.fromPath))})).catch((e=>{console.log(e),this.$message.error(e.msg)}))}),3e3)},handleClick(e,t){},handlerSend(e){(0,i.Gy)({mobile:this.ruleForm.phone,event:e}).then((e=>{1===e.code&&console.log(e)})).catch((e=>{console.log(e),this.$message.error(e.msg)}));let t=30,r=this,a=setInterval((function(){t--,t>0?(r.verificationCodeText=t+"s后重新获取",r.isDisabled=!0):(t=30,r.verificationCodeText="获取验证码",r.isDisabled=!1,clearInterval(a))}),1e3)},handleSubmitForm(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;(0,i.cX)({mobile:this.ruleForm.phone,captcha:this.ruleForm.verificationCode}).then((e=>{1===e.code&&(clearInterval(this.checkQrCode),this.setUserInfo(e.data.userinfo),localStorage.setItem("userInfo",JSON.stringify(e.data.userinfo)),localStorage.setItem("token",e.data.userinfo.token),this.$router.push(this.fromPath))})).catch((e=>{console.log(e)}))}))},handleBindPhone(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;(0,i.eF)({mobile:this.ruleForm.phone,captcha:this.ruleForm.verificationCode,wechat_token:this.wechatToken}).then((e=>{1===e.code?(this.setUserInfo(e.data.userinfo),localStorage.setItem("userInfo",JSON.stringify(e.data.userinfo)),localStorage.setItem("token",e.data.userinfo.token),this.$router.push(this.fromPath)):0===e.code&&0===e.data.status&&(this.hasBindPhone=!1)})).catch((e=>{console.log(e)}))}))},handleRefresh(){this.handlerGetQrcode()},startCron(){var e=0;let t=this;var r=setInterval((function(){e++,e>60&&(t.isRefresh=!0,clearInterval(r))}),3e3)},verifyToken(){let e=JSON.parse(localStorage.getItem("userinfo")).token;if(!e)return new Promise.reject(new Error("请登录!"));(0,i.a_)().then((e=>{e&&this.$router.push({path:"/"})})).catch((e=>{store.commit("clearUserInfo"),localStorage.removeItem("userInfo"),this.$router.push("/login")}))}}},l=n,c=r(1001),d=(0,c.Z)(l,a,s,!1,null,"209e5888",null),h=d.exports},4798:function(e,t,r){e.exports=r.p+"static/img/login_banner.4bfb8ad3.png"},1444:function(e){e.exports="data:image/png;base64,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"}}]);