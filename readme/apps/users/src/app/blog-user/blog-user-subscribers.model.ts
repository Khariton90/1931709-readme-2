import { Document } from 'mongoose';
import { User, UserSubscribers } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user-subscribers'
})
export class BlogUserSubscribersModel extends Document implements UserSubscribers {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public subscribers: User[];
}

export const BlogUserSubscribersSchema = SchemaFactory.createForClass(BlogUserSubscribersModel);