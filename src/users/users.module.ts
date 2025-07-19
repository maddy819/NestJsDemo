import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { QuotesModule } from '../quotes/quotes.module';

@Module({
  imports: [forwardRef(() => QuotesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // ✅ this must be exported
})
export class UsersModule {}
