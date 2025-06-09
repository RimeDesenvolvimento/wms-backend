import { 
  IAuthService, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  AuthPayload 
} from '../interfaces/auth-interface';
import jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
  async login(data: LoginRequest): Promise<AuthResponse> {
    // TODO: Implementar lógica de login
    throw new Error('Method not implemented');
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // TODO: Implementar lógica de registro
    throw new Error('Method not implemented');
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
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '24h',
    });
  }
} 