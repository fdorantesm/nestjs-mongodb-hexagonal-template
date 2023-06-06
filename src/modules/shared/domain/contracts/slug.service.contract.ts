export const SLUG_SERVICE_TOKEN = Symbol('SlugService');

export interface SlugService {
  execute(src: string): string;
}
