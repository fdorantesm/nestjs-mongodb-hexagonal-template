import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { FindUserQuery } from './find-user.query';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
  constructor(private readonly usersService: UsersService) {}
  public execute(command: FindUserQuery): Promise<UserEntity> {
    return this.usersService.findOne(command.filter);
  }
}
