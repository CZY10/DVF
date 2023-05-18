<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import login from "@/store/modules/login";
import { determineDeal } from "@/api/index";
export default {
  name: "app",
  data() {
    return {
      isToken: false,
      action: "",
      source: "",
    };
  },
  components: {},
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
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
        localStorage.setItem("token", "");
        this.setToken("");
        this.$router.push("/login");
      } else {
        determineDeal({
          is_login: true,
          action: this.action,
          source: this.source,
        })
          .then((res) => {
            console.log(res);
            if (res.data.jump) {
              window.open(res.data.jump, "_blank");
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  },
  methods: {
    ...mapMutations("login", ["setToken"]),
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
