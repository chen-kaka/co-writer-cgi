/**
 * Created by kakachan on 16/12/16.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//用户时间线,用于接收更新消息
module.exports = {
    schema: {
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        username: { type: String}, //用户ID
        create_at: {type: Date, default: Date.now}, //创建时间
        last_update: {type: Date}, //最后更新时间
        timeline: Mixed   //时间线
    },
    options: {
        collection: 'user_timeline'
    }
};