import { BlogUserSubscribersModel } from './blog-user-subscribers.model';
import { CRUDRepository } from '@readme/core';
import { BlogUserEntity } from './blog-user.entity';
import { User } from '@readme/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { BlogUserModel } from './blog-user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity, string, User> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>,
    @InjectModel(BlogUserSubscribersModel.name) private readonly blogUserSubscribersModel: Model<BlogUserSubscribersModel>
    ) {
  }

  public async create(item: BlogUserEntity): Promise<User> {
    const newBlogUser = new this.blogUserModel(item);
    new this.blogUserSubscribersModel({
      email: newBlogUser.email, 
      subscribers: []
    }).save();

    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.blogUserModel
      .findById(id)
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<User> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async subscribe(userEmail: string, subscriberId: string) {
    const existSubscriber = await this.blogUserSubscribersModel
    .findOne({userEmail})
    .find({subscribers: subscriberId});

    if (existSubscriber.length) {
      await this.blogUserModel.
        findOneAndUpdate({userEmail}, {'$inc': {subscribers: -1}})
        .exec();
        await this.blogUserSubscribersModel
        .findOneAndUpdate({userEmail}, {$pull: {subscribers: subscriberId}})
        .exec();
    } else {
      await this.blogUserModel.
        findOneAndUpdate({userEmail}, {'$inc': {subscribers: 1}})
        .exec();
        await this.blogUserSubscribersModel
        .findOneAndUpdate({userEmail}, {$push: {subscribers: subscriberId}})
        .exec();
    }
  }

}