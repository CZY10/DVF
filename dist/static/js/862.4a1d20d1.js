"use strict";(self["webpackChunkvideoproject"]=self["webpackChunkvideoproject"]||[]).push([[862],{9862:function(t,e,i){i.r(e),i.d(e,{default:function(){return p}});var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"homepage"}},[e("div",{staticClass:"content"},[e("el-row",{staticStyle:{"max-width":"1200px",margin:"auto"},attrs:{gutter:30}},[e("el-col",{staticStyle:{"padding-left":"0"},attrs:{span:9}},[e("div",{staticClass:"homepage_header"},[e("div",{staticClass:"head_img"},[e("img",{attrs:{src:t.userInfo.image,alt:""}})]),e("h5",[t._v("NO."+t._s(t.userInfo.id))]),e("span",{staticClass:"category"},[t._v(t._s(t.userInfo.type))]),e("div",{staticClass:"title"},t._l(t.userInfo.category_ids,(function(i,a){return e("span",{key:a,style:{color:a%3==0?"#4BB1F1":a%2==0?"#F56422 !important":"#00D9AD",background:a%3==0?"rgba(75,177,241,0.1)":a%2==0?"rgba(245,100,34,0.1) !important":"rgba(0,217,173,0.1)"}},[t._v(t._s(i.name))])})),0)])]),e("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:15}},[e("el-card",{staticClass:"box_card basic_information_card",staticStyle:{"margin-bottom":"20px"}},[e("h4",[t._v("基本资料")]),e("div",[t._v("年龄："),e("span",{staticStyle:{"margin-right":"40px"}},[t._v(t._s(t.userInfo.age)+"岁")]),t._v("性别："),e("span",[t._v(t._s("male"===t.userInfo.genderdata?"男":"女"))])]),e("div",[t._v("国家："),e("span",[t._v("美国")])]),e("div",{staticStyle:{display:"flex","align-items":"center"}},[t._v("社交平台："),t._l(t.userInfo.platform,(function(t,i){return e("i",[e("img",{attrs:{src:t.image,alt:""}})])}))],2),e("div",[t._v("个人简介"),e("p",{attrs:{title:t.userInfo.signature}},[t._v(t._s(t.userInfo.signature))])])]),e("el-card",{staticClass:"box_card basic_information_card"},[e("h4",[t._v("交付说明")]),e("el-row",{staticStyle:{"padding-bottom":"0"}},[e("el-col",{staticStyle:{"padding-bottom":"0"},attrs:{span:12}},[e("div",[t._v("卖点呈现："),e("span",[t._v(t._s(t.userInfo.sellingpoint_id))])]),e("div",[t._v("视频上传："),e("span",[t._v(t._s(t.userInfo.videoupload_id))])])]),e("el-col",{staticStyle:{"padding-bottom":"0"},attrs:{span:12}},[e("div",[t._v("拍摄场景："),e("span",[t._v(t._s(t.userInfo.scene_id))])]),e("div",[t._v("交付周期："),e("span",[t._v(t._s(t.userInfo.leadtime_id))]),e("b",[t._v("（样品收货后）")])])])],1),e("div",[t._v("视频时长："),e("span",[t._v("通常"+t._s(t.userInfo.minvideo)+"-"+t._s(t.userInfo.maxvideo)+"s")])]),e("div",[t._v("其他说明"),e("p",{attrs:{title:t.userInfo.content}},[t._v(t._s(t.userInfo.content))])])],1)],1)],1),e("el-card",{staticClass:"title-card",staticStyle:{"max-width":"1200px",margin:"auto"}},[e("h4",[t._v("作品")])]),e("div",{staticClass:"product_box"},[e("div",{staticStyle:{"max-width":"1200px",margin:"auto"}},t._l(t.userInfo.videos,(function(i,a){return e("div",{key:a,staticClass:"product_item"},[e("div",{staticClass:"product_item_video"},[e("img",{attrs:{src:t.localhost+i.coverimage,alt:""}}),e("i",{staticClass:"el-icon-caret-right",on:{click:function(e){return t.handlePlayVideo(i)}}})]),e("p",{attrs:{title:i.desc}},[t._v(t._s(i.desc))])])})),0)])],1),e("Footer"),e("el-dialog",{staticClass:"video_dialog",attrs:{visible:t.videoDialog,width:"1060px","close-on-click-modal":!1},on:{"update:visible":function(e){t.videoDialog=e},close:t.handleClose}},[e("h2",[t._v(t._s(t.videoData.desc))]),e("div",{staticClass:"videoView"},[e("video",{ref:"videoPlayerRef",staticClass:"video-js",attrs:{id:"my-video",controls:"",preload:"auto",poster:t.localhost+t.videoData.coverimage,"data-setup":"{}"}},[e("source",{attrs:{src:t.localhost+t.videoData.file,type:"video/mp4"}})])])])],1)},s=[],o=i(1548),l=i(8884),d=i(6905),r=i(9755),n={name:"homepage",components:{Footer:o.Z},data(){return{videoDialog:!1,videoData:{},title:["家居","电子","服装设计","家居","电子","服装设计","家居","电子","服装设计","家居","电子","服装设计","家居"],id:"",userInfo:{},localhost:"https://api.viponm.com/",player:null,videoPlayerOption:{controls:!0,autoplay:!0,muted:!1,preload:"auto",fluid:!0},videoPlayers:null}},mounted(){this.id=window.location.href.substr(window.location.href.lastIndexOf(":")+1),this.getInfluencerDetail()},methods:{handleClose(){null!=this.videoPlayers&&(this.videoPlayerOption.autoplay=!1,this.videoPlayers.pause(),this.videoPlayers.dispose(),this.videoPlayers=null)},handlePlayVideo(t){let e=this;e.videoData=t,e.videoDialog=!0;let i=this.localhost+t.coverimage,a=this.localhost+t.file;r(".videoView").html('<video id="my-video" ref="videoPlayerRef" class="video-js" controls preload="auto" width="640" height="264" poster="'+i+'" data-setup="{}" ><source src="'+a+'" type="video/mp4" /> </video>'),e.$nextTick((()=>{this.videoPlayers=(0,d.Z)("my-video",{controls:!0,autoplay:!1,muted:!1,preload:"auto",fluid:!0},(function(){this.on("ended",(function(){}))}))}))},getInfluencerDetail(){(0,l.dk)({id:this.id}).then((t=>{1===t.code&&(this.userInfo=t.data)})).catch((t=>{console.log(t)}))}}},c=n,v=i(1001),u=(0,v.Z)(c,a,s,!1,null,"8606810e",null),p=u.exports}}]);