import { ApiProperty } from '@nestjs/swagger';

export class Quote {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'The only thing we have to fear is fear itself.' })
  content: string;

  @ApiProperty({ example: 1 })
  authorId: number;
}
