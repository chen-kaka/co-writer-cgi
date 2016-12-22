/**
 * Created by kakachan on 16/12/16.
 */
let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
const logger  = require('../../libs/logger');

let mongo = require('../../libs/mongo');
let RepoNode = mongo.model('repo_node');
let Common = require('../common/commons');

module.exports = {
    queryInfo,
    createRepoNode,
    queryRepoNodeList
}

function *queryInfo(id) {
    let userInfo = yield RepoNode.findById(id).exec();
    return userInfo;
}

function *queryRepoNodeList(repoId) {
    let queryParam = {
        repo_id : repoId
    };
    let resultPage = yield RepoNode.find(queryParam).exec();

    resultPage = _.invokeMap(resultPage, 'toObject');

    yield Common.fillUserInfo(resultPage);
    
    return resultPage;
}

function *createRepoNode(info) {
    info.status = 0;
    let retInfo = yield RepoNode.create(info);
    return retInfo;
}