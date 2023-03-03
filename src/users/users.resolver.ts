import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/@generated/user/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  GetUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
