import { TokenPayload } from '../interfaces/token-payload.interface';
import { Token } from '../interfaces/token.interface';

export const TOKENIZER_SERVICE_TOKEN = 'TokenizerService';

export interface TokenizerService {
  create(payload: TokenPayload): Promise<Token>;
  decode(token: string): TokenPayload;
}
