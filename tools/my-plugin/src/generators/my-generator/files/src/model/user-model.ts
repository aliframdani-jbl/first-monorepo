import { Result } from "./common";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface IUserRepository {
    FindById(id: string): Promise<Result<User, Error>>;
    Create(user: User): Promise<Result<void, Error>>;
    Update(user: User): Promise<Result<void, Error>>;
    Delete(id: string): Promise<Result<void, Error>>;
}

