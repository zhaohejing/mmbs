// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mmbs from 'mmbs'
import Mtable from 'components/m-table'
import dtime from 'time-formater'
/* eslint-disable */
Mmbs.initialize("1q2w3e4r5t6y7u8i9o0p");
Mmbs.serverURL = 'http://127.0.0.1:3080/mmbs';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.component("m-table", Mtable)
/*格式化日期*/
Vue.prototype.$fmtTime = (date, format) => {
  return dtime(date).format(format || 'YYYY-MM-DD HH:mm:ss')
}
/* 列表格式转换成树格式
 * @param data 数组
 * @param parentId 父节点id
 * @param pidField 父节点字段名
 */
const converToTreedata = (data, parentId, pidField) => {
  var list = []
  data.forEach((item) => {
    item.label = item.attributes.displayName;
    if (item.attributes[pidField] == parentId) {
      item.children = converToTreedata(data, item.id, pidField)
      data.children = item.children
      list.push(item)
    }
  })
  return list
}
const converToTreeCate = (data, parentId, pidField) => {
  var list = []
  data.forEach((item) => {
    item.label = item.attributes.name;
    let p = item.attributes[pidField]
    p = p == null ? null : p.id
    if (p == parentId) {
      item.children = converToTreeCate(data, item.id, pidField)
      data.children = item.children
      list.push(item)
    }
  })
  return list
}
Vue.prototype.$converToTreedata = converToTreedata;
Vue.prototype.$converToTreeCate = converToTreeCate;
router.beforeEach((to, from, next) => {
  const current = Mmbs.User.current();
  if (!current && to.path != "/login") {
    next("/login")
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
