import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListPartnersQuery } from './list-partners.query';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@QueryHandler(ListPartnersQuery)
export class ListPartnersQueryHandler implements IQueryHandler<ListPartnersQuery> {
  constructor(private readonly usersService: UsersService) {}

  public execute(query: ListPartnersQuery): Promise<UserEntity[]> {
    return this.usersService.findPartners(query.filter);
  }
}
