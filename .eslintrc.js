module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'mocha': true,
        'node': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'globals': {
        'process': true,
        'Buffer': true,
        '__filename': true,
        '__dirname': true,
    },
    'rules': {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 },
        ],
        'no-console': 0,
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
    },
}
