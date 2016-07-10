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
});
