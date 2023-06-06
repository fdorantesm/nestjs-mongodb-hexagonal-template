import { IQuery } from '@nestjs/cqrs';

import { UserEntity } from '../../entities/user.entity';

export class FindUserQuery implements IQuery {
  constructor(public filter?: Partial<UserEntity>) {}
}
