import { prisma } from "@/lib/prisma";
import { LoginRequest, RegisterRequest } from "../interfaces/auth-interface";
import { User } from "@/modules/users/interfaces/user-interface";

export class AuthRepository {
  async register(data: RegisterRequest): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async login(data: LoginRequest): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}