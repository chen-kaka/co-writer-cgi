/**
 * Created by kakachan on 16/12/21.
 */

let mongo = require('../../libs/mongo');
let Like = mongo.model('like');

module.exports = {
    query,
    count,
    create
}

function *query(uid, nodeid, like) {
    let param = {};
    if(uid){
        param.u_id = uid;
    }
    if(nodeid){
        param.node_id = nodeid;
    }
    if(like){
        param.like = like;
    }
    let info = yield Like.find(param).exec();

    return info;
}

function *count(uid, nodeid, like) {
    let param = {};
    if(uid){
        param.u_id = uid;
    }
    if(nodeid){
        param.node_id = nodeid;
    }
    if(like){
        param.like = like;
    }
    let info = yield Like.find(param).count().exec();

    return info;
}

function *create(info) {
    let retInfo = yield Like.create(info);
    return retInfo;
}