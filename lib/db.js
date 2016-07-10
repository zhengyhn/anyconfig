'use strict'

const mongoose = require('mongoose');
const config = require('./config.js');
const logger = require('./logger.js');

function create (uri) {
  const db = mongoose.createConnection(uri);
  db.on('connected', function () {
    logger.info('%s mongo connected: %s!!!', db.name, uri);
  });

  db.on('error', function (err) {
    logger.error('%s mongo Error: %s', uri, err);
  });
  return db;
}

exports.anyConfig = create(config.mongo_anyconfig.uri);

