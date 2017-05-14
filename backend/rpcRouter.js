'use strict'

const anyConfigRpc = require('./rpc/anyConfigRpc.js');
const config = require('./lib/config.js');

const rpc = require('amqp-rpc').factory({
  url: config.rabbitmq.url
});

rpc.on('koala.anyconfig.get', anyConfigRpc.get);
