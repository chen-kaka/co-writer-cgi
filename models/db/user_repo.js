/**
 * Created by kakachan on 16/12/21.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//用户 -- 仓库 关系表
module.exports = {
    schema: {
        create_at: {type: Date, default: Date.now}, //创建时间
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        repo_id: {type: ObjectId, ref: 'repository'},  //关联仓库表ID
        type: { type: Number, default: 0 }, //该关联的类型 0: 原创  1: 协作  2: follow
        status: { type: Number, default: 0 } //状态 0: 关联中
    },
    options: {
        collection: 'user_repo'
    }
};