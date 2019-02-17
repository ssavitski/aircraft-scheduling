module.exports = {
  presets: [
    '@vue/app'
  ],
  env: {
    test: {
      plugins: [
        [ 'module-resolver', {
          'root': ['./tests'],
          'alias': {
            '~': './tests',
          },
        } ],
        [ 'istanbul', {
          'exclude': ['tests/**/*.js'],
        } ],
        [ 'rewire' ],
      ],
    },
  },
};