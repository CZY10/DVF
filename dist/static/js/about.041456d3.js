"use strict";(self["webpackChunkvideoproject"]=self["webpackChunkvideoproject"]||[]).push([[443],{6616:function(e,t,i){i.r(t),i.d(t,{default:function(){return m}});var o=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"header"},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.$route.path,router:"",mode:"horizontal","active-text-color":"#ffffff","text-color":"#666666"}},[t("el-menu-item",{staticStyle:{width:"237px"},attrs:{index:"/"}},[t("img",{attrs:{src:i(2115),alt:""}})]),t("el-menu-item",{staticStyle:{float:"right"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("加群交流")])],1)],1),t("div",{staticClass:"content"},[t("el-row",{staticClass:"content_bg"},[t("el-col",{staticClass:"left",attrs:{span:16}}),t("el-col",{staticClass:"right",attrs:{span:8}})],1),t("el-row",{staticClass:"content_body"},[t("el-col",{staticClass:"left",attrs:{span:12}},[t("div",{staticClass:"content_img"},[t("img",{attrs:{id:"img",src:i(9331),alt:""}})])]),t("el-col",{staticClass:"right max_right",attrs:{span:12}},[e.hasBindPhone?t("div",{staticClass:"tabs"},[t("h3",{staticStyle:{"padding-bottom":"17px"}},[e._v("请绑定手机号")]),t("el-form",{ref:"bindPhoneRuleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.bindPhoneRules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText))])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleBindPhone("bindPhoneRuleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v("绑定后即可使用微信扫码登录，更便捷")])],1):t("div",{staticClass:"tabs"},[t("h3",[e._v("注册/登录")]),t("p",{staticClass:"description"},[e._v("未注册时，首次登录系统将自动为您注册")]),t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"微信扫码",name:"first"}},[t("div",{staticClass:"qrcode"},[t("span",{staticClass:"top"}),t("span",{staticClass:"bottom"}),t("span",{staticClass:"left"}),t("span",{staticClass:"right"}),t("img",{attrs:{src:e.qrImg,alt:""}}),e.isRefresh?t("div",{attrs:{id:"refreshQrcode"},on:{click:e.handleRefresh}},[t("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center",height:"100%"}},[t("div",[t("i",{staticClass:"el-icon-refresh-right"}),t("span",[e._v("点击刷新")])])])]):e._e()]),t("p",{staticClass:"privacy_agreement"},[e._v(" 登录平台即代表同意 "),t("router-link",{attrs:{target:"_blank",to:"/tos"}},[e._v("《用户使用协议》")])],1)]),t("el-tab-pane",{attrs:{label:"验证码",name:"second"}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText)+" ")])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleSubmitForm("ruleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v(" 登录平台即代表同意 "),t("router-link",{attrs:{target:"_blank",to:"/tos"}},[e._v("《用户使用协议》")])],1)],1)],1)],1)]),t("el-col",{staticClass:"right min_right",attrs:{span:12}},[e.hasBindPhone?t("div",{staticClass:"tabs"},[t("h3",{staticStyle:{"padding-bottom":"17px"}},[e._v("请绑定手机号")]),t("el-form",{ref:"bindPhoneRuleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.bindPhoneRules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText))])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleBindPhone("bindPhoneRuleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v("绑定后即可使用微信扫码登录，更便捷")])],1):t("div",{staticClass:"tabs"},[t("h3",[e._v("注册/登录")]),t("p",{staticClass:"description"},[e._v("未注册时，首次登录系统将自动为您注册")]),t("div",[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"verificationCode"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}},[t("el-button",{style:{color:e.isDisabled?"#999999":"#2489F3"},attrs:{slot:"append",disabled:e.isDisabled,type:"text"},on:{click:function(t){return e.handlerSend("mobilelogin")}},slot:"append"},[e._v(" "+e._s(e.verificationCodeText)+" ")])],1)],1),t("el-form-item",[t("el-button",{staticClass:"submit_btn",class:{disabled_opacity:e.phoneError||e.codeError},attrs:{disabled:e.phoneError||e.codeError,round:""},on:{click:function(t){return e.handleSubmitForm("ruleForm")}}},[e._v("提交")])],1)],1),t("p",{staticClass:"privacy_agreement"},[e._v(" 登录平台即代表同意 "),t("router-link",{attrs:{target:"_blank",to:"/tos"}},[e._v("《用户使用协议》")])],1)],1)])])],1)],1),t("el-dialog",{attrs:{title:"微信咨询",visible:e.dialogVisible,center:"",width:"320px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("div",{staticClass:"contact_us_box"},[t("span"),t("span"),t("span"),t("span"),t("img",{staticStyle:{width:"260px"},attrs:{src:e.configData.wechat}})]),t("div",{staticClass:"contact_us_foot"},[t("p",[t("i",{staticClass:"iconfont icon-phone-call"}),t("span",[e._v("电话：")]),e._v(e._s(e.configData.phone)+" ")]),t("p",[t("i",{staticClass:"iconfont icon-mail"}),t("span",[e._v("邮箱：")]),e._v("ceo@viponltd.com ")])])])],1)},a=[],r=(i(7658),i(629)),l=i(586),s=i(9981),n=i(5272),c={name:"login",data(){const e=(e,t,i)=>{const o=/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;o.test(t)?(this.isDisabled=!1,this.phoneError=!1,i()):(i(new Error("手机号码格式错误，请输入正确的手机号码！")),this.isDisabled=!0,this.phoneError=!0)},t=(e,t,i)=>{const o=/^[0-9]{4}$/;o.test(t)?(this.codeError=!1,i()):(this.codeError=!0,i(new Error("验证码格式错误，请输入正确的验证码！")))};return{source:"",action:"",dialogVisible:!1,phoneError:!0,codeError:!0,isSubmitDisabled:!0,isRefresh:!1,qrImg:"",activeName:"first",checkQrCode:"",hasBindPhone:!1,isDisabled:!0,isBindPhoneDisabled:!1,verificationCodeText:"获取验证码",logoImg:i(652),disabledText:{color:"#999999"},ruleForm:{phone:"",verificationCode:""},rules:{phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"},{validator:e,trigger:["blur","change"]}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{validator:t,trigger:["blur","change"]}]},bindPhoneRules:{phone:[{required:!0,message:"请输入手机号码！",trigger:"blur"},{validator:e,trigger:["blur","change"]}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{validator:t,trigger:["blur","change"]}]},wechatToken:"",fromPath:localStorage.getItem("loginFromPath"),configData:{}}},created(){},mounted(){this.handlerGetQrcode(),this.verifyToken(),localStorage.getItem("configObj")?this.configData=JSON.parse(localStorage.getItem("configObj")):this.getContent(),localStorage.getItem("logo")?this.logoImg=localStorage.getItem("logo"):this.getContent(),this.source=this.$route.query.source||localStorage.getItem("source")||"",this.action=this.$route.query.action||localStorage.getItem("action")||""},methods:{...(0,r.OI)("login",["setUserInfo","setToken","setAvatar","setExpiretime"]),...(0,r.OI)("login",["setLogo"]),getContent(){(0,l.iE)().then((e=>{1===e.code&&(this.logoImg=e.data.logo,localStorage.setItem("logo",e.data.logo),localStorage.setItem("configObj",JSON.stringify(e.data)),this.setLogo(e.data.logo),this.configData=e.data)})).catch((e=>{console.log(e)}))},handlerGetQrcode(){(0,l.fN)().then((e=>{1===e.code&&(this.qrImg=e.data.qrcode_url,this.wechatToken=e.data.wechat_token,this.isRefresh=!1,this.handleCheckQr())})).catch((e=>{console.log(e),this.$message.error(e.msg)}))},async handleCheckQr(){var e=0;let t=this,i=new FormData,o=this.$route.query.id||"";i.append("wechat_token",t.wechatToken),i.append("source",t.source),i.append("action",t.action),i.append("id",o),t.checkQrCode=setInterval((async()=>{try{const o=await(0,l.Zm)(i);0===o.code&&(t.isRefresh=!0,clearInterval(t.checkQrCode)),1===o.code&&0===o.data.status?(e++,e>60&&(t.isRefresh=!0,clearInterval(t.checkQrCode))):1===o.code&&1===o.data.status?(t.hasBindPhone=!0,clearInterval(t.checkQrCode)):1===o.code&&2===o.data.status&&(clearInterval(t.checkQrCode),localStorage.setItem("userInfo",JSON.stringify(o.data.userinfo)),localStorage.setItem("token",o.data.userinfo.token),localStorage.setItem("avatar",o.data.userinfo.avatar),localStorage.setItem("expiretime",o.data.userinfo.expiretime),this.setExpiretime(o.data.userinfo.expiretime),this.setUserInfo(JSON.stringify(o.data.userinfo)),this.setToken(o.data.userinfo.token),this.setAvatar(o.data.userinfo.avatar),o.data.jump?await new Promise((e=>{this.openUrl(o.data.jump),setTimeout((()=>{n.Z.push("/"),console.log("gohome"),e()}),1e3)})):n.Z.push(this.fromPath),localStorage.removeItem("source"),localStorage.removeItem("active"))}catch(o){this.$message.error(o.msg)}}),3e3)},openUrl(e){var t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("target","_blank"),t.setAttribute("id","camnpr"),document.body.appendChild(t),t.click()},handleClick(e){0==e.index?this.handleCheckQr():clearInterval(this.checkQrCode)},handlerSend(e){(0,l.Gy)({mobile:this.ruleForm.phone,event:e}).then((e=>{})).catch((e=>{this.$message.error(e.msg)}));let t=30,i=this,o=setInterval((function(){t--,t>0?(i.verificationCodeText=t+"s后重新获取",i.isDisabled=!0):(t=30,i.verificationCodeText="获取验证码",i.isDisabled=!1,clearInterval(o))}),1e3)},async handleSubmitForm(e){this.$refs[e].validate((async e=>{if(!e)return console.log("error submit!!"),!1;{const e=await(0,l.cX)({source:this.source,mobile:this.ruleForm.phone,captcha:this.ruleForm.verificationCode,action:this.action,id:this.$route.query.id||""});1===e.code&&("register"==e.data.type&&this.$message.success(e.msg),clearInterval(this.checkQrCode),localStorage.setItem("userInfo",JSON.stringify(e.data.userinfo)),localStorage.setItem("token",e.data.userinfo.token),localStorage.setItem("avatar",e.data.userinfo.avatar),localStorage.setItem("expiretime",e.data.userinfo.expiretime),this.setExpiretime(e.data.userinfo.expiretime),this.setUserInfo(JSON.stringify(e.data.userinfo)),this.setToken(e.data.userinfo.token),this.setAvatar(e.data.userinfo.avatar),e.data.jump?await new Promise((t=>{window.open(e.data.jump,"_blank"),setTimeout((()=>{n.Z.push("/"),t()}),1e3)})):n.Z.push(this.fromPath),localStorage.removeItem("source"),localStorage.removeItem("active"))}}))},handleBindPhone(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;(0,l.eF)({mobile:this.ruleForm.phone,captcha:this.ruleForm.verificationCode,wechat_token:this.wechatToken,source:this.source,action:this.action}).then((e=>{1===e.code?(clearInterval(this.checkQrCode),localStorage.setItem("userInfo",JSON.stringify(e.data.userinfo)),localStorage.setItem("token",e.data.userinfo.token),localStorage.setItem("avatar",e.data.userinfo.avatar),localStorage.setItem("expiretime",e.data.userinfo.expiretime),this.setExpiretime(e.data.userinfo.expiretime),this.setUserInfo(JSON.stringify(e.data.userinfo)),this.setToken(e.data.userinfo.token),this.setAvatar(e.data.userinfo.avatar),e.data.jump?window.location.href=e.data.jump:this.$router.push(this.fromPath)):0===e.code&&0===e.data.status&&(this.hasBindPhone=!1)})).catch((e=>{console.log(e)}))}))},handleRefresh(){this.handlerGetQrcode()},startCron(){var e=0;let t=this;var i=setInterval((function(){e++,e>60&&(t.isRefresh=!0,clearInterval(i))}),3e3)},verifyToken(){let e=s.Z.state.token;e&&this.$router.push({path:"/"})}}},d=c,v=i(1001),h=(0,v.Z)(d,o,a,!1,null,"3d6f8514",null),m=h.exports},8461:function(e,t,i){i.r(t),i.d(t,{default:function(){return c}});var o=function(){var e=this;e._self._c;return e._m(0)},a=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("h1",{staticClass:"title"},[e._v("用户使用协议")]),t("p",[e._v("欢迎您阅读《用户使用协议》！")]),t("p",[e._v("《用户使用协议》（以下简称“本协议”）是您与“百佬汇”之间关于使用百佬汇各项服务的法律协议。“百佬汇”是指百佬汇旗下”微胖联盟-视频服务”平台（viponm.cn及viponm.com）及其相关网站或小程序。")]),t("p",[e._v("本协议中与您的权益（可能）存在重大关系，请您确保您在使用百佬汇的服务前已仔细阅读、充分理解并毫无保留地接受本协议所有条款。")]),t("p",[e._v("请您审慎阅读并选择接受或不接受本协议。您的注册、登录、使用、购买等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若您不同意本协议，或对本协议中的条款存在任何疑问，请您立即停止用户注册程序，并可以选择不使用本网站服务。")]),t("h3",[e._v("1. 服务说明")]),t("ul",[t("li",[e._v(" 1.1 百佬汇向您提供包括但不限于如下服务： "),t("ol",[t("li",[e._v("百佬汇网站：viponm.cn及viponm.com（网站上的各类服务）和“百佬汇跨境服务”微信公众号、视频号；")]),t("li",[e._v("百佬汇的数据API服务等；")]),t("li",[e._v("百佬汇提供给您的各类增值服务；")]),t("li",[e._v("百佬汇提供给您的其他技术和/或服务，具体以百佬汇实际提供的为准。")])])]),t("li",[e._v("1.2 百佬汇提供的服务，均限于在上述1.1.1所述范围（以下简称“百佬汇”）内使用，任何以恶意破解等非法手段将百佬汇所提供的服务与百佬汇平台分离的行为，皆不属于本协议约定的由百佬汇提供的服务。由此引起的一切后果由行为人负责，百佬汇将保留依法追究行为人法律责任的权利。")]),t("li",[e._v("1.3 百佬汇官方所公布的方式为注册、登录、使用百佬汇服务的唯一合法方式，用户通过其他任何途径、任何渠道、任何方式获取的百佬汇服务（包括但不限于账号、会员、优惠券、账户积分等）均为非法所得，百佬汇概不承认其效力，且一经发现，百佬汇有权立即作出删除、封号等处理，任何因此导致的一切不利后果均由用户自行承担。请用户妥善保管自己的账号和密码，加强密码安全性，谨防账号泄露或被盗。因用户账号被泄露或被盗而造成的任何损失，百佬汇不承担补偿责任。")]),t("li",[e._v("1.4 百佬汇有权提前向用户公告（包括但不限于弹出公告、网站首页公告、系统消息）以修改、替换、升级与百佬汇相关的任何服务。如果用户不同意或者不接受百佬汇相关服务的修改、替代、升级，请直接拒绝、停止、取消使用行为，否则视为用户同意并接受百佬汇相关服务的修改、替代、升级，同时该同意并接受的行为仍受本协议约束。")]),t("li",[e._v("1.5 本协议所称“用户”，包括注册获得百佬汇（或百佬汇）账号的用户（以下简称“注册用户”）及未注册获得百佬汇账号的用户（以下简称“非注册用户”）。凡未注册百佬汇的用户，自使用百佬汇的服务时即自动成为百佬汇的“非注册用户”。")]),t("li",[e._v("1.6 特别提醒：本协议为百佬汇统一适用的一般性用户服务条款。针对百佬汇的某些特定产品/服务，百佬汇还将制定特定用户服务协议，以便更具体地与您约定百佬汇的服务内容、服务规则等内容，您应在充分阅读并同意特定用户服务协议的全部内容后再使用该特定产品/服务。")])]),t("h3",[e._v("2. 注册账号及付费权益")]),t("ul",[t("li",[e._v(" 2.1 百佬汇提供用户注册通道，您在认可并接受本协议之后，有权选择未被其他用户使用过的微信号、手机号码或字母符号组合作为用户的帐号，并自行设置符合安全要求的密码。用户设置的帐号、密码是用户用以登录百佬汇、接受百佬汇服务的凭证。 "),t("ol",[t("li",[e._v("您可通过各种已有和未来新增的渠道注册账号及付费购买用户使用。")]),t("li",[e._v("在您使用具体某种方式加入付费用户时，须阅读并确认相关的用户协议和使用方法。")]),t("li",[e._v("您应遵循诚实信用、合法善意的原则，通过网络向百佬汇填写并提交注册表，表中所填写的内容与个人资料必须真实有效，且应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公序良俗、信息真实等原则，不应提交任何违法或不良信息，如您填写的身份信息不完整、不真实或未通过验证，将导致您无法使用百佬汇，且不会获得任何赔偿或用户费的退还。")])])]),t("li",[e._v("2.2 本产品服务为购买者专用型虚拟产品，购买后不支持退款、退货及更换。您成为付费用户后，您有权利不接受百佬汇的服务，可申请取消用户服务，但不获得任何服务费用的退还。")]),t("li",[e._v("2.3 您应对注册获得的百佬汇账号（以下简称“账号”）项下的一切行为承担全部责任，不得侵犯包括但不限于百佬汇在内的任何主体的合法权益。")]),t("li",[e._v("2.4 您理解并同意，您仅享有账号及账号项下由百佬汇提供的虚拟产品及服务的使用权，账号及该等虚拟产品及服务的所有权归百佬汇所有（法律法规另有规定的除外）。未经百佬汇书面同意，您不得以任何形式处置账号的使用权（包括但不限于赠与、出借、转让、销售、抵押、继承、许可他人使用）。如果百佬汇发现或者有合理理由认为使用者并非账号初始注册人，百佬汇有权在不通知您的情况下，暂停或终止向该注册账号提供服务，并注销该账号。")]),t("li",[e._v("2.5 您应妥善保管账号信息、账号密码以及其他与账号相关的信息、资料。如因您的原因，造成账号信息、资料、数据的变动、灭失或财产损失等，您应立即通知百佬汇并自行承担相关法律后果。用户帐号在丢失或遗忘密码后，可遵照百佬汇的申诉途径及时申诉请求找回帐号，百佬汇并无义务保证帐号丢失或遗忘密码后用户一定能通过申诉找回帐号。")]),t("li",[e._v(" 2.6 您同意并承诺做到： "),t("ol",[t("li",[e._v("当您的账号或密码遭到未经授权的使用，或者发生任何安全问题时，您会立即有效地通知到百佬汇；")]),t("li",[e._v("当您每次登录百佬汇或使用相关服务后，会将有关账号等安全退出；")]),t("li",[e._v("您同意接受百佬汇通过电子邮件、网页或其他合法方式向您发送通知信息和其他相关信息。")])])]),t("li",[e._v(" 2.7 您同意并承诺不从事以下行为： "),t("ol",[t("li",[e._v("冒用他人信息为自己注册百佬汇账号；")]),t("li",[e._v("未经他人合法授权以他人名义注册百佬汇账号；")]),t("li",[e._v("使用同一身份认证信息注册多个百佬汇账号（包括经百佬汇审核认定多个百佬汇账号的实际控制人为同一人的情形）；")]),t("li",[e._v("窃取、盗用他人的百佬汇账号、用户权益等；")]),t("li",[e._v("使用侮辱、诽谤、色情、政治等违反法律、道德及公序良俗的词语注册百佬汇账号；")]),t("li",[e._v("以非法占有百佬汇相关服务资源为目的，通过正当或非正当手段恶意利用网站漏洞；")]),t("li",[e._v("侵犯他人合法权益的其他内容。")])])]),t("li",[e._v("2.8 您理解并同意，百佬汇有权对违反上述条款的用户作出禁止注册及/或封号的处理。")]),t("li",[e._v("2.9 您理解并同意，百佬汇有权在法律允许的最大范围内视情况决定收回账号使用权，无需另行通知用户亦无需征得用户同意。")])]),t("h3",[e._v("3. 使用规则")]),t("ul",[t("li",[e._v(" 3.1 用户在使用百佬汇服务的过程中，应遵守以下法律法规： "),t("ol",[t("li",[e._v("《中华人民共和国保守国家秘密法》；")]),t("li",[e._v("《中华人民共和国著作权法》；")]),t("li",[e._v("《中华人民共和国计算机信息系统安全保护条例》；")]),t("li",[e._v("《计算机软件保护条例》；")]),t("li",[e._v("《网络信息内容生态治理规定》")]),t("li",[e._v("《信息网络传播权保护条例》")]),t("li",[e._v("《中华人民共和国网络安全法》；")]),t("li",[e._v("其他法律、法规、规章、条例等具有法律效力的规范。")])])]),t("li",[e._v(" 3.2 禁止用户从事以下行为： "),t("ol",[t("li",[e._v("利用百佬汇服务产品发表、传送、传播、储存反对宪法所确定的基本原则的、危害国家安全、国家统一、社会稳定的、煽动民族仇恨、民族歧视、破坏民族团结的内容，或侮辱诽谤、色情、暴力、引起他人不安及任何违反国家法律法规政策的内容或者设置含有上述内容的网名、角色名；")]),t("li",[e._v("利用百佬汇发表、传送、传播、储存侵害他人知识产权、商业机密、肖像权、隐私权等合法权利或其他道德上令人反感的内容。除相关著作权人明示同意，不应在网络中擅自破解、传播、下载或复制第三人享有著作权的内容或进行其他任何侵害他人知识产权的活动；")]),t("li",[e._v("进行任何危害计算机网络安全的行为，包括但不限于：使用未经许可的数据或进入未经许可的服务器/帐户；未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；未经许可，企图探查、扫描、测试百佬汇软件系统或网络的弱点或其它实施破坏网络安全的行为；企图干涉、破坏百佬汇的正常运行，故意传播恶意程序或病毒以及其他破坏干扰正常网络信息服务的行为；伪造TCP/IP数据包名称或部分名称;自行或利用其他软件对百佬汇进行反向破解等违法行为；")]),t("li",[e._v("进行任何诸如发布广告、推广信息、销售商品的行为，或者进行任何非法的侵害百佬汇利益的行为。")]),t("li",[e._v("未经百佬汇事先明确书面许可，以任何方式（包括但不限于机器人软件、蜘蛛软件、爬虫软件等任何自动程序、脚本、软件）和任何理由自行或委托他人、协助他人获取平台的服务、内容、数据；")]),t("li",[e._v("进行其他任何违法以及侵犯其他个人、公司、社会团体、组织的合法权益的行为或者法律、行政法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其他行为。")])])]),t("li",[e._v(" 3.3 如您在使用百佬汇服务过程中涉及上述行为中的一项或多项，则需要对自己的行为承担法律责任。 "),t("ol",[t("li",[e._v("承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在百佬汇首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任等损失（含诉讼费、律师费等相关法律程序费用）后，您应立即给予百佬汇等额的赔偿。此外，根据具体违法违规情形，百佬汇有权作出独立判断，立即暂停或终止对您提供部分或全部服务，包括锁定、注销、删除帐号等措施。")]),t("li",[e._v("您知悉并理解，如果百佬汇发现您的上述违法违规行为，依据相关法律法规的规定，百佬汇有权或有义务立即停止相关服务，删除或屏蔽相关违规信息，并视情况进行调查取证，保存有关记录，或向国家有关机关举报。同时，百佬汇有权自主删除、屏蔽含有该内容的任何数据信息。百佬汇将根据国家相关法律法规要求，对依法删除、屏蔽的数据信息予以记录、保存。")])])]),t("li",[e._v(" 3.4 百佬汇优惠券使用规则： "),t("ol",[t("li",[e._v("百佬汇优惠券是百佬汇平台专有消费券，可用于支付相关业务订单或账户积分购买时使用。若无特殊说明，用户通过使用百佬汇券使用百佬汇部分功能，具体使用方法、期限等以百佬汇页面中附带的说明及用户指南或具备以上解说性质的类似官方文档为准。")]),t("li",[e._v("百佬汇券系统会因用户需求、网站策略调整、用户接受程度等因素随时进行调整，具体信息请以当时的页面说明为准。")]),t("li",[e._v("您理解并同意，您仅享有百佬汇券的使用权，百佬汇券的所有权归百佬汇所有，未经百佬汇书面同意，禁止以任何形式处置百佬汇券的使用权（包括但不限于赠与、出借、转让、销售、抵押、继承、许可他人使用）。任何用户都应通过正规渠道获得百佬汇券服务，一切通过非官方公布渠道取得的硬币及其衍生服务均不对百佬汇发生法律效力，百佬汇有权单方面收回相关百佬汇券并终止相应服务，严重者百佬汇有权对其用户采取封号处理。")]),t("li",[e._v("如无特殊约定，用户通过正规渠道获得的百佬汇券及其衍生数据服务均不以任何现金方式退还，仅能通过享用百佬汇券服务进行等值消耗。用户消耗其所获得全部百佬汇券，且不将继续使用百佬汇券服务的，服务终止。")])])])]),t("h3",[e._v("4. 第三方链接")]),t("ul",[t("li",[e._v("百佬汇服务可能会提供与第三方网站或资源的链接。除非另有声明，百佬汇无法对第三方网站之服务进行控制，用户因使用或依赖上述网站或资源所产生的损失或损害，百佬汇不承担任何责任。我们建议您在离开百佬汇，访问其他网站或资源前仔细阅读其服务条款和隐私政策。")])]),t("h3",[e._v("5. 知识产权")]),t("ul",[t("li",[e._v("5.1 您理解并知悉，除另有书面声明以外，百佬汇对其旗下运营的网页、小程序等产品和服务享有知识产权（包括著作权、商标权、专利权、商业秘密等知识产权）。受中国法律法规和相应的国际条约的保护。未经百佬汇或相关权利人书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权，您也承诺不应且不应允许或协助任何人以任何形式（包括但不限于通过任何机器人、蜘蛛、截屏等程序或设备）进行使用、出租、出借、分发、展示、复制、修改、链接、转载、汇编、发表、出版、抓取、监视、引用或创造相关衍生作品。")]),t("li",[e._v("5.2 您只能在本协议以及相应的授权许可协议授权的范围内使用百佬汇知识产权，未经授权超范围使用的，构成对百佬汇的侵权。")]),t("li",[e._v("5.3 用户不得修改、改编、翻译百佬汇所使用的软件、技术、材料等，或者创作与之相关的派生作品，不得通过反向工程、反编译、反汇编或其他类似行为获得其的源代码，否则由此引起的一切法律后果由用户负责，百佬汇将依法追究违约方的法律责任。")]),t("li",[e._v("5.4 用户不得恶意修改、复制、传播百佬汇服务所使用的软件、技术、材料等。否则，用户自行承担因此而造成对其他人的损害，或者造成对百佬汇品牌形象损害，要承担相应的法律责任。")]),t("li",[e._v("5.5 用户不得擅自删除、掩盖或更改百佬汇的版权声明、商标或其它权利声明。百佬汇平台所有设计图样以及其他图样、产品及服务名称，均为百佬汇所享有的商标、标识。任何人不得使用、复制或用作其他用途。")]),t("li",[e._v("5.6 任何单位或个人认为通过百佬汇提供服务的内容可能涉嫌侵犯其知识产权或信息网络传播权，应该及时向百佬汇提出书面权利通知投诉，并提供身份证明、权属证明及详细侵权情况证明。百佬汇在收到上述法律文件后，将会依法尽快断开相关链接内容。百佬汇提供投诉通道：support@blhltd.com。如投诉中未向百佬汇提供合法有效的证明材料，百佬汇有权不采取任何措施。")])]),t("h3",[e._v("6. 隐私保护")]),t("ul",[t("li",[e._v(" 6.1 你理解并知悉，在您注册、使用百佬汇的过程中，百佬汇仅会在非常必要的情况下和非常有限的限度内收集您的个人信息，并且这些信息仅用于向您提供服务、优化我们的服务，以及保障您的账号安全。具体而言，百佬汇将按照如下方式收集您主动提供或因为使用服务而产生的信息： "),t("ol",[t("li",[e._v("在用户注册百佬汇账户时，根据要求提供的个人注册信息；")]),t("li",[e._v("在用户使用百佬汇，或访问其相关网页时，百佬汇自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录。")]),t("li",[e._v("目前百佬汇不会主动收集本隐私政策明示以外的信息包括从第三方获取您的个人信息。如未来为业务发展需要收集该类个人信息，百佬汇会在获取前征得您的明示同意，从第三方获取您的个人信息，百佬汇会要求第三方保障其提供的信息的合法性。")])])]),t("li",[e._v(" 6.2 用户隐私保护 "),t("ol",[t("li",[e._v("百佬汇通过建立专门的管理制度、流程、组织等管理措施以保障信息的安全。例如，百佬汇只允许有必要接触客户信息的工作人员查询和管理客户信息；严格设定访问客户信息的权限分级，同时要求可能接触到您个人信息的所有人员履行相应的保密义务；此外，百佬汇还不时对工作人员培训相关法律法规及隐私安全准则，强化宣导安全意识。")]),t("li",[e._v("保障您的个人信息安全，需要您和百佬汇的共同配合，请您不向他人泄露登录账号和密码，如您发现自己的个人信息尤其是您的账号或密码发生泄露时，请您立即联络百佬汇，以便百佬汇根据您的申请采取相应合理措施。")]),t("li",[e._v("互联网环境并非百分之百安全，百佬汇将尽力确保您发送给我们的任何信息的安全性。如果百佬汇的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，百佬汇将根据法律规定承担相应的责任。")])])]),t("li",[e._v(" 6.3 用户信息保存 "),t("ol",[t("li",[e._v("一般而言，百佬汇仅为实现本隐私政策所述目的所必需的时间保留您的个人信息，除非法律要求或允许可以在更长时间内保留这些信息。")])])]),t("li",[e._v(" 6.4 对外提供信息 "),t("ol",[t("li",[e._v("百佬汇可能会将您的信息与我们的关联方或合作方共享。为数据统计分析的需要，在不识别您身份的前提下，可能会整合您使用我们产品或服务的相关信息。")]),t("li",[e._v("除了可能在适用法律、法院命令或政府法规的要求下披露您的个人信息以外，未经您的同意，百佬汇不会对外公开披露所获得的您的个人信息。")]),t("li",[e._v("随着百佬汇的持续发展，我们有可能进行合并、收购、资产转让等交易，我们将告知您相关情形，按照法律法规及不低于本隐私政策所要求的标准继续保护或确保新的控制者继续保护您的个人信息。")])])]),t("li",[e._v("6.5 由于服务内容、联络方式 、法律和监管政策要求等变化，百佬汇可能会适时对本隐私政策进行修订。当隐私政策发生变更时，百佬汇会在官方网站、移动端发布更新后的版本。")])]),t("h3",[e._v("7. 免责声明")]),t("ul",[t("li",[e._v(" 7.1 您理解并同意用户应对本服务所提供的内容自行加以判断，并承担因使用内容而引起的所有风险，百佬汇对如下事项不做担保（包括但不限于）： "),t("ol",[t("li",[e._v("百佬汇提供的网站、移动端等服务虽然均已经过百佬汇测试，但由于技术本身的局限性，百佬汇不能保证其与其他软硬件、系统完全兼容。如果出现不兼容的情况，用户可将情况报告百佬汇，以获得技术支持。如果无法解决问题，用户可以选择停止使用百佬汇服务。")]),t("li",[e._v("使用百佬汇服务涉及到Internet服务，可能会受到各个环节不稳定因素的影响。因不可抗力、黑客攻击、系统不稳定、网络中断、用户关机、通信线路等原因，均可能造成百佬汇服务中断或不能满足用户要求的情况。百佬汇不保证百佬汇服务适合用户的绝对稳定的使用要求。")]),t("li",[e._v("百佬汇不做任何与百佬汇服务产品的安全性、可靠性、及时性和性能有关的担保，是否使用本网站任何数据、讯息、服务或资料应由用户自行考虑且自负风险。")]),t("li",[e._v("百佬汇不保证其提供的任何产品、服务或其他材料符合用户的期望。因对内容的正确性、完整性或实用性的依赖而产生的风险，或因任何数据、讯息、服务或资料使用而导致的用户之任何损失或数据流失等后果，均由用户自行承担。")]),t("li",[e._v("除非另有明确书面说明，在符合法律法规规定的情况下，百佬汇不对其网站和客户端上的信息、内容、材料、产品或服务做任何形式的明示或默示的声明或担保。")])])]),t("li",[e._v("7.2 除非另有明确的书面说明，百佬汇提供给您的全部产品和服务，均是在“按现状”和“按现有”的基础上提供的。")]),t("li",[e._v(" 7.3 基于以下原因而造成的利润、商业信誉、资料损失或其他有形或无形损失，百佬汇不承担任何直接、间接、附带、衍生或惩罚性的赔偿： "),t("ol",[t("li",[e._v("百佬汇服务全部或部分无法使用；")]),t("li",[e._v("经由百佬汇服务购买或取得的任何产品、资料或服务；")]),t("li",[e._v("用户资料遭到未授权的使用或修改；")]),t("li",[e._v("其他与百佬汇服务相关的事宜。")])])]),t("li",[e._v("7.4 用户应妥善保管自己的账号和密码，加强密码安全性，谨防账号泄露或被盗。因用户账号被泄露或被盗而造成的任何损失，百佬汇不承担补偿责任。用户因电信和网通部门的通讯线路故障、网络或电脑故障、系统不稳定、不可抗力（如服务器宕机）等非百佬汇原因造成账号、账号内财产等丢失、减少的，百佬汇不承担补偿等责任。")]),t("li",[e._v("7.5 用户因注册信息不真实而导致账号、账号内财产等丢失、减少而无法找回的，百佬汇不承担任何法律责任。")])]),t("h3",[e._v("8. 服务的变更、中断、终止")]),t("ul",[t("li",[e._v("8.1 您理解并同意，百佬汇基于经营策略的调整，可能会对服务内容进行变更，也可能会中断、中止或终止服务。如因此类情况而造成网络服务在合理时间内的中断，百佬汇无需为此承担任何责任。")]),t("li",[e._v("8.2 您理解并同意，如您在使用百佬汇服务时存在违反法律法规、本协议及其他百佬汇规则、社会公德、公序良俗和/或侵害他人合法权益等情形，百佬汇有权不经通知而单方中断或终止向您提供全部或部分服务。")]),t("li",[e._v("8.3 您理解并同意，如您实施违反法律法规、社会公德、公序良俗和/或侵害他人合法权益等行为，并因此影响或可能影响百佬汇和/或他人的名誉、声誉或其他合法权益，百佬汇有权不经通知而单方中断或终止向您提供全部或部分服务。")]),t("li",[e._v("8.4 百佬汇终止向您提供服务后，有权根据适用法律的要求删除您的个人信息，或使其匿名化处理，亦有权依照法律规定的期限和方式继续保存您留存于我方平台的其他内容和信息。")])]),t("h3",[e._v("9. 其他")]),t("ul",[t("li",[e._v("9.1 您注册并使用了百佬汇服务，即表示您已阅读并同意受本协议的约束。")]),t("li",[e._v("9.2 本协议签订地为中华人民共和国广东省深圳市。")]),t("li",[e._v("9.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。")]),t("li",[e._v("9.4 若您和百佬汇之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。")]),t("li",[e._v("9.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。")]),t("li",[e._v("9.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。")]),t("li",[e._v("9.7 本协议自2022年11月8日起适用。")])])])}],r={name:"index"},l=r,s=i(1001),n=(0,s.Z)(l,o,a,!1,null,"5c393cb2",null),c=n.exports},9331:function(e,t,i){e.exports=i.p+"static/img/login_banner.737aa965.webp"},652:function(e){e.exports="data:image/png;base64,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"}}]);