import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './library/library.module';
import { FileLoggerModule } from './common/file-logger/file-logger.module';
import { LibraryItem } from './library/entities/library-item.entity';
import { Book } from './library/entities/book.entity';
import { Member } from './library/entities/member.entity';
import { BorrowRecord } from './library/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === 'test' ? 'sqlite' : 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: process.env.NODE_ENV === 'test' ? ':memory:' : 'library_db',
      entities: [LibraryItem, Book, Member, BorrowRecord],
      synchronize: true, // Use only in development
    }),
    LibraryModule,
    FileLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
