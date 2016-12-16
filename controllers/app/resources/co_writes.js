/**
 * Created by kakachan on 16/12/14.
 */

const logger  = require('../../../libs/logger');
let CoWrites = require('../../../service/resources/co_writes');

module.exports = router => {

    /**
     * http://localhost:8900/app/resources/co_writes/list
     */
    router.get('/list', function *() {
        let retJson = yield CoWrites.queryList();
        this.rsp = {
            "err_code": 0,
            "err_msg": "success",
            "data": retJson
        };
    });
}