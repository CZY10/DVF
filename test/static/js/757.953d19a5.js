"use strict";(self["webpackChunkvideoproject"]=self["webpackChunkvideoproject"]||[]).push([[757],{5757:function(t,e,i){i.r(e),i.d(e,{default:function(){return h}});var s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"buyershow"}},[e("el-backtop",{attrs:{target:"#buyershow"}},[e("i",{staticClass:"iconfont icon-fhdb1",staticStyle:{color:"#999"}})]),e("div",{staticClass:"banxin"},[t.isloading?e("div",{staticClass:"loading"}):t._e(),e("div",{staticClass:"searchfor"},[e("el-input",{staticClass:"inp",attrs:{placeholder:"输入产品名称/品类/红人编号"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getRenderingData.apply(null,arguments)}},model:{value:t.searchforval,callback:function(e){t.searchforval=e},expression:"searchforval"}}),e("el-button",{staticClass:"searchforbtn",on:{click:t.getRenderingData}},[t._v("搜索")])],1),e("div",{staticClass:"screen"},[e("div",{staticClass:"filter_header"},[e("div",{staticClass:"filter_item"},[e("span",[t._v("达人性别")]),e("el-radio-group",{on:{change:function(e){return t.handlerSearchList("genderdata",t.genderValue)}},model:{value:t.genderValue,callback:function(e){t.genderValue=e},expression:"genderValue"}},[e("el-radio-button",{attrs:{label:""}},[t._v("全部")]),e("el-radio-button",{attrs:{label:"male"}},[t._v("男性")]),e("el-radio-button",{attrs:{label:"female"}},[t._v("女性")])],1)],1),e("div",{staticClass:"filter_item"},[e("span",[t._v("产品品类")]),e("el-radio-group",{on:{change:function(e){return t.handlerSearchList("category_id",t.categoryValue)}},model:{value:t.categoryValue,callback:function(e){t.categoryValue=e},expression:"categoryValue"}},[e("el-radio-button",{attrs:{label:""}},[t._v("全部")]),t._l(t.categoryList,(function(i,s){return e("el-radio-button",{key:s,attrs:{label:i.id}},[t._v(t._s(i.name))])}))],2)],1),e("div",{staticStyle:{height:"1px","background-color":"#eee"}}),e("div",{staticClass:"filter_item",staticStyle:{"margin-top":"10px"}},[e("span",[t._v("主题专区")]),e("el-radio-group",{on:{change:function(e){return t.handlerSearchList("theme_id",t.themeValue)}},model:{value:t.themeValue,callback:function(e){t.themeValue=e},expression:"themeValue"}},[e("el-radio-button",{attrs:{label:""}},[t._v(" 全部 ")]),t._l(t.themeList,(function(s,a){return e("el-radio-button",{key:a,attrs:{label:s.id}},[e("div",{staticStyle:{"text-align":"center",position:"relative","padding-left":"23px"}},[e("img",{staticStyle:{position:"absolute",left:"0",top:"-6px"},attrs:{src:i(6741)}}),t._v(" "+t._s(s.name)+" ")])])}))],2)],1)])]),e("div",{staticClass:"seek"},[e("div",{staticClass:"seek_div"},[e("div",{staticClass:"seek_div_span"},[t._v("找到 "+t._s(t.total)+" 个")]),e("div",{staticClass:"seek_divd"},[e("span",[t._v("价格 ≤")]),e("el-input",{staticClass:"priceinp",on:{change:t.getRenderingData},model:{value:t.priceval,callback:function(e){t.priceval=e},expression:"priceval"}}),e("span",[t._v("元")])],1)])]),e("div",{staticClass:"product"},[0!=t.datalist.length?e("ul",{staticClass:"product_ul"},t._l(t.datalist,(function(i,s){return e("li",{key:i.user_id,staticClass:"product_li"},[e("div",{staticClass:"product_li_img",on:{click:function(e){return t.gohomepage(i.user_id)}}},[e("img",{attrs:{src:i.image}})]),e("div",{staticClass:"product_list"},[e("div",{staticClass:"product_list_div1"},[e("div",{staticClass:"product_list_left"},[e("div",{staticClass:"product_list_no"},[t._v("No."+t._s(i.user_id))]),"影响力者"==i.type?e("div",{staticClass:"product_list_typelv"},[t._v(" "+t._s(i.type)+" ")]):t._e(),"社媒红人"==i.type?e("div",{staticClass:"product_list_typeho"},[t._v(" "+t._s(i.type)+" ")]):t._e(),"数字人"==i.type?e("div",{staticClass:"product_list_typelan"},[t._v(" "+t._s(i.type)+" ")]):t._e(),"素人"==i.type?e("div",{staticClass:"product_list_typechen"},[t._v(" "+t._s(i.type)+" ")]):t._e()]),0==i.price_type?e("div",{staticClass:"product_list_rigth"},[t._v(" ￥"+t._s(i.price)+" ")]):1==i.price_type?e("div",{staticClass:"product_list_rigth"},[t._v(" ￥"),e("span",[t._v(t._s(i.lower_price)+"-"+t._s(i.highest_price))])]):e("div",{staticClass:"product_list_rigth",staticStyle:{"font-size":"11px"}},[t._v(" 视产品而定 ")])]),i.category_ids.length<=5?e("div",{staticClass:"product_list_div2",attrs:{title:t.categoryidarr[s]}},t._l(i.category_ids,(function(i,s){return e("li",{key:s},[t._v(" "+t._s(i.name)+" ")])})),0):e("div",{staticStyle:{display:"flex"},attrs:{title:t.categoryidarr[s]}},[e("div",{staticClass:"product_list_div2"},t._l(i.category_ids,(function(i,s){return e("li",{key:s},[t._v(" "+t._s(i.name)+" ")])})),0),e("span",[t._v("...")])]),e("div",{staticStyle:{height:"1px","background-color":"#eee","margin-top":"15px"}}),e("ul",{staticClass:"product_list_videos"},[t._l(t.isvideoslist[s],(function(s,a){return e("li",{key:s.user_id,attrs:{title:s.desc},on:{click:function(e){return t.openVideos(i.videos,a)}}},[e("i",{staticClass:"iconfont icon-video",staticStyle:{"font-size":"14px"}}),e("span",[t._v(" "+t._s(s.desc))])])})),i.videos.length>=12?e("li",{staticStyle:{width:"22px","text-align":"center",display:"block",background:"linear-gradient(","border-radius":"4px"},on:{click:function(e){return t.gohomepage(i.user_id)}}},[t._v(" . . . ")]):t._e()],2)]),e("div",{ref:"addbtndom",refInFor:!0,class:{product_btn:0!=i.istrue,addlistbj:0==i.istrue},on:{click:function(e){return t.addlist(i,s,i.user_id)}}},[e("span",{staticClass:"icon"},[t._v("+")]),e("i",{staticClass:"iconfont icon-gwc",staticStyle:{"font-size":"14px"}}),0==i.istrue?e("span",{staticClass:"test1"},[t._v("已选择")]):e("span",{staticClass:"test1"},[t._v("选择")])]),0!=i.logo_id.length?e("div",{staticClass:"logo_id"},[t._m(0,!0)]):t._e()])})),0):e("div",{staticClass:"product_div"},[e("img",{attrs:{src:i(9166),alt:""}}),e("p",[t._v("暂无搜索结果")])])]),[e("div",{directives:[{name:"show",rawName:"v-show",value:0!=t.datalist.length,expression:"datalist.length != 0"}],staticClass:"paging"},[e("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[12,24,48,96],"page-size":t.per_page,layout:"total, prev, pager, next, sizes, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]],2),e("el-dialog",{attrs:{visible:t.dialogVisible,width:"880px","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[e("div",{staticClass:"eldialogVisble"},[e("div",{staticStyle:{width:"650px"}},[e("div",{staticClass:"leftVis"},[e("video",{ref:"myVideo",attrs:{autoplay:"",controls:"",preload:"none"},on:{play:function(e){t.video_img=!0},pause:function(e){t.video_img=!1}}},[e("source",{attrs:{src:t.videoslist[t.videoslistindex]?.file,type:"video/mp4"}})]),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.video_img,expression:"!video_img"}],staticClass:"video_img",on:{click:t.videoplay}})]),e("div",{staticClass:"title",attrs:{title:t.videoslist[t.videoslistindex]?.desc}},[t._v(" "+t._s(t.videoslist[t.videoslistindex]?.desc)+" ")])]),e("div",{staticClass:"rigthlist"},[e("p",{staticClass:"rigthlist_p"},[t._v("作品案例")]),t._l(t.videoslist,(function(i,s){return e("p",{key:i.id,class:{videoslistcss:i.videoslistcss,falg:!0},attrs:{title:i.desc},on:{click:function(e){return t.SwitchVideo(t.videoslist,s)}}},[e("i",{staticClass:"iconfont icon-video"}),t._v(" "+t._s(i.desc)+" ")])}))],2)])]),e("el-dialog",{attrs:{title:"温馨提示",center:"",visible:t.dialogVisiblelogin,width:"300px"},on:{"update:visible":function(e){t.dialogVisiblelogin=e}}},[e("p",{staticStyle:{"text-align":"center","margin-top":"22px","padding-right":"20px"}},[t._v(" 您还没有登录，登录后即可继续操作 ")]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{staticClass:"dialogVisibleloginbtn",on:{click:t.goLogin}},[t._v("去登录")])],1)]),e("el-dialog",{attrs:{title:"温馨提示",center:"",visible:t.dialogVisiblelogins,width:"300px"},on:{"update:visible":function(e){t.dialogVisiblelogins=e}}},[e("p",{staticStyle:{"text-align":"center","margin-top":"22px",padding:"0 20px","line-height":"1.6"}},[t._v(" 每一个视频可选"),e("span",{staticStyle:{color:"#d161f6"}},[t._v("0～5")]),t._v("个意向红人 "),e("br"),t._v(" 未选择时，将由平台为您推荐 ")]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{staticClass:"dialogVisibleloginbtn",on:{click:function(e){t.dialogVisiblelogins=!1}}},[t._v("知道了")])],1)])],1)},a=[function(){var t=this,e=t._self._c;return e("p",[e("i",{staticClass:"iconfont icon-bq"}),e("span",[t._v("含版权")])])}],l=(i(7658),i(586)),o=i(1316),r=i(4239),n={name:"buyershow",data(){return{searchforval:"",genderValue:"",categoryValue:"",themeValue:"",categoryList:[],themeList:[],total:0,per_page:0,priceval:"",datalist:[],currentPage:1,pageSize:24,dialogVisible:!1,dialogVisiblelogin:!1,video_img:!0,videoslist:[],videoslistindex:0,requirementlist:[],prevIndexArr:[],indexArr:[],categoryidarr:[],isvideoslist:[],isloading:!1,dialogVisiblelogins:!1}},components:{},created(){this.requirementlist=this.RequirementLists},computed:{RequirementLists(){return o.Z.state.Index.RequirementList},Requiremenitems(){return o.Z.state.Index.Requiremenitem},getRequirementFirst(){return o.Z.state.Index.RequirementFirst}},mounted(){this.isloading=!0,document.getElementsByClassName("el-pagination__jump")[0].childNodes[0].nodeValue="跳转",this.handlerGetCategory("influencer"),this.handlerGetCategory("theme_area"),this.RenderingData(),window.addEventListener("beforeunload",(t=>this.beforeunloadHandler(t)))},beforeUpdate(){},methods:{goLogin(){r.Z.push("/login")},handlerGetCategory(t){(0,l.n3)({type:t}).then((e=>{if(1===e.code)switch(t){case"influencer":this.categoryList=e.data;break;case"theme_area":this.themeList=e.data;default:break}})).catch((t=>{this.$message.error(t.msg)}))},handlerSearchList(t,e){switch(this.currentPage=1,localStorage.getItem("token")&&(this.isloading=!0),t){case"genderdata":this.genderValue=e;break;case"category_id":this.categoryValue=e;break;case"theme_id":this.themeValue=e;break;default:break}this.RenderingData()},getRenderingData(){localStorage.getItem("token")?(this.isloading=!0,this.currentPage=1,this.RenderingData()):this.dialogVisiblelogin=!0},RenderingData(){this.datalist=[],this.isvideoslist=[],this.categoryidarr=[],(!localStorage.getItem("token")&&""!=this.searchforval||!localStorage.getItem("token")&&""!=this.categoryValue||!localStorage.getItem("token")&&""!=this.themeValue||!localStorage.getItem("token")&&""!=this.genderValue||!localStorage.getItem("token")&&""!=this.priceval)&&(this.dialogVisiblelogin=!0,this.genderValue="",this.themeValue="",this.categoryValue="",this.priceval=""),this.getdata(this.currentPage,this.pageSize,this.genderValue,this.categoryValue,this.themeValue,this.priceval,this.searchforval)},getdata(t,e,i,s,a,o,r){let n={keyword:r,genderdata:i,type:[],price:o,category_id:s,page:t,pageSize:e,order:"",orderType:"",theme_id:a};(0,l.eO)(n).then((t=>{if(this.isloading=!1,1==t.code){this.total=t.data.total,this.per_page=t.data.per_page,this.datalist=t.data.data,this.currentPage=t.data.current_page;let e=[];this.datalist.forEach((t=>{if(e.push(t.category_ids),t.videos.length>=12){let e=t.videos.slice(0,10);this.isvideoslist.push(e)}else this.isvideoslist.push(t.videos)})),e.forEach((t=>{let e=t.map((t=>t.name)),i=e.join(" | ");this.categoryidarr.push(i)})),this.InvertList()}})).catch((t=>{this.$message.error(t.msg)}))},openVideos(t,e){this.dialogVisible=!0,this.videoslistindex=e,t.forEach((t=>t.videoslistcss=!1)),this.videoslist=t,this.videoslist[e].videoslistcss=!0,this.$nextTick((()=>{const t=this.$refs.myVideo;t.pause(),t.load(),t.play()}))},SwitchVideo(t,e){const i=this.$refs.myVideo;i.pause(),i.load(),i.play(),this.videoslistindex=e,t.forEach((t=>t.videoslistcss=!1)),this.videoslist=t,this.videoslist[e].videoslistcss=!0},addlist(t,e,i){if(localStorage.getItem("token"))if(1==this.getRequirementFirst)this.dialogVisiblelogins=!0,o.Z.commit("Index/setRequirementFirst",0);else{this.requirementlist=this.RequirementLists;const s=event.clientX-20,a=event.clientY-20;this.$refs.addbtndom[e].classList.add("addlistbj"),this.$refs.addbtndom[e].classList.remove("product_btn"),this.$refs.addbtndom[e].querySelector(".test1").textContent="已选择",0!=t.istrue&&(0==this.requirementlist.length?this.requirementlist.push([t]):this.requirementlist[this.requirementlist.length-1].length<5?this.requirementlist[this.requirementlist.length-1].push(t):this.requirementlist.push([t]),o.Z.commit("Index/setRequirementList",this.requirementlist),this.createBall(s,a),this.SaveData(i)),this.datalist[e].istrue=!1}else this.dialogVisiblelogin=!0},SaveData(t){let e={influencer_id:t,type:1};t&&(0,l.Nn)(e).then((t=>{(0,l.K$)().then((t=>{o.Z.commit("Index/setRequirementList",t.data.list),o.Z.commit("Index/setRequirementFirst",t.data.first)}))}))},createBall(t,e){const i=document.createElement("ball");i.style.position="fixed",i.style.left=t+"px",i.style.top=e+"px",i.style.width="30px",i.style.height="30px",i.style.borderRadius="50%",i.style.backgroundColor="#d161f6",i.style.transition="left .6s linear, top .6s cubic-bezier(0.5, 0.5, 1, 1)",document.body.appendChild(i),setTimeout((()=>{const t=document.body.clientWidth-450,e=0;i.style.top=e+"px",i.style.left=t+"px"}),0),i.ontransitionend=function(){this.remove()}},InvertList(){let t=this;t.RequirementLists.flat().forEach((e=>{let i=t.datalist.findIndex((t=>t.id==e.user_id));-1!=i&&(t.datalist[i].istrue=!1)}))},SynchronizeList(t){var e=this.$refs.addbtndom;this.datalist[t].istrue=!0,this.$nextTick((()=>{e[t].classList.remove("addlistbj"),e[t].classList.add("product_btn"),e[t].querySelector(".test1").textContent="选择"}))},gohomepage(t){window.open(window.location.origin+"/homepage:"+t)},handleSizeChange(t){this.isloading=!0,this.pageSize=t,this.RenderingData()},handleCurrentChange(t){this.isloading=!0,this.currentPage=t,this.RenderingData()},videoplay(){const t=this.$refs.myVideo;t.play(),this.video_img=!0}},watch:{dialogVisible(t){if(0==t){const t=this.$refs.myVideo;t.pause(),t.load(),this.videoslistindex=-1}},Requiremenitems(t){if(Array.isArray(t))t.forEach((t=>{var e=this.datalist.findIndex((e=>e.id==t.user_id));this.SynchronizeList(e)}));else{var e=this.datalist.findIndex((e=>e.id==t));this.SynchronizeList(e)}}}},d=n,c=i(1001),u=(0,c.Z)(d,s,a,!1,null,"9a07a3f4",null),h=u.exports},6741:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAYAAAAmaHdCAAAAAXNSR0IArs4c6QAAA0RJREFUOE+VlE1oXFUUx3/nvXmZyTj9IA2tDVQ02SgqUolSURTddNEiCIWCqBtdiO5U3IoIgkTcqEihbgJqVMzCSl0oXRRRMAGViKmUivaDTE2TmUxm5n3fI2feG41oQC9cHm/m3N/7n/855wr/Y2moL6H0pS4zW4/Jf2XoVd1HyG9U+VL2y9FtIdrRowiT0pA3EXRroF7Qp+nwTr6TxypT8t72kBX9GOGYG2HGH5MXh4Et1d2N7zmdd7l7fSp7aGIiOLs9ZFHHcXzODqbj63gjuJ7L4nEk3OSedIF6PA7+FCqw0O25d1dD78PpKdn40xNVbZBzfx7yhH7H8RxIJqG6C/II0mVIxqCyB1wIkkLqtNUSOSaq6rPCa87jqbzOrtxB1gTOA/shuMloIB3wHEgOeQpxVux+hVOiF/VZlLe0BVkOXgO8BBBwo+VBB9jOwKUQZhCl0DdYhbOiV/UrUu4dBEVACDQAH7Cc7Hd7pqClAjvcTyC094AvDLJExm0Dt62ofaBSHjaALXuGkJVf7yaFil4KUYXT4lb0jOQ8aPIHEFMzlB8Dk0Ad6EC6Ahu/QyeBTQNZWqKfirusn0nOEbzyq71SvqVgqd25RVkIeRual+Bis/Am9vhEsl91HscjnjfwErqFgWqQHshdwEiZpv0XwrV1+OECRFapgI8k/kXn1HHcEwZi/E1wGWQZeJvgT4OYRyUgDGHxHHQiiKxaVd6Xzs8668PjQ0ilU5QvyUHasOMO8IJCSVQCNkqAxVB1s7K2pCd94UnflAgEHdiIIc7BtWHiZvDrJWAZ2v2iyRJrSgf+KCfl2qK+7cEzUkIqPViNiqCoCwf2Qm0vLPwE7d5fAOtsJ+DXeFlWv9YZlBcG6XjFXDRDSLRIq5eUbVI2WmpmKjiFoKat2mh8UNa+1efTkNdVwfMhMYjl7IqUEitjXiiwsTD3/YBureFO1avZq4cPV38UvaRj3RbzcY8Hogj6PbhiUyuFuQZIrfl8suqofjMy6mZvvMWfv/WArA/vlOIqUJXmEg+POF45f47b1xQyr9iVGste4D4Y35fOHTpYs9n+x/rbHXvihAY37OHR+m6eS3LO1HYyd98hFkRkOEX/eiX/AfRLun07NkmHAAAAAElFTkSuQmCC"}}]);