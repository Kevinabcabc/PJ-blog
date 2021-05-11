import dayjs from 'dayjs';

import {Schema, Document} from 'mongoose';
import { IAuthor } from './author';

export interface IArticle extends Document{
  articleTitle: string;
  articleAuthor: IAuthor;
  articleContent: string;
  articleTime: Date;
  articleClick: number;
}

const ArticleSchema: Schema = new Schema({
  articleTitle: {type: String, required: true},
  articleAuthor: String,
  articleContent: String,
  articleTime: {type: String, default: dayjs().format('YYYY/M/D')},
  articleClick: {type: Number, default: 0}
});


export default ArticleSchema;