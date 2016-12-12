const _           = require("lodash");
const config      = require('../config');
const mongoose    = require('mongoose');
const requireTree = require('require-tree');
const logger      = require('./logger');
let Grid          = require('gridfs-stream');

mongoose.Promise = require('bluebird');
Grid.mongo       = mongoose.mongo;
mongoose.set('debug', true);

// connect
let client = mongoose.createConnection(config.mongoose.uri, config.mongoose.options);
client.on('connected', function () {
  logger.info(config.mongoose.uri + ' connected');
});
client.on('disconnected', function () {
  logger.info(config.mongoose.uri + ' disconnected');
});
client.on('error', function (err) {
  logger.error(err);
});
client.on('connecting', function () {
  logger.info(config.mongoose.uri + ' connecting');
});
client.on('reconnected', _.debounce(function () {
  logger.info(config.mongoose.uri + ' reconnected');
}, 3000));

// add schema
let Schema        = mongoose.Schema;
let schemasConfig = requireTree('../models/db');

//fixme 仅支持2级文件夹深度
_.forEach(schemasConfig, (config, name) => {
  if (config.schema) {
    createSchema(name, config.schema, config.options, config.indexes);
  } else {
    _.forIn(config, (value, key)=> {
      if (!value.schema){
        logger.error('ERROR: not support db schema format');
        return;
      }
      createSchema(key, value.schema, value.options, value.indexes);
    });
  }
});

function createSchema(name, schema, options, indexes) {
  let newSchema = new Schema(schema, options);
  if (indexes) {
    _.forEach(indexes, (indexOptions) => {
      newSchema.index(...indexOptions);
    });
  }
  client.model(name, newSchema);
}

module.exports        = client;