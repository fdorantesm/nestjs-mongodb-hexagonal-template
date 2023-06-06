export const TEMPLATE_SERVICE_TOKEN = Symbol('TemplateService');

export interface TemplateService {
  render(template: string, data?: { [key: string]: any }): string;
}
