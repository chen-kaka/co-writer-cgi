/**
 * Created by kakachan on 16/12/15.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//用户信息
module.exports = {
    schema: {
        username: { type: String, index:true, unique: true}, //用户ID
        name: { type: String }, //用户姓名
        sex: { type: Number },  //性别 0 未知 1 男 2 女
        nickname: { type: String },  //昵称
        birthday: { type: Date },  //年龄
        email: { type: String }, //email
        create_at: {type: Date, default: Date.now}, //创建时间
        last_update: {type: Date, default: Date.now}, //最后登录时间
        last_login: {type: Date, default: Date.now}, //最后更新时间
        avatar: {type: String }, //用户头像
        summary: {type: String } //用户个人介绍
    },
    options: {
        collection: 'user'
    }
};

/*

db.user.insert({"username": "E-Hemingway",
    "nickname": "Ernest Miller Hemingway",
        "email": "EHemingway@163.com",
        "birthday":"2000-10-10",
        "last_login": 1444708544,
        "avatar": "http://image.chinawriter.com.cn/2012/0321/U3875P843DT20120321094107.jpg",
        "summary": "But man is not made for defeat...A man can be destroyed but not defeated."
});

*/