// development mode

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  VUE_APP_AIR_HOST: 'https://infinite-dawn-93085.herokuapp.com',
});
