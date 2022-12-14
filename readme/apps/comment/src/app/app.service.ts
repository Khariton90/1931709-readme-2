import { plainToInstance } from 'class-transformer';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(dto: CommentDto): Promise<CommentDto> {
    const commentEntity = new CommentEntity(dto);
    const newComment = await this.commentRepository.create(commentEntity);

    return plainToInstance(CommentDto, newComment.toObject());
  }
}
