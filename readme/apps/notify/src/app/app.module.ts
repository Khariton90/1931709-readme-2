import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, mongoDbOptions } from './config/mongodb.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [rabbitMqOptions, mongoDbOptions],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
