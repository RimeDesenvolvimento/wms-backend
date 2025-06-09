import { 
  IAuthService, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  AuthPayload 
} from '../interfaces/auth-interface';
import jwt from 'jsonwebtoken';
import { UserService } from '@/modules/users/services/user-service';
import { AuthRepository } from '../repositories/auth-repository';
import { compare, hash } from 'bcryptjs';
import { env } from '@/env';

export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    const userExists = await this.userService.findByEmail(data.email);

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.authRepository.login(data);

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken({ userId: user.id, email: user.email });

    return {
      user,
      token,
    };
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const userAlreadyExists = await this.userService.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(data.password, 8);

    const user = await this.authRepository.register({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken({ userId: user.id, email: user.email });

    return {
      user,
      token,
    };
  }

  async validateToken(token: string): Promise<AuthPayload> {
    // TODO: Implementar validação de token
    throw new Error('Method not implemented');
  }

  async refreshToken(token: string): Promise<string> {
    // TODO: Implementar refresh token
    throw new Error('Method not implemented');
  }

  private generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }
} 