export interface TokenPayload {
  id: string;

  scopes: string[];
  iat?: number;

  exp?: number;
}
