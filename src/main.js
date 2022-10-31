import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'

import videojs from "video.js";
import "video.js/dist/video-js.css";
import VuexEsmBrowser from "vuex/dist/vuex.esm.browser";
Vue.prototype.$video = videojs;

Vue.config.productionTip = false

let userInfo = localStorage.getItem('userInfo')
console.log(userInfo)
if (userInfo){
  userInfo = JSON.parse(userInfo);
  store.commit('login/setUserInfo',userInfo)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
