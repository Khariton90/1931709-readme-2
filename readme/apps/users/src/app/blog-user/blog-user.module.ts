import { BlogUserSubscribersModel, BlogUserSubscribersSchema } from './blog-user-subscribers.model';
import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { RABBITMQ_SERVICE } from './blog-user.constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema},
      { name: BlogUserSubscribersModel.name, schema: BlogUserSubscribersSchema }
    ]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ])
  ],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserService],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
