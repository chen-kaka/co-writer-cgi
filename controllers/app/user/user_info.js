/**
 * Created by kakachan on 16/12/14.
 */


const logger  = require('../../../libs/logger');
let UserInfo = require('../../../service/user/user_info');

module.exports = router => {

    /**
     * http://localhost:8900/app/user/user_info/info
     */
    router.get('/info', function *() {
        let retJson = yield UserInfo.queryInfo();
        this.rsp = {
            "err_code": 0,
            "err_msg": "success",
            "data": retJson
        };
    });
}