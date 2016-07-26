'use strict'

const Router = require('koa-router');

const auth = require('./intercepter/auth.js');
const anyConfigController = require('./controller/anyConfigController.js');

const router = new Router();

router.get('/', anyConfigController.index);
router.get('/anyconfig/toAdd', anyConfigController.toAdd);
router.post('/anyconfig/add', anyConfigController.checkParam,
            anyConfigController.add);
router.get('/anyconfig/checkKey', anyConfigController.checkKey);

router.get('/anyconfig/view/:key', anyConfigController.view);
router.post('/anyconfig/update', anyConfigController.checkParam,
            anyConfigController.update);
router.get('/anyconfig/getPrompts', anyConfigController.getPrompts);
router.get('/anyconfig/search', anyConfigController.search);

// apis for external
router.get('/api/get', auth.tokenRequire, anyConfigController.get);

module.exports = router;
