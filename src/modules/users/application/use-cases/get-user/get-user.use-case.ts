import { Inject, NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';
import {
  USER_SERVICE_TOKEN,
  UsersService,
} from 'src/modules/users/domain/contracts/user.service.contract';
import { User } from 'src/modules/users/domain/interfaces/user.interface';

@Case()
export class GetUserUseCase implements UseCase {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public async execute(uuid: string): Promise<User> {
    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    const user = await this.usersService.findOne({ uuid });

    return user.toObject();
  }
}
