import { Injectable } from '@nestjs/common';
import DataStore = require('nedb-promises');

import { UserEntity } from '../../../domain/entities/user.entity';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UserRepository } from 'src/modules/users/domain/contracts/user.repository.contract';

@Injectable()
export class UsersMemoryRepository implements UserRepository {
  private readonly db: DataStore<User>;

  constructor() {
    this.db = DataStore.create();
  }

  public async find(filter: Partial<User>): Promise<UserEntity[]> {
    const users = await this.db.find(filter);
    return users.map((user) => UserEntity.create(user));
  }

  public async findOne(filter: Partial<User>): Promise<UserEntity> {
    const user = await this.db.findOne(filter);
    if (user) {
      return UserEntity.create(user);
    }
    return undefined;
  }

  public count(filter: Partial<User>): Promise<number> {
    return this.db.count(filter);
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.db.findOne({ email }, { uuid: 1, scopes: 1, isActive: 1 });
    if (user) {
      return UserEntity.create(user);
    }
    return undefined;
  }

  public async getCryptedPassword(email: string): Promise<string | undefined> {
    const user = await this.db.findOne({ email }, { password: 1 });
    if (user) {
      return user.password;
    }
    return undefined;
  }

  public async findById(uuid: string): Promise<UserEntity | undefined> {
    const user = await this.db.findOne({ uuid });
    if (user) {
      return UserEntity.create(user);
    }
    return undefined;
  }

  public async create(userEntity: User): Promise<UserEntity | undefined> {
    const createdUser = await this.db.insert(userEntity);
    if (createdUser) {
      return UserEntity.create(createdUser);
    }
    return undefined;
  }

  public async updateProfile(userId: string, profile: Partial<User['profile']>) {
    const user = await this.db.findOne({ uuid: userId });
    const updatedProfile = { ...user.profile, ...profile };
    await this.db.update({ uuid: userId }, { $set: { profile: updatedProfile } });
    return updatedProfile;
  }

  public async update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity> {
    const user = await this.db.findOne(filter);
    const updatedUser = { ...user, ...data, profile: { ...user.profile, ...data.profile } };
    await this.db.update(filter, updatedUser);
    return UserEntity.create(updatedUser);
  }

  public async deleteOne(filter: Partial<User>): Promise<void> {
    await this.db.remove(filter, {});
  }
}
