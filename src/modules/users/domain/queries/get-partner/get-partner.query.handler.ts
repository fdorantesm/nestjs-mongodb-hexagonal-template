import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetPartnerQuery } from './get-partner.query';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@QueryHandler(GetPartnerQuery)
export class GetPartnerQueryHandler implements IQueryHandler<GetPartnerQuery> {
  constructor(private readonly usersService: UsersService) {}

  public execute(query: GetPartnerQuery): Promise<UserEntity> {
    return this.usersService.findPartner(query.filter);
  }
}
