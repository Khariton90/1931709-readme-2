import { Document } from 'mongoose';
import { User } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users'
})
export class BlogUserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true
  })
  public dateRegister: Date;

  @Prop({
    required: true
  })
  public subscribers: number;

  @Prop({
    required: true
  })
  public posts: number;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);