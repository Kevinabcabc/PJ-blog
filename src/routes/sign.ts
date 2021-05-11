
import { Context } from 'koa';
let signRouter =  require('koa-router')();

import Author from '../db/model/author';

signRouter
    .get('/sign', async (ctx: Context) => {
        await ctx.render('sign',{
                message: ''
        });

    })
    .post('/sign', async (ctx: Context) => {
        const {name, password, confirm} = ctx.request.body;
        let message = '';
        if(password === confirm && password.length >= 6) {
            let author = new Author({
                authorName: name,
                authorPassword: password
            })
            try {
                let user= await Author.find({authorName:name});
                // 取回的值是一个数组类型，空数组会通过判断，为了让空数组不通过取长度判断
                if(user.length) {
                    message = '该用户名已经存在！';
                } else {
                    await author.save();
                    message = '注册成功！';
                }   
            } catch(error) {
                console.log(`sign is error: ${error}`);
            }
        } 
        if(password === confirm && password.length < 6) {
            message = '密码必须大于6位！';
        }
        if(password !== confirm) {
            message = '两次密码输入不一致！';
        }
        await ctx.render('sign',{
            message: message
        });
    })
 
    
export default signRouter;

