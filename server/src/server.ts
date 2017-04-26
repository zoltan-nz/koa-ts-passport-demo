import * as Koa from 'koa';

import * as koaBodyParser from 'koa-bodyparser';
import * as koaCompress from 'koa-compress';
import * as koaHbs from 'koa-hbs';

import * as koaStatic from 'koa-static';

import * as path from 'path';

import routes from './routes';

const app = new Koa();

app
  .use(koaCompress()) // HTTP compression
  .use(koaBodyParser())
  .use(koaStatic(`./build/public`, { maxage: 1000 * 60 * 60 })) // 1 hour browser cache

  .use(koaHbs.middleware({
    defaultLayout: 'default',
    layoutsPath:   path.resolve(__dirname, 'templates/layout'),
    partialsPath:  [
      path.resolve(__dirname, 'templates/layout/partials'),
      path.resolve(__dirname, 'templates/pages/partials')
    ],
    viewPath:      path.resolve(__dirname, 'templates')
  }))
  .use(routes)
  .listen(process.env.PORT || 4000);

process.stdout.write(`${process.version} Listening on port ${process.env.PORT || 4000}`);
