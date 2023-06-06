import { Test, TestingModule } from '@nestjs/testing';

import { UuidGeneratorService } from './uuid-generator.service';

describe('IdGeneratorService', () => {
  let service: UuidGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidGeneratorService],
    }).compile();

    service = module.get<UuidGeneratorService>(UuidGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
