import { ConflictException, Injectable } from '@nestjs/common';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TokenDto } from '../dtos/token.dto';
import { RegisterCommand } from 'src/modules/users/domain/commands';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { TokenService } from '../services/token.service';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { FindUserQuery, HeadUserQuery } from 'src/modules/users/domain/queries';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
  ) {}

  public async run(
    payload: Omit<User, 'uuid' | 'scopes' | 'isActive'>,
  ): Promise<{ user: User } & TokenDto> {
    const isNotFirst = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery(),
    );

    const previousUser = await this.queryBus.execute<HeadUserQuery, UserEntity>(
      new HeadUserQuery({
        email: payload.email,
      }),
    );

    if (previousUser) {
      throw new ConflictException('api.users.email_already_exists');
    }

    const subscriber = [Scope.INVESTMENTS];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const formatedEmail = payload.email.toLowerCase();

    const user = await this.commandBus.execute<RegisterCommand, UserEntity>(
      new RegisterCommand({
        email: formatedEmail,
        password: payload.password,
        scopes,
        profile: payload.profile,
        isActive: true,
      }),
    );

    const token = await this.tokenService.create({
      scopes,
      id: user.uuid,
    });

    return {
      ...token,
      user: user.toObject(),
    };
  }
}
