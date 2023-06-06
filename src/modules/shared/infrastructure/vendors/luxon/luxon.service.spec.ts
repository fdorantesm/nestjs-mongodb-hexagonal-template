import { Test, TestingModule } from '@nestjs/testing';

import { LuxonService } from './luxon.service';

describe('LuxonService', () => {
  let service: LuxonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuxonService],
    }).compile();

    service = module.get<LuxonService>(LuxonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create Date time object', () => {
    const now = service.create();
    const now2 = new Date();
    expect(now.toDateString()).toBe(now2.toDateString());
  });

  it('Create Date time christmas object', () => {
    const christmas = '2022-12-25T00:00:00';
    const christmasDate = new Date(christmas);
    const christmasDateTime = service.create(new Date(christmas));
    expect(christmasDate.toDateString()).toBe(christmasDateTime.toDateString());
  });

  it('Create Date range pair', () => {
    const minutes = 5;
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const { from, to } = service.withinRange(now, minutes, 'minutes');
    const minuteDifference = Math.round((to.getTime() - from.getTime()) / 60000);
    expect(minuteDifference).toBe(minutes);
  });

  it('Add 1 day to date object', () => {
    const day = 1;
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const future = service.in(now, day, 'day');
    expect(future.getDate() - now.getDate()).toBe(day);
  });
});
