import { Injectable } from '@nestjs/common';

@Injectable()
export class TitlelizerService {
  public exec(slug: string): string {
    const result = slug.replace(/-/g, ' ');
    return result.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }
}
