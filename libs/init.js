const Joi = require('joi');
const Errors = require('./errors');
const _ = require('lodash');

/**
 * [validateThrow 如果校验失败，throw error，如果成功，返回转换后的数据]
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
Joi.validateThrow = function() {
  let result = Joi.validate.apply(Joi, arguments);
  let err = result.error;
  if (err) {
    err.rspBody = _.extend({}, Errors.ParamError, {
      msg: result.error.message
    });
    throw err;
  } else {
    return result.value;
  }
};
