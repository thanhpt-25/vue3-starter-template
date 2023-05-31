/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides:[
    {
      files: ["{tailwind,postcss}.config.js"],
      env: {
        node: true,
      },
    }
  ],
  rules:{
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
