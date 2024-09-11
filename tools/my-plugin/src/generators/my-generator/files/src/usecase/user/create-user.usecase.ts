import { User } from "../../model/user-model";
import { UserRepository } from "../../repository/user-repository";

export class FindUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }
}