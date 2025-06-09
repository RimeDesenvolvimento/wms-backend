import { 
  IUserService, 
  UpdateUserRequest, 
  UserResponse 
} from '../interfaces/user-interface';

export class UserService implements IUserService {

  async findById(id: string): Promise<UserResponse | null> {
    // TODO: Implementar busca por ID
    throw new Error('Method not implemented');
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    // TODO: Implementar busca por email
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<UserResponse[]> {
    // TODO: Implementar listagem de usuários
    throw new Error('Method not implemented');
  }

  async update(id: string, data: UpdateUserRequest): Promise<UserResponse> {
    // TODO: Implementar atualização de usuário
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO: Implementar exclusão de usuário
    throw new Error('Method not implemented');
  }

  private excludePassword(user: any): UserResponse {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
} 