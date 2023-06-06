export interface UseCase {
  execute(...params: unknown[]): Promise<unknown>;
}
