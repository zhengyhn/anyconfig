'use strict'

const should = require('should');

const bootstrap = require('../bootstrap.test.js');
const util = require('../../lib/util.js');
const config = require('../../lib/config.js');

describe('test util', () => {
  let context = {
    response: {}
  };

  describe('resErr', () => {
    it('not pass message, should return empty error message', function * () {
      const result = util.resErr(context); 
      should(result.code === config.statusCode.error).be.ok;
      should(result.msg === '').be.ok;
    });
    it('pass message, should return the message', function * () {
      const msg = 'xxx';
      const result = util.resErr(context, msg); 
      should(result.code === config.statusCode.error).be.ok;
      should(result.msg === msg).be.ok;
    });
  });

  describe('resSuc', () => {
    it('not pass data, should return empty data', function * () {
      const result = util.resErr(context); 
      should(result.code === config.statusCode.success).be.ok;
      should(result.data === {}).be.ok;
    });
    it('pass data, should return the data', function * () {
      const data = {a: 1, b: 'b'};
      const result = util.resErr(context, data); 
      should(result.code === config.statusCode.success).be.ok;
      should(result.data === data).be.ok;
    });
  });
});
