import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({
    example: 'You have power over your mind – not outside events.',
  })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;
}
