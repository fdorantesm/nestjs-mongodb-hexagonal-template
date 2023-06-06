import { UserEntity } from '../entities/user.entity';
import { User } from '../interfaces/user.interface';
import { UserRepository } from './user.repository.contract';

export const USER_SERVICE_TOKEN = Symbol('UserService');

export interface UsersService extends UserRepository {
  checkPassword(email: string, password: string): Promise<boolean>;
  register(payload: Omit<User, 'uuid'>): Promise<UserEntity>;
}
