/**
 * Created by kakachan on 16/12/14.
 */


const logger  = require('../../../libs/logger');
let UserFeedback = require('../../../service/user/user_feedback');
let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');

module.exports = router => {

    /**
     * http://localhost:8900/app/user/user_feedback/list?uid=58538dcc9822d109091c1d51
     * GET
     */
    router.get('/list', function *() {
        let ctx = this;
        let uid = ctx.request.query.uid;
        console.log("uid: " + uid);
        if (!uid) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入uid参数。');
        }

        let retJson = yield UserFeedback.query(uid);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_feedback/create
     * POST
     *
     {"u_id": "58538dcc9822d109091c1d51","title":"feedback title~", "content": "this app is awsome!"}
     */
    router.post('/create', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            title: Joi.string().required(), //用户反馈标题
            content: Joi.string().required() //用户反馈
        });

        let info;
        try {
            info = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==info: " + JSON.stringify(info));

        let retJson = yield UserFeedback.create(info);
        Commons.formatResp(ctx, 0, retJson);
    });
}