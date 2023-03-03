import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserModel } from './dto/get-user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<GetUserModel[]> {
    return this.prisma.extended.user.findMany();
  }
}
