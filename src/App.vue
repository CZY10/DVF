<template>
  <div id="app" style="padding-top: 67px">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { determineDeal } from "@/api/index";
import router from "./router";
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
      action:
        new URL(window.location.href).searchParams.get("action") ||
        localStorage.getItem("action") ||
        "",
      source:
        new URL(window.location.href).searchParams.get("source") ||
        localStorage.getItem("source") ||
        "",
      id: new URL(window.location.href).searchParams.get("id") || "",
    };
  },
  mounted() {
    // http://testai.blhltd.com/login?source=vipon_deal&action=dashboard/index
    // http://localhost:8088/login?source=vipon_deal&action=hot%2Fdeal-detail&id=1
    // http://localhost:8088/login?source=vipon_deal&action=account%2Flogin
    if (
      this.action != "account/login" &&
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
        id: this.id,
      })
        .then((res) => {
          if (res.code == 1) {
            localStorage.removeItem("source");
            localStorage.removeItem("action");
            res.data.jump
              ? (window.location.href = res.data.jump)
              : loading.close();
          }
        })
        .catch((res) => {
          loading.close();
          console.log(res);
        });
    } else if (this.action == "account/login") {
      localStorage.clear();
      window.location.href = "/login";
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
