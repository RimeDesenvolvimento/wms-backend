import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';
import { LoginSchema, RegisterSchema } from '../models/auth-model';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = LoginSchema.parse(req.body);
      const result = await this.authService.login(validatedData);
      
      const response = {
        success: true,
        data: result,
        message: 'Login successful',
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };

      res.status(401).json(response);
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = RegisterSchema.parse(req.body);
      const result = await this.authService.register(validatedData);
      
      const response = {
        success: true,
        data: result,
        message: 'Registration successful',
      };

      res.status(201).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };

      res.status(400).json(response);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      const newToken = await this.authService.refreshToken(token);
      
      const response = {
        success: true,
        data: { token: newToken },
        message: 'Token refreshed successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed',
      };

      res.status(401).json(response);
    }
  }
} 