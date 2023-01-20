import { CommentDto } from './dto/comment.dto';

export class CommentEntity {
  public _id: string;
  public text: string;
  public postId: string;
  public userId: string;
  public createdAt: string;

  constructor(comment: CommentDto) {
    this.fillEntity(comment);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(comment: CommentDto) {
    this._id = comment._id;
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }
}