import { PostQuery } from './query/post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { Post } from '@readme/shared-types';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    ) {}

  async findPost(id: number): Promise<Post> {
    return this.postRepository.findById(id);
  }

  async findAllPost(query: PostQuery): Promise<Post[]> {
    return this.postRepository.find(query);
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    const postEntity = new PostEntity(dto);
    return this.postRepository.create(postEntity);
  }

  async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    return this.postRepository.update(id, new PostEntity(dto));
  }

  async deletePost(id:number): Promise<void> {
    this.postRepository.destroy(id);
  }
}