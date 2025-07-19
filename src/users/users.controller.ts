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
  InternalServerErrorException,
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
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get('with-quotes')
  @ApiOkResponse({
    description: 'Users with their quotes',
    type: UserWithQuotes,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all users with their quotes' })
  findAllWithQuotes(): UserWithQuotes[] {
    try {
      return this.usersService.findAllWithQuotes();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch users with quotes',
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({
    description: 'A user',
    type: User,
  })
  findOne(@Param('id') id: number): User {
    try {
      const user = this.usersService.findOne(id);
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'A newly created user',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): User {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
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
    try {
      const updatedUser = this.usersService.update(id, updateUserDto);
      if (!updatedUser) throw new NotFoundException('User not found');
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({
    description: 'A deleted user',
    type: User,
  })
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    try {
      const deleted = this.usersService.delete(id);
      if (!deleted) throw new NotFoundException('User not found');
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
