import { IRouterContext } from 'koa-router';

export default async (ctx: IRouterContext) => {
  await ctx.render('pages/about', { title: 'About Page' });
};
