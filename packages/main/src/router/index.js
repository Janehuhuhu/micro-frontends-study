import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'index',
      meta: {
        title: '首页',
        hidden: true,
      },
      path: '/',
      component: Home
    }
  ]
})