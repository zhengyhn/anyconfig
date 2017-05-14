'use strict'

const _ = require('lodash');
const nodejieba = require('nodejieba');

const logger = require('../lib/logger.js');
const config = require('../lib/config.js');
const AnyconfigError = require('../lib/AnyconfigError.js');
const util = require('../lib/util.js');
const anyConfig = require('../model/anyConfig.js');
const wordConfig = require('../model/wordConfig.js');
const trie = require('../lib/trie.js');
const updateWordScore = require('../lib/updateWordScore.js');

class AnyconfigService {
  * add (param) {
    // check the key exists or not
    yield this.checkKey(param.key);

    yield anyConfig.create(param);

    // update search index
    updateWordScore();

    // add to search prompt trie tree
    trie.addString(param.key);
  }

  * checkKey (key) {
    const doc = yield anyConfig.findOne({key});
    if (doc) {
      throw new AnyconfigError(config.errorMsg.configAlreadyExist);
    }
  }

  * get (param) {
    const key = param.key;

    const query = {key};
    logger.info(query);
    const data = yield anyConfig.find(query, 'value').limit(1).exec();
    const result = data && data[0] ? data[0].value : '';
    logger.info(result);

    return result;
  }
}

module.exports = new AnyconfigService();
