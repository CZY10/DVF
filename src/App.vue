<template>
  <div id="app">
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
      if (this.action == "account/login") {
        localStorage.removeItem("source");
        localStorage.removeItem("avatar");
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
            console.log(res);
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
