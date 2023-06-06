import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  public health(): void {
    Logger.log('HealthCheck', HealthService.name);
  }
}
