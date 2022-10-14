module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
  },
  rules: {
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-new-object': 'error',
    'array-bracket-newline': 'error',
    'array-element-newline': ['error', 'consistent'],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ],
    'object-shorthand': ['warn', 'methods'],
    'lines-between-class-members': 'error',
    'no-new-func': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-parens': 'error',
    'implicit-arrow-linebreak': 'warn',
    'prefer-destructuring': 'error',
    'prefer-template': 'error',
    'brace-style': 'error',
    curly: 'error',
    'keyword-spacing': 'error',
    eqeqeq: 'error',
    'padding-line-between-statements': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
      },
    ],
  },
};
