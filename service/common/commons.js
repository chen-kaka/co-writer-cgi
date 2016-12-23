/**
 * Created by kakachan on 16/12/22.
 */

let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
let ERR             = require('../../libs/errors');
const logger  = require('../../libs/logger');

let UserInfo = require('../user/user_info');
let Like = require('../user/like');
let RepoLike = require('../user/repo_like');

module.exports = {
    fillUserInfo,
    fillRepoLikesInfo,
    fillNodeLikesInfo
}

const DEFAULT_AVATAR = 'http://img.zcool.cn/community/0116a357b569550000018c1bb34234.png';

function *fillUserInfo(resultPage) {
    if(resultPage) {
        for (var i = 0, item; (item = resultPage[i]) != null; i++){
            //组装用户信息
            let userInfo = yield UserInfo.queryInfo(item.u_id);
            if(userInfo){
                item.nickname = userInfo.nickname;
                item.username = userInfo.username;
                item.avatar = userInfo.avatar || DEFAULT_AVATAR;
            }
            // console.log("item: " + JSON.stringify(item));
        }
    }
}

function *fillRepoLikesInfo(resultPage, countUser, countRepo){
    if(resultPage) {
        for (var i = 0, item; (item = resultPage[i]) != null; i++){
            //组装用户点赞信息
            let u_id, repo_id;
            if(countUser){
                u_id = item.u_id;
            }
            if(countRepo){
                repo_id = item._id;
            }
            console.log("===u_id: " + u_id + ", repo_id: " + repo_id);
            let count = yield RepoLike.count(u_id, repo_id);
            console.log("fillRepoLikesInfo count: " + JSON.stringify(count));
            item.likes = count || 0;
        }
    }
}

function *fillNodeLikesInfo(resultPage, countUser, countRepo){
    if(resultPage) {
        for (var i = 0, item; (item = resultPage[i]) != null; i++){
            //组装用户点赞信息
            let u_id, repo_id;
            if(countUser){
                u_id = item.u_id;
            }
            if(countRepo){
                repo_id = item._id;
            }
            let count = Like.count(u_id, repo_id);

            item.likes = count || 0;
        }
    }
}