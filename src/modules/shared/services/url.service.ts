import { URL } from 'url';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  public getPath(uri: string, slash = false) {
    const url = new URL(uri);
    return slash ? url.pathname : url.pathname.substring(1);
  }
}
