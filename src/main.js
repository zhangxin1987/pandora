import Vue from 'vue'
import Vant from 'vant';

import VueRouter from 'vue-router';
import App from './basic/app';

Vue.config.productionTip = false;
// 路由
import router from './router';
// 组件
// import './components';
Vue.use(Vant);
// 引用router
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
