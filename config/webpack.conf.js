const path = require('path');

module.exports = {
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@addons': path.resolve(__dirname, 'node_modules'),
      'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components'),
    },
  },
};
