/**
 * Created by kakachan on 16/12/16.
 */

let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
let ERR             = require('../../libs/errors');
const logger  = require('../../libs/logger');

let mongo = require('../../libs/mongo');
let Repository = mongo.model('repository');
let Common = require('../common/commons');

module.exports = {
    queryInfo,
    createRepo,
    queryMyRepos
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

function *queryMyRepos(uid, queryStr, offset, limit) {
    offset = Math.abs(parseInt(offset, 10)) || 0;
    limit = Math.abs(parseInt(limit, 10)) || 10;
    limit = limit > 100 ? 100 : Math.abs(limit);
    let queryParam = {
        u_id : uid
    };

    if(queryStr) {
        queryParam.name = new RegExp(queryStr);
    }

    let resultPage = yield Repository.find(queryParam)
        .sort({create_at: -1})
        .skip(offset)
        .limit(limit)
        .exec();

    resultPage = _.invokeMap(resultPage, 'toObject');

    if(resultPage) {
        for (var i = 0, item; (item = resultPage[i]) != null; i++){
            item.text = item.description;
            delete item.description;

            let createTime = item.created_at || new Date();
            let created_at = createTime.getTime() / 1000;
            item.created_at = created_at;
        }
    }

    yield Common.fillUserInfo(resultPage);
    yield Common.fillRepoLikesInfo(resultPage, false, true);
    return resultPage;
}