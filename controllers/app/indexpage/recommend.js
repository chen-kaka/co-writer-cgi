/**
 * Created by kakachan on 16/12/12.
 */

const logger  = require('../../../libs/logger');
let Recommend = require('../../../service/indexpage/recommend');

module.exports = router => {

    /**
     * http://localhost:8900/app/indexpage/recommend/news
     */
    router.get('/news', function *() {
        let retJson = yield Recommend.queryNews();

        this.rsp = {
            "err_code": 0,
            "err_msg": "success",
            "data": retJson
        };
    });
}