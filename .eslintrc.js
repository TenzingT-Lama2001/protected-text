module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
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
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    'import/resolver': {
      typescript: {}, // enable TypeScript-aware module resolution
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'func-names': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    'eol-last': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        semi: true,
        printWidth: 120,
        singleQuote: true,
      },
    ],
    'import/prefer-default-export': 'off',
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
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
  },
};
