/**
 * Created by kakachan on 16/12/14.
 */


const logger  = require('../../../libs/logger');
let Like = require('../../../service/user/like');
let RepoLike = require('../../../service/user/repo_like');
let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');

module.exports = router => {

    /**
     * http://localhost:8900/app/user/user_like/list?uid=58538dcc9822d109091c1d51&nodeid=5858eeafd99cb10d78051538&like=0
     * GET
     */
    router.get('/list', function *() {
        let ctx = this;
        let uid = ctx.request.query.uid;
        let nodeid = ctx.request.query.nodeid;
        let like = ctx.request.query.like;
        console.log('nodeid: ' + nodeid + ", uid: " + uid + "like: " + like);
        if (!nodeid && !uid) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入uid或者nodeid参数。');
        }

        let retJson = yield Like.query(uid, nodeid, like);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_like/save
     * POST
     *
     {"u_id": "58538dcc9822d109091c1d51","node_id": "5858eeafd99cb10d78051538", "like":0}
     */
    router.post('/save', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            node_id: Joi.string().required(),  //关联仓库节点表ID
            like: Joi.number().required(), //喜欢  0:喜欢 1: 不喜欢
        });

        let info;
        try {
            info = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==info: " + JSON.stringify(info));

        let retJson = yield Like.create(info);
        Commons.formatResp(ctx, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_like/repo_list?uid=58538dcc9822d109091c1d51&nodeid=5858eeafd99cb10d78051538&like=0
     * GET
     */
    router.get('/repo_list', function *() {
        let ctx = this;
        let uid = ctx.request.query.uid;
        let repo_id = ctx.request.query.repo_id;
        let like = ctx.request.query.like;
        console.log('repo_id: ' + repo_id + ", uid: " + uid + "like: " + like);
        if (!repo_id && !uid) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入uid或者repo_id参数。');
        }

        let retJson = yield RepoLike.query(uid, repo_id, like);
        Commons.formatResp(this, 0, retJson);
    });

    /**
     * http://localhost:8900/app/user/user_like/repo_save
     * POST
     *
     {"u_id": "58538dcc9822d109091c1d51","repo_id": "5853a83f16480c0ace8a9263", "like":0}
     */
    router.post('/repo_save', function *() {
        let ctx        = this;
        let paramSchema = Joi.object().keys({
            u_id: Joi.string().required(),  //关联用户表ID
            repo_id: Joi.string().required(),  //关联仓库节点表ID
            like: Joi.number().required(), //喜欢  0:喜欢 1: 不喜欢
        });

        let info;
        try {
            info = yield JoiValidatePromise(ctx.request.body, paramSchema, {allowUnknown: true});
        } catch (err) {
            return Commons.formatResp(ctx, err, ERR.ParamError.code, err.toString());
        }

        logger.debug("==info: " + JSON.stringify(info));

        let retJson = yield RepoLike.create(info);
        Commons.formatResp(ctx, 0, retJson);
    });
}