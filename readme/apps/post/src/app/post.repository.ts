import { PostQuery } from './query/post.query';
import { PrismaService } from './prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from "@readme/core";
import { Post } from "@readme/shared-types";
import { PostEntity } from "./post.entity";

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Post> {
    return this.prisma.post.findFirst({
      where: {
        id: id
      }
    })
  }

  public async find({ limit, sortDirection, page }: PostQuery, ids: [] = []): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      },
      take: limit,
      orderBy: [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async create(item: PostEntity): Promise<Post> {
    return this.prisma.post.create({
      data: { ...item.toObject() }
    });
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id
      },
      data: { ...item.toObject(), id }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id
      }
    })
  }
}