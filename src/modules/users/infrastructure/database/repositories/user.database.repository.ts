import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { UserEntity } from '../../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { Profile } from 'src/modules/users/domain/interfaces/profile.interface';
import { UserRepository } from 'src/modules/users/domain/contracts/user.repository.contract';

@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  public async find(filter: Partial<User>): Promise<UserEntity[]> {
    const users = await this.userModel
      .find(
        {
          ...filter,
        },
        null,
        { skip: 1 },
      )
      .select('-password')
      .exec();
    return users.map((user) => UserEntity.create(user.toJSON()));
  }

  public async findOne(filter: Partial<User>): Promise<UserEntity> {
    const user = await this.userModel.findOne(filter).select('-password').exec();
    if (user) {
      return UserEntity.create(user.toJSON());
    }

    return undefined;
  }

  public async count(filter: Partial<User>): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email })
      .select({ uuid: 1, scopes: 1, isActive: 1 })
      .exec();
    if (user) {
      return UserEntity.create(user.toJSON());
    }

    return undefined;
  }

  public async getCryptedPassword(email: string): Promise<string | undefined> {
    const user = await this.userModel.findOne({ email }).select({ password: 1 }).exec();
    if (user) {
      return user.password;
    }

    return undefined;
  }

  public async findById(uuid: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ uuid });
    if (user) {
      return user;
    }

    return undefined;
  }

  public async create(userEntity: User): Promise<UserEntity | undefined> {
    const user = await this.userModel.create(userEntity);
    if (user) {
      return UserEntity.create(user.toJSON());
    }

    return undefined;
  }

  public async updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile> {
    const profileData = {};

    Object.keys(profile).forEach((field) => {
      profileData[`profile.${field}`] = profile[field];
    });

    this.userModel.updateOne({ uuid: userId }, profileData);
    const user = await this.findById(userId);
    return user.profile;
  }

  public async update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity> {
    const user = await this.userModel.findOne(filter).lean().exec();
    await this.userModel
      .updateOne(filter, { ...user, ...data, profile: { ...user.profile, ...data.profile } })
      .exec();
    return this.findOne(filter);
  }

  public async deleteOne(filter: Partial<User>): Promise<void> {
    await this.userModel.deleteOne(filter).exec();
  }
}
