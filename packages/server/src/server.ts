import * as fs from 'fs';
import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as path from 'path';
import koaStatic = require('koa-static');
import koaSend = require('koa-send');
import koaCompress = require('koa-compress');
import koaBodyParser = require('koa-bodyparser');

const appHtml = require('./views/app.html');
const loginHtml = require('./views/login.html');

const STATIC_CONTENT_PATH = '../../client-ember/dist';

const app = new Koa();
const router = new Router();

app.use(koaBodyParser());
app.use(koaCompress());

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = appHtml;
});

app.use(router.routes());

app.listen(4000);
process.stdout.write('Listening on port 4000...');

