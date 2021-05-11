import { Context } from 'koa';
let userRouter =  require('koa-router')();
import Article from '../db/model/article';
import Author from '../db/model/author';


async function getArticles(ctx: Context) {
    let page = 1;     // 根据url上的传参来判断显示第几页数据
    if (ctx.query.page && typeof ctx.query.page === 'number') {
      page = ctx.query.page;
    }
    let articlesMaxNum = 8;    // 设置每页显示最大数据条数
    let start = (page -1) * articlesMaxNum;

    try {
        // 通过联结获取当前用户的个人博客
        let author = await Author.findOne({authorName: ctx.session?.username}).populate({
            path: 'articles',
            options: {
                skip: start,
                limit: articlesMaxNum,
                sort: {articleTime: 1}
            }}); 
        let articles = author?.articles
        let articlesCount = await Article.find().estimatedDocumentCount();                                                  // 拿到Artic表内总数据条数
        let pageNum = Math.ceil(articlesCount / articlesMaxNum);                                           // 根据文章总数除于每页最大数得到当前总共文章页数
        return {articles: articles, articlesCount: articlesCount, page: page, pageNum: pageNum};
    } catch(error) {
        throw new Error(`搜索文章失败:${error}`);
    }
}

userRouter.get('/user', async (ctx: Context) => {
    try {
        const {articles, articlesCount, page, pageNum} =  await getArticles(ctx);
        if(articles) {
            await ctx.render('index',{
                articles: articles,
                articlesCount: articlesCount,
                page: page,
                pageNum: pageNum,
                user: ctx.session?.username 
            })
        } 
    } catch(error) {
        throw new Error(`首页路由加载失败:${error}`);
    }
})

export default userRouter;
