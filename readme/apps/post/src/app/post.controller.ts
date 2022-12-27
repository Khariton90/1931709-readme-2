import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponsePostDto } from './rdo/response-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Get, Patch, Delete, HttpStatus } from '@nestjs/common';
import { PostService } from "./post.service";
import { Body, Param, Query } from '@nestjs/common/decorators';
import { PostQuery } from './query/post.query';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @ApiResponse({status: HttpStatus.OK, description: 'An array with posts was received'})
  async index(@Query() query: PostQuery) {
    const posts = await this.postService.findAllPost(query);
    return plainToInstance(ResponsePostDto, posts);
  }

  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK, description: 'One post was received'})
  async show(@Param('id') id: number) {
    const post = await this.postService.findPost(id);
    return plainToInstance(ResponsePostDto, post);
  }

  @Post('/')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Created new post by Id'})
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return plainToInstance(ResponsePostDto, newPost);
  }

  @Patch('/:id')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Updated post by Id'})
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatePost = await this.postService.updatePost(id, dto);

    return plainToInstance(ResponsePostDto, updatePost);
  }

  @Delete('/:id')
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted post by Id'})
  async delete(@Param('id') id: number) {
    this.postService.deletePost(id);
  }
}