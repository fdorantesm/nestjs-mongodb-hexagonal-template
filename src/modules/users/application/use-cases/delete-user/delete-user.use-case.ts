import { NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/decorators/case.decorator';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Case()
export class DeleteUserUseCase implements UseCase {
  constructor(private readonly usersService: UsersService) {}
  public async run(uuid: string): Promise<void> {
    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    await this.usersService.deleteOne({ uuid });
  }
}
