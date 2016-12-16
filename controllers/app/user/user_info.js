/**
 * Created by kakachan on 16/12/14.
 */


const logger  = require('../../../libs/logger');
let UserInfo = require('../../../service/user/user_info');
let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');

module.exports = router => {

    /**
     * http://localhost:8900/app/user/user_info/info?id=58538dcc9822d109091c1d51
     * GET
     */
    router.get('/info', function *() {
        let ctx = this;
        let id = ctx.request.query.id || '58538dcc9822d109091c1d51';
        if (!id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入id参数。');
        }
        
        let retJson = yield UserInfo.queryInfo(id);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_info/save
     * POST
     *
     {"username": "E-Hemingway","nickname": "Ernest Miller Hemingway","email": "EHemingway@163.com","birthday":"2000-10-10",
        "last_login": 1444708544,"avatar": "http://image.chinawriter.com.cn/2012/0321/U3875P843DT20120321094107.jpg",
        "summary": "But man is not made for defeat...A man can be destroyed but not defeated."}
     */
    router.post('/save', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            username: Joi.string().required(),
            name: Joi.string().optional(),
            sex: Joi.number().optional(),
            nickname: Joi.string().optional(),
            birthday: Joi.date().format('YYYY-MM-DD').optional(),
            email: Joi.string().email().optional(),
            avatar: Joi.string().optional(),
            summary: Joi.string().optional()
        });

        let userInfo;
        try {
            userInfo = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==userInfo: " + JSON.stringify(userInfo));

        let retJson = yield UserInfo.createUser(userInfo);
        Commons.formatResp(ctx, 0, retJson);
    });
}