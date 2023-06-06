import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { InjectIdGenerator } from '@app/id-generator/id-generator.decorator';
import { IdGeneratorService } from '@app/id-generator';
import { PasswordService } from 'src/modules/users/application/services/password.service';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { ProfileEntity } from 'src/modules/users/domain/entities/profile.entity';
import { User } from 'src/modules/users/domain/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
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

  public count(filter: Partial<User>): Promise<boolean> {
    return this.userRepository.count(filter);
  }

  public findPartners(filter?: Partial<User>): Promise<UserEntity[]> {
    return this.userRepository.findPartners(filter);
  }

  public findPartner(filter?: Partial<User>): Promise<UserEntity> {
    return this.userRepository.findPartner(filter);
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
    const uuid = this.idGeneratorService.run();
    const password = await this.passwordService.generate(payload.password);

    return this.userRepository.create({
      ...payload,
      uuid,
      password,
    });
  }

  public updateProfile(userId: string, data: Partial<ProfileEntity>) {
    return this.userRepository.updateProfile(userId, data);
  }

  public update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity> {
    return this.userRepository.update(filter, data);
  }

  public async deleteOne(filter: Partial<User>): Promise<void> {
    await this.userRepository.deleteOne(filter);
  }
}
