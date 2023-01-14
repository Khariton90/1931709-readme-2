import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { getRabbitMqConfig, rabbitMqOptions } from './config/rabbitmq.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ENV_FILE_PATH, RABBITMQ_SERVICE } from './post.constant';
import { getJwtConfig, jwtOptions } from './config/jwt.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, jwtOptions],
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, JwtStrategy],
  exports: [PostRepository]
})
export class PostModule {}