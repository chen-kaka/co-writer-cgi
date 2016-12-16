const Errors = require('../libs/errors');
const _ = require('lodash');

module.exports = function*(next) {
  try {
    yield next;
    //h5 跨域
    this.set("Access-Control-Allow-Origin", "*");
    if(this.rsp) {
      this.body = this.rsp;
    }
  }
  catch(err) {
    if (err == null) {
      err = new Error(Errors.UnknownError.msg);
    }
    else if(_.isString(err)) {
      err = new Error(err);
    }
    this.type = 'application/json';
    if(err.rsp) {
      this.status = 200;
      this.body = err.rsp;
    } else {
      this.status = err.status || 500;
      this.body = this.rsp = {
        err_code: Errors.UnknownError.code,
        err_msg: err.message
      }
    }
  }
}
