export interface User {
  id: string;
  name: string;
  email: string;
}

export interface IUserRepository {
  FindById(id: string): Promise<User>;
  FindAll(): Promise<User[]>;
  Create(user: User): Promise<void>;
  Update(user: User): Promise<void>;
  Delete(id: string): Promise<void>;
}

export interface IUserUsecase {
  FindById(id: string): Promise<User | null>;
  FindAll(): Promise<User[]>
  Create(user: User): Promise<void>;
  Update(user: User): Promise<void>;
  Delete(id: string): Promise<void>;
}
