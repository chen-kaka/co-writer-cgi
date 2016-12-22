/**
 * Created by kakachan on 16/12/22.
 */

let _           = require('lodash');
let Joi         = require('joi');
let Commons = require('../../middlewares/commons');
let ERR             = require('../../libs/errors');
const logger  = require('../../libs/logger');

let UserInfo = require('../user/user_info');

module.exports = {
    fillUserInfo
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
            console.log("item: " + JSON.stringify(item));
        }
    }
}
