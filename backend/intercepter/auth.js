'use strict'

const config = require('../lib/config.js');

exports.tokenRequire = function * (next) {
  const token = this.header['token'];
  if (token !== config.app.token) {
    this.throw(400);
  }
  yield next;
};
