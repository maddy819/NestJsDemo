import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserWithQuotes } from './entities/userWithQuotes.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of users',
    type: User,
    isArray: true,
  })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get('with-quotes')
  @ApiOkResponse({
    description: 'Users with their quotes',
    type: UserWithQuotes,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all users with their quotes' })
  findAllWithQuotes() {
    return this.usersService.findAllWithQuotes();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'A newly created user',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({
    description: 'An updated user',
    type: User,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    const updatedUser = this.usersService.update(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({
    description: 'A deleted user',
    type: User,
  })
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    const deleted = this.usersService.delete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
