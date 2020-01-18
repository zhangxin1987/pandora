module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: ["plugin:vue/recommended"],
    rules: {
        // indent: "off",
        // "vue/max-len": [
        //     "error",
        //     {
        //         code: 160,
        //         template: 160,
        //         comments: 160
        //     }
        // ],
        "vue/name-property-casing": [0, "PascalCase"],
        "vue/html-closing-bracket-newline": [
            0,
            {
                singleline: "never",
                multiline: "always"
            }
        ],
        "vue/no-side-effects-in-computed-properties": 0,
        "vue/singleline-html-element-content-newline": "off",
        "vue/require-default-prop": 0,
        "vue/max-attributes-per-line": [
            2,
            {
                singleline: 10,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "any",
                    normal: "any",
                    component: "any"
                },
                svg: "any",
                math: "any"
            }
        ],
        "vue/script-indent": [
            "error",
            4,
            {
                baseIndent: 0,
                switchCase: 0,
                ignores: []
            }
        ],
        "vue/html-indent": [
            "error",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        "indent": ["off", 2]
    },
    globals: {
        ocj: true,
        Vue: true,
        __webpack_public_path__: true
    },
    plugins: ["vue"],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    }
};
