'use strict'

const request = require('../helper.js').request;

describe('test anyConfigController', () => {
  describe('index', () => {
    it('should render index view', function * () {
      const res = yield request
        .get('/')
        .expect(200)
      console.info(res.body);
    });
  });

  describe('toAdd', () => {
    it('should render add view', function * () {
      const res = yield request
        .get('/anyConfig/toAdd')
        .expect(200)
      console.info(res.body);
    });
  });

  describe('test get', () => {
    it('should return config', function * () {
      const res = yield request
        .get('/api/get')
        .query({key: 'aaa'})
        .set('token', '013918fe4ab81be96cc52a37ce6dd8db')
        .expect(200)
      console.info(res.body);
    });
  });
});
