var rpc = require('amqp-rpc').factory({
  url: 'amqp://guest:guest@localhost:5672'
});

rpc.call('koala.anyconfig.get', {key: 'agenda.notifyList'}, function (result) {
  console.log(result);
});
