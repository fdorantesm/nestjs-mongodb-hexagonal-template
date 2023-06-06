import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { HeadUserQuery } from './head-user.query';

@QueryHandler(HeadUserQuery)
export class HeadUserQueryHandler implements IQueryHandler<HeadUserQuery> {
  constructor(private readonly usersService: UsersService) {}
  public execute(command: HeadUserQuery): Promise<boolean> {
    return this.usersService.count(command.filter);
  }
}
