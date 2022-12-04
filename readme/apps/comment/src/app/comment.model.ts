import { Comment } from '@readme/shared-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'comments'
})
export class CommentsModel extends Document implements Comment {
  @Prop()
  _id: string;

  @Prop()
  text: string;

  @Prop()
  postId: string;

  @Prop()
  userId: string;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);