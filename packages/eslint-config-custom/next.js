module.exports = {
  env: {
    browser: true,
  },
  extends: ['custom/base', 'next/core-web-vitals', 'next', 'airbnb', 'airbnb-typescript', 'prettier'],
  root: true,

  ignorePatterns: ['**/*.js', '**/*.json', 'public', 'styles', '.next', 'coverage', 'dist', '.turbo'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
};
