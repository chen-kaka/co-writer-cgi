/**
 * Created by kakachan on 16/12/14.
 */


const logger  = require('../../../libs/logger');
let UserRepo = require('../../../service/user/user_repo');
let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');

module.exports = router => {

    /**
     * http://localhost:8900/app/user/user_repo/list?uid=58538dcc9822d109091c1d51&repoid=5853a83f16480c0ace8a9263
     * GET
     */
    router.get('/list', function *() {
        let ctx = this;
        let uid = ctx.request.query.uid;
        let repoid = ctx.request.query.repoid;
        console.log('repoid: ' + repoid + ", uid: " + uid);
        if (!repoid && !uid) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入uid或者repoid参数。');
        }

        let retJson = yield UserRepo.query(uid, repoid);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_repo/link
     * POST
     *
     {"u_id": "58538dcc9822d109091c1d51","repo_id": "5853a83f16480c0ace8a9263","type":0}
     */
    router.post('/link', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            repo_id: Joi.string().required(),  //关联仓库节点表ID
            type: Joi.number().optional()
        });

        let info;
        try {
            info = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==info: " + JSON.stringify(info));

        let retJson = yield UserRepo.create(info);
        Commons.formatResp(ctx, 0, retJson);
    });
}