import * as fs from 'fs';
import * as Koa from 'koa';
import * as Router from 'koa-router';

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import * as path from 'path';
import koaStatic = require('koa-static');
import koaSend = require('koa-send');
import koaCompress = require('koa-compress');
import koaBodyParser = require('koa-bodyparser');
import koaPassport = require('koa-passport');
import koaSessionMinimal = require('koa-session-minimal');

const appHtml = require('./views/app.html');

const STATIC_CONTENT_PATH = '../../client-ember/dist';

const app = new Koa();
const router = new Router();

app.use(koaSessionMinimal());
app.use(koaPassport.initialize());
app.use(koaPassport.session());

app.use(koaBodyParser());
app.use(koaCompress());
// app.use(koaStatic(path.join(__dirname, STATIC_CONTENT_PATH)));

// router.get('/api/whatever', ctx => ctx.body = 'hi from get');
// router.post('/api/whatever', ctx => ctx.body = 'hi from post');
//
// app.use(async (ctx, next) => {
//   ctx.session.count = ctx.session.count || 0;
//   if (ctx.path === '/add') ctx.session.count++;
//
//   await next();
//
//   ctx.body = ctx.session.count;
// });

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = appHtml;
});

app.use(router.routes());

app.listen(4000);
process.stdout.write('Listening on port 4000...');

const fetchUser = (() => {
  const user = {id: 1, username: 'test', password: 'test'};
  return async () => user;
})();

koaPassport.serializeUser((user, done) => done(null, user.id));

koaPassport.deserializeUser(async (id, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

koaPassport.use(new LocalStrategy(
  (username, password, done) => {
    fetchUser()
    .then(user => {
      if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err));
  }));

koaPassport.use(new FacebookStrategy({
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback',
    clientID: 'your-client-id',
    clientSecret: 'your-secret'
  }, (token, tokenSecret, profile, done) => {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
  }
))
;
