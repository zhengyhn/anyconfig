'use strict'

const Schema = require('mongoose').Schema;
const anyConfig = require('../lib/db.js').anyConfig;

const schema = new Schema({
  key: {
    type: String
  },
  value: { },
  comment: {
    type: String
  },
  // 1: enable, 0: deleted
  status: {
    type: String,
    default: 1
  }
});

// 加上createdAt, updatedAt
schema.set('timestamps', true);
schema.index({status: 1});
schema.index({key: 1});

module.exports = anyConfig.model('anyConfig', schema, 'anyConfig');
