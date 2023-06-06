import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { USER_SERVICE_TOKEN } from 'src/modules/users/domain/contracts/user.service.contract';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class ListUsersUseCase implements UseCase {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}

  public async execute(filter: Partial<User>) {
    const users = await this.usersService.find(filter);
    return users.map((user) => user.toObject());
  }
}
