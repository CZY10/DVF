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
      isToken: false,
      action: "",
      source: "",
      fullscreenLoading: false,
    };
  },
  mounted() {},
  created() {
    this.source =
      this.$route.query.source || localStorage.getItem("source") || "";
    this.action =
      this.$route.query.action || localStorage.getItem("action") || "";
    if (window.localStorage.token) {
      this.isToken = true;
    } else {
      this.isToken = false;
    }

    if (this.isToken == true && this.source == "vipon_deal") {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "#fff",
      });
      setTimeout(() => {
        loading.close();
      }, 10000);

      if (this.action == "account/login") {
        localStorage.removeItem("source");
        localStorage.removeItem("action");
        localStorage.removeItem("token");
        this.$store.commit("resetState");
        this.$router.push("/login");
      } else {
        determineDeal({
          is_login: true,
          action: this.action,
          source: this.source,
          id: this.$route.query.id || "",
        })
          .then((res) => {
            window.location.href = res.data.jump;
            localStorage.removeItem("source");
            localStorage.removeItem("action");
          })
          .catch((res) => {
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
