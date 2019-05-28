import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts';
import { MessageBox } from 'element-ui';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
console.log(process.env);

// import {
//     setCookie
// } from './assets/js/util'

// setCookie('Token', 'V8hu4nz0QtGtsOp7FygV', '');

router.beforeEach((to, from, next) => {
    console.log(to.name)
    if (to.name == 'scan') {
        next();
    } else {
        if (sessionStorage.getItem("login")) { // 判断该路由是否需要登录权限
            next();
        } else {
            next({
                path: '/'
            })
        }
    }

});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')