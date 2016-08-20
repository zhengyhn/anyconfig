'use strict'

const anyConfigService = require('../../service/anyConfigService.js');
const anyConfig = require('../../model/anyConfig.js');

describe('test anyConfigService', () => {
  describe('add', () => {
    it('should insert a record', function * () {
      const param = {
        key: 'abc',
        comment: 'abc',
        value: '1'
      };
      yield anyConfigService.add(param);

      const config = yield anyConfig.findOne({key: 'abc'});
      config.should.exists;
      config.key.should.be.equal('abc');
      config.comment.should.be.equal('abc');
      config.value.should.be.equal('1');
    });
  });

  describe('checkKey', () => {
    before(function * () {
      const param = {
        key: 'abcd',
        comment: 'abc',
        value: '1'
      };
      yield anyConfigService.add(param);
    });

    it('key abcd should exists', function * () {
      let err = '';

      try {
        yield anyConfigService.checkKey('abcd');
      } catch (e) {
        err = e;
      }
      err.should.exists;
    });

    it('key zzz should not exists', function * () {
      let err = '';

      try {
        yield anyConfigService.checkKey('zzz');
      } catch (e) {
        sails.log.err(e);
        err = e;
      }
      err.should.not.exists;
    });
  });
});
