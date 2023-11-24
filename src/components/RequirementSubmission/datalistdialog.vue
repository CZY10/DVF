<template>
  <div>11111</div>
</template>

<script>
import router from "@/router";
export default {
  created() {
    const that = this;
    window.onresize = function () {
      if (!that.checkFull()) {
        // 退出全屏后要执行的动作
        router.push("/Requirement");
        console.log("退出全屏");
        that.fullscreen = false;
      } else {
        console.log("全屏");
      }
    };
  },
  methods: {
    checkFull() {
      // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
  },
};
</script>

<style></style>
