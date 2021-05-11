
import { Context } from 'koa';
let articlesRouter =  require('koa-router')();

import Article from '../db/model/article';


articlesRouter
    .get('/articles/:articleID', async (ctx: Context) => {
        let articleID =  ctx.params.articleID;
        try {
            let article = await Article.findById(articleID);    // 通过链接上的id拿到对应的文章
            // 更新阅读量,因为ts的类型判断需要额外操作一下
            let _articleClick = article?.articleClick;
            if(_articleClick || _articleClick === 0) {
                await Article.update({_id: articleID},{$set:{articleClick: _articleClick + 1}})  
            }
            await ctx.render('article', {
                article: article,
                user: ctx.session?.username
            })
            
        } catch(error) {
            throw new Error(`An error occurred while viewing the article:${error}`);
        }
    }) 

export default articlesRouter;
