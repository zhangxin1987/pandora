/* eslint-disable */
const fs = require('fs');
const path = require('path');
// const ocjCommon = fs.readFileSync(path.resolve(__dirname, './ocj.common.config'), "utf-8"); //ocj common公用配置

module.exports = {
    // project deployment base
    publicPath: '/',
    // for compatibility concern. TODO: remove in v4.
    // baseUrl: '/',

    // where to output built files
    outputDir: 'dist',
    // where to put static assets (js/css/img/font/...)
    assetsDir: '',

    // filename for index.html (relative to outputDir)
    indexPath: 'index.html',

    // whether filename will contain hash part
    filenameHashing: false,

    // boolean, use full build?
    runtimeCompiler: false,

    // deps to transpile
    transpileDependencies: [
        /* string or regex */
    ],

    // sourceMap for production build?
    productionSourceMap: false,

    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    // parallel: hasMultipleCores(),
    // 多页面配置
    pages: {
        components: { //提供给外部使用的组件注册文件
            entry: 'src/components/components.js', //入口文件 必要
        },
        app: { //主app入口
            entry: 'src/main.js', //入口文件 必要
            template: 'public/index.html', // 模版文件，默认`public/${name}.html`
            filename: 'index.html', // 输入的html文件名，默认`${name}.html`
            // chunks: ['chunk-vendors', 'chunk-common', 'index'], //需要加载的chunks，默认为['chunk-vendors', 'chunk-common', name]
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency',
            // ocjCommon: ocjCommon, //ocj common相关配置
        }
    },

    // <script type="module" crossorigin="use-credentials">
    //对于跨域js来说，只会给出很少的报错信息：'error: script error'，通过使用 crossorigin 属性可以使跨域js暴露出跟同域js同样的报错信息。但是，资源服务器必须返回一个 Access-Control-Allow-Origin 的header，否则资源无法访问。
    "crossorigin": undefined,

    // subresource integrity 用来生成css、js文件的integrity给浏览器做校验<link href=/css/index.ac906db3.css rel=stylesheet integrity=sha384-Fk8pV8atYWRjHcVEDVHHBUq3hwLm6o1pZKycJTxI4QP0xxmIB5/yy3F8XwDfxLs3>
    //减少由【托管在CDN的资源被篡改】而引入的XSS 风险
    // 减少通信过程资源被篡改而引入的XSS风险（同时使用https会更保险）
    // 可以通过一些技术手段，不执行有脏数据的CDN资源，同时去源站下载对应资源
    "integrity": false,
    //配置css打包策略
    // "css": {
    //     extract: false, //不需要抽离出css、sass等资源
    //     // modules: false,
    //     // localIdentName: '[name]_[local]_[hash:base64:5]',
    //     // sourceMap: false,
    //     // loaderOptions: {}
    //     loaderOptions: {
    //         sass: {
    //             implementation: require("sass")
    //         }
    //     }
    // },

    // whether to use eslint-loader 是否开启eslint
    "lintOnSave": true,
    //webpack的相关配置，config返回已有的webpack配置 以webpack-chain的方式配置webpack
    //https://github.com/neutrinojs/webpack-chain/tree/v5 通过webpack-chain可以对webpack配置做任何操作config.plugins.delete(name)
    "chainWebpack": (config) => {
        config.resolve.alias
            .set("@components", path.resolve(__dirname, 'src/components')) //组件目录
            .set("@pages", path.resolve(__dirname, 'src/pages')) //页面目录
            // .set("@assets", path.resolve(__dirname, 'src/assets')) //资源文件目录
            // .set("@sass", path.resolve(__dirname, 'src/sass')) //样式文件目录
            // .set('@constants', path.resolve(__dirname, 'src/constants'))
            // .set('@api', path.resolve(__dirname, 'src/api'))
            // .set('@utils', path.resolve(__dirname, 'src/utils'))
            // .set('@services', path.resolve(__dirname, 'src/services'))
            // .set('@tableConfig', path.resolve(__dirname, 'src/tableConfig'))
            // .set('@hotkey', path.resolve(__dirname, 'src/hotkey'));

        config.resolve.alias.delete('vue$'); //取消本地vue依赖
        config.optimization.clear(); //取消分包规则
        // config.plugins.delete('named-chunks');//删除chunk命名
        config.plugins.delete('html-components'); //删除异步组件声明文件的htmlplugin插件(优化、加快打包速度)

        //配置app基本信息
        const packageInfo = require('./package.json');
        config.plugin('define-app-info')
            .use(require('webpack/lib/DefinePlugin'), [{
                'process.app': {
                    NAME: `"${packageInfo.name}"`, //app的名称
                    VERSION: `"${packageInfo.version}"`, //app的版本号
                    KEY: `"${packageInfo.key}"`, // app的key
                }
            }])
    },
    //webpack的相关配置，config返回已有的webpack配置 以原始的webpack配置返回
    "configureWebpack": (config) => {
        return {
            devtool: process.env.NODE_ENV === 'development' ? "source-map" : false,
            // output: {
            //     chunkFilename: 'js/[name].[chunkhash:8].js',//动态import文件名
            // },
            "devServer": {
                "open": false, //因为package.json里面已经设置了vue-cli-service serve --open
                "host": '0.0.0.0',
                "port": 8888,
                "https": false,
                "hotOnly": false,
                "proxy": {
                    "/api": {
                        "target": 'http://yapi.devops.erp.ocj.com.cn/mock/423'
                    }
                }, // string | Object
                "before": app => {},
                "overlay": {
                    "warnings": false,
                    "errors": true
                },
                // 服务器允许跨域访问操作(主要为了解决远程调试跨域问题)
                before(app) {
                    app.use((req, res, next) => {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', '*');
                        next();
                    });
                }
            }
        };
    }
};
