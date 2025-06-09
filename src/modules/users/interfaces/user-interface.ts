export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface IUserService {
  findById(id: string): Promise<UserResponse | null>;
  findByEmail(email: string): Promise<UserResponse | null>;
  findAll(): Promise<UserResponse[]>;
  update(id: string, data: UpdateUserRequest): Promise<UserResponse>;
  delete(id: string): Promise<void>;
} 