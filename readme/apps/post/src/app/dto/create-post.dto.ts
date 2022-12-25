import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  id?: number;

  @ApiProperty({
    required: true,
    example: 'Hello world',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    example: 'https://youtube.com',
  })
  @IsString()
  videoUrl: string;

  @ApiProperty({
    required: true,
    example: 'https://unsplash.com',
  })
  @IsString()
  preview: string;

  tags: string[];

  @ApiProperty({
    required: true,
    example: 'Welcome to my first post',
  })
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 'describe and like',
  })
  @IsString()
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
  @IsString()
  photo: string;

  @ApiProperty({
    required: true,
    example: 'https://unsplash.com',
  })
  @IsString()
  link: string;
  
  createdAt?: Date
  
  publishAt?: Date
}