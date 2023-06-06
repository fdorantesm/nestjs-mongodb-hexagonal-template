import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FindUsersQuery } from './find-users.query';
import { UserEntity } from '../../entities/user.entity';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery> {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public execute(query: FindUsersQuery): Promise<UserEntity[]> {
    return this.usersService.find(query.filter);
  }
}
