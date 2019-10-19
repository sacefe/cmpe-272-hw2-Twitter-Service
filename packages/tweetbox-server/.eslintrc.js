module.exports = {
    root: true,
    env: {
      node: true,
      'es6': true
    },
    'extends': [
      'eslint:recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'quotes': [1, 'single', 1, { "allowTemplateLiterals": true }],
    },
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    },
  }