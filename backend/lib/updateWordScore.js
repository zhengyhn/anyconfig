'use strict'

const nodejieba = require('nodejieba');
const co = require('co');

const anyConfig = require('../model/anyConfig.js');
const wordConfig = require('../model/wordConfig.js');
const logger = require('../lib/logger.js');
const config = require('../lib/config.js');
const util = require('../lib/util.js');

const LIMIT = 10000;

module.exports = co.wrap(updateWordScore);

function * updateWordScore () {
  const count = yield anyConfig.count({status: 1});
  logger.info('total: ' + count);

  for (let i = 0; i < count; i += LIMIT) {
    const configList = yield anyConfig.find({status: 1})
      .skip(i).limit(LIMIT).exec();
    const bulk = wordConfig.collection.initializeUnorderedBulkOp();
    for (const item of configList) {
      buildInverseIndex(bulk, item.key, item.comment);
      buildInverseIndex(bulk, item.key, item.key);

      bulk.find({word: item.key.toLowerCase(), key: item.key}).upsert()
        .updateOne({$set: {score: 9999}});
    }
    yield bulk.execute();
  }
};

function buildInverseIndex (bulk, key, string) {
  const wordWeights = nodejieba.extract(string, config.jieba.maxWordLimit);
  logger.info(wordWeights);
  wordWeights.map((x) => {
    const query = {word: x.word.toLowerCase(), key: key};
    const update = {$set: {score: x.weight, updatedAt: util.getCurrentTime()}};
    bulk.find(query).upsert().updateOne(update);
  });
}

if (!module.parent) {
  co(module.exports).then((result) => {

  }, (e) => {

  });
}
