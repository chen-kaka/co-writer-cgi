const _ = require("lodash");
const fs = require("fs");
const path = require('path');

let config = require('./config');

let env = 'dev', debug = false;
switch(process.env.NODE_ENV) {
  case 'dev':
  case 'development':
    env = 'dev';
    debug = true;
    break;
  case 'test':
    env = 'test';
    break;
  case 'uat':
    env = 'uat';
    break;
  case 'prod':
  case 'production':
    env = 'prod';
    break;
}


var envFilePath = path.join(__dirname, `env/${env}.js`);
if(fs.existsSync(envFilePath)) {
  try {
    var envConfig = require(envFilePath);
    if(envConfig) {
      _.extend(config, envConfig);
    }
  }
  catch(_) {
    console.log(`加载${env}配置文件失败`);
  }

}

module.exports = config;

