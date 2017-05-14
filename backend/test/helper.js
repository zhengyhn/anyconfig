'use strict'

const path = require('path');
const fs = require('fs');
const supertest = require('supertest');
const config = require('../lib/config.js');
const anyConfigDb = require('../lib/db.js').anyConfig;

const Test = supertest.Test;
const oldEnd = Test.prototype.end;

Test.prototype.end = function () {
  if (arguments.length > 0) { return oldEnd.apply(this, arguments); }
  var self = this;
  return function (callback) {
    oldEnd.call(self, function (err, res) {
      // allow events handlers to run first
      process.nextTick(function () {
        callback(err, res);
      });
    });
  };
}

module.exports = {
  request: supertest('http://' + config.app.host + ':' + config.app.port),
  rpc: require('amqp-rpc').factory({
    url: config.rabbitmq.url
  }),

  dropDatabase: function * () {
    const mNames = anyConfigDb.modelNames()
    console.info('will clear collection : ', mNames)
    const Models = mNames.map((m) => anyConfigDb.model(m))
    yield Models.map(self._dropCollection)
  },

  _dropCollection (Model) {
    return new Promise(function (resolve, reject) {
      Model.collection.remove(function (err) {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  },

  initData: function * () {
    let files = yield self._readDataFiles(path.resolve(__dirname, './'));
    console.log('all data files:', files);

    for (const file of files) {
      const data = require(file)
      for (const d of data) {
        yield d.model.create(d.items)
      }
    }
  },

  _readDataFiles: function * (dir) {
    const files = fs.readdirSync(dir);
    // console.log('files:', files);
    let allDataFiles = [];

    for (const file of files) {
      const filename = path.resolve(dir, file);
      const stat = fs.statSync(filename);
      let dataFiles = [];
      if (stat && stat.isDirectory()) {
        dataFiles = yield self._readDataFiles(filename);
      } else if (file.indexOf('.data.') >= 0) {
        dataFiles = [filename];
      }
      allDataFiles = allDataFiles.concat(dataFiles);
    }
    return allDataFiles;
  }
};
const self = module.exports;
