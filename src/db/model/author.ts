
import { model } from 'mongoose';
import  AuthorSchema ,{ IAuthor } from '../schemas/author';

export default model<IAuthor>('Author', AuthorSchema);
