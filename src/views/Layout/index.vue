<template>
  <el-row>
    <el-col :span="24">
      <Navmenu v-if="$store.state.Index.isFalg" />
      <Mycontent />
    </el-col>

    <div v-if="flags" @mouseover="remreruKb = true" @mouseout="remreruKb = false" @click="isShowComDialog = true"
      class="remreru">
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
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滑动的距离
        scrollTop <= 300 ? document.querySelector(".remreru").style.opacity = "0" : document.querySelector(".remreru").style.opacity = "1"
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route: function (to, from) {
      // 处理路径变化的逻辑
      to.fullPath == "/videohome" || to.fullPath == "/buyershow" ? this.flags = true : this.flags = false
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
  bottom: 200px;
  cursor: pointer;
  background: url("@/assets/images/ben.png");
  transition: all 0.3s;
}

.remreru>p {
  text-align: center;
  margin-top: 52px;
}

.remreru>div {
  position: relative;
  top: -80px;
  left: 65px;
}
</style>
