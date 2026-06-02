import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryItem } from './entities/library-item.entity';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { BorrowRecord } from './entities/borrow-record.entity';
import { FileLoggerService } from '../common/file-logger/file-logger.service';

/**
 * Service for Library operations.
 */
@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(LibraryItem)
    private readonly libraryItemRepository: Repository<LibraryItem>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(BorrowRecord)
    private readonly borrowRecordRepository: Repository<BorrowRecord>,
    private readonly fileLogger: FileLoggerService,
  ) {}

  /**
   * Borrows an item for a member.
   * @param {number} memberId - The ID of the member.
   * @param {number} itemId - The ID of the library item.
   * @returns {Promise<BorrowRecord>} The created borrow record.
   */
  public async borrowItem(memberId: number, itemId: number): Promise<BorrowRecord> {
    try {
      const member = await this.memberRepository.findOneBy({ id: memberId });
      if (!member) {
        throw new NotFoundException('Member not found');
      }

      const item = await this.libraryItemRepository.findOneBy({ id: itemId });
      if (!item) {
        throw new NotFoundException('Library item not found');
      }

      if (!item.isAvailable) {
        throw new BadRequestException('Item is not available for borrowing');
      }

      // Calculate the required return date exactly 7 days from the transaction date
      const borrowDate = new Date();
      const expectedReturnDate = new Date(borrowDate);
      expectedReturnDate.setDate(borrowDate.getDate() + 7);

      const record = this.borrowRecordRepository.create({
        member,
        item,
        borrowDate,
        expectedReturnDate,
      });

      // Update item availability
      item.isAvailable = false;
      await this.libraryItemRepository.save(item);

      const savedRecord = await this.borrowRecordRepository.save(record);
      
      this.fileLogger.writeLog(`Item ${itemId} borrowed by member ${memberId}. Expected return: ${expectedReturnDate.toISOString()}`);
      
      return savedRecord;
    } catch (error) {
      this.fileLogger.writeLog(`Error borrowing item: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves all books using ArrayUtils sorting logic just to demonstrate array handling.
   * @returns {Promise<Book[]>} List of all books.
   */
  public async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    return books;
  }
}
