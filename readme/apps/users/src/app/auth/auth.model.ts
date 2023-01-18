import { RefreshToken } from '@readme/shared-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tokens'
})
export class AuthModel extends Document implements RefreshToken {
  @Prop({
    required: true
  })
  public userId: string

  @Prop({
    required: true
  })
  public refreshToken: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);