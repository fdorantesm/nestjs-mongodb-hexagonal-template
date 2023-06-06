export interface UseCase {
  run(...params: unknown[]): Promise<unknown>;
}
