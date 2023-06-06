import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { HealthModule } from 'src/modules/health/health.module';
import { CoreModule } from 'src/core/core.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /health', () => {
    return request(app.getHttpServer()).get('/health').expect(HttpStatus.NO_CONTENT);
  });
});
