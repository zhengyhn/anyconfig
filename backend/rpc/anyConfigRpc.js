'use strict'

const co = require('co');
const joi = require('joi');
const anyConfigService = require('../service/anyConfigService.js');
const AnyconfigError = require('../lib/AnyconfigError.js');
const logger = require('../lib/logger.js');
const util = require('../lib/util.js');

exports.get = function (param, cb) {
  const key = param.key;

  const schema = {
    key: joi.string().required().error(new AnyconfigError('请传入key'))
  };
  const bundle = {key};
  logger.info('get:', bundle);
  const validateResult = joi.validate(bundle, schema);
  if (validateResult && validateResult.error) {
    throw validateResult.error;
  }

  const fn = co.wrap(anyConfigService.get);
  fn(bundle).then((result) => {
    return cb(util.rpcSuc(result));
  }).catch((err) => {
    logger.error(err);
    return cb(util.rpcErr(err));
  });
};
