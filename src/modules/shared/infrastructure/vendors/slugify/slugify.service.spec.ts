import { Test, TestingModule } from '@nestjs/testing';

import { SlugifyService } from './slugify.service';

describe('SlugifyService', () => {
  let service: SlugifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlugifyService],
    }).compile();

    service = module.get<SlugifyService>(SlugifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass if slug for büey is buey', () => {
    const slug = service.execute('büey');
    expect(slug).toBe('buey');
  });
});
