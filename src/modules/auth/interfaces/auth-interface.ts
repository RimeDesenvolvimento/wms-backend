export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface IAuthService {
  login(data: LoginRequest): Promise<AuthResponse>;
  register(data: RegisterRequest): Promise<AuthResponse>;
  validateToken(token: string): Promise<AuthPayload>;
  refreshToken(token: string): Promise<string>;
} 