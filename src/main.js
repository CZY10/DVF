import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'

import videojs from "video.js";
import "video.js/dist/video-js.css";
import elTableInfiniteScroll from "el-table-infinite-scroll";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr";
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.prototype.$video = videojs;

Vue.config.productionTip = false;

Vue.use(elTableInfiniteScroll)

let userInfo = localStorage.getItem('token')
if (userInfo){
  // userInfo = JSON.parse(userInfo);
  store.commit('login/setUserInfo',userInfo)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
