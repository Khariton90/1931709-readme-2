import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository]
})
export class PostModule {}