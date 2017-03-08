import * as Koa from 'koa';
import serve = require('koa-static');
import * as path from 'path';

import send = require('koa-send');
import * as Router from 'koa-router';
import compress = require('koa-compress');

const STATIC_CONTENT_PATH = '../../client/build';

const app = new Koa();
const router = new Router();

app.use(compress());
app.use(serve(path.join(__dirname, STATIC_CONTENT_PATH)));

// rest endpoints
router.get('/api/whatever', ctx => ctx.body = 'hi from get');
router.post('/api/whatever', ctx => ctx.body = 'hi from post');

app.use(router.routes());

app.listen(4000);
console.log('Listening on port 4000...');
