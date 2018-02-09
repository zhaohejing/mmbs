import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Container',
    redirect: "/user",
    component: Container,
    children: [{
        path: "/user",
        name: "user",
        component: r => require.ensure([], () => r(require('@/views/user/user')), 'user')
      },
      {
        path: "/role",
        name: "role",
        component: r => require.ensure([], () => r(require('@/views/role/role')), 'role')
      },
      {
        path: "/menu",
        name: "menudash",
        component: r => require.ensure([], () => r(require('@/views/menu/menu')), 'menu')
      },
      {
        path: "/cate",
        name: "cate",
        component: r => require.ensure([], () => r(require('@/views/cate/cate')), 'cate')
      }
    ]
  }, {
    path: "/login",
    name: "login",
    component: r => require.ensure([], () => r(require('@/views/index')), 'login')
  }]
})
