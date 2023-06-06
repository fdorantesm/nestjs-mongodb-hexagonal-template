import { Injectable } from '@nestjs/common';
import { URL } from 'url';

@Injectable()
export class UrlService {
  public getPath(uri: string, slash = false) {
    const url = new URL(uri);
    return slash ? url.pathname : url.pathname.substring(1);
  }
}
