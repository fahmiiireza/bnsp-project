import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  /**
   * GET /library/stats - Dashboard statistics.
   */
  @Get('stats')
  async getStats() {
    return this.libraryService.getStats();
  }

  /**
   * GET /library/catalog - Public catalog of all books.
   */
  @Get('catalog')
  async getCatalog() {
    return this.libraryService.getAllBooks();
  }

  /**
   * GET /library/members - List of all registered members.
   */
  @Get('members')
  async getMembers() {
    return this.libraryService.getAllMembers();
  }

  /**
   * GET /library/borrow-records - All borrow records.
   */
  @Get('borrow-records')
  async getBorrowRecords() {
    return this.libraryService.getAllBorrowRecords();
  }

  /**
   * POST /library/borrow - Record a new borrowing transaction.
   */
  @Post('borrow')
  async borrowItem(@Body('memberId') memberId: number, @Body('itemId') itemId: number) {
    return this.libraryService.borrowItem(memberId, itemId);
  }

  /**
   * POST /library/return/:recordId - Return a borrowed item.
   */
  @Post('return/:recordId')
  async returnItem(@Param('recordId', ParseIntPipe) recordId: number) {
    return this.libraryService.returnItem(recordId);
  }
}
