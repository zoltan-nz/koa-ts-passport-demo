import * as Koa from 'koa';
import * as hbs from 'koa-hbs';
import * as Router from 'koa-router';

import koaStatic = require('koa-static');

import koaCompress = require('koa-compress');
import koaBodyParser = require('koa-bodyparser');

const app    = new Koa();
const router = new Router();

router.get('/', async ctx => {
  await ctx.render('pages/home', { title: 'hello world' });
});

app
  .use(koaCompress()) // HTTP compression
  .use(koaBodyParser())
  .use(koaStatic(`./build/public`, { maxage: 1000 * 60 * 60 })) // 1 hour browser cache

  .use(hbs.middleware({
    defaultLayout: 'default',
    layoutsPath:   `${__dirname}/templates/layout`,
    partialsPath:  [`${__dirname}/templates/layout/partials`, `${__dirname}./templates/pages/partials`],
    viewPath:      `${__dirname}/templates`
  }))
  .use(router.routes())
  .listen(process.env.PORT || 4000);

process.stdout.write(`${process.version} Listening on port ${process.env.PORT || 4000}`);
