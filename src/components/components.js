/* eslint-disable no-undef camelcase */
/**
 *@author Yasin
 *@version [OCJ-ERP Ocj V01,2019/5/30]
 *@date 2019/5/30
 *@description 提供给外部用的组件库
 */
/*
 修改webpack的public path，为了解决当前组件中的资源文件正确加载
 参数为当前项目名称
 */
// const $$cliPathName$$ = process.app.NAME;
// eslint-disable-next-line camelcase
// __webpack_public_path__ = ocj.path($$cliPathName$$);
/*
 提供给外部应用的组件
 需要跟ocj.js中config.js定义的组件相对应
 */
// import User from './component1/component1.vue';
// const user = (resolve) => {
//     resolve(User);
// };
/*
 注册组件到ocj公共库中，
 第一个参数为当前应用名称
 第二个参数为当前组件名称
 第三个参数为当前组件
 */
// ocj.register("common", "user", user);