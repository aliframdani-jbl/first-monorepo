import { IDatabase } from '../database/database';
import { User, IUserRepository } from '../model/user';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: IDatabase) {}

  async FindById(id: string): Promise<User> {
    const res = await this.db.query<User>('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return res;
  }

  async FindAll(): Promise<User[]> {
    return await this.db.query<User[]>('SELECT * FROM users');
  }

  async Create(user: User): Promise<void> {
    await this.db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [user.name, user.email]
    );
  }

  async Update(user: User): Promise<void> {
    await this.db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [user.name, user.email, user.id]
    );
  }

  async Delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
