/**
 * Created by kakachan on 16/12/16.
 */

let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');
const logger  = require('../../../libs/logger');

let Repository = require('../../../service/resources/repository');

module.exports = router => {

    /**
     * http://localhost:8900/app/resources/repository/query?id=5853a83f16480c0ace8a9263
     */
    router.get('/query', function *() {
        let ctx = this;
        let id = ctx.request.query.id;
        if (!id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入id参数。');
        }

        let retJson = yield Repository.queryInfo(id);
        Commons.formatResp(this, 0, retJson);
    });
    
    /**
     * http://localhost:8900/app/resources/repository/create
     * POST
     {"name":"my repo","creator":"kakachan","u_id":"58538dcc9822d109091c1d51","description":"my test repo."}
     */
    router.post('/create', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            name: Joi.string().required(),
            creator: Joi.string().required(),
            u_id: Joi.string().required(),
            description: Joi.string().optional(),
            type: Joi.number().optional()
        });

        console.log("==create ctx.request.body: " + JSON.stringify(ctx.request.body));
        let saveInfo;
        try {
            saveInfo = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==saveInfo: " + JSON.stringify(saveInfo));

        let retJson = yield Repository.createRepo(saveInfo);
        Commons.formatResp(ctx, 0, retJson);
    });
}