import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QuotesService } from 'src/quotes/quotes.service';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @Inject(forwardRef(() => QuotesService))
    private readonly quotesService: QuotesService,
  ) {}

  findAll(): User[] {
    return this.users;
  }

  findAllWithQuotes(): any[] {
    return this.users.map((user) => ({
      ...user,
      quotes: this.quotesService.findByUser(user.id),
    }));
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };
    return this.users[index];
  }

  delete(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
