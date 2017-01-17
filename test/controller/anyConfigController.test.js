'use strict'

const bootstrap = require('../bootstrap.test.js');
const request = bootstrap.request;

describe('test anyConfigController', () => {
  describe('index', () => {
    it('should render index view', function * () {
      yield request
        .get('/')
        .expect(200)
        .end((err, res) => {
          console.error(err);
          console.info(res.body);
        });
    });
  });

  describe('toAdd', () => {
    it('should render add view', function * () {
      yield request
        .get('/anyConfig/toAdd')
        .expect(200)
        .end((err, res) => {
          console.error(err);
          console.info(res.body);
        });
    });
  });

  describe.only('test get', () => {
    it('should return config', function * () {
      yield request
        .get('/api/get?key=aaa')
        .set('token', '013918fe4ab81be96cc52a37ce6dd8db')
        .expect(200)
        .end((err, res) => {
          console.error(err);
          console.info(res.body);
        });
    });
  });
});
