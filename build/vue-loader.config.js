const autoprefixer = require('autoprefixer');

module.exports = {
  preserveWhitespace: false,
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ]
};
