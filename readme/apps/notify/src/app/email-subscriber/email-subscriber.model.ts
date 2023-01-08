import { Subscriber } from '@readme/shared-types';
import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  collection: 'email-subscribers',
  timestamps: true
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;
  
  @Prop()
  public firstname: string;

  @Prop()
  id: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);