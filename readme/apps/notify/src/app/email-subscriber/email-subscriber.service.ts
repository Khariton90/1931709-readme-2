import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }


    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }
}