import { ApiProperty } from '@nestjs/swagger';


export class CommentDto {
  @ApiProperty({
    required: true,
    example: 'f23122112321213123',
  })
  public _id: string;

  @ApiProperty({
    required: true,
    example: 'Hello world',
  })
  public text: string;

  @ApiProperty({
    required: true,
    example: 'f23122112321213123',
  })
  public userId: string;

  @ApiProperty({
    required: true,
    example: 'f23122112321213123',
  })
  public postId: string;
}