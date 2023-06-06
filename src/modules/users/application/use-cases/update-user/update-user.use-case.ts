import { NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/decorators/case.decorator';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { PasswordService } from '../../services/password.service';

@Case()
export class UpdateUserUseCase implements UseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  public async run(uuid: string, data: Partial<User>): Promise<User> {
    const usersExists = await this.usersService.count({ uuid });

    if (!usersExists) {
      throw new NotFoundException('api.users.not_found');
    }

    if (data.password) {
      data.password = await this.passwordService.generate(data.password);
    }

    const user = await this.usersService.update({ uuid }, data);
    return user.toObject();
  }
}
