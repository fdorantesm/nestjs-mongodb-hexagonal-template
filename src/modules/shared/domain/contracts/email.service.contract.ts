export const EMAIL_SERVICE_TOKEN = Symbol('EmailService');

export interface EmailService {
  send(subject: string, to: string[], template: string): Promise<void>;
}
