import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CheckUserPasswordQuery } from './check-user-password.query';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@QueryHandler(CheckUserPasswordQuery)
export class CheckUserPasswordQueryHandler implements IQueryHandler {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public execute(query: CheckUserPasswordQuery): Promise<boolean> {
    const { email, password } = query;
    return this.usersService.checkPassword(email, password);
  }
}
