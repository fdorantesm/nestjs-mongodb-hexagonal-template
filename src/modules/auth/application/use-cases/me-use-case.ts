import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserQuery } from 'src/modules/users/domain/queries';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { User } from 'src/modules/users/domain/interfaces/user.interface';

@Injectable()
export class MeUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(userId: string): Promise<User> {
    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: userId }),
    );
    return user.toObject();
  }
}
