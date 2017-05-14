'use strict'

const fs = require('fs');
const tracer = require('tracer');
const config = require('./config.js');

var logger = tracer.dailyfile({
  root: config.app.log.dir,
  maxLogFiles: 10,
  allLogsFileName: 'all',
  level: config.isProd ? 'info' : 'debug',
  transport: function (data) {
    console.log(data.output);
  }
});

// .console({
//   transport: function(data) {
//     console.log(data.output);
//     fs.appendFile(config.app.name + '-' + config.app.port + '-all.log', data.output + '\n', (err) => {
//       if (err) throw err;
//     });
//   }
// })
module.exports = logger;
