export interface IDatabase {
    query<T>(queryText: string, params?: (string | number | null)[]): Promise<T>;
    ping(): Promise<Error>;
}