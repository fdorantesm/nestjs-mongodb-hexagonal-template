import { ICommand } from '@nestjs/cqrs';

import { User } from '../../interfaces/user.interface';

export class UpdatePartnerCommand implements ICommand {
  constructor(public readonly filter: Partial<User>, public readonly data: Partial<User>) {}
}
