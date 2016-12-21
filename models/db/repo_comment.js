/**
 * Created by kakachan on 16/12/20.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//用户评论 -- 仓库
module.exports = {
    schema: {
        create_at: {type: Date, default: Date.now}, //创建时间
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        repo_id: {type: ObjectId, ref: 'repository'},  //关联仓库表ID
        title: { type: String }, //用户评论标题
        comment: { type: String } //用户评论
    },
    options: {
        collection: 'repo_comment'
    }
};