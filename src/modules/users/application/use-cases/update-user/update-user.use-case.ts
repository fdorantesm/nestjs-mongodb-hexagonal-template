import { Inject, NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';
import {
  PASSWORD_SERVICE_TOKEN,
  PasswordService,
} from 'src/modules/users/domain/contracts/password.service.contract';
import { USER_SERVICE_TOKEN } from 'src/modules/users/domain/contracts/user.service.contract';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Case()
export class UpdateUserUseCase implements UseCase {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: PasswordService,
  ) {}

  public async execute(uuid: string, data: Partial<User>): Promise<User> {
    const usersExists = await this.usersService.count({ uuid });

    if (!usersExists) {
      throw new NotFoundException('api.users.not_found');
    }

    if (data.password) {
      data.password = await this.passwordService.generate(data.password, 10);
    }

    const user = await this.usersService.update({ uuid }, data);
    return user.toObject();
  }
}
