const _ = require('lodash');

const PROD = {
  BASE_URL: 'https://www.google.com/',
};

const TEST = {
  BASE_URL: 'https://www.baidu.com/',
};

module.exports = (isProd = true) => _.mapValues(isProd ? PROD : TEST, v => JSON.stringify(v));
