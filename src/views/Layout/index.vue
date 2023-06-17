<template>
  <el-row>
    <el-col :span="24">
      <Navmenu v-if="flag" />
      <Mycontent />
    </el-col>

    <div
      style="
        width: 75px;
        height: 75px;
        position: fixed;
        right: 30px;
        top: 650px;
        cursor: pointer;
      "
      v-if="remreruKa && flags"
      @mouseover="remreruKb = true"
      @mouseout="remreruKb = false"
      @click="handlerClick"
    >
      <img src="@/assets/images/ben.png" alt="" />
    </div>

    <p
      style="
        position: fixed;
        right: 45px;
        top: 702px;
        color: #333333;
        cursor: pointer;
      "
      v-if="remreruKa && flags"
    >
      领福利
    </p>
    <div
      style="
        height: 8;
        width: 8px;
        position: fixed;
        right: 35px;
        top: 640px;
        cursor: pointer;
      "
      v-if="remreruKa && flags"
      v-show="remreruKb"
      @click="remreruK"
      @mouseover="remreruKb = true"
      @mouseout="remreruKb = false"
    >
      x
    </div>
    <ConsultDialog :visible.sync="isShowComDialog"></ConsultDialog>
  </el-row>
</template>

<script>
import Mycontent from "@/components/SideBar/Mycontent";
import Navmenu from "@/components/SideBar/Navmenu";
import ConsultDialog from "@/components/ConsultDialog";
export default {
  name: "home",
  data() {
    return {
      flag: true,
      remreruKb: false,
      remreruKa: true,
      flags: true,
      isShowComDialog: false,
    };
  },
  components: {
    Mycontent,
    Navmenu,
    ConsultDialog,
  },
  created() {
    if (
      this.$route.fullPath == "/videohome" ||
      this.$route.fullPath == "/buyershow" ||
      this.$route.fullPath == "/"
    ) {
      this.flags = true;
    } else {
      this.flags = false;
    }
    if (
      this.$route.fullPath == "/Requirement" ||
      this.$route.fullPath == "/Note"
    ) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
  methods: {
    remreruK() {
      this.remreruKa = false;
    },
    handlerClick() {
      this.isShowComDialog = true;
      if (localStorage.getItem("configObj") != null) {
        this.configData = JSON.parse(localStorage.getItem("configObj"));
      }
    },
  },
  watch: {
    $route: function (to, from) {
      // 处理路径变化的逻辑
      console.log(to.fullPath, "res");
      if (
        to.fullPath == "/" ||
        to.fullPath == "/videohome" ||
        to.fullPath == "/buyershow"
      ) {
        this.flags = true;
      } else {
        this.flags = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
