import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { DateService } from 'src/modules/shared/domain/contracts/date.service.contract';

@Injectable()
export class LuxonService implements DateService {
  public create(date?: Date): Date {
    const instance = (date ? DateTime.fromJSDate(date) : DateTime.now()).toUTC();

    return instance.toJSDate();
  }

  public withinRange(date: Date, value: number, unit: string): { from: Date; to: Date } {
    const from = this.create(date);
    const to = DateTime.fromJSDate(from)
      .plus({ [unit]: value })
      .toJSDate();
    return { from, to };
  }

  public in(date: Date, value: number, unit: string): Date {
    const now = DateTime.fromJSDate(date);
    return now.plus({ [unit]: value }).toJSDate();
  }
}
