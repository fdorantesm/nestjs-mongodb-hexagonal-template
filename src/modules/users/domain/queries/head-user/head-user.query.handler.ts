import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { HeadUserQuery } from './head-user.query';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@QueryHandler(HeadUserQuery)
export class HeadUserQueryHandler implements IQueryHandler<HeadUserQuery> {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public execute(command: HeadUserQuery): Promise<boolean> {
    return this.usersService.count(command.filter);
  }
}
