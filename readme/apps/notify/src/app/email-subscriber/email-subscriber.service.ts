import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';
import { Subscriber } from '@readme/shared-types';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    await this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }

  public async addPost() {
    const SUBSCRIBERS_LIMIT_COUNT = 20;
    const subscribers = await this.emailSubscriberRepository.findAll(SUBSCRIBERS_LIMIT_COUNT);
    await Promise.all(subscribers.map((subscriber: Subscriber) => this.mailService.sendNotifyPost(subscriber)));
  }
}