/**
 * Created by kakachan on 16/12/20.
 */

let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
const logger  = require('../../libs/logger');

let mongo = require('../../libs/mongo');
let Comment = mongo.model('comment');
let UserInfo = require('../user/user_info');

module.exports = {
    query,
    create
}

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

function *create(commentInfo) {
    let retInfo = yield Comment.create(commentInfo);
    return retInfo;
}