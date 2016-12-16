/**
 * Created by kakachan on 16/12/16.
 */

let mongo = require('../../libs/mongo');
let Repository = mongo.model('repository');

module.exports = {
    queryInfo,
    createRepo
}

function *queryInfo(id) {
    let userInfo = yield Repository.findById(id).exec();
    return userInfo;
}

function *createRepo(info) {
    info.status = 0;
    let retInfo = yield Repository.create(info);
    return retInfo;
}