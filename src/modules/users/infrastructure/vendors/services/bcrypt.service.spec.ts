import { Test, TestingModule } from '@nestjs/testing';

import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a password', async () => {
    const password = 'secret';
    const hash = await service.generate(password, 10);
    const isValidPassword = await service.match(password, hash);
    expect(isValidPassword).toBeTruthy();
  });
});
