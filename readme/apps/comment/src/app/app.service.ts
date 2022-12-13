import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({_id: '', ...dto});

   return this.commentRepository.create(commentEntity);
  }
}
