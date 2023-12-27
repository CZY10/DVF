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
      class="dome"
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
  },
  methods: {
    ...mapMutations("Index", ["setIsFalg"]),
  },
  watch: {
    $route: function (to, from) {
      // 处理路径变化的逻辑
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
.dome {
  width: 75px;
  height: 75px;
  position: fixed;
  right: 30px;
  top: 700px;
  cursor: pointer;
  background: url("@/assets/images/ben.png");
}

.dome > p {
  text-align: center;
  margin-top: 52px;
}

.dome > div {
  position: relative;
  top: -80px;
  left: 65px;
}
</style>
