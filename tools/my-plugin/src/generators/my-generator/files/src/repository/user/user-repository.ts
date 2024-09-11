import { Result } from "../../model/common";
import { User, IUserRepository } from "../../model/user-model";

export class UserRepository implements IUserRepository {
    constructor(private readonly db: Database) {
    }
  
    async FindById(id: string): Promise<Result<User, Error>> { 
        return null;
    }

    async Create(user: User): Promise<Result<void, Error>> {
        return null;
    }
        
 
    async Update(user: User): Promise<Result<void, Error>> {
        return null;
    }

    async Delete(id: string): Promise<Result<void, Error>> {
        return null;
    }
}