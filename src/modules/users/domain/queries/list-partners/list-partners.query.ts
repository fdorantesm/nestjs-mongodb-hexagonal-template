import { IQuery } from '@nestjs/cqrs';

import { User } from '../../interfaces/user.interface';

export class ListPartnersQuery implements IQuery {
  constructor(public readonly filter?: Partial<User>) {}
}
