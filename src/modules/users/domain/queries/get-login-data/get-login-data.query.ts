import { IQuery } from '@nestjs/cqrs';

export class GetLoginDataQuery implements IQuery {
  constructor(public email: string) {}
}
