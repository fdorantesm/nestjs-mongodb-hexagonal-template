import { ICommand } from '@nestjs/cqrs';
import { User } from '../../interfaces/user.interface';

export class RegisterCommand implements ICommand {
  constructor(public readonly user: Omit<User, 'uuid'>) {}
}
