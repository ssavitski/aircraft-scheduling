module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  env: {
    'browser': true,
    'amd': true,
    'node': true
  },
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  rules: {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  globals: {
    expect: true,
    jasmine: true,
    spyOn: true,
    it: true,
    describe: true,
    beforeEach: true
  }
};
