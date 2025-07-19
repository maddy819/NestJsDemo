import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class QuotesService {
  private quotes: Quote[] = [];

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  create(userId: number, dto: CreateQuoteDto): Quote {
    const user = this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const newQuote: Quote = {
      id: this.quotes.length + 1,
      content: dto.content,
      authorId: userId,
    };
    this.quotes.push(newQuote);
    return newQuote;
  }

  findAll(): Quote[] {
    return this.quotes;
  }

  findByUser(userId: number): Quote[] {
    return this.quotes.filter((q) => q.authorId === userId);
  }

  findOne(id: number): Quote {
    const quote = this.quotes.find((q) => q.id === id);
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  update(id: number, dto: UpdateQuoteDto): Quote {
    const quote = this.findOne(id);
    Object.assign(quote, dto);
    return quote;
  }

  delete(id: number): void {
    const index = this.quotes.findIndex((q) => q.id === id);
    if (index === -1) throw new NotFoundException('Quote not found');
    this.quotes.splice(index, 1);
  }
}
