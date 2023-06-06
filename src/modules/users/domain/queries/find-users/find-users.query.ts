import { IQuery } from '@nestjs/cqrs';

import { UserEntity } from '../../entities/user.entity';

export class FindUsersQuery implements IQuery {
  constructor(public filter?: Partial<UserEntity>) {}
}
