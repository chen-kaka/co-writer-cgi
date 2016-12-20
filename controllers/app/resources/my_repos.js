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
let MyRepos = require('../../../service/resources/my_repos');

module.exports = router => {

    /**
     * http://localhost:8900/app/resources/my_repos/list
     */
    router.get('/list', function *() {
        let retJson = yield MyRepos.queryList();
        Commons.formatResp(this, 0, retJson);
    });
}