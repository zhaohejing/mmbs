// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mmbs from 'mmbs'
import Mtable from 'components/m-table'
/* eslint-disable */
Mmbs.initialize("1q2w3e4r5t6y7u8i9o0p");
Mmbs.serverURL = 'http://127.0.0.1:11111/mmbs';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.component("m-table", Mtable)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
