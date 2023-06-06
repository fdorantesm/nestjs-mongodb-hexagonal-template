import { SetMetadata } from '@nestjs/common';

export const Scopes = function (...scopes: string[]) {
  return SetMetadata('scopes', scopes);
};
