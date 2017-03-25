import * as Koa from 'koa';
import * as Router from 'koa-router';
import koaStatic = require('koa-static');
import koaSend = require('koa-send');
import koaCompress = require('koa-compress');
import koaBodyParser = require('koa-bodyparser');
import * as Handlebars from 'handlebars';

const STATIC_CONTENT_PATH = './public';

const app    = new Koa();
const router = new Router();

const indexTemplate = require('./views/index.hbs');

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = indexTemplate({title: 'Hello World'});
});

app
  .use(koaBodyParser())
  .use(koaCompress())
  .use(router.routes())
  .use(koaStatic(`${__dirname}/public`))
  .listen(4000);

process.stdout.write('Listening on port 4000...');
