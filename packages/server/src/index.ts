import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';
import serve = require('koa-static');

import send = require('koa-send');
import compress = require('koa-compress');

import bodyParser = require('koa-bodyparser');
import passport = require('koa-passport');
import session = require('koa-session-minimal');

const STATIC_CONTENT_PATH = '../../client-ember/dist';

const app = new Koa();
const router = new Router();

app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser());
app.use(compress());
app.use(serve(path.join(__dirname, STATIC_CONTENT_PATH)));

// rest endpoints
router.get('/api/whatever', ctx => ctx.body = 'hi from get');
router.post('/api/whatever', ctx => ctx.body = 'hi from post');

app.use(async (ctx, next) => {
  ctx.session.count = ctx.session.count || 0;
  if (ctx.path === '/add') ctx.session.count++;

  await next();

  ctx.body = ctx.session.count;
});

app.use(router.routes());

app.listen(4000);
console.log('Listening on port 4000...');
