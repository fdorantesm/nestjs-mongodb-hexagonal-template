import { ConflictException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/decorators/case.decorator';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Case()
export class CreateUserUseCase implements UseCase {
  constructor(private readonly usersService: UsersService) {}
  public async run(payload: Partial<User>): Promise<User> {
    const previousUser = await this.usersService.count({ email: payload.email });

    if (previousUser) {
      throw new ConflictException('api.users.email_already_exists');
    }

    const user = await this.usersService.register({
      email: payload.email,
      password: payload.password,
      scopes: [Scope.ROOT],
      profile: payload.profile,
      isActive: payload.isActive || true,
    });

    return user.toObject();
  }
}
