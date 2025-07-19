import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [UsersModule, QuotesModule],
})
export class AppModule {}
