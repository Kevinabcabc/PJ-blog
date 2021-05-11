import {Schema, Document} from 'mongoose';
import {IArticle} from './article';

export interface IAuthor extends Document{
    authorName: string;
    authorPassword: string;
    articles: IArticle[];
}

const AuthorSchema: Schema = new Schema({
    authorName: {type: String, required: true, unique: true},
    authorPassword: {type: String, required: true},
    articles: [
        {type: Schema.Types.ObjectId, ref: 'Article'}
    ]
});

export default AuthorSchema;
