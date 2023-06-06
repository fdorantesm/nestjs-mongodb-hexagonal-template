import { Test, TestingModule } from '@nestjs/testing';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
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
