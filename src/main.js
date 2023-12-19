import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import 'default-passive-events'
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { refreshToken } from '../src/api/index';
import './assets/fonts/iconfont/iconfont.css'
import '@/utils/directives'
// 首页引导插件
import intro from 'intro.js' // introjs库
import 'intro.js/introjs.css' // introjs默认css样式
// introjs还提供了多种主题，可以通过以下方式引入
import 'intro.js/themes/introjs-modern.css' // introjs主题

// 把intro.js加入到vue的prototype中，方便使用，就可以直接通过this.$intro()来调用了
Vue.prototype.$intro = intro


//一键复制
import VueClipBoard from 'vue-clipboard2'
Vue.use(VueClipBoard)


// Vue.prototype.$video = videojs;
Vue.config.productionTip = false;

Vue.use(elTableInfiniteScroll)

let token = localStorage.getItem('token')
let nowData = Math.round(new Date() / 1000);

if (token && window.location.pathname != '/Invitationfilling') {
  let expiretime = localStorage.getItem('expiretime')
  store.commit('login/setToken', token)
  store.commit('login/setUserInfo', localStorage.getItem('userInfo'))
  if (expiretime - nowData < 24 * 3600 * 10) {
    refreshToken({
      token: token
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        store.commit('login/setToken', res.data.token);
        localStorage.setItem('expiretime', res.data.expires_in + Number(res.time))
        store.commit('login/setExpiretime', res.data.expires_in + Number(res.time))
      })
      .catch((err) => {
        console.log(err)
      })

  }
}
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'avatar') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return localStorage.setItem(key, newVal);
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
