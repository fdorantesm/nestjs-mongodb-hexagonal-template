import { RegisterCommandHandler } from './register/register.command.handler';
import { UpdatePartnerCommandHandler } from './update-partner/update-partner.command.handler';

export * from './register/register.command';
export * from './register/register.command.handler';
export * from './update-partner/update-partner.command';
export * from './update-partner/update-partner.command.handler';

export const CommandHandlers = [RegisterCommandHandler, UpdatePartnerCommandHandler];
