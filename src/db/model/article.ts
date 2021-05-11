
import { model } from 'mongoose';
import ArticleSchema, { IArticle } from '../schemas/article';

export default model<IArticle>('Article', ArticleSchema);
