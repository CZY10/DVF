"use strict";(self["webpackChunkvideoproject"]=self["webpackChunkvideoproject"]||[]).push([[748],{4642:function(e,t,i){i.r(t),i.d(t,{default:function(){return h}});var s=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{background:"#f5f7f9","margin-top":"-67px"}},[t("div",{attrs:{id:"buyershow"}},[t("el-backtop",{attrs:{target:"#buyershow"}},[t("i",{staticClass:"iconfont icon-fhdb1",staticStyle:{color:"#999"}})]),t("div",{staticClass:"topclon"},[t("i",{staticClass:"iconfont icon-icfullscreenexit",on:{click:e.outcheckFull}}),t("i",{staticClass:"el-icon-close",on:{click:e.closeCheckFull}})]),t("div",{staticClass:"banxin"},[e.isloading?t("div",{staticClass:"loading"}):e._e(),t("div",{staticClass:"searchfor"},[t("el-input",{staticClass:"inp",attrs:{placeholder:"输入产品名称/品类/红人编号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getRenderingData.apply(null,arguments)}},model:{value:e.searchforval,callback:function(t){e.searchforval=t},expression:"searchforval"}}),t("el-button",{staticClass:"searchforbtn",on:{click:e.getRenderingData}},[e._v("搜索")])],1),t("div",{staticClass:"screen"},[t("div",{staticClass:"filter_header"},[t("div",{staticClass:"filter_item"},[t("span",[e._v("达人性别")]),t("el-radio-group",{on:{change:function(t){return e.handlerSearchList("genderdata",e.genderValue)}},model:{value:e.genderValue,callback:function(t){e.genderValue=t},expression:"genderValue"}},[t("el-radio-button",{attrs:{label:""}},[e._v("全部")]),t("el-radio-button",{attrs:{label:"male"}},[e._v("男性")]),t("el-radio-button",{attrs:{label:"female"}},[e._v("女性")])],1)],1),t("div",{staticClass:"filter_item"},[t("span",[e._v("产品品类")]),t("el-radio-group",{on:{change:function(t){return e.handlerSearchList("category_id",e.categoryValue)}},model:{value:e.categoryValue,callback:function(t){e.categoryValue=t},expression:"categoryValue"}},[t("el-radio-button",{attrs:{label:""}},[e._v("全部")]),e._l(e.categoryList,(function(i,s){return t("el-radio-button",{key:s,attrs:{label:i.id}},[e._v(e._s(i.name))])}))],2)],1),t("div",{staticStyle:{height:"1px","background-color":"#eee"}}),t("div",{staticClass:"filter_item",staticStyle:{"margin-top":"10px"}},[t("span",[e._v("主题专区")]),t("el-radio-group",{on:{change:function(t){return e.handlerSearchList("theme_id",e.themeValue)}},model:{value:e.themeValue,callback:function(t){e.themeValue=t},expression:"themeValue"}},[t("el-radio-button",{attrs:{label:""}},[e._v(" 全部 ")]),e._l(e.themeList,(function(i,s){return t("el-radio-button",{key:s,attrs:{label:i.id}},[t("div",[e._v(" "+e._s(i.name)+" ")])])}))],2)],1)])]),t("div",{staticClass:"seek"},[t("div",{staticClass:"seek_div"},[t("div",{staticClass:"seek_div_span"},[e._v("找到 "+e._s(e.total)+" 个")]),t("div",{staticClass:"seek_divd"},[t("span",[e._v("价格 ≤")]),t("el-input",{staticClass:"priceinp",on:{change:e.getRenderingData},model:{value:e.priceval,callback:function(t){e.priceval=t},expression:"priceval"}}),t("span",[e._v("元")])],1)])]),t("div",{staticClass:"product"},[0!=e.datalist.length?t("ul",{staticClass:"product_ul"},e._l(e.datalist,(function(i,s){return t("li",{key:i.user_id,staticClass:"product_li"},[t("div",{staticClass:"product_li_img",on:{click:function(t){return e.gohomepage(i.user_id)}}},[t("img",{attrs:{src:i.image}})]),t("div",{staticClass:"product_list"},[t("div",{staticClass:"product_list_div1"},[t("div",{staticClass:"product_list_left"},[t("div",{staticClass:"product_list_no"},[e._v("No."+e._s(i.user_id))]),"影响力者"==i.type?t("div",{staticClass:"product_list_typelv"},[e._v(" "+e._s(i.type)+" ")]):e._e(),"社媒红人"==i.type?t("div",{staticClass:"product_list_typeho"},[e._v(" "+e._s(i.type)+" ")]):e._e(),"数字人"==i.type?t("div",{staticClass:"product_list_typelan"},[e._v(" "+e._s(i.type)+" ")]):e._e(),"素人"==i.type?t("div",{staticClass:"product_list_typechen"},[e._v(" "+e._s(i.type)+" ")]):e._e()]),0==i.price_type?t("div",{staticClass:"product_list_rigth"},[e._v(" ￥"+e._s(i.price)+" ")]):1==i.price_type?t("div",{staticClass:"product_list_rigth"},[e._v(" ￥"),t("span",[e._v(e._s(i.lower_price)+"-"+e._s(i.highest_price))])]):t("div",{staticClass:"product_list_rigth",staticStyle:{"font-size":"11px"}},[e._v(" 视产品而定 ")])]),i.category_ids.length<=5?t("div",{staticClass:"product_list_div2",attrs:{title:e.categoryidarr[s]}},e._l(i.category_ids,(function(i,s){return t("li",{key:s},[e._v(" "+e._s(i.name)+" ")])})),0):t("div",{staticStyle:{display:"flex"},attrs:{title:e.categoryidarr[s]}},[t("div",{staticClass:"product_list_div2"},e._l(i.category_ids,(function(i,s){return t("li",{key:s},[e._v(" "+e._s(i.name)+" ")])})),0),t("span",[e._v("...")])]),t("div",{staticStyle:{height:"1px","background-color":"#eee","margin-top":"15px"}}),t("ul",{staticClass:"product_list_videos"},[e._l(e.isvideoslist[s],(function(s,a){return t("li",{key:s.user_id,attrs:{title:s.desc},on:{click:function(t){return e.openVideos(i.videos,a)}}},[t("i",{staticClass:"iconfont icon-video",staticStyle:{"font-size":"14px"}}),t("span",[e._v(" "+e._s(s.desc))])])})),i.videos.length>=12?t("li",{staticStyle:{width:"22px","text-align":"center",display:"block",background:"linear-gradient(","border-radius":"4px"},on:{click:function(t){return e.gohomepage(i.user_id)}}},[e._v(" . . . ")]):e._e()],2)]),t("div",{ref:"addbtndom",refInFor:!0,class:{product_btn:0!=i.istrue,addlistbj:0==i.istrue},on:{click:function(t){return e.addlist(i,s,i.istrue)}}},[t("span",{staticClass:"icon"},[e._v("+")]),t("i",{staticClass:"iconfont icon-gwc",staticStyle:{"font-size":"14px"}}),0==i.istrue?t("span",{staticClass:"test1"},[e._v("已选择")]):t("span",{staticClass:"test1"},[e._v("选择")])])])})),0):t("div",{staticClass:"product_div"},[t("img",{attrs:{src:i(9166),alt:""}}),t("p",[e._v("暂无搜索结果")])])])]),[t("div",{directives:[{name:"show",rawName:"v-show",value:0!=e.datalist.length,expression:"datalist.length != 0"}],staticClass:"paging"},[0!=e.total?t("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-sizes":[12,24,48,96],"page-size":e.per_page,layout:"total, prev, pager, next, sizes, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1)],t("el-dialog",{attrs:{visible:e.dialogVisible,width:"880px","close-on-click-modal":!1,"append-to-body":!0,"custom-class":"my-dialog"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("div",{staticClass:"eldialogVisble"},[t("div",{staticStyle:{width:"650px"}},[t("div",{staticClass:"leftVis"},[t("video",{ref:"myVideo",attrs:{autoplay:"",controls:"",preload:"none"},on:{play:function(t){e.video_img=!0},pause:function(t){e.video_img=!1}}},[t("source",{attrs:{src:e.videoslist[e.videoslistindex]?.file,type:"video/mp4"}})]),t("div",{directives:[{name:"show",rawName:"v-show",value:!e.video_img,expression:"!video_img"}],staticClass:"video_img",on:{click:e.videoplay}})]),t("div",{staticClass:"title",attrs:{title:e.videoslist[e.videoslistindex]?.desc}},[e._v(" "+e._s(e.videoslist[e.videoslistindex]?.desc)+" ")])]),t("div",{staticClass:"rigthlist"},[t("p",{staticClass:"rigthlist_p"},[e._v("作品案例")]),e._l(e.videoslist,(function(i,s){return t("p",{key:i.id,class:{videoslistcss:i.videoslistcss,falg:!0},attrs:{title:i.desc},on:{click:function(t){return e.SwitchVideo(e.videoslist,s)}}},[t("i",{staticClass:"iconfont icon-video"}),e._v(" "+e._s(i.desc)+" ")])}))],2)])])],2)])},a=[],l=(i(7658),i(586)),n=i(6746),r=i(1316),o={data(){return{searchforval:"",genderValue:"",categoryValue:"",themeValue:"",categoryList:[],themeList:[],total:0,per_page:0,priceval:"",datalist:[],currentPage:1,pageSize:24,dialogVisible:!1,video_img:!0,videoslist:[],videoslistindex:0,prevIndexArr:[],indexArr:[],categoryidarr:[],isvideoslist:[],isloading:!1}},mounted(){this.currentPage=r.Z.state.Index.currentPage,this.genderValue=r.Z.state.Index.dataobj.genderValue,this.categoryValue=r.Z.state.Index.dataobj.categoryValue,this.themeValue=r.Z.state.Index.dataobj.themeValue,this.searchforval=r.Z.state.Index.dataobj.searchforval,this.priceval=r.Z.state.Index.dataobj.priceval,this.isloading=!0,this.handlerGetCategory("influencer"),this.handlerGetCategory("theme_area"),this.RenderingData()},created(){const e=this;window.onresize=function(){if(e.checkFull())console.log("全屏");else{r.Z.commit("Index/setExitFullScreen",!0);let e=new URL(window.location.href).search;n.Z.push("Invitationfilling"+e),console.log("退出全屏")}}},computed:{influencersList(){return r.Z.state.Index.influencersList},influencersListid(){return r.Z.state.Index.influencersListid}},methods:{closeCheckFull(){this.outcheckFull(),r.Z.commit("Index/setExitFullScreen",!1),r.Z.commit("Index/setcurrentPage",1),r.Z.commit("Index/setdataobj",{genderValue:"",categoryValue:"",themeValue:"",searchforval:"",priceval:""}),this.currentPage=1;let e=new URL(window.location.href).search;n.Z.push("Invitationfilling"+e)},outcheckFull(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},checkFull(){var e=document.mozFullScreen||document.fullScreen||document.webkitIsFullScreen||document.webkitRequestFullScreen||document.mozRequestFullScreen||document.msFullscreenEnabled;return void 0===e&&(e=!1),e},handlerGetCategory(e){(0,l.n3)({type:e}).then((t=>{if(1===t.code)switch(e){case"influencer":this.categoryList=t.data;break;case"theme_area":this.themeList=t.data;default:break}})).catch((e=>{this.$message.error(e.msg)}))},handlerSearchList(e,t){switch(this.currentPage=1,this.isloading=!0,e){case"genderdata":this.genderValue=t;break;case"category_id":this.categoryValue=t;break;case"theme_id":this.themeValue=t;break;default:break}let i={genderValue:this.genderValue,categoryValue:this.categoryValue,themeValue:this.themeValue};r.Z.commit("Index/setdataobj",i),this.RenderingData()},getRenderingData(){this.isloading=!0,this.currentPage=1,this.RenderingData()},RenderingData(){this.datalist=[],this.isvideoslist=[],this.categoryidarr=[],this.getdata(this.currentPage,this.pageSize,this.genderValue,this.categoryValue,this.themeValue,this.priceval,this.searchforval)},getdata(e,t,i,s,a,n,r){let o={keyword:r,genderdata:i,type:[],price:n,category_id:s,page:e,pageSize:t,order:"",orderType:"",theme_id:a};(0,l.eO)(o).then((e=>{if(this.isloading=!1,1==e.code){this.total=e.data.total,this.per_page=e.data.per_page,this.datalist=e.data.data,this.currentPage=e.data.current_page;let t=[];this.datalist.forEach((e=>{if(t.push(e.category_ids),e.videos.length>=12){let t=e.videos.slice(0,10);this.isvideoslist.push(t)}else this.isvideoslist.push(e.videos)})),t.forEach((e=>{let t=e.map((e=>e.name)),i=t.join(" | ");this.categoryidarr.push(i)})),this.InvertList()}})).catch((e=>{this.$message.error(e.msg)}))},openVideos(e,t){this.dialogVisible=!0,this.videoslistindex=t,e.forEach((e=>e.videoslistcss=!1)),this.videoslist=e,this.videoslist[t].videoslistcss=!0,this.$nextTick((()=>{const e=this.$refs.myVideo;e.pause(),e.load(),e.play()}))},SwitchVideo(e,t){const i=this.$refs.myVideo;i.pause(),i.load(),i.play(),this.videoslistindex=t,e.forEach((e=>e.videoslistcss=!1)),this.videoslist=e,this.videoslist[t].videoslistcss=!0},async addlist(e,t,i){if(0!=i)if(5!=this.influencersList.length){if(this.$refs.addbtndom[t].classList.add("addlistbj"),this.$refs.addbtndom[t].classList.remove("product_btn"),this.$refs.addbtndom[t].querySelector(".test1").textContent="已选择",0!=e.istrue&&this.influencersList.length<5){this.influencersList.push(e),this.$emit("getlist",!0);const t=this.$createElement;this.$message({message:t("p",{style:"display: flex"},[t("div",{style:"width: 13px;height: 13px;background: #fff;border-radius: 50%;margin-top: 1px;position: relative;"},[t("i",{class:"iconfont icon-cg",style:""},"")]),t("span",{style:"font-size: 12px;color: #FFFFFF;margin:0 0 0 8px"},"添加成功")]),iconClass:"iconfont",offset:140,customClass:"customClasssuccess"})}this.datalist[t].istrue=!1}else{const e=this.$createElement;this.$message({message:e("p",{style:"display: flex"},[e("div",{style:"width: 18px;height: 18px;background: #EDBB32;border-radius: 50%;text-align: center;line-height: 12px;color: white;"},"¡"),e("span",{style:"font-size: 12px;color: #FFFFFF;margin:0 0 0 6px"},"该需求最多可添加5个意向红人")]),iconClass:"iconfont",offset:140,customClass:"customClasssuccess"})}},InvertList(){let e=this;e.influencersList.flat().forEach((t=>{let i=e.datalist.findIndex((e=>e.user_id==t.user_id));-1!=i&&(e.datalist[i].istrue=!1)}))},gohomepage(e){window.open(window.location.origin+"/homepage:"+e)},handleSizeChange(e){this.isloading=!0,this.pageSize=e,this.RenderingData()},handleCurrentChange(e){this.isloading=!0,this.currentPage=e,r.Z.commit("Index/setcurrentPage",e),this.RenderingData()},videoplay(){const e=this.$refs.myVideo;e.play(),this.video_img=!0}},watch:{dialogVisible(e){if(0==e){const e=this.$refs.myVideo;e.pause(),e.load(),this.videoslistindex=-1}}},async beforeDestroy(){let e=this.influencersList.flat().map((e=>e.id_unique||e.id)).join(","),t=new URL(window.location.href),i=t.searchParams.get("needs");""!=e&&0==r.Z.state.Index.ExitFullScreen&&await(0,l.gx)({id:this.influencersListid,influencer_ids:e,url_mark:i,auth:localStorage.getItem("said")}).then((e=>{1==e.code&&this.$emit("getlist",!0)}))}},c=o,d=i(1001),u=(0,d.Z)(c,s,a,!1,null,"55faa2a5",null),h=u.exports}}]);