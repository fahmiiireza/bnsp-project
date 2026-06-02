import { Controller, Post, Body, Get } from '@nestjs/common';
import { LibraryService } from './library.service';
import { ArrayUtils } from '../common/utils/array-utils';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  /**
   * Endpoint to record a borrowed collection.
   */
  @Post('borrow')
  async borrowItem(@Body('memberId') memberId: number, @Body('itemId') itemId: number) {
    return this.libraryService.borrowItem(memberId, itemId);
  }

  /**
   * Endpoint to get public catalog.
   */
  @Get('catalog')
  async getCatalog() {
    const books = await this.libraryService.getAllBooks();
    // Use manual ArrayUtils to sort books by ID for demonstration
    const ids = books.map(b => b.id);
    const sortedIds = ArrayUtils.sortNumbers(ids, 'asc');
    
    // Sort the actual objects using the sorted IDs
    const sortedBooks = sortedIds.map(id => {
      const match = ArrayUtils.filterByProperty(books, 'id', id);
      return match[0];
    });

    return sortedBooks;
  }
}
