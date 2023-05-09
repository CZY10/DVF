<template>
    <div id="chatgpt">
        <div class="chat">
            <div v-if="chatData.length>0" class="chat-message-body" id="chatForm">
                <div  dis-hover v-for="(item,index) in chatData" :key="index" class="message-card">
                    <div :class="item.type == 0?'message-row-right': 'message-row-left'">
                        <img :src="item.type == 0? avatar : require('../../assets/images/chatgpt.png')" height="45" width="45" >
                        <div class="message-content">
                            <div :style="item.type == 0?'text-align:right;display: flex;flex-direction:row-reverse;line-height:24px':''">
                                {{item.type == 0 ? '我' : 'ChatGPT'}}
                                <span class="message-time">{{item.createtime}}</span>
                            </div>
                            <div class="message-body" v-show="item.content !== ''">
                                {{item.content}}
                                <el-button type="text" size="mini" v-if="item.type == 1" @click="handleCopyToClip(item.content)">一键复制</el-button>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-card" v-if="isLoading">
                    <div class="message-row-left">
                        <img :src="require('../../assets/images/chatgpt.png')" height="45" width="45" >
                        <div class="message-content">
                            <div>
                                ChatGPT
                                <span class="message-time">{{nowDate}}</span>
                            </div>
                            <div class="message-body">
                                <i class="el-icon-loading"></i>思考中，约1分钟，勿走开...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-empty v-else id="empty_dome" description="暂无消息" :image="require('../../assets/images/chat_empty.png')"></el-empty>
            <el-input
                v-model="questionTxt"
                id="textarea_dome"
                type="textarea"
                style="margin:10px 0 0 0;"
                maxlength="500"
                ref="input"
                :placeholder="'请输入您的问题...\n(按Shift+Enter键可换行,按Enter键直接发送信息)'"
                show-word-limit
                @keydown.enter.native="onEnterKey"
                @keydown.enter.shift="onShiftEnterKey"
                :rows="4"/>
        </div>
        <div style="text-align: center;margin-top: 24px" id="upload_btn_box"><el-button type="primary" size="small" :disabled="this.questionTxt == ''" @click="handlerSedMeg" style="border: none;padding: 10px 58px;border-radius: 16px;background: #3E7AFF linear-gradient(233deg, #EA5EF7 0%, #776CF3 100%);">提交</el-button></div>
    </div>
</template>

<script>
import {createChatgpt, chatgptList} from "@/api";

export default {
    name: "index",
    data(){
        return{
            loading:false,
            chatData:[],
            questionTxt:'',
            isLoading:false,
            nowDate:'',
            avatar: localStorage.getItem('avatar'),
        }
    },
    mounted() {
        this.handlerGetChatList();
    },
    methods:{
        onEnterKey(event) {
            if (!event.shiftKey) {
                // 如果没有按下 shift 键，就发送消息
                event.preventDefault() // 阻止默认的换行行为
                this.handlerSedMeg()
            }
        },
        onShiftEnterKey() {
            // 如果按下了 shift 键，就换行
            this.questionTxt += '\n'
        },

        // 发送消息
        handlerSedMeg(){
            //获取当前时间
            this.nowDate = new Date().toLocaleString().replace(/\//g,'-');
            this.isLoading = true;
            let content = this.questionTxt
            content = content.replace(/[\r\n]+$/, '');
            let chatList={
                content: content,
                createtime: this.nowDate,
                type: 0
            }
            this.chatData.push(chatList);
            this.scrollToBottom();
            this.questionTxt='';
            createChatgpt({
                content: content,
            })
                .then((res)=>{
                    if(res.code === 1){
                        this.chatData.push(res.data);
                        this.scrollToBottom();
                        this.isLoading = false;
                    }
                })
                .catch((err)=>{
                    if (err.request.status === 500 || err.request.status === 501 || err.request.status === 502 || err.request.status === 503 || err.request.status === 504){
                        this.$message({
                            message: '当前ChatGPT请求人数过多，请刷新后再试~',
                            type: 'error',
                            duration:5000
                        });
                    }
                })
        },
        scrollToBottom(){ // 滚动到窗体底部
            this.$nextTick(()=>{
                let chatForm = document.getElementById("chatForm");
                chatForm.scrollTop = chatForm.scrollHeight;
            });

        },
        //获取聊天列表
        handlerGetChatList(){
            chatgptList()
                .then((res)=>{
                    if(res.code === 1){
                        this.chatData = res.data;
                        if(this.chatData.length>0){
                            this.scrollToBottom();
                        }
                        let getDomeHeight = $(window).height()-document.getElementById('textarea_dome').offsetHeight-document.getElementById('upload_btn_box').offsetHeight-document.getElementById('menu_box').offsetHeight-116;
                        if(this.chatData.length > 0){
                            this.scrollToBottom();
                            this.$nextTick(function () {
                                document.getElementById('chatForm').style.height = getDomeHeight + 'px';
                            })
                        }else {
                            this.$nextTick(function () {
                                document.getElementById('empty_dome').style.height = getDomeHeight + 'px';
                            })

                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    this.$message.error(err)
                })
        },
        //一键复制
        handleCopyToClip(val){
            let _this = this;
            this.$copyText(val).then(
                function(e) {
                    _this.$message({
                        message: '复制成功！',
                        type: 'success'
                    });
                },
                function(e) {
                    _this.$message({
                        message: '复制失败!',
                        type: 'warning'
                    });
                }
            );
        }
    }
}
</script>

<style lang="less" scoped>

html{
    height: 100%;
}
#chatgpt{
    margin: auto;
    margin-top: 20px;
    max-width: 1200px;
    border: 1px solid #eeeeee;
    padding: 20px 30px;
    border-radius: 10px;
    /*在线聊天*/
    .chat-message-body {
        height: 350px;
        overflow: auto;
        padding: 0 12px;
        .nothing{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        &{
            scrollbar-width:thin;
            //scrollbar-background:rgba(0,0,0,0.1);
            //background:rgba(0,0,0,0.1);
        }
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width:6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            border-radius:10px;
            background: #ffffff;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            border-radius:10px;
            background:rgba(0,0,0,0.1);
        }
        &::-webkit-scrollbar-thumb:window-inactive {
            background:#D8D8D8;
        }
        .message-card {
            margin:20px 0;
        }
        .message-row-left {
            display: flex;
            flex-direction:row;
            overflow: auto;
            .message-body{
                border: 1px solid #796CF3;
                color: #333333;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 28px;
                border-top-right-radius: 8px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                .el-button--text{
                    color: #796CF3;
                    float: right;
                    margin-left: 20px;
                }
            }
            >img{
                border-radius: 50%;
            }
            .message-content{
                margin-right: 40px;
                align-items: start;
            }
        }
        .message-row-right {
            display: flex;
            flex-direction:row-reverse;
            overflow: auto;
            .message-body{
                background: #796CF3;
                color: #FFFFFF;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 28px;
                border-top-right-radius: 0;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            > img{
                border-radius: 50%;
            }
            .message-content{
                margin-left: 40px;
                align-items: end;
            }
        }
        .message-content {
            margin:5px 10px 5px 10px;
            display: flex;
            flex-direction:column;
            .name{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 24px;
            }
            .message-body {
                padding: 6px 14px;
                margin-top: 10px;
                word-break: break-all;
                word-wrap: break-word;
                white-space: pre-wrap;
            }
            .message-time {
                margin:0 10px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 24px;
            }
        }
    }
    #upload_btn_box{
        .is-disabled{
            opacity: .6;
        }
    }

}
@media screen and (max-width: 600px){
    #chatgpt{
        padding: 20px;
    }
}
</style>
