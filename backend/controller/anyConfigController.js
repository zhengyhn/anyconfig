'use strict'

const _ = require('lodash');
const nodejieba = require('nodejieba');

const logger = require('../lib/logger.js');
const config = require('../lib/config.js');
const util = require('../lib/util.js');
const anyConfig = require('../model/anyConfig.js');
const wordConfig = require('../model/wordConfig.js');
const trie = require('../lib/trie.js');
const updateWordScore = require('../lib/updateWordScore.js');
const anyConfigService = require('../service/anyConfigService.js');
const amqp = require('../lib/amqp.js');

exports.index = function * () {
  yield this.render('index');
};

exports.toAdd = function * () {
  yield this.render('add');
};

/**
 * @param {function} next
 */
exports.checkParam = function * (next) {
  const param = this.request.body;
  logger.info(param);

  if (!param.key) {
    return util.resErr(this, config.errorMsg.nameCannotBeNull);
  }
  if (!param.comment) {
    return util.resErr(this, config.errorMsg.descCannotBeNull);
  }
  if (_.isEmpty(param.comment)) {
    return util.resErr(this, config.errorMsg.valueCannotBeNull);
  }

  yield next;
};

/**
 * add a config
 */
exports.add = function * () {
  const param = this.request.body;

  yield anyConfigService.add(param);

  return util.resSuc(this);
};

exports.checkKey = function * () {
  const param = this.request.query;

  yield anyConfigService.checkKey(param.key);

  return util.resSuc(this);
};

exports.view = function * () {
  const param = this.params;

  logger.info(param);
  param.status = 1;

  const result = yield anyConfig.findOne(param).lean().exec();

  logger.info(result);
  if (_.isObject(result.value)) {
    result.value = JSON.stringify(result.value);
  }
  yield this.render('view', {data: result});
};

exports.update = function * () {
  const param = this.request.body;

  logger.info(param);

  const result = yield anyConfig.findOne({key: param.key});
  if (!result) {
    return util.resErr(this, config.errorMsg.configNotExist);
  }
  yield anyConfig.update({_id: result._id}, {$set: param});
  updateWordScore();

  amqp.publish('koala.anyconfig.updated', {key: param.key});

  return util.resSuc(this);
};

exports.getPrompts = function * () {
  const param = this.request.query;
  logger.info(param);
  if (!param.key) {
    return util.resErr(this, config.errorMsg.keyCannotBeNull);
  }
  let words = trie.keysWithPrefix(param.key);
  if (words && words.length > 0) {
    words = words.slice(0, 10);
  } else {
    words = [];
  }

  return util.resSuc(this, words);
};

exports.search = function * () {
  const param = this.request.query;

  logger.info(param);

  if (!param.text) {
    return util.resErr(this, config.errorMsg.searchTextNull);
  }
  const configArray = yield anyConfig.find({key: param.text.trim().toLowerCase()});
  if (configArray.length > 0) {
    return util.resSuc(this, configArray);
  }
  const wordWeights = nodejieba.extract(param.text.trim(), config.jieba.maxWordLimit)
  console.info(wordWeights);
  if (wordWeights.length <= 0) {
    return util.resErr(this, config.errorMsg.searchTextNull);
  }
  const words = wordWeights.map((x) => x.word.toLowerCase());
  logger.info(words);
  const pipeline = [
    {$match: {word: {$in: words}}},
    {$project: {key: '$key', score: '$score'}},
    {$group: {_id: '$key', score: {$sum: '$score'}}},
    {$sort: {score: -1}}
  ]
  const list = yield wordConfig.aggregate(pipeline).exec()
  const keys = list.map((item) => item._id)

  const result = yield anyConfig.find({key: {$in: keys}}, 'key comment')

  util.resSuc(this, result);
};

exports.get = function * () {
  const LOG_TAG = 'anyConfigController.get'
  const param = this.request.query;

  logger.info(LOG_TAG, param);

  if (!param.key) {
    return util.resErr(this, config.errorMsg.keyCannotBeNull);
  }
  const result = yield anyConfigService.get(param);

  util.resSuc(this, result);
};

exports.getMultiple = function * () {
  const LOG_TAG = 'anyConfigController.getMultiple'
  const param = this.request.query;

  logger.info(LOG_TAG, param);

  if (!param.key) {
    return util.resErr(this, config.errorMsg.keyCannotBeNull);
  }
  let keys = param.key.split(',');
  const items = yield anyConfig.find({key: {$in: keys}}, 'key value').exec();
  let result = {};
  if (items && items.length > 0) {
    for (const item of items) {
      result[item.key] = item.value
    }
  }
  logger.info(LOG_TAG, result);

  util.resSuc(this, result);
};
