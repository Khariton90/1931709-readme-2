import { EMAIL_ADD_SUBSCRIBER_SUBJECT, ADD_NEW_POST_SUBJECT } from './mail.constant';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@readme/shared-types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`
      }
    })
  }

  public async sendNotifyPost(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: ADD_NEW_POST_SUBJECT,
      template: './add-post',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`
      }
    })
  }
}