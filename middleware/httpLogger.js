'use strict'

const logger = require('../lib/logger.js');

module.exports = function* (next) {
  if (this.request.method == 'POST') {
    logger.info('http body: ', this.request.body);
  }
  yield next;
};
