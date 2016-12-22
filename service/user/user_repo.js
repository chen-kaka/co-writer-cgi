/**
 * Created by kakachan on 16/12/21.
 */

let mongo = require('../../libs/mongo');
let UserRepo = mongo.model('user_repo');

module.exports = {
    query,
    create
}

function *query(uid, repoid) {
    let param = {};
    if(uid){
        param.u_id = uid;
    }
    if(repoid){
        param.repo_id = repoid;
    }
    let info = yield UserRepo.find(param).exec();

    return info;
}

function *create(info) {
    let retInfo = yield UserRepo.create(info);
    return retInfo;
}