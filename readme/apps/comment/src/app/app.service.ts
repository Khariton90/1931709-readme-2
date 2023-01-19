import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class AppService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async find(postId: string, query: CommentQuery): Promise<CommentDto[] | null> {
    const commentList = await this.commentRepository.find(postId, query);

    if (!commentList.length) {
      return null;
    }

    return commentList;
  }

  public async create(dto: CommentDto): Promise<CommentEntity> {
    const commentEntity = new CommentEntity(dto);
    const newComment = await this.commentRepository.create(commentEntity);

    return newComment;
  }

  public async deleteComment(id: string, userId: string) {
    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new BadRequestException('Comment not found');
    }

    if (existComment.userId !== userId) {
      throw new BadRequestException('The user can only delete his comment');
    }

    await this.commentRepository.delete(id);
  }
}
