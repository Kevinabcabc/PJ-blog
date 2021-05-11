import { Context } from 'koa';
let editRouter =  require('koa-router')();

import Article from '../db/model/article';
import Author from '../db/model/author';


editRouter
    .get('/edit', async (ctx: Context) => {
        // 如果沒有登入，则跳转到登入页
        if(!ctx.session?.username) {
            ctx.redirect('/login');
            return;
        }
        await ctx.render('edit', {
            user: ctx.session?.username
        })
    })

    .post('/edit', async (ctx: Context) => {
        const {title, content} = ctx.request.body;
        const author = ctx.session?.username;
        let article = new Article({
            articleTitle: title,
            articleAuthor: author,
            articleContent: content,
        })
        try {
            let data =  await article.save();
            let author = await Author.findOne({authorName: ctx.session?.username});
            author?.articles.push(data._id);    // 用文章数据的唯一标志_id和文章作者联结起来
            await author?.save();               // 更新信息
            ctx.redirect('/');
        } catch(error) {
            throw new Error(`add article error:${error}`);
        }
    })

export default editRouter;
