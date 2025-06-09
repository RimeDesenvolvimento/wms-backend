import { 
  IUserService, 
  UpdateUserRequest, 
  UserResponse 
} from '../interfaces/user-interface';
import { UserRepository } from '../repositories/user-repository';

export class UserService implements IUserService {

  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();

    return users;
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