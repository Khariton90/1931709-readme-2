import { CommentRepository } from './comment.repository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_COMMENT_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModel, CommentsSchema } from './comment.model';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_COMMENT_PATH,
      load: [databaseConfig],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: CommentsModel.name, schema: CommentsSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, CommentRepository],
})
export class AppModule {}