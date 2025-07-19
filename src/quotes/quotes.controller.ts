import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Quote } from './entities/quote.entity';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiOkResponse({
    description: 'A newly created quote',
    type: Quote,
  })
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateQuoteDto,
  ): Quote {
    try {
      return this.quotesService.create(userId, dto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create quote');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  @ApiOkResponse({
    description: 'List of quotes',
    type: Quote,
    isArray: true,
  })
  getAll(): Quote[] {
    try {
      return this.quotesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch quotes');
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all quotes by a user' })
  @ApiOkResponse({
    description: 'List of quotes by user',
    type: Quote,
    isArray: true,
  })
  getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.quotesService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  @ApiOkResponse({
    description: 'A quote',
    type: Quote,
  })
  findOne(@Param('id') id: number): Quote {
    try {
      const quote = this.quotesService.findOne(id);
      if (!quote) throw new NotFoundException(`Quote with ID ${id} not found`);
      return quote;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch quote');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quote' })
  @ApiOkResponse({
    description: 'An updated quote',
    type: Quote,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ): Quote {
    try {
      const updatedQuote = this.quotesService.update(id, dto);
      if (!updatedQuote) throw new NotFoundException('Quote not found');
      return updatedQuote;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update quote');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quote' })
  @ApiOkResponse({
    description: 'Quote deleted successfully',
  })
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    try {
      this.quotesService.delete(id);
      return { message: 'Quote deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete quote');
    }
  }
}
