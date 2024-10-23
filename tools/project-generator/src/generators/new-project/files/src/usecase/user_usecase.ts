import { IUserRepository, IUserUsecase } from '../model/user';
import { User } from '../model/user';
import { logger } from '../utils/logger';

export class UserUsecase implements IUserUsecase {
  constructor(private readonly userRepo: IUserRepository) {}

  async FindById(id: string): Promise<User | null> {
    try {
      return await this.userRepo.FindById(id);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async FindAll(): Promise<User[]> {
    try {
      return await this.userRepo.FindAll();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }


  async Create(user: User): Promise<void> {
    try {
      return await this.userRepo.Create(user);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async Update(user: User): Promise<void> {
    try {
      return await this.userRepo.Update(user);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async Delete(id: string): Promise<void> {
    try {
      return await this.userRepo.Delete(id);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
