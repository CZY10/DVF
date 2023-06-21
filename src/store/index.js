import Vue from 'vue'
import Vuex from 'vuex'
import login from "@/store/modules/login";
import order from "@/store/modules/other";
import Index from "@/store/modules/index.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    order,
    Index
  }
})
