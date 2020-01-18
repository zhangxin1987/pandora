module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: ["plugin:vue/recommended"],
    rules: {
    },
    globals: {
        Vue: true,
        __webpack_public_path__: true
    },
    plugins: ["vue"],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    }
};
