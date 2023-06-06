import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { SES } from '@aws-sdk/client-ses';

import { SesService } from './ses.service';
import { emailConfig, sesConfig } from './ses.mocks';

describe('SesService', () => {
  let sesService: SesService;
  let ses: SES;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              ses: {
                ...sesConfig,
                ...emailConfig,
              },
            }),
          ],
        }),
      ],
      providers: [
        SesService,
        {
          provide: 'SES_CLIENT',
          useValue: {
            sendEmail: jest.fn().mockResolvedValue({ promise: jest.fn() }),
          },
        },
      ],
    }).compile();

    sesService = moduleRef.get<SesService>(SesService);
    ses = moduleRef.get<SES>('SES_CLIENT');
  });

  describe('send', () => {
    it('should send an email successfully', async () => {
      const from = emailConfig.from;
      const subject = 'Test Subject';
      const to = ['user@test.com'];

      await sesService.send(subject, to, emailConfig.template);

      expect(ses.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          Source: from,
          Destination: {
            ToAddresses: to,
            BccAddresses: emailConfig.bcc,
          },
          Message: {
            Body: {
              Html: {
                Data: emailConfig.template,
              },
            },
            Subject: {
              Data: emailConfig.subject,
            },
          },
        }),
        null,
      );
    });
  });
});
