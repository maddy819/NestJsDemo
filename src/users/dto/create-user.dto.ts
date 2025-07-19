import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Marcus Aurelius' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'marcus@stoic.com' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}
