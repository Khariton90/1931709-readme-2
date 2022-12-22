import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  id?: number;

  @ApiProperty({
    required: true,
    example: 'Hello world',
  })
  title: string;

  @ApiProperty({
    required: true,
    example: 'https://youtube.com',
  })
  videoUrl: string;

  @ApiProperty({
    required: true,
    example: 'https://unsplash.com',
  })
  preview: string;

  tags: string[];

  @ApiProperty({
    required: true,
    example: 'Welcome to my first post',
  })
  description: string;

  @ApiProperty({
    required: true,
    example: 'describe and like',
  })
  quote: string;

  @ApiProperty({
    required: true,
    example: '6e377w70ecg342452352d3ss2',
  })
  authorId: string;

  @ApiProperty({
    required: true,
    example: 'https://unsplash.com',
  })
  photo: string;

  @ApiProperty({
    required: true,
    example: 'https://unsplash.com',
  })
  link: string;
  
  createdAt?: Date
  publishAt?: Date
}