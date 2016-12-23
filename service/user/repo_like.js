/**
 * Created by kakachan on 16/12/23.
 */

let mongo = require('../../libs/mongo');
let RepoLike = mongo.model('repo_like');

module.exports = {
    query,
    count,
    create
}

function *query(uid, repo_id, like) {
    let param = {};
    if(uid){
        param.u_id = uid;
    }
    if(nodeid){
        param.repo_id = repo_id;
    }
    if(like){
        param.like = like;
    }
    let info = yield RepoLike.find(param).exec();

    return info;
}

function *count(uid, repo_id, like) {
    let param = {};
    if(uid){
        param.u_id = uid;
    }
    if(repo_id){
        param.repo_id = repo_id;
    }
    if(like){
        param.like = like;
    }
    console.log("RepoLike param: " + JSON.stringify(param));
    let info = yield RepoLike.find(param).count().exec();

    return info;
}

function *create(info) {
    let retInfo = yield RepoLike.create(info);
    return retInfo;
}