import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PasswordService } from 'src/modules/users/domain/contracts/password.service.contract';

@Injectable()
export class BcryptService implements PasswordService {
  public generate(value: string, salts = 1): Promise<string> {
    return bcrypt.hash(value, salts);
  }

  public match(source: string, hash: string): Promise<boolean> {
    return bcrypt.compare(source, hash);
  }
}
