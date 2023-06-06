import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectSES, SES } from '@pluzchat/nestjs-ses';

import { EmailConfig } from '@thp/common/types/email/email.type';

@Injectable()
export class EmailService {
  constructor(@InjectSES() private readonly ses: SES, private readonly configService: ConfigService) {}

  public async send(subject: string, to: string[], template: string) {
    const config = this.configService.get<EmailConfig>('email');
    const { from, bcc } = config;
    const response = await this.ses
      .sendEmail(
        {
          Source: from,
          Destination: {
            ToAddresses: to,
            BccAddresses: bcc,
          },
          Message: {
            Body: {
              Html: {
                Data: template,
              },
            },
            Subject: {
              Data: subject,
            },
          },
        },
        null,
      )
      .promise();

    return response.$response.data;
  }
}
