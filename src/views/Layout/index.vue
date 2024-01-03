<template>
  <el-row>
    <el-col :span="24">
      <Navmenu v-if="$store.state.Index.isFalg" />
      <Mycontent />
    </el-col>

    <div
      v-if="flags"
      @mouseover="remreruKb = true"
      @mouseout="remreruKb = false"
      @click="isShowComDialog = true"
      class="remreru"
    >
      <p>领福利</p>
      <div v-show="remreruKb" @click="flags = false">x</div>
    </div>

    <ConsultDialog :visible.sync="isShowComDialog"></ConsultDialog>
  </el-row>
</template>

<script>
import Mycontent from "@/components/SideBar/Mycontent";
import Navmenu from "@/components/SideBar/Navmenu";
import ConsultDialog from "@/components/ConsultDialog";
import { mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      remreruKb: false,
      flags: true,
      isShowComDialog: false,
    };
  },
  components: {
    Mycontent,
    Navmenu,
    ConsultDialog,
  },
  methods: {
    ...mapMutations("Index", ["setIsFalg"]),
    handleScroll() {
      if (this.$route.fullPath == "/" && this.flags) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop; //滑动的距离
        if (scrollTop <= 300) {
          document.querySelector(".remreru").style.opacity = "0";
        } else {
          document.querySelector(".remreru").style.opacity = "1";
        }
      }
    },
  },
  mounted() {
    if (
      (this.$route.fullPath != "/videohome" && this.flags) ||
      (to.fullPath != "/buyershow" && this.flags)
    ) {
      document.querySelector(".remreru").style.opacity = "0";
    }
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route: function (to, from) {
      // 处理路径变化的逻辑
      if (to.fullPath == "/videohome" || to.fullPath == "/buyershow") {
        document.querySelector(".remreru").style.opacity = "1";
      } else {
        document.querySelector(".remreru").style.opacity = "0";
      }
    },
  },
};
</script>

<style scoped>
.remreru {
  width: 75px;
  height: 75px;
  position: fixed;
  right: 30px;
  top: 700px;
  cursor: pointer;
  background: url("@/assets/images/ben.png");
  transition: all 0.3s;
}

.remreru > p {
  text-align: center;
  margin-top: 52px;
}

.remreru > div {
  position: relative;
  top: -80px;
  left: 65px;
}
</style>
