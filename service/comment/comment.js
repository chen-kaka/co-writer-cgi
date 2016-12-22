/**
 * Created by kakachan on 16/12/20.
 */

let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
const logger  = require('../../libs/logger');

let mongo = require('../../libs/mongo');
let Comment = mongo.model('comment');
let RepoComment = mongo.model('repo_comment');
let UserInfo = require('../user/user_info');

let Common = require('../common/commons');

module.exports = {
    query,
    create,
    queryRepoComment,
    createRepoComment
}

/**
 * 用户评论
 * @param nodeId
 * @param offset
 * @param limit
 * @returns {*}
 */
function *query(nodeId, offset, limit) {
    offset = Math.abs(parseInt(offset, 10)) || 0;
    limit = Math.abs(parseInt(limit, 10)) || 10;
    limit = limit > 100 ? 100 : Math.abs(limit);
    let queryParam = {
        node_id : nodeId
    };
    let resultPage = yield Comment.find(queryParam)
        .sort({create_at: -1})
        .skip(offset)
        .limit(limit)
        .exec();

    resultPage = _.invokeMap(resultPage, 'toObject');

    if(resultPage) {
        for (var i = 0, item; (item = resultPage[i]) != null; i++){
            //组装用户信息
            let userInfo = yield UserInfo.queryInfo(item.u_id);
            if(userInfo){
                item.nickname = userInfo.nickname;
                item.username = userInfo.username;
                item.avatar = userInfo.avatar || DEFAULT_AVATAR;
            }
        }
    }

    return resultPage;
}

/**
 * 创建用户节点评论
 * @param commentInfo
 * @returns {*}
 */
function *create(commentInfo) {
    let retInfo = yield Comment.create(commentInfo);
    return retInfo;
}

/**
 * repo评论查询
 * @param nodeId
 * @param offset
 * @param limit
 * @returns {*}
 */
function *queryRepoComment(nodeId, offset, limit) {
    offset = Math.abs(parseInt(offset, 10)) || 0;
    limit = Math.abs(parseInt(limit, 10)) || 10;
    limit = limit > 100 ? 100 : Math.abs(limit);
    let queryParam = {
        repo_id : nodeId
    };
    let resultPage = yield RepoComment.find(queryParam)
        .sort({create_at: -1})
        .skip(offset)
        .limit(limit)
        .exec();

    resultPage = _.invokeMap(resultPage, 'toObject');

    yield Common.fillUserInfo(resultPage);

    return resultPage;
}

/**
 * 创建repo评论
 * @param commentInfo
 * @returns {*}
 */
function *createRepoComment(commentInfo) {
    let retInfo = yield RepoComment.create(commentInfo);
    return retInfo;
}