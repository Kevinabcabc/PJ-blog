import mongoose from 'mongoose';

export default (db: string) => {
  const connect = () => {
    mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Successfully connected to ${db}`)
      return;
    })
    .catch((error) => {
      console.log(`Error connecting to database:${error}`)
      return process.exit(1)  // 失败断开进程
    });
  }

  connect();
  mongoose.connection.on('disconnected', connect);
}