import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/scan',
            // meta: {
            //     requireAuth: true //全局拦截
            // }
        },
        // 首页
        {
            path: '/index/:id',
            name: 'index',
            meta: {
                requireAuth: true //进入这个路由前是需要登录的
            },
            component: () =>
                import ('./views/Index/Index.vue')
        },
        // 选择题页面
        {
            path: '/choose/:id',
            name: 'choose',
            component: () =>
                import ('./views/Main/Main_choose.vue')
        },
        // 扫描授权 获取授权
        {
            path: '/scan',
            name: 'scan',
            component: () =>
                import ('./views/Main/Main_scan.vue')
        },
        // 授权  暂无可用考试
        {
            path: '/notest',
            name: 'notest',
            component: () =>
                import ('./views/Main/Main_notest.vue')
        },
        // 考试列表
        {
            path: '/testlist',
            name: 'testlist',
            component: () =>
                import ('./views/Main/Main_testlist')
        },
        // 考试列表搜索
        {
            path: '/testlistsearch',
            name: 'testlistsearch',
            component: () =>
                import ('./views/Main/Main_testlistsearch')
        },
    ],

});