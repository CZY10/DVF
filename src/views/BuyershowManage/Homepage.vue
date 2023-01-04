<template>
    <div id="homepage">
        <div class="content">
            <el-row :gutter="30" style="max-width: 1200px;margin: auto">
                <el-col :span="9" style="padding-left: 0">
                    <div class="homepage_header">
                        <div class="head_img">
                            <img :src="userInfo.image" alt="">
                        </div>
                        <h5>NO.{{ userInfo.id }}</h5>
                        <span class="category">{{ userInfo.type }}</span>
                        <div class="title">
                            <span v-for="(item,index) in userInfo.category_ids" :style="{color: index % 3 ==0 ? '#4BB1F1' : index % 2 == 0 ? '#F56422 !important':'#00D9AD',background: index % 3 == 0 ? 'rgba(75,177,241,0.1)' : index % 2 == 0 ? 'rgba(245,100,34,0.1) !important':'rgba(0,217,173,0.1)'}" :key="index">{{ item.name }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="15" style="padding-right: 0">
                    <el-card class="box_card basic_information_card" style="margin-bottom: 20px">
                        <h4>基本资料</h4>
                        <div>年龄：<span style="margin-right: 40px">{{userInfo.age}}岁</span>性别：<span>{{ userInfo.genderdata === 'male' ? '男' : '女' }}</span></div>
                        <div>国家：<span>美国</span></div>
                        <div style="display: flex;align-items: center">社交平台：<i v-for="(item,index) in userInfo.platform"><img :src="item.image" alt=""></i></div>
                        <div>个人简介<p :title="userInfo.signature">{{ userInfo.signature }}</p></div>
                    </el-card>
                    <el-card class="box_card basic_information_card">
                        <h4>交付说明</h4>
                        <el-row style="padding-bottom: 0">
                            <el-col :span="12" style="padding-bottom: 0">
                                <div>卖点呈现：<span>{{ userInfo.sellingpoint_id }}</span></div>
                                <div>视频上传：<span>{{ userInfo.videoupload_id }}</span></div>
                            </el-col>
                            <el-col :span="12" style="padding-bottom: 0">
                                <div>拍摄场景：<span>{{ userInfo.scene_id }}</span></div>
                                <div>交付周期：<span>{{ userInfo.leadtime_id }}</span><b>（样品收货后）</b></div>
                            </el-col>
                        </el-row>
                        <div>视频时长：<span>通常{{ userInfo.minvideo }}-{{ userInfo.maxvideo }}s</span></div>
                        <div>其他说明<p :title="userInfo.content">{{ userInfo.content }}</p></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card class="title-card" style="max-width: 1200px;margin: auto">
                <h4>作品</h4>
            </el-card>
            <div class="product_box">
               <div style="max-width: 1200px;margin: auto">
                   <div class="product_item" v-for="(item,index) in userInfo.videos" :key="index">
                       <div class="product_item_video">
                           <img :src="localhost + item.coverimage" alt="">
                           <i class="el-icon-caret-right" @click="handlePlayVideo(item)"></i>
                       </div>
                       <p :title="item.desc">{{ item.desc }}</p>
                   </div>
               </div>
            </div>
        </div>
        <Footer></Footer>
        <!--查看大图-->
        <el-dialog :visible.sync="videoDialog" class="video_dialog" @close="handleClose" width="1060px" :close-on-click-modal="false">
            <h2>{{ videoData.desc }}</h2>
            <div class="videoView">
<!--               <video-->
<!--                   id="my-player"-->
<!--                   ref="video"-->
<!--                   :poster="localhost + videoData.coverimage"-->
<!--                   controls>-->
<!--                   <source :src="localhost + videoData.file" />-->
<!--               </video>-->
                <video
                    id="my-video"
                    ref="videoPlayerRef"
                    class="video-js"
                    controls
                    preload="auto"
                    :poster="localhost + videoData.coverimage"
                    data-setup="{}"
                >
                    <source :src="localhost + videoData.file" type="video/mp4" />
                </video>
            </div>
        </el-dialog>
    </div>


</template>

<script>
import Footer from "@/components/Footer";
import {influencerDetail} from "@/api";
import videojs from "video.js";
export default {
    name: "homepage",
    components:{
        Footer,
    },
    data(){
        return{
            videoDialog:false,
            videoData:{},
            title:['家居','电子','服装设计','家居','电子','服装设计','家居','电子','服装设计','家居','电子','服装设计','家居'],
            id:'',
            userInfo:{},
            localhost:process.env.VUE_APP_BASE_URL,
            player: null,
            videoPlayerOption: {
                controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                autoplay: true, //自动播放属性,
                muted: false, // 静音播放
                preload: 'auto', //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                fluid: true
            },
            videoPlayers:null,
        }
    },
    mounted() {
        this.id = window.location.href.substr(window.location.href.lastIndexOf(':')+1);
        this.getInfluencerDetail();
    },
    methods:{
        //关闭视频
        handleClose(){
            // document.getElementById('my-player').pause();
            if(this.videoPlayers != null){
                this.videoPlayerOption.autoplay = false
                this.videoPlayers.pause();
                this.videoPlayers.dispose();
                this.videoPlayers = null;
            }
        },
        //播放视频
        handlePlayVideo(data){
            let _this = this;
            _this.videoData = data;
            _this.videoDialog = true;
            let poster = this.localhost + data.coverimage;
            let src = this.localhost + data.file;
            $(".videoView").html('<video id="my-video" ref="videoPlayerRef" class="video-js" controls preload="auto" width="640" height="264" poster="'+poster+'" data-setup="{}" ><source src="'+src+'" type="video/mp4" /> </video>');
            _this.$nextTick(() => {
                this.videoPlayers = videojs('my-video', {
                    controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    autoplay: false, //自动播放属性,
                    muted: false, // 静音播放
                    preload: 'auto', //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    fluid: true
                }, function onPlayerReady() {
                    // videojs.log('Your player is ready!'); // 比如： 播放量+1请求
                    this.on('ended', function() {
                        // videojs.log('Awww...over so soon?!');
                    });
                });

            })
        },
        getInfluencerDetail(){
            influencerDetail({
                id: this.id
            })
                .then((res)=>{
                    if(res.code ===1){
                        this.userInfo = res.data;
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
        }

    }
}
</script>
<style lang="less" >
#homepage{
    .video_content .vjs-poster{
        background-size: cover;
    }
    .vjs-poster{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
    }
}

#homepage .vjs-poster{
    display: none;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}
.video-js .vjs-tech{
    height: 567px !important;
    width: 100%;
    background-size: cover;
    //object-fit: cover;
}
.my-video-dimensions.vjs-fluid:not(.vjs-audio-only-mode){
    padding-top: 0;
    height: 567px !important;
}
.video-js .vjs-big-play-button:hover{
    background: #ffffff;
    color: #333333;
}
.video-js:hover .vjs-big-play-button{
    background: #ffffff;
    color: #333333;
}
.video-js .vjs-big-play-button{
    font-size: 38px;
    line-height: 100px;
    height: 100px;
    width: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: #ffffff;
    color: #333333;
    margin-left: -50px;
    margin-top: -50px;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
}



.video_dialog{
    .el-dialog__body{
        padding: 30px;
        padding-top: 0 !important;
    }
}
</style>
<style lang="less" scoped>
.flex{
    display: flex;
}
#homepage{

    margin-top: 66px;
    background: rgba(248, 248, 249, 1);
    .content{
        overflow: hidden;
        padding-top: 29px;
        margin: auto;
        .homepage_header{
            padding-top: 8px;
            background: #FFFFFF linear-gradient(180deg, rgba(214,216,255,0.36) 0%, rgba(255,255,255,0) 100%);
            box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.05);
            border-radius: 14px;
            padding-bottom: 28px;
            text-align: center;
            .head_img{
                width: 320px;
                height: 320px;
                margin: 20px 50px;
                border: 6px solid #FFFFFF;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            h5{
                font-size: 18px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 25px;
                text-align: center;
                position: relative;
                &:after{
                    display: inline-block;
                    content: '';
                    height: 1px;
                    width: 30px;
                    background: #eeeeee;
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    margin-left: -15px;
                }
            }
            .category{
                display: inline-block;
                padding: 2px 10px;
                background: rgba(0,217,173,0.1);
                border-radius: 12px;
                border: 1px solid rgba(0,217,173,0.4);
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #00D9AD;
                line-height: 20px;
                text-align: center;
                margin-top: 23px;
            }
            .title{
                margin: 20px 74px 6px 74px;
                height: 80px;
                overflow: hidden;
                span{
                    padding: 0px 5px;
                    margin: 2px;
                    line-height: 25px;
                    border-radius: 2px;
                    display: inline-block;
                }
            }
        }
        .box_card{
            background: #FFFFFF linear-gradient(199deg, rgba(214,216,255,0.36) 0%, #FFFFFF 100%);
            box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.05);
            border-radius: 20px;
            padding: 0 10px;

        }
        .basic_information_card{
            h4{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 14px;
                position: relative;
                margin-bottom: 19px;
                &:after{
                    content: '';
                    position: absolute;
                    width: 56px;
                    height: 2px;
                    background: #333333 linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                    bottom: -1px;
                    left: 0;
                }
            }
            div{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
                padding-bottom: 14px;
                p{
                    font-size: 14px;
                    color: #333333;
                    height: 38px;
                    padding-top: 8px;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
                    overflow: hidden;
                }
                span{
                    font-size: 14px;
                    color: #333333;
                }
                i{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #EEEEEE;
                    border-radius: 50%;
                    margin: 0 5px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                b{
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
        .title-card{
            background: #FFFFFF;
            border-radius: 10px;
            margin-top: 30px !important;
            margin-bottom: 7px !important;
            h4{
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                position: relative;
                margin-left: 10px;
                &:after{
                    content: '';
                    position: absolute;
                    width: 28px;
                    height: 2px;
                    background: linear-gradient(233deg, #FFA373 0%, #EA5EF7 48%, #776CF3 100%);
                    left: 0;
                    bottom: -20px;
                }
            }
        }
        .product_box{
            overflow: hidden;
            padding-bottom: 43px;
            .product_item{
                width: 224px;
                background: #FFFFFF;
                border-radius: 10px;
                border: 1px solid #EEEEEE;
                float: left;
                margin: 7px 7px;
                overflow: hidden;
                .product_item_video{
                    position: relative;
                    img{
                        width: 100%;
                        height: 133px;
                        object-fit: cover;
                    }
                    i{
                        position: absolute;
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                        overflow: hidden;
                        background: #ffffff;
                        left: 50%;
                        top: 50%;
                        margin-top: -23px;
                        margin-left: -23px;
                        color: #333333;
                        display: flex;
                        font-size: 30px;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
                p{
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 19px;
                    margin: 14px 12px;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
                    overflow: hidden;
                    height: 38px;
                }
            }
        }

    }
    .video_dialog{
        h2{
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
            text-align: center;
            margin-bottom: 22px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        video{
            width: 100%;
            height: 567px;
            //object-fit: cover;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

}
</style>
