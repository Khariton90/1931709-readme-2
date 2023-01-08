import { EmailSubscriberModel } from './email-subscriber.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Subscriber } from '@readme/shared-types';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CRUDRepository } from '@readme/core';
import { Model } from 'mongoose';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) { }

  public async findById(id: string): Promise<Subscriber> {
    return this.emailSubscriberModel.findOne({ id }).exec();
  }

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }
  
  public async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ id });
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }
}