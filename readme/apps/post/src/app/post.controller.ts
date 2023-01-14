import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponsePostDto } from './rdo/response-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Get, Patch, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { PostService } from "./post.service";
import { Body, Param, Query, Req } from '@nestjs/common/decorators';
import { PostQuery } from './query/post.query';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@readme/shared-types';

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
  async show(@Param('id') id: number, @Req() req: ExtendedUserRequest) {
    console.log(req.user);
    const post = await this.postService.findPost(id);
    return plainToInstance(ResponsePostDto, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Created new post by Id'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'User is not authorized'})
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return plainToInstance(ResponsePostDto, newPost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Updated post by Id'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'User is not authorized'})
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatePost = await this.postService.updatePost(id, dto);

    return plainToInstance(ResponsePostDto, updatePost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted post by Id'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'User is not authorized'})
  async delete(@Param('id') id: number) {
    await this.postService.deletePost(id);
  }
}