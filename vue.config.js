const merge = require('webpack-merge');
// tests
const karmaConfig = require('./config/karma.conf');
// build and serve
const configureWebpack = require('./config/webpack.conf');
// app stylization
const sass = require('./config/sass.conf');
// environment vars
const devEnv = require('./config/dev.env');
const prodEnv = require('./config/prod.env');
const testEnv = require('./config/test.env');

const isProduction = process.env.NODE_ENV === 'production';

switch(process.env.NODE_ENV) {
case 'development': process.env = merge(process.env, devEnv); break;
case 'production': process.env = merge(process.env, prodEnv); break;
case 'testing': process.env = merge(process.env, testEnv); break;
}

module.exports = {
  productionSourceMap: false,

  css: {
    extract: false,
    sourceMap: isProduction ? false : true,

    loaderOptions: { 
      sass,
      postcss: {
        config: {
          path: 'config/',
        },
      },
    },
  },

  configureWebpack,

  pluginOptions: {
    karma: { karmaConfig },
  },
};