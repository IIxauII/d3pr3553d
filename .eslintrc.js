module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "linebreak-style": 'off',
        "import/newline-after-import": 'off',
        "import/no-dynamic-require": 'off',
        "global-require": 'off',
        "indent": ["error", 4],
        "no-console": 'off', //for development purposes
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    },
};
