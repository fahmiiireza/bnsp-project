import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryItem } from './entities/library-item.entity';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { BorrowRecord } from './entities/borrow-record.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { FileLoggerModule } from '../common/file-logger/file-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibraryItem, Book, Member, BorrowRecord]),
    FileLoggerModule,
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
