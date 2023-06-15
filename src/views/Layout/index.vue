<template>
  <el-row>
    <el-col :span="24">
      <Navmenu v-if="flag" />
      <Mycontent />
    </el-col>
  </el-row>
</template>

<script>
import Mycontent from "@/components/SideBar/Mycontent";
import Navmenu from "@/components/SideBar/Navmenu";
export default {
  name: "home",
  data() {
    return {
      flag: true,
    };
  },
  components: {
    Mycontent,
    Navmenu,
  },
  created() {
    if (
      this.$route.fullPath == "/Requirement" ||
      this.$route.fullPath == "/Note"
    ) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
