
import { Context } from 'koa';
let modifyRouter =  require('koa-router')();

import Article from '../db/model/article';

modifyRouter.
    get('/modify/:articleID', async (ctx: Context) => {
        let articleID =  ctx.params.articleID;
        try {
            let article = await Article.findById(articleID);
            await ctx.render('modify', {
                article: article,
                user: ctx.session?.username
            })
        } catch(error) {
            throw new Error(`An error occurred while modifying the article:${error}`);
        }
    })

    .post('/modify/:articleID', async (ctx: Context) => {
        let articleID =  ctx.params.articleID;
        const {title, content} = ctx.request.body;
        try {
            await Article.updateOne({_id: articleID}, {$set:{articleTitle: title, articleContent: content}});
            ctx.redirect('/');
            
        } catch(error) {
            throw new Error(`An error occurred while modifying the article:${error}`);
        }
    })

export default modifyRouter;
