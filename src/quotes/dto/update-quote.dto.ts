import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateQuoteDto {
  @ApiProperty({
    example: 'You have power over your mind – not outside events.',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  content?: string;
}
