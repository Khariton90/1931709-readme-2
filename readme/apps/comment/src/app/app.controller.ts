import { CommentQuery } from './query/comment.query';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { ExtendedUserRequest } from '@readme/shared-types';
import { CheckMongoidValidationPipe } from './pipes/CheckMongoidValidationPipe';
import { Get, Param, Req, Query } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { CommentDto } from './dto/comment.dto';
import { Controller, Post, Body, UseGuards, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HttpException } from '@nestjs/common/exceptions';

@ApiTags('comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:postId')
  @ApiResponse({status: HttpStatus.OK, description: 'Received a list of comments on the publication ID'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'No comments were found on this publication'})
  async find(@Query() query: CommentQuery, @Param('postId') postId: string): Promise<CommentDto[] | null> {
    const commentList = await this.appService.find(postId, query);

    if (!commentList) {
      throw new HttpException('No comments were found on this publication', HttpStatus.NOT_FOUND);
    } 

    return plainToInstance(ResponseCommentDto, commentList);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Created new post'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'The user is not logged in'})
  async create(@Body() dto: CommentDto): Promise<CommentDto> {
    const newComment = await this.appService.create(dto);

    const { 
      _id, 
      text,
      userId,
      postId,
      createdAt
    } = newComment.toObject();

    return plainToInstance(ResponseCommentDto, {
      _id,
      text,
      userId,
      postId,
      createdAt
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id', CheckMongoidValidationPipe) id: string, @Req() { user }: ExtendedUserRequest) {
    await this.appService.deleteComment(id, user.sub);
  }
}
