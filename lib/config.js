'use strict'

const _ = require('lodash');
const path = require('path')

const ENV = process.env.ENV || 'dev';
const root = path.resolve(__dirname, '..')

const baseConfig = {
  app: {
    name: 'anyconfig',
    env: ENV,
    isProd: (ENV === 'prod'),
    locale: 'zh_CN',
    timezone: 'Asia/Shanghai',
    token: '013918fe4ab81be96cc52a37ce6dd8db',
    staticCacheConf: path.join(__dirname, '/../assets'),
    viewPath: path.join(__dirname + '/../view'),
    viewConf: {map: {html: 'jade'}, extension: 'jade'},
    log: {
      dir: process.env.LOG_DIR || path.resolve(root, 'log'),
      level: process.env.LOG_LEVEL || 'info'
    }
  },
  statusCode: {
    error: -1,
    success: 0
  },
  jieba: {
    maxWordLimit: 10000
  }
};

const platformConfig = {
  dev: {
    app: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8081
    },
    mongo_anyconfig: {
      uri: process.env.MONGO_ANYCONFIG || 'mongodb://localhost:27017/anyconfig'
    }
  },
  test: {
    app: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8082
    },
    mongo_anyconfig: {
      uri: process.env.MONGO_ANYCONFIG || 'mongodb://localhost:27017/anyconfig-test'
    }
  },
  prod: {
    app: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8081,
    },
    mongo_anyconfig: {
      uri: process.env.MONGO_ANYCONFIG || 'mongodb://localhost:27017/anyconfig'
    }
  }
};

const localeConfig = {
  en_US: {
    errorMsg: {
      keyCannotBeNull: 'The key cannot be null!',
      nameCannotBeNull: 'The name cannot be null!',
      descCannotBeNull: 'The description cannot be null!',
      valueCannotBeNull: 'The value cannot be null!',
      configAlreadyExist: 'The configuration already exist',
      configNotExist: 'The configuration does not exist',
      searchTextNull: 'Please input search content'
    }
  },
  zh_CN: {
    errorMsg: {
      keyCannotBeNull: 'key不能为空!',
      nameCannotBeNull: '名称不能为空!',
      descCannotBeNull: '描述不能为空!',
      valueCannotBeNull: '配置值不能为空!',
      configAlreadyExist: '该配置已存在!',
      configNotExist: '该配置不存在!',
      searchTextNull: '请输入搜索内容'
    }
  }
};

let config = _.merge(baseConfig, platformConfig[ENV]);
config = _.merge(config, localeConfig[config.app.locale]);

module.exports = config;
