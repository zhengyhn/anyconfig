'use strict'

const should = require('should');

const util = require('../../lib/util.js');
const config = require('../../lib/config.js');

describe('test util', () => {
  let context = {
    response: {}
  };

  describe('resErr', () => {
    it('not pass message, should return empty error message', function * () {
      util.resErr(context);
      should(context.code === config.statusCode.error).be.ok;
      should(context.msg === '').be.ok;
    });
    it('pass message, should return the message', function * () {
      const msg = 'xxx';
      util.resErr(context, msg);
      should(context.code === config.statusCode.error).be.ok;
      should(context.msg === msg).be.ok;
    });
  });

  describe('resSuc', () => {
    it('not pass data, should return empty data', function * () {
      util.resErr(context);
      should(context.code === config.statusCode.success).be.ok;
      should(context.data === {}).be.ok;
    });
    it('pass data, should return the data', function * () {
      const data = {a: 1, b: 'b'};
      util.resErr(context, data);
      should(context.code === config.statusCode.success).be.ok;
      should(context.data === data).be.ok;
    });
  });
});
