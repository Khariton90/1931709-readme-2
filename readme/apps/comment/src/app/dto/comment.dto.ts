import { Expose } from 'class-transformer';
import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  public _id?: string;

  @ApiProperty({
    required: true,
    example: 'Hello world',
  })
  @MinLength(10, {message: 'Min length comment text 10'})
  @MaxLength(300, {message: 'Max length comment text 300'})
  @Expose()
  public text: string;

  @ApiProperty({
    required: true,
    example: '6398befd206451820fdd0c8c',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    required: true,
    example: '6398befd206451820fdd0c8c',
  })
  @Expose()
  public postId: string;

  public createdAt?: string; 
}