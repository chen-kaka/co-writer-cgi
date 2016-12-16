/**
 * Created by kakachan on 16/12/15.
 */

module.exports = {
    queryInfo
}

function *queryInfo() {
    let retJson = {
        "id": "42",
        "username": "E-Hemingway",
        "nickname": "Ernest Miller Hemingway",
        "email": "EHemingway@163.com",
        "create_at": 1434708544,
        "last_login": 1444708544,
        "avatar": "http://image.chinawriter.com.cn/2012/0321/U3875P843DT20120321094107.jpg",
        "summary": "But man is not made for defeat...A man can be destroyed but not defeated."
    };

    return retJson;
}