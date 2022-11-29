import { BlogUserMemoryRepository } from './blog-user-memory.repository';
import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';

@Module({
  imports: [],
  providers: [BlogUserMemoryRepository, BlogUserService],
  exports: [BlogUserMemoryRepository, BlogUserService],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
