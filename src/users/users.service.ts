import { Injectable } from '@nestjs/common';
import { User } from 'prisma/@generated/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
