import { QueryBus } from '@nestjs/cqrs';

import { FindUserQuery } from 'src/modules/users/domain/queries';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';

@Case()
export class MeUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: userId }),
    );
    return user.toObject();
  }
}
