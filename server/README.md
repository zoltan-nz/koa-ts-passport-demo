# Server - API only

## Run server

Run following commands separately:

```shell
$ cd server
$ npm run watch:build
$ npm run watch:server
$ open http://localhost:4000
```

Core:

* typescript
* koa.js

More middleware:

```
koa-static
koa-onerror
koa-logger
koa-json
debug

```



NPM script tasks:

* Compile TypeScript with `tsc`, save in `./dist`
* Copy `hsb` files with `gulp`, watch when content changed, copy them in `./dist/templates`
* Compile `scss` files with `gulp` copy them in `./dist/public/styles`
* Copy `./public` files in `./dist/public`



Gulp tasks:

* Run `tsc`
* Copy `hsb`
* Compile and copy `scss`
* Copy `./public` in `./dist/public`
* Watch changes in `./src`, `./public`, `./templates`, `./styles`

https://www.terlici.com/2014/08/25/best-practices-express-structure.html
https://github.com/terlici/base-express
