module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-async-promise-executor': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
