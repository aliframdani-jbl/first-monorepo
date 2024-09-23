import { Request, Response } from 'express';
import { IUserUsecase } from '../model/user';
import { logger } from '../utils/logger';

export class UserHandler {
  constructor(private readonly userUsecase: IUserUsecase) {}

  // Handler for finding a user by ID
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await this.userUsecase.FindById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      logger.error(`Error finding user with ID ${id}: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handler for finding all users
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userUsecase.FindAll();
      return res.status(200).json(users);
    } catch (error) {
      logger.error(`Error finding all users: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handler for creating a new user
  async create(req: Request, res: Response): Promise<Response> {
    const user = req.body;
    try {
      await this.userUsecase.Create(user);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handler for updating a user
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = { ...req.body, id }; // Assuming the `id` from params should be set on the user object
    try {
      await this.userUsecase.Update(user);
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      logger.error(`Error updating user with ID ${id}: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handler for deleting a user by ID
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.userUsecase.Delete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      logger.error(`Error deleting user with ID ${id}: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
