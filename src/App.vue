<template>
  <div id="app" style="padding-top: 67px">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { determineDeal } from "@/api/index";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      action: this.$route.query.action || localStorage.getItem("action") || "",
      source: this.$route.query.source || localStorage.getItem("source") || "",
    };
  },
  mounted() {
    // http://testai.blhltd.com/login?source=vipon_deal&action=dashboard/index
    if (
      this.action != "" &&
      this.source != "" &&
      localStorage.getItem("token")
    ) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "#fff",
      });
      determineDeal({
        is_login: 1,
        action: this.action,
        source: this.source,
      })
        .then((res) => {
          if (res.code == 1) {
            localStorage.removeItem("source");
            localStorage.removeItem("action");
            window.location.href = res.data.jump;
          }
        })
        .catch((res) => {
          loading.close();
          console.log(res);
        });
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style></style>
