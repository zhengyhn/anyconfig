'use strict';

const Moment = require('moment-timezone');

const config = require('./config.js');

module.exports = {
  /**
   * Return error response
   * 
   * @param {Object} context
   * @param {String} msg 
   * @return {Object} {
   *     code: -1,
   *     msg: 'xxx'
   *   }
   */
  resErr: function (context, msg) {
    return context.response.body = {
      code: config.statusCode.error,
      msg: msg || 'Unknown error'
    };
  },

  /**
   * Return success response
   * 
   * @param {Object} context
   * @param {Object} data
   * @return {Object} {
   *     code: 0,
   *     data: 'object'
   *   }
   */
  resSuc: function (context, data) {
    return context.response.body = {code: config.statusCode.success, data: data || {}}
  },

  /**
   * Get current time's Moment object with timezone,
   * if not pass timezone, use the app's default timezone
   *
   * @param {String} timezone
   * @return {Object} the Moment object
   */
  getCurrentMoment: function (timezone) {
    return new Moment().tz(timezone || config.app.timezone);
  },

  /**
   * Get current time of type Date
   *
   * @param {String} timezone
   * @return {Date} current time
   */
  getCurrentTime: function (timezone) {
    return self.getCurrentMoment(timezone).toDate();
  },

  /**
   * Get current time of type timestamp
   *
   * @param {String} timezone
   * @return {Integer} current time
   */
  getCurrentTimestamp: function (timezone) {
    return self.getCurrentMoment(timezone).valueOf();
  }
};

const self = module.exports;
