import { UserEntity } from '../entities/user.entity';
import { Profile } from '../interfaces/profile.interface';
import { User } from '../interfaces/user.interface';

export const USER_REPOSITORY_TOKEN = Symbol('UserRepository');

export interface UserRepository {
  find(filter: Partial<User>): Promise<UserEntity[]>;
  findOne(filter: Partial<User>): Promise<UserEntity | undefined>;
  count(filter: Partial<User>): Promise<boolean>;
  getLoginData(email: string): Promise<UserEntity | undefined>;
  getCryptedPassword(email: string): Promise<string | undefined>;
  findById(uuid: string): Promise<UserEntity | undefined>;
  create(userEntity: User): Promise<UserEntity | undefined>;
  updateProfile(userId: string, profile: Partial<Profile>);
  update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity | undefined>;
  deleteOne(filter: Partial<User>): Promise<void>;
}
