/**
 * Created by kakachan on 16/12/14.
 */

const logger  = require('../../../libs/logger');
let ShareRepos = require('../../../service/resources/share_repos');

module.exports = router => {

    /**
     * http://localhost:8900/app/resources/share_repos/list
     */
    router.get('/list', function *() {
        let retJson = yield ShareRepos.queryList();
        this.rsp = {
            "err_code": 0,
            "err_msg": "success",
            "data": retJson
        };
    });
}