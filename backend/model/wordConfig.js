'use strict'

const Schema = require('mongoose').Schema;
const anyConfig = require('../lib/db.js').anyConfig;

const schema = new Schema({
  word: {
    type: String
  },
  key: {
    type: String
  },
  score: {
    type: Number
  },
  updatedAt: {
    type: Date
  },
  // 1: enable, 0: deleted
  status: {
    type: String,
    default: 1
  }
});

schema.index({status: 1});
schema.index({word: 1});
schema.index({key: 1});

module.exports = anyConfig.model('wordConfig', schema, 'wordConfig');
