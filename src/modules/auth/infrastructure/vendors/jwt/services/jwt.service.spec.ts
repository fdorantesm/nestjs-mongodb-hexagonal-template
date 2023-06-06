import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from './jwt.service';

describe('TokenService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'secret',
          signOptions: {
            expiresIn: '1d',
          },
        }),
      ],
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a jwt token', async () => {
    const id = 'b0093421-f622-492d-a9ea-12e901f93b51';
    const result = await service.create({
      id,
      scopes: [],
    });

    const value = service.decode(result.accessToken);

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('expiresAt');
    expect(typeof result.expiresAt).toBe('number');
    expect(value.id).toBe(id);
  });
});
