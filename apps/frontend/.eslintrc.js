module.exports = {
  root: true,
  extends: ['custom/next'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  // rules: {
  //   "import/extensions": [ "error", "ignorePackages", { "": "never" } ],
  // }
};
