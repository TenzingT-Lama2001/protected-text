module.exports = { 
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin'],
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        semi: true,
        printWidth: 80,
        singleQuote: true,
      },
    ],
    "import/extensions":'off',
    "import/no-unresolved":'off',
    "import/prefer-default-export": 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    // quotes: [
    //   'error',
    //   'backtick',
    //   {
    //     avoidEscape: true,
    //     allowTemplateLiterals: false,
    //   },
    // ],
  },
};
