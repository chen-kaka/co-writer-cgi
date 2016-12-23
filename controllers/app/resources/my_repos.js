/**
 * Created by kakachan on 16/12/14.
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
     * http://localhost:8900/app/resources/my_repos/list?u_id=58538dcc9822d109091c1d51&queryStr=&offset=0&limit=10
     */
    router.get('/list', function *() {

        let req = this.request.query;
        let queryStr = req.queryStr || '';
        let u_id = req.u_id;
        console.log('query u_id: ' + u_id);
        if (!u_id) {
            return Commons.formatResp(this, ERR.ParamError.code, '请输入u_id参数。');
        }
        let offset = req.offset || 0;
        let limit = req.limit || 10;
        
        let retJson = yield Repository.queryMyRepos(u_id, queryStr, offset, limit);
        Commons.formatResp(this, 0, retJson);
    });
}