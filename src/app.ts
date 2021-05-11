import Koa, { Context } from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
// 使用import方式引入路由时会和view的声明文件存在不明冲突，因此用require方式引入
import ArticleRouter from './routes/index';
import deleteRouter from './routes/delete';
import editRouter from './routes/edit';
import indexRouter from './routes/index';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import modifyRouter from './routes/modify';
import signRouter from './routes/sign';
import userRouter from './routes/user';

import path from 'path';
import koaStatic from 'koa-static';
import koaSession from 'koa-session';

const sessionConfig = {
  key: 'koa:sess',    
  maxAge: 600000,    
  overwrite:true,    
  httpOnly:true,      
  signed:true,       
  rolling:false,    
  renew:true        
}


import connectDB from './db';
import Config from './config';

const app = new Koa();
connectDB(Config.MONGODB_URL);

app.keys = ['some secret hurr'];


app
  // view中间件需要在所有路由前配置
  .use(views(path.join(__dirname, '../views'), { 
      extension: 'ejs'                  
    })
  )
  .use(koaSession(sessionConfig, app))	// 配置session处理中间件
  .use(koaStatic(path.join(__dirname, '../public')))
  .use(bodyParser())
  .use(editRouter.routes())
  .use(deleteRouter.routes())
  .use(indexRouter.routes())
  .use(loginRouter.routes())
  .use(logoutRouter.routes())
  .use(modifyRouter.routes())
  .use(signRouter.routes())
  .use(userRouter.routes());

app.listen(3000)
