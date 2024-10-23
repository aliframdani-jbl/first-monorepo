import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { IDatabase } from './database';

export class PostgreSQL implements IDatabase{
  private pool: Pool;

  constructor() {
    console.log(path.resolve(__dirname, '../.env'))
    console.log(process.env.DB_PASSWORD)
    console.log(process.env.DB_USER)

    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
    });
  }

  public async query<T>(
    queryText: string,
    params?: (string | number | null)[]
  ): Promise<T> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryText, params);
      switch (result.rowCount) {
        case 0:
          return null;
        case 1:
          return result.rows[0] as T;
        default:
          return result.rows as T;
      }
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async ping(): Promise<Error> {
    try {
      await this.query('SELECT 1');
    } catch (error) {
      return error
    }
  }

  public async closePool(): Promise<void> {
    await this.pool.end();
    console.log('Database connection pool closed');
  }
}
