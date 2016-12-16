/**
 * Created by kakachan on 16/12/15.
 */

let mongo = require('../../libs/mongo');
let User = mongo.model('user');

module.exports = {
    queryInfo,
    createUser
}

function *queryInfo(id) {
    let userInfo = yield User.findById(id).exec();

    // let retJson = {
    //     "id": "42",
    //     "username": "E-Hemingway",
    //     "nickname": "Ernest Miller Hemingway",
    //     "email": "EHemingway@163.com",
    //     "create_at": 1434708544,
    //     "last_login": 1444708544,
    //     "avatar": "http://image.chinawriter.com.cn/2012/0321/U3875P843DT20120321094107.jpg",
    //     "summary": "But man is not made for defeat...A man can be destroyed but not defeated."
    // };

    return userInfo;
}

function *createUser(userInfo) {
    let retInfo = yield User.create(userInfo);
    return retInfo;
}