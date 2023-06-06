import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { SES } from '@aws-sdk/client-ses';

import { SesConfiguration } from '@app/common/types/ses/ses-configuration.type';

@Injectable()
export class SesService {
  private config: SesConfiguration;

  constructor(
    private readonly configService: ConfigService,
    @Inject('SES_CLIENT')
    private readonly client: SES,
  ) {
    this.config = this.configService.get<SesConfiguration>('ses');
  }

  public async send(subject: string, to: string[], template: string): Promise<void> {
    const { from, bcc } = this.config;
    this.client.sendEmail(
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
    );

    return undefined;
  }
}
