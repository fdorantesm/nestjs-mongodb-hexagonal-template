import { TOKENIZER_SERVICE_TOKEN } from 'src/modules/auth/domain/contracts/tokenizer.service.contract';
import { JwtService as Jwt } from './services/jwt.service';

export const JwtService = {
  provide: TOKENIZER_SERVICE_TOKEN,
  useClass: Jwt,
};
