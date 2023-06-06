import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  public getExtension(filename: string): string | undefined {
    const extension = filename.split('.').pop();
    return extension;
  }

  public getOriginalName(originalName: string): string | undefined {
    const ext = this.getExtension(originalName);
    return originalName.replace(`.${ext}`, '');
  }

  public getUniqueName(originalName: string): string | undefined {
    const time = Date.now();
    const random = Math.random().toString(36).substring(2);
    const name = this.getOriginalName(originalName);
    const ext = this.getExtension(originalName);
    return `${time}-${name}-${random}.${ext}`;
  }
}
