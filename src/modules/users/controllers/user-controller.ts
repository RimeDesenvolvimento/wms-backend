import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { 
  CreateUserSchema, 
  UpdateUserSchema, 
  UserParamsSchema 
} from '../models/user-model';

export class UserController {
  constructor(private userService: UserService) {}

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = UserParamsSchema.parse(req.params);
      const result = await this.userService.findById(id);
      
      if (!result) {
        const response = {
          success: false,
          error: 'User not found',
        };
        res.status(404).json(response);
        return;
      }

      const response = {
        success: true,
        data: result,
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to find user',
      };

      res.status(400).json(response);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.findAll();
      
      const response = {
        success: true,
        data: result,
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      };

      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = UserParamsSchema.parse(req.params);
      const validatedData = UpdateUserSchema.parse(req.body);
      const result = await this.userService.update(id, validatedData);
      
      const response = {
        success: true,
        data: result,
        message: 'User updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update user',
      };

      res.status(400).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = UserParamsSchema.parse(req.params);
      await this.userService.delete(id);
      
      const response = {
        success: true,
        message: 'User deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user',
      };

      res.status(400).json(response);
    }
  }
} 