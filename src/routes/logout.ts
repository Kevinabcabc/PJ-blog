
import { Context}  from 'koa';
let logoutRouter =  require('koa-router')();
import {Session}  from 'koa-session'

logoutRouter.get('/logout', async (ctx: Context) => { 
    let userSession = ctx.session as Session;    
    userSession.username = '';
    ctx.redirect('/');
})

export default logoutRouter;
