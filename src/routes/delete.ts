
import { Context } from 'koa';
let deleteRouter =  require('koa-router')();

import Article from '../db/model/article';



deleteRouter.get('/delete/:articleID', async (ctx: Context) => {
    let articleID =  ctx.params.articleID;
    try {
        await Article.deleteOne({_id: articleID});
        ctx.redirect('/');
    } catch(error) {
        throw new Error(`An error occurred while deleting the article:${error}`);
    }
})

export default deleteRouter;
