import { Context } from 'koa';
let indexRouter =  require('koa-router')();

import Article from '../db/model/article';

async function getArticles(ctx: Context) {
    let page = 1;     // 根据url上的传参来判断显示第几页数据
    if (ctx.query.page && typeof ctx.query.page === 'number') {
      page = ctx.query.page;
    }
    let articlesMaxNum = 8;    // 设置每页显示最大数据条数
    let start = (page -1) * articlesMaxNum;
    try {
        const articles = await Article.find().skip(start).limit(articlesMaxNum).sort({articleTime: 1});    // 根据页数拿到指定范围的文章,按照发布时间正序排列
        let articlesCount = await Article.find().estimatedDocumentCount();                                                  // 拿到Artic表内总数据条数
        let pageNum = Math.ceil(articlesCount / articlesMaxNum);                                           // 根据文章总数除于每页最大数得到当前总共文章页数
        console.log('articlesCount: ', articlesCount)
        return {articles: articles, articlesCount: articlesCount, page: page, pageNum: pageNum};
    } catch(error) {
        throw new Error('搜索文章失败');
    }
}

indexRouter.get('/', async (ctx: Context) => {
    try {
        const {articles, articlesCount, page, pageNum} =  await getArticles(ctx);
        if(articles) {
            await ctx.render('index',{
                articles: articles,
                articlesCount: articlesCount,
                page: page,
                pageNum: pageNum
            })
        } 
    } catch(error) {
        throw new Error('首页路由加载失败');
    }
})

export default indexRouter;
