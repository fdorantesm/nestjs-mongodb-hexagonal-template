import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UserEntity } from '../../entities/user.entity';
import { FindUserQuery } from './find-user.query';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}
  public execute(command: FindUserQuery): Promise<UserEntity> {
    return this.usersService.findOne(command.filter);
  }
}
