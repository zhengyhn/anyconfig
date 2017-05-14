'use strict'

const helper = require('./helper.js')

const config = require('../lib/config.js');
const app = require('../app.js');
const logger = require('../lib/logger.js');

before(function * () {
  yield helper.dropDatabase();
  yield helper.initData();

  app.server = app.listen(config.app.port, function () {
    logger.info('Server listening on: ', config.app.port);
  });
});

after(function * (done) {
  // clear test database data
  // shutdown the test server
  app.server.close(done);
});
