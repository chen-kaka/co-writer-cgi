/*
* @Author: lizhonghui
* @Date:   2016-09-06 16:38:47
* @Last Modified by:   lizhonghui
* @Last Modified time: 2016-09-08 18:26:40
*/

const _ = require('lodash');
const mongo = require('../libs/mongo');

module.exports = {
  findChannels: function *(num) {
    let channels = mongo.model('channels');
    let docs = yield channels.find().limit(num);
    if(!_.isArray(docs)) {
      docs = [docs];
    }
    return _.map(docs, item => item.toJSON());
  }
}
