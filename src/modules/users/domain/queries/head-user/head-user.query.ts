import { IQuery } from '@nestjs/cqrs';

import { User } from '../../interfaces/user.interface';

export class HeadUserQuery implements IQuery {
  constructor(public filter?: Partial<User>) {}
}
