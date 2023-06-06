import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { UpdatePartnerCommand } from './update-partner.command';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { PasswordService } from 'src/modules/users/application/services/password.service';

@CommandHandler(UpdatePartnerCommand)
export class UpdatePartnerCommandHandler implements IQueryHandler<UpdatePartnerCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  public async execute(query: UpdatePartnerCommand): Promise<UserEntity> {
    if (query.data.password) {
      query.data.password = await this.passwordService.generate(query.data.password);
    }

    const partner = await this.usersService.update(query.filter, query.data);

    if (partner) {
      return partner;
    }

    return undefined;
  }
}
