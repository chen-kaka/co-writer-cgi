/**
 * Created by kakachan on 16/12/12.
 */

let _           = require('lodash');
let Joi         = require('joi');
const Promise = require('bluebird');
let JoiValidatePromise = Promise.promisify(Joi.validate);
let Commons = require('../../../middlewares/commons');
let ERR             = require('../../../libs/errors');
const logger  = require('../../../libs/logger');

let Recommend = require('../../../service/indexpage/recommend');

module.exports = router => {

    /**
     * http://localhost:8900/app/indexpage/recommend/news?queryStr=&offset=0&limit=10
     */
    router.get('/news', function *() {
        let req = this.request.query;
        let queryStr = req.queryStr || '';
        let offset = req.offset || 0;
        let limit = req.limit || 10;
        let retJson = yield Recommend.queryNews(queryStr, offset, limit);

        Commons.formatResp(this, 0, retJson);
    });
}