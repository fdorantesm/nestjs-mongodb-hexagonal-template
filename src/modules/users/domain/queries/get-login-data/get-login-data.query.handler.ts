import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { GetLoginDataQuery } from './get-login-data.query';

@QueryHandler(GetLoginDataQuery)
export class GetLoginDataQueryHandler implements IQueryHandler<GetLoginDataQuery> {
  constructor(private readonly usersService: UsersService) {}

  public execute(user: GetLoginDataQuery): Promise<UserEntity> {
    return this.usersService.getLoginData(user.email);
  }
}
