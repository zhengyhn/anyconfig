'use strict'

const supertest = require('co-supertest');
const mocha = require('co-mocha');

process.env.ENV = 'test';

const config = require('../lib/config.js');
const app = require('../app.js');
const logger = require('../lib/logger.js');

before(function * () {
  app.server = app.listen(config.app.port, function () {
    logger.info('Server listening on: ', config.app.port);
  });
});

after(function * (done) {
  app.server.close(done);
});

module.exports = {
  request: supertest('http://' + config.app.host + ':' + config.app.port)
};
