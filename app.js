'use strict'

const schedule = require('node-schedule');
const app = require('koa')();
const koaLogger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const errorhandler = require('koa-errorhandler');
const views = require('koa-views');
const staticCache = require('koa-static-cache');

const config = require('./lib/config.js');
const logger = require('./lib/logger.js');
const router = require('./router.js');
const updateWordScore = require('./tasks/updateWordScore.js');

app.use(errorhandler());
app.use(bodyparser());
app.use(staticCache(config.app.staticCacheConf));
app.use(koaLogger());
app.use(views(config.app.viewPath, config.app.viewConf));
app.use(router.routes());

module.exports = app;

if (!module.parent) {
  app.listen(config.app.port, function () {
    logger.info('Server listening on: ', config.app.port);
  });

  schedule.scheduleJob('* */3 * * *', updateWordScore);
}
