import { PostModule } from './post.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
