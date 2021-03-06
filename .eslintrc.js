module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars": 'off',
    "max-classes-per-file": ["error", 2],
    "lines-between-class-members": 'off',
    "@typescript-eslint/no-var-requires": 'off',
    "import/newline-after-import": 'off',
    "@typescript-eslint/explicit-module-boundary-types": 'off',
  },
};
