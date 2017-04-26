import * as koaRouter from 'koa-router';

import about from './controllers/about';
import index from './controllers/index';

const router = new koaRouter();

router.get('/', index);
router.get('/about', about);

export default router.routes();
