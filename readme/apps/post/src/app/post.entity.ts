import { Post } from '@readme/shared-types';
import { Entity } from '@readme/core';


export class PostEntity implements Entity<PostEntity>, Post {
  public id: number;
  public title: string;
  public videoUrl: string;
  public preview: string;
  public tags: string[];
  public description: string;
  public quote: string;
  public authorId: string;
  public photo: string;
  public link: string;
  public createdAt?: Date;
  public publishAt?: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post) {
    this.title = entity.title;
    this.id = entity.id;
    this.videoUrl = entity.videoUrl;
    this.preview = entity.preview;
    this.tags = entity.tags;
    this.description = entity.description;
    this.quote = entity.quote;
    this.authorId = entity.authorId;
    this.photo = entity.photo;
    this.link = entity.link;
    this.createdAt = entity.createdAt;
    this.publishAt = entity.publishAt;
  }

  public toObject(): PostEntity {
    return { ...this };
  }
}