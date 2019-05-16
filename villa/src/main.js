// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import routes from './routs'
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  base: "/dist/",
  mode: "history"
})

import Loading from '@/components/common/loading'
Vue.use(Loading);

import 'lib-flexible/flexible'

import Axios from "axios"
Vue.prototype.axios = Axios;

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1,
  error: "",
  loading: "",
  listenEvents: ["scroll"]
})

import store from './store/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
