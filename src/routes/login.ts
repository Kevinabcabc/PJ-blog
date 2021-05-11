// src/routes/login.ts
import { Context}  from 'koa';
let loginRouter =  require('koa-router')();
import {Session}  from 'koa-session'

import Author from '../db/model/author';


loginRouter
    .get('/login', async (ctx: Context) => {
        await ctx.render('login',{
                message: '',
                user: ctx.session?.username
        }) 
    })
    .post('/login', async (ctx:Context) => {
        const {name, password} = ctx.request.body;
        let message = '';
        let userSession = ctx.session as Session;    // 这里由于koa定义session的类型为Session | null 因此要使用类型断言才能赋值
        userSession.username = '';
        try {
            let user = await Author.findOne({authorName:name});
            if(user?.authorPassword === password) {
                userSession.username = name;
                ctx.redirect('/');
            }
            else if(!user) {    
                message = '用户名不存在！'
            } 
            else {  
                message = '密码输入错误！'
            }
            await await ctx.render('login',{
                message: message,
                user: ctx.session?.username
            });
        } catch(error) {
            throw new Error(`Login error：${error} `)
        }
    })

export default loginRouter;
