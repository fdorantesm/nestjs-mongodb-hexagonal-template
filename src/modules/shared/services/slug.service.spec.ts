import { Test, TestingModule } from '@nestjs/testing';

import { SlugService } from './slug.service';

describe('SlugService', () => {
  let service: SlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlugService],
    }).compile();

    service = module.get<SlugService>(SlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass if slug for büey is buey', () => {
    const slug = service.exec('büey');
    expect(slug).toBe('buey');
  });
});
