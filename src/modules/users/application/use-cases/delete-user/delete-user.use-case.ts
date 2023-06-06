import { Inject, NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';
import {
  USER_SERVICE_TOKEN,
  UsersService,
} from 'src/modules/users/domain/contracts/user.service.contract';

@Case()
export class DeleteUserUseCase implements UseCase {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public async execute(uuid: string): Promise<void> {
    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    await this.usersService.deleteOne({ uuid });
  }
}
