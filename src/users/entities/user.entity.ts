import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Marcus Aurelius' })
  name: string;

  @ApiProperty({ example: 'marcus@stoic.com' })
  email: string;
}
