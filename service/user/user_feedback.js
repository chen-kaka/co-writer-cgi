/**
 * Created by kakachan on 16/12/23.
 */

let mongo = require('../../libs/mongo');
let Feedback = mongo.model('feedback');

module.exports = {
    query,
    create
}

function *query(uid) {
    let param = {
        u_id : uid
    };
    let info = yield Feedback.find(param).exec();

    return info;
}

function *create(info) {
    let retInfo = yield Feedback.create(info);
    return retInfo;
}