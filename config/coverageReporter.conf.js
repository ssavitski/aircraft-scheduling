const path = require('path');

module.exports = {
  dir: './coverage',
  // Would output the results into: './coverage/firefox/'
  subdir(browserName) {
    // normalization process to keep a consistent browser name
    return path.join('.', browserName.split(' ')[0]);
  },

  reporters: [
    { type: 'lcov' },
    { type: 'text-summary' }
  ]
};
