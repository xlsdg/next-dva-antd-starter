const _ = require('lodash');

module.exports = _.mapValues(
  {
    BASE_URL: 'https://www.google.com/',
  },
  v => JSON.stringify(v)
);
