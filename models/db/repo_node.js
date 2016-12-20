/**
 * Created by kakachan on 16/12/15.
 */

'use strict';

let mongoose = require('mongoose');
let Schema   = require('mongoose').Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let Mixed    = mongoose.Schema.Types.Mixed;

//仓库节点
module.exports = {
    schema: {
        name: { type: String }, //仓库名称
        creator: {type: String},  //创建人
        create_at: {type: Date, default: Date.now}, //创建时间
        repo_id: {type: ObjectId, ref: 'repository'},  //关联仓库表ID
        u_id: {type: ObjectId, ref: 'user'},  //关联用户表ID
        description: { type: String }, //节点说明
        level: {type: Number}, //层级
        node_list: Mixed,      //节点列表
        front_node: {type: ObjectId},
        type: {type: Number},  //节点类型
        content: Mixed, //存储内容
    },
    options: {
        collection: 'repo_node'
    }
};