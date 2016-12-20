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

let RepoNode = require('../../../service/resources/repo_node');

module.exports = router => {

    /**
     * http://localhost:8900/app/resources/repo_node/query?repo_id=5853a83f16480c0ace8a9263
     */
    router.get('/query', function *() {
        let ctx = this;
        let repo_id = ctx.request.query.repo_id;
        if (!repo_id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入repo_id参数。');
        }

        let retJson = yield RepoNode.queryRepoNodeList(repo_id);
        Commons.formatResp(this, 0, retJson);
    });
    
    /**
     * http://localhost:8900/app/resources/repo_node/create
     * POST
     {"name":"my repo","creator":"kakachan","u_id":"58538dcc9822d109091c1d51","repo_id":"5853a83f16480c0ace8a9263"
     ,"description":"my repo node description.", level: 1, type: 1, content:{"text": "my repo node text"}}
     */
    router.post('/create', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            name: Joi.string().required(),
            creator: Joi.string().required(),
            u_id: Joi.string().required(),
            repo_id: Joi.string().required(),
            description: Joi.string().optional(),
            level: Joi.number().optional(),
            type: Joi.number().optional(),
            content: Joi.object().optional(),
        });

        console.log("==create ctx.request.body: " + JSON.stringify(ctx.request.body));
        let saveInfo;
        try {
            saveInfo = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==saveInfo: " + JSON.stringify(saveInfo));

        let retJson = yield RepoNode.createRepoNode(saveInfo);
        Commons.formatResp(ctx, 0, retJson);
    });
}