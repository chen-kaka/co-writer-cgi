/**
 * Created by kakachan on 16/12/20.
 */

let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');
const logger  = require('../../../libs/logger');

let Comment = require('../../../service/comment/comment');

module.exports = router => {

    /**
     * http://localhost:8900/app/comment/comment/query?node_id=5858eeafd99cb10d78051538
     * GET
     */
    router.get('/query', function *() {
        let req = this.request.query;
        let node_id = req.node_id;
        console.log('query node_id: ' + node_id);
        if (!node_id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入id参数。');
        }
        let offset = req.offset || 0;
        let limit = req.limit || 10;
        let retJson = yield Comment.query(node_id, offset, limit);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/comment/comment/create
     * POST
     * {"u_id": "58538dcc9822d109091c1d51","node_id": "5858eeafd99cb10d78051538","title":"title~", "comment": "u sucks"}
     */
    router.post('/create', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            node_id: Joi.string().required(),  //关联仓库节点表ID
            title: Joi.string().required(), //用户评论标题
            comment: Joi.string().required() //用户评论
        });

        let commentInfo;
        try {
            commentInfo = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==commentInfo: " + JSON.stringify(commentInfo));

        let retJson = yield Comment.create(commentInfo);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/comment/comment/query_repo?repo_id=585a1c1a36af130950b1d5be
     * GET
     */
    router.get('/query_repo', function *() {
        let ctx = this;
        let repo_id = ctx.request.query.repo_id;
        console.log('query node_id: ' + repo_id);
        if (!repo_id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入id参数。');
        }

        let retJson = yield Comment.queryRepoComment(repo_id);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/comment/comment/create_repo
     * POST
     * {"u_id": "58538dcc9822d109091c1d51","repo_id": "585a1c1a36af130950b1d5be","title":"title~", "comment": "repo u sucks"}
     */
    router.post('/create_repo', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            repo_id: Joi.string().required(),  //关联仓库节点表ID
            title: Joi.string().required(), //用户评论标题
            comment: Joi.string().required() //用户评论
        });

        let commentInfo;
        try {
            commentInfo = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==commentInfo: " + JSON.stringify(commentInfo));

        let retJson = yield Comment.createRepoComment(commentInfo);
        Commons.formatResp(this, 0, retJson);
    });
}