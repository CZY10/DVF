<template>
  <div id="app" style="padding-top: 67px">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { determineDeal } from "@/api/index";
export default {
  name: "app",
  components: {},
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
      fullscreenLoading: false,
    };
  },
  mounted() {
    if (localStorage.getItem("token") && this.source == "vipon_deal") {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "#fff",
      });

      if (this.action == "account/login") {
        loading.close();
        localStorage.clear();
        this.$store.commit("login/resetState");
        this.$router.push("/login");
      } else {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        determineDeal({
          is_login: true,
          action: this.action,
          source: this.source,
          id: id,
        })
          .then((res) => {
            if (res.code == 1) {
              loading.close();
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
