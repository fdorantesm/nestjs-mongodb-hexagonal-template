import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  public generate(value: string, salts = 1): Promise<string> {
    return bcrypt.hash(value, salts);
  }

  public match(source: string, hash: string): Promise<boolean> {
    return bcrypt.compare(source, hash);
  }
}
