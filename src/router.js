/* eslint-disable max-lines */
// 引入所有页面索引
import pages from "./pages/index";
import VueRouter from 'vue-router';

// 页面路由配置
let routes = [
    {
        path: "/",
        component: pages.main,
        name: "order",
        meta: {
            title: "商品订购",
            affix: true
        }
    }
];

// 实例化路由
const router = new VueRouter({
    routes
});
export default router;
