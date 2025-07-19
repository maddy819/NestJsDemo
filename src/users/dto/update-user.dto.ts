import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Marcus Aurelius' })
  @IsOptional()
  @MinLength(2, { message: 'Name should be at least 2 characters' })
  name?: string;

  @ApiProperty({ example: 'marcus@stoic.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
}
