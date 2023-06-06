export const PASSWORD_SERVICE_TOKEN = Symbol('PasswordService');

export interface PasswordService {
  generate(value: string, salts?: number): Promise<string>;
  match(source: string, hash: string): Promise<boolean>;
}
