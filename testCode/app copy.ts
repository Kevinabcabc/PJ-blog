import Koa, { Context } from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
// 使用import方式引入路由时会和view的声明文件存在不明冲突，因此用require方式引入
let router = require('koa-router')();	
import path from 'path';
import {Schema, model, Document} from 'mongoose';

// import connectDB from './db';
// import Config from './config';

const app = new Koa();

connectDB(Config.MONGODB_URL);

// 测试数据库
interface PeopleType extends Document {
  name: string,
  sex: string
}

const PeopleSchema: Schema = new Schema({
  name: String,
  sex: String
})

const People = model<PeopleType>('People', PeopleSchema);


router.get('/',async (ctx: Context) => {
  console.log('get', );
  
  await ctx.render('index', {
      title: '测试ejs文件是否生效'
  }) 
});

router.post('/done',async (ctx: Context) => {
	const people = new People({
		name: 'jack',
		sex: 'girl'
	})
	await people.save();
	ctx.body = ctx.request.body
});

app
  // view中间件需要在所有路由前配置
  .use(views(path.join(__dirname, '../views'), { 
      extension: 'ejs'                  
    })
  )
  .use(bodyParser())
  .use(router.routes());

app.listen(3000)
