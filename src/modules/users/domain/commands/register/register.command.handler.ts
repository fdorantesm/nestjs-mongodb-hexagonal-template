import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UserEntity } from '../../entities/user.entity';
import { RegisterCommand } from './register.command';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}

  public execute(command: RegisterCommand): Promise<UserEntity> {
    return this.usersService.register(command.user);
  }
}
