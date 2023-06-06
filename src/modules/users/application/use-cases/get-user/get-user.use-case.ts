import { NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/decorators/case.decorator';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Case()
export class GetUserUseCase implements UseCase {
  constructor(private readonly usersService: UsersService) {}
  public async run(uuid: string): Promise<User> {
    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    const user = await this.usersService.findOne({ uuid });

    return user.toObject();
  }
}
