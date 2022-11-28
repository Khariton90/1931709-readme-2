import { BlogUserMemoryRepository } from './blog-user-memory.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [BlogUserMemoryRepository],
  exports: [BlogUserMemoryRepository],
})
export class BlogUserModule {}
