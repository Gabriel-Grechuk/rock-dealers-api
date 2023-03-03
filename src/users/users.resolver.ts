import { Query, Resolver } from '@nestjs/graphql';
import { GetUserModel } from './dto/get-user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [GetUserModel])
  GetUsers(): Promise<GetUserModel[]> {
    return this.usersService.getUsers();
  }
}
