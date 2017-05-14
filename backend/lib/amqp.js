'use strict';

const config = require('./config.js');

const bus = require('servicebus').bus({
  url: config.rabbitmq.url,
  ack: true
});

module.exports = bus;
