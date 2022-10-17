module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {

    // // Set by env es2022 automatically
    // https://eslint.org/docs/latest/user-guide/configuring/language-options
    // ecmaVersion: 11,

    // parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
  }
}
