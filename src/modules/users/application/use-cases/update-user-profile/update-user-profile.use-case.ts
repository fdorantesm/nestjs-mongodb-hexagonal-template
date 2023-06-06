import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'libs/domain/src';
import {
  USER_SERVICE_TOKEN,
  UsersService,
} from 'src/modules/users/domain/contracts/user.service.contract';

import { ProfileEntity } from 'src/modules/users/domain/entities/profile.entity';

@Injectable()
export class UpdateUserProfileUseCase implements UseCase {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public async execute(userId: string, data: Partial<ProfileEntity>): Promise<void> {
    await this.usersService.updateProfile(userId, data);
  }
}
