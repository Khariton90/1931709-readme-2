import { Expose, Transform } from 'class-transformer';
import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty({
    required: true,
    example: '63c9336947ade1dfb49c301e',
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

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
    example: '63c9336947ade1dfb49c301e',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    required: true,
    example: '63c9336947ade1dfb49c301e',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    required: true,
    example: '2023-01-19T12:40:59.998Z',
  })
  @Expose()
  public createdAt: string;
}