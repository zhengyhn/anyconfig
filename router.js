'use strict'

const Router = require('koa-router');

const auth = require('./intercepter/auth.js');
const anyConfigController = require('./controller/anyConfigController.js');

const router = new Router();

router.get('/', anyConfigController.index);
router.get('/anyconfig/toAdd', anyConfigController.toAdd);
router.post('/anyconfig/add', anyConfigController.checkParam,
            anyConfigController.add);
router.post('/anyconfig/checkKey', anyConfigController.checkKey);

router.get('/anyconfig/view/:key', anyConfigController.view);
router.post('/anyconfig/update', anyConfigController.checkParam,
            anyConfigController.update);
router.post('/anyconfig/getPrompts', anyConfigController.getPrompts);
router.post('/anyconfig/search', anyConfigController.search);

// apis for external
router.post('/api/get', auth.tokenRequire, anyConfigController.get);

module.exports = router;
