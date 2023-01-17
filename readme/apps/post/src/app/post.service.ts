import { createEvent } from '@readme/core';
import { ClientProxy } from '@nestjs/microservices';
import { PostQuery } from './query/post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { Injectable, Inject } from '@nestjs/common';
import { CommandEvent, Post } from '@readme/shared-types';
import { RABBITMQ_SERVICE } from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
    ) {}

  async findPost(id: number): Promise<Post> {
    return this.postRepository.findById(id);
  }

  async findAllPost(query: PostQuery): Promise<Post[]> {
    return this.postRepository.find(query);
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    const postEntity = new PostEntity(dto);
    const newPost = await this.postRepository.create(postEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.AddPost),
      {
        id: dto.authorId,
        title: dto.title,
        description: dto.description,
        publishAt: dto.publishAt
      }
    )

    return newPost;
  }

  async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    return this.postRepository.update(id, new PostEntity(dto));
  }

  async deletePost(id:number): Promise<void> {
    this.postRepository.destroy(id);
  }
}