import { CheckUserPasswordQueryHandler } from './check-user-password/check-user-password.query.handler';
import { FindUserQueryHandler } from './find-user/find-user.query.handler';
import { FindUsersQueryHandler } from './find-users/find-users.query.handler';
import { GetLoginDataQueryHandler } from './get-login-data/get-login-data.query.handler';
import { GetPartnerQueryHandler } from './get-partner/get-partner.query.handler';
import { HeadUserQueryHandler } from './head-user/head-user.query.handler';
import { ListPartnersQueryHandler } from './list-partners/list-partners.query.handler';

export * from './check-user-password/check-user-password.query';
export * from './find-user/find-user.query';
export * from './get-login-data/get-login-data.query';
export * from './get-partner/get-partner.query';
export * from './head-user/head-user.query';
export * from './list-partners/list-partners.query';

export const QueryHandlers = [
  ListPartnersQueryHandler,
  GetPartnerQueryHandler,
  CheckUserPasswordQueryHandler,
  FindUserQueryHandler,
  GetLoginDataQueryHandler,
  HeadUserQueryHandler,
  FindUsersQueryHandler,
];
