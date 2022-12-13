import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'comments'
})
export class CommentsModel extends Document {
  @Prop()
  public _id: string;

  @Prop()
  public text: string;

  @Prop()
  public postId: string;

  @Prop()
  public userId: string;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);