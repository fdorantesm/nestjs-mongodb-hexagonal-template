export const DATE_SERVICE_TOKEN = Symbol('DateService');

export interface DateService {
  create(date?: Date): Date;
  withinRange(date: Date, value: number, unit: string): { from: Date; to: Date };
  in(date: Date, value: number, unit: string): Date;
}
