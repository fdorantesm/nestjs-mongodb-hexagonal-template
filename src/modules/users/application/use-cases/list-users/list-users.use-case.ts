import { Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class ListUsersUseCase implements UseCase {
  constructor(private readonly usersService: UsersService) {}

  public async run(filter: Partial<User>) {
    const users = await this.usersService.find(filter);
    return users.map((user) => user.toObject());
  }
}
