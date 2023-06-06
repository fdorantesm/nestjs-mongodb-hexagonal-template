import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUsersQuery } from './find-users.query';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery> {
  constructor(private readonly usersService: UsersService) {}
  public execute(query: FindUsersQuery): Promise<UserEntity[]> {
    return this.usersService.find(query.filter);
  }
}
