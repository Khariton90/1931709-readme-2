import { DEFAULT_COMMENT_LIMIT, DEFAULT_SORT_DIRECTION } from './../app.constant';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsIn } from 'class-validator';

export class CommentQuery {
  @Transform(({ value }) => Number(value) ||  DEFAULT_COMMENT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: -1 | 1 = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;
}