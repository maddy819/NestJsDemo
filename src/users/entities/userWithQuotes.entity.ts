import { Quote } from 'src/quotes/entities/quote.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithQuotes {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Marcus Aurelius' })
  name: string;

  @ApiProperty({ example: 'marcus@stoic.com' })
  email: string;

  @ApiProperty({ type: () => [Quote] })
  quotes: Quote[];
}
