module.exports = {
    parser  : "@typescript-eslint/parser",
    plugins : [
        "@typescript-eslint",
    ],
    extends: [
        "plugin:@typescript-eslint/recommended",
    ],
    env: {
        es6  : true,
        node : true,
    },
    globals: {
        Atomics           : "readonly",
        SharedArrayBuffer : "readonly",
    },
    parserOptions: {
        ecmaVersion : 2019,
        sourceType  : "module",
    },
    rules: {
    // https://eslint.org/docs/rules/strict
        "strict" : 1,
        // https://eslint.org/docs/rules/quotes
        "quotes" : [
            "error",
            "double",
            {
                "allowTemplateLiterals": true,
            },
        ],
        // https://eslint.org/docs/rules/indent
        "indent": [
            "error",
            4,
            {
                "SwitchCase"         : 1,
                "VariableDeclarator" : "first",
            },
        ],
        // https://eslint.org/docs/rules/object-curly-spacing
        "object-curly-spacing": [
            "error",
            "always",
        ],
        // https://eslint.org/docs/rules/array-bracket-spacing
        "array-bracket-spacing": [
            "error",
            "always",
        ],
        // https://eslint.org/docs/rules/brace-style
        "brace-style": [
            "error",
            "1tbs",
        ],
        // https://eslint.org/docs/rules/curly
        "curly": [
            "error",
            "all",
        ],
        "semi": [
            "error",
            "always",
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
        "@typescript-eslint/explicit-function-return-type": [
            "error",
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
        ],
        "@typescript-eslint/no-inferrable-types": [
            "off",
        ],
        "key-spacing": [ "error", {
            "align": {
                "beforeColon" : true,
                "afterColon"  : true,
                "on"          : "colon",
            },
        } ],
    },
};
