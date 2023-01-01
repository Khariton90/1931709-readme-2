import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema}
    ])
  ],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserService],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
