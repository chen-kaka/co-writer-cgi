/**
 * Created by kakachan on 16/12/16.
 */

let mongo = require('../../libs/mongo');
let RepoNode = mongo.model('repo_node');

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
    let userInfo = yield RepoNode.find(queryParam).exec();
    return userInfo;
}

function *createRepoNode(info) {
    info.status = 0;
    let retInfo = yield RepoNode.create(info);
    return retInfo;
}