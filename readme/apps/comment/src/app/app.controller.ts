import { plainToInstance } from 'class-transformer';
import { CommentDto } from './dto/comment.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async create(@Body() dto: CommentDto): Promise<CommentDto> {
    const newComment = await this.appService.create(dto);

    const { _id, text, userId, postId } = newComment.toObject();

    return plainToInstance(CommentDto, {
      _id,
      text,
      userId,
      postId
    });
  }
}
