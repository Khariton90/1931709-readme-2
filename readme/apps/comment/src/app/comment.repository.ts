import { DEFAULT_COMMENT_LIMIT } from './app.constant';
import { CommentQuery } from './query/comment.query';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '@readme/shared-types';
import { Model } from 'mongoose';
import { CommentEntity } from './comment.entity';
import { CommentsModel } from './comment.model';

@Injectable()
export class CommentRepository {
  constructor (
   @InjectModel(CommentsModel.name) private readonly commentModel: Model<CommentsModel>) {}

  public async create(item: CommentEntity): Promise<CommentEntity> {
    const comment = await new this.commentModel(item).save();
    const dateNow = new Date();

    item.fillEntity({
      _id: comment._id.toString(),
      text: comment.text,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: dateNow.toISOString()
    });

    return item;
  }

  public async findById(commentId: string): Promise<Comment | null> {
    const existComment = await this.commentModel.findById(commentId);

    if (!existComment) {
      return null;
    }

    return existComment;
  }

  public async find(postId: string, query: CommentQuery): Promise<Comment[]> {
    const skip = query.skip ? query.skip : 0;
    const limit = query.limit ? query.limit : DEFAULT_COMMENT_LIMIT;

    const commentList = await this.commentModel
      .find({postId}, {}, {limit: limit})
      .sort({date: query.sortDirection})
      .skip(skip)
      .lean()
      .exec();

    return commentList;
  }

  public async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id);
  }
}