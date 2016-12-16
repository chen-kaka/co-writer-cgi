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
        nickname: { type: String },  //昵称
        age: { type: Number },  //年龄
        email: { type: String }, //email
        create_at: {type: Date, default: Date.now}, //创建时间
        last_update: {type: Date}, //最后更新时间
    },
    options: {
        collection: 'user'
    }
};