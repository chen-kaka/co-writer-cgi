/**
 * Created by kakachan on 16/12/15.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//repository
module.exports = {
    schema: {
        name: { type: String }, //仓库名称
        creator: {type: String},  //创建人
        create_at: {type: Date, default: Date.now}, //创建时间
        last_update: {type: Date}, //最后更新时间
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        description: {type: String}, //仓库描述
    },
    options: {
        collection: 'repository'
    }
};