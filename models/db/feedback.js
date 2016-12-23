/**
 * Created by kakachan on 16/12/23.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//用户反馈评论
module.exports = {
    schema: {
        create_at: {type: Date, default: Date.now}, //创建时间
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        title: { type: String }, //用户反馈标题
        content: { type: String } //用户反馈
    },
    options: {
        collection: 'feedback'
    }
};