require('./libs/init');
const logger = require('./libs/logger');
const koa    = require('koa');
const app    = module.exports = koa();
const config = require('./config');

process.on('uncaughtException',function () {
  console.log('----uncaughtException----');
  console.dir(arguments);
  console.log('-------------------------');
});

app.on('error', function (err, ctx) {
  logger.error('server error, %j', err, err);
});

// request id
const instanceMark = Math.random().toString(36).substr(2, 6);
var globalReqId = 0;
app.use(function *(next) {
  this.reqId = [instanceMark, globalReqId++].join('.');
  yield next;
});


// body parser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// helmet
const helmet = require('koa-helmet');
app.use(helmet());

const visitlog = require('./middlewares/visitlog');
app.use(visitlog);

// 响应数据格式统一处理
const response = require('./middlewares/response');
app.use(response);

var session = require('koa-session');
app.keys = ['co-writer'];
app.use(session(app));

// 路由
const routers = require('./middlewares/routes')('controllers');
routers.forEach(router => {
  app.use(router.routes());
});

// 压缩
const compress = require('koa-compress');
app.use(compress());

if (!module.parent) {
  let port = process.env.PORT || 8900;
  app.listen(port);
  console.log('listening on port ' + port);
}
