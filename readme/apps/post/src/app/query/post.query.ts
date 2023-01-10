import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { DEFAULT_POST_LIMIT, DEFAULT_SORT_DIRECTION } from '../post.constant';

export class PostQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_POST_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}