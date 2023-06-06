import { Inject, Injectable } from '@nestjs/common';

import { InjectIdGenerator } from '@app/id-generator/id-generator.decorator';
import { IdGeneratorService } from '@app/id-generator';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { ProfileEntity } from 'src/modules/users/domain/entities/profile.entity';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from 'src/modules/users/domain/contracts/user.repository.contract';
import {
  PASSWORD_SERVICE_TOKEN,
  PasswordService,
} from 'src/modules/users/domain/contracts/password.service.contract';
import { Profile } from 'src/modules/users/domain/interfaces/profile.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: PasswordService,

    @InjectIdGenerator()
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public find(filter: Partial<User>): Promise<UserEntity[]> {
    return this.userRepository.find(filter);
  }

  public findOne(filter: Partial<User>): Promise<UserEntity> {
    return this.userRepository.findOne(filter);
  }

  public count(filter: Partial<User>): Promise<number> {
    return this.userRepository.count(filter);
  }

  public getLoginData(email: string): Promise<UserEntity> {
    return this.userRepository.getLoginData(email);
  }

  public findById(uuid: string): Promise<UserEntity> {
    return this.userRepository.findById(uuid);
  }

  public async checkPassword(email: string, password: string): Promise<boolean> {
    const cryptedPassword = await this.userRepository.getCryptedPassword(email);
    if (cryptedPassword) {
      const passwordMatches = await this.passwordService.match(password, cryptedPassword);

      return passwordMatches;
    }

    return false;
  }

  public async register(payload: Omit<User, 'uuid'>): Promise<UserEntity> {
    const uuid = this.idGeneratorService.execute();
    const password = await this.passwordService.generate(payload.password, 10);

    return this.userRepository.create({
      ...payload,
      uuid,
      password,
    });
  }

  public updateProfile(userId: string, data: Partial<ProfileEntity>): Promise<Profile> {
    return this.userRepository.updateProfile(userId, data);
  }

  public update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity> {
    return this.userRepository.update(filter, data);
  }

  public async deleteOne(filter: Partial<User>): Promise<void> {
    await this.userRepository.deleteOne(filter);
  }
}
