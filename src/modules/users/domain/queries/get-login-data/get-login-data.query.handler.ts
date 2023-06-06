import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { UserEntity } from '../../entities/user.entity';
import { GetLoginDataQuery } from './get-login-data.query';
import { Inject } from '@nestjs/common';
import { USER_SERVICE_TOKEN, UsersService } from '../../contracts/user.service.contract';

@QueryHandler(GetLoginDataQuery)
export class GetLoginDataQueryHandler implements IQueryHandler<GetLoginDataQuery> {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}

  public execute(user: GetLoginDataQuery): Promise<UserEntity> {
    return this.usersService.getLoginData(user.email);
  }
}
