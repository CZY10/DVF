<template>
  <div>
    <el-dialog
      :title="videoLogtitle"
      :visible.sync="videoLog"
      width="1000px"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      center
    >
      <div>
        <video
          ref="myVideo"
          id="my-video"
          controls
          autoplay
          preload="metadata"
          @play="video_img = true"
          @pause="video_img = false"
        >
          <source :src="isvideoLogscr" type="video/mp4" />
        </video>
        <div class="video_img" @click="videoplay" v-show="!video_img"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["videoLog", "videoLogscr", "videoLogtitle"], //通过props接收父组件传递的值
  data() {
    return {
      isvideoLogscr: "",
      video_img: true,
    };
  },
  methods: {
    beforeClose() {
      const video = this.$refs.myVideo;
      video.pause();
      this.isvideoLogscr = "";
      this.$emit("getvideoLog", false);
    },
    //播放视频
    videoplay() {
      const video = this.$refs.myVideo;
      video.play();
      this.video_img = true;
    },
  },
  mounted() {},
  watch: {
    videoLogscr(newval) {
      const video = this.$refs.myVideo;
      this.isvideoLogscr = newval;
      video?.load();
    },
    videoLog(newval) {
      if (newval) {
        const video = this.$refs.myVideo;
        video?.play();
      }
    },
  },
};
</script>

<style lang="less" scoped>
#my-video {
  width: 100%;
  height: 500px;
  background: #000;
}

.video_img:after {
  box-sizing: border-box;
  font-family: element-icons;
  position: absolute;
  content: "\e791";
  width: 60px;
  height: 60px;
  font-size: 62px;
  background: #fff;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 7%);
  border: 2px solid #fff;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

::v-deep(.el-dialog__header) {
  padding: 20px 80px 10px;
}
</style>
