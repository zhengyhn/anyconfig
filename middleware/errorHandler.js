'use strict'

const util = require('../lib/util.js');
const AnyconfigError = require('../lib/AnyconfigError.js');

module.exports = function* (next) {
  try {
    yield* next;
  } catch(e) {
    let status = e.status || 500;
    let message = e.message || 'server error';

    if (status == 500) { 
      this.app.emit('error', e, this);
    }
    if (e instanceof AnyconfigError) {
      return util.resErr(this, message);
    }
  }
};
