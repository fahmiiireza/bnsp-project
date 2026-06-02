import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { LibraryItem } from './entities/library-item.entity';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { BorrowRecord } from './entities/borrow-record.entity';
import { FileLoggerService } from '../common/file-logger/file-logger.service';
import { ArrayUtils } from '../common/utils/array-utils';

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
   * Returns a borrowed item by borrow record ID.
   * @param {number} recordId - The ID of the borrow record.
   * @returns {Promise<BorrowRecord>} The updated borrow record.
   */
  public async returnItem(recordId: number): Promise<BorrowRecord> {
    try {
      const record = await this.borrowRecordRepository.findOne({
        where: { id: recordId },
        relations: ['item', 'member'],
      });

      if (!record) {
        throw new NotFoundException('Borrow record not found');
      }

      if (record.actualReturnDate) {
        throw new BadRequestException('Item has already been returned');
      }

      record.actualReturnDate = new Date();
      record.item.isAvailable = true;

      await this.libraryItemRepository.save(record.item);
      const savedRecord = await this.borrowRecordRepository.save(record);

      this.fileLogger.writeLog(`Record ${recordId} returned. Item ${record.item.id} is now available.`);

      return savedRecord;
    } catch (error) {
      this.fileLogger.writeLog(`Error returning item: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves all books using ArrayUtils sorting logic.
   * @returns {Promise<Book[]>} List of all books sorted by ID ascending.
   */
  public async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    const ids = books.map((b) => b.id);
    const sortedIds = ArrayUtils.sortNumbers(ids, 'asc');
    return sortedIds.map((id) => ArrayUtils.filterByProperty(books, 'id', id)[0]);
  }

  /**
   * Retrieves all members.
   * @returns {Promise<Member[]>} List of all members.
   */
  public async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  /**
   * Retrieves all borrow records (active and returned), most recent first.
   * @returns {Promise<BorrowRecord[]>} List of all borrow records.
   */
  public async getAllBorrowRecords(): Promise<BorrowRecord[]> {
    return this.borrowRecordRepository.find({
      relations: ['item', 'member'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Retrieves library dashboard statistics.
   */
  public async getStats(): Promise<{
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    totalMembers: number;
    activeLoans: number;
  }> {
    const totalBooks = await this.bookRepository.count();
    const availableBooks = await this.bookRepository.count({ where: { isAvailable: true } });
    const totalMembers = await this.memberRepository.count();
    const activeLoans = await this.borrowRecordRepository.count({
      where: { actualReturnDate: IsNull() },
    });

    return {
      totalBooks,
      availableBooks,
      borrowedBooks: totalBooks - availableBooks,
      totalMembers,
      activeLoans,
    };
  }
}
