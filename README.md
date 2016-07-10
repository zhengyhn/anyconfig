# AnyConfig
A config project, to solve the problem of changing requirement.

[![Build Status](https://travis-ci.org/zhengyhn/anyconfig.svg?branch=master)](https://travis-ci.org/zhengyhn/anyconfig)

## Philosophy
- Anything could change should be regarded as config
- Config must save in database
- When requirement change, there is no need to modify any line of code

## Requirement
- Node.js 4.x or higher
- Mongodb
- Npm
- Bower

## Usage
- Clone this project

```
git clone https://github.com/zhengyhn/anyconfig.git
```

- Install the dependence

```
cd anyconfig
npm i
cd assets
bower i
```

- Configuration
Open the config file ```lib/config.js```, modify the host and port of the app and the your mongodb in the ``platformConfig.dev`` region.
- Start

```
node app.js
```

Then go to ```http://your-host:your-port```, and Add your configuration.

### External API
You can use [nanyconfig](https://www.npmjs.com/package/nanyconfig) in your Node.js project.

```
npm i nanyconfig --save
```

Usage in your project.

```
const NAnyConfig = require('nanyconfig');

const options = {
  token: '013918fe4ab81be96cc52a37ce6dd8db',
  url: 'http://localhost:8080'
};

const anyConfig = new NAnyConfig(options);

anyConfig.get('key', function (err, value) {
  console.info(value);
});

anyConfig.get('key')
  .then(function (value) {
    console.info(value);
  }).catch(err) {
    console.error(err);
  });
```

Or you can just send a request:

```
var request = require('request');

var options = {
  url: 'http://localhost:8080/api/get',
  headers: {
    token: '013918fe4ab81be96cc52a37ce6dd8db'
  },
  json: {
    key: 'key'
  },
  timeout: 5000
};

request.post(options, function (err, res, result) {
  if (err || res.statusCode !== 200 || !result) {
    return cb(err || 'request error');
  }
  if (result.code !== 0) {
    return cb(result.msg);
  }
  return cb(null, result.data);
});
```

## Test

```
npm run test
```

Or test with the coverage report

```
npm run cover
```

## Licence
- MIT
