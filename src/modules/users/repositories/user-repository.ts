import { prisma } from "@/lib/prisma";
import { User } from "../interfaces/user-interface";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}