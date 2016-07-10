'use strict';

const co = require('co');
var natural = require('natural');
var Trie = natural.Trie;

const wordConfig = require('../model/wordConfig.js');
const logger = require('../lib/logger.js');

var trie = new Trie();

co(function * () {
  const result = yield wordConfig.find({}, 'word');
  const words = result.map((x) => x.word);

  logger.info('trie tree words: ' + words.length);
  trie.addStrings(words);
});

module.exports = trie;
