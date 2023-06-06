import { IQuery } from '@nestjs/cqrs';

export class CheckUserPasswordQuery implements IQuery {
  constructor(public email: string, public password: string) {}
}
