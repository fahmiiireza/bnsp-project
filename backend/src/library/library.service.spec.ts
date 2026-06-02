import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from './library.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LibraryItem } from './entities/library-item.entity';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { BorrowRecord } from './entities/borrow-record.entity';
import { FileLoggerService } from '../common/file-logger/file-logger.service';

describe('LibraryService', () => {
  let service: LibraryService;

  const mockLibraryItemRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const mockBookRepository = {
    find: jest.fn(),
  };

  const mockMemberRepository = {
    findOneBy: jest.fn(),
  };

  const mockBorrowRecordRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockFileLoggerService = {
    writeLog: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryService,
        { provide: getRepositoryToken(LibraryItem), useValue: mockLibraryItemRepository },
        { provide: getRepositoryToken(Book), useValue: mockBookRepository },
        { provide: getRepositoryToken(Member), useValue: mockMemberRepository },
        { provide: getRepositoryToken(BorrowRecord), useValue: mockBorrowRecordRepository },
        { provide: FileLoggerService, useValue: mockFileLoggerService },
      ],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('borrowItem', () => {
    it('should calculate return date exactly 7 days from borrow date', async () => {
      const mockMember = new Member();
      mockMember.id = 1;
      
      const mockBook = new Book();
      mockBook.id = 1;
      mockBook.isAvailable = true;
      
      mockMemberRepository.findOneBy.mockResolvedValue(mockMember);
      mockLibraryItemRepository.findOneBy.mockResolvedValue(mockBook);
      mockLibraryItemRepository.save.mockResolvedValue({ ...mockBook, isAvailable: false });
      
      let createdRecord: any;
      mockBorrowRecordRepository.create.mockImplementation((record) => {
        createdRecord = record;
        return record;
      });
      mockBorrowRecordRepository.save.mockImplementation((record) => Promise.resolve(record));

      const result = await service.borrowItem(1, 1);
      
      expect(result).toBeDefined();
      expect(result.borrowDate).toBeInstanceOf(Date);
      expect(result.expectedReturnDate).toBeInstanceOf(Date);
      
      const diffTime = Math.abs(result.expectedReturnDate.getTime() - result.borrowDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(7);
      expect(mockFileLoggerService.writeLog).toHaveBeenCalled();
    });

    it('should throw an error if item is not available', async () => {
      const mockMember = new Member();
      mockMember.id = 1;
      
      const mockBook = new Book();
      mockBook.id = 1;
      mockBook.isAvailable = false;
      
      mockMemberRepository.findOneBy.mockResolvedValue(mockMember);
      mockLibraryItemRepository.findOneBy.mockResolvedValue(mockBook);

      await expect(service.borrowItem(1, 1)).rejects.toThrow('Item is not available for borrowing');
    });
  });
});
