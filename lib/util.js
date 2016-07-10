'use strict';

const Moment = require('moment-timezone');

const config = require('./config.js');

module.exports = {
  resErr: function (context, msg) {
    return context.response.body = {code: config.statusCode.error, msg: msg};
  },

  resSuc: function (context, data) {
    return context.response.body = {code: config.statusCode.success, data: data}
  },

  getCurrentMoment: function () {
    return new Moment().tz('Asia/Shanghai');
  },

  getCurrentTime: function () {
    return self.getCurrentMoment().toDate();
  },

  getCurrentTimestamp: function () {
    return self.getCurrentMoment().valueOf();
  }
};

const self = module.exports;
