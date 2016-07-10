'use strict'

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const moment = require('moment-timezone');

const config = require('./config.js');

const dateFormat = function () {
  return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss:SSS');
};

const mkdir = function (str) {
  str = config.app.name + '-' + config.app.port + '-' + str;
  return path.resolve(config.app.log.dir, str);
};

console.info('log_dir %s; log: %s', config.app.log.dir, mkdir('all.log'));

const consoleTransport = new (winston.transports.Console)({
  timestamp: dateFormat,
  level: config.app.log.level,
  colorize: true
});

const allLoggerTransport = new DailyRotateFile({
  name: 'all',
  filename: mkdir('all.log'),
  timestamp: dateFormat,
  level: 'info',
  colorize: true,
  maxsize: 1024 * 1024 * 10,
  datePattern: '.yyyy-MM-dd'
});

const errorTransport = new (winston.transports.File)({
  name: 'error',
  filename: mkdir('error.log'),
  timestamp: dateFormat,
  level: 'error',
  colorize: true
});

const Transport = [consoleTransport];
if (config.app.isProd) {
  Transport.push(allLoggerTransport);
  Transport.push(errorTransport);
}

module.exports = new (winston.Logger)({
  transports: Transport
});