import { Subscriber } from '@readme/shared-types';


export class EmailSubscriberEntity implements Subscriber {
  public email: string;
  public firstname: string;
  public id: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return {...this}
  }

  public fillEntity(emailSubscriber: Subscriber) {
    this.id = emailSubscriber.id;
    this.email = emailSubscriber.email;
    this.firstname = emailSubscriber.firstname;
  }
}