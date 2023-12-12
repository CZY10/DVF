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
  mounted() {
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
              localStorage.removeItem("source");
              localStorage.removeItem("action");
              window.location.href = res.data.jump;
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  },
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
