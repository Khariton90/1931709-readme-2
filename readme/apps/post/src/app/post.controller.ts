import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponsePostDto } from './rdo/response-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { PostService } from "./post.service";
import { Body, Param } from '@nestjs/common/decorators';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async index() {
    const posts = await this.postService.findAllPost();
    return plainToInstance(ResponsePostDto, posts);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const intId = parseInt(id, 10);

    const post = await this.postService.findPost(intId);
    console.log(post);
    return plainToInstance(ResponsePostDto, post);
  }

  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return plainToInstance(ResponsePostDto, newPost);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatePost = await this.postService.updatePost(id, dto);

    return plainToInstance(ResponsePostDto, updatePost);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    this.postService.deletePost(id);
  }
}