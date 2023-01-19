import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    example: 'Hello world',
  })
  public text: string;

  @ApiProperty({
    required: true,
    example: '6398befd206451820fdd0c8c',
  })
  public userId: string;

  @ApiProperty({
    required: true,
    example: '6398befd206451820fdd0c8c',
  })
  public postId: string;

  public createdAt?: string;
}