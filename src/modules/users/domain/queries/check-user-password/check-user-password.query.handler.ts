import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { CheckUserPasswordQuery } from './check-user-password.query';

@QueryHandler(CheckUserPasswordQuery)
export class CheckUserPasswordQueryHandler implements IQueryHandler {
  constructor(private readonly usersService: UsersService) {}
  public execute(query: CheckUserPasswordQuery): Promise<boolean> {
    const { email, password } = query;
    return this.usersService.checkPassword(email, password);
  }
}
