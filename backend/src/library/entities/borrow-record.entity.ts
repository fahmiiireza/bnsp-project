import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IBorrowRecord } from '../../common/interfaces';
import { LibraryItem } from './library-item.entity';
import { Member } from './member.entity';

/**
 * BorrowRecord entity representing a borrowing transaction.
 */
@Entity('borrow_records')
export class BorrowRecord implements IBorrowRecord {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => LibraryItem, { eager: true })
  @JoinColumn({ name: 'itemId' })
  public item: LibraryItem;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({ name: 'memberId' })
  public member: Member;

  @Index()
  @Column({ type: 'date' })
  public borrowDate: Date;

  @Column({ type: 'date' })
  public expectedReturnDate: Date;

  @Column({ type: 'date', nullable: true })
  public actualReturnDate: Date | null;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  /**
   * Calculates the penalty based on days late.
   * @param {number} daysLate - The number of days the item is late.
   * @returns {number} The calculated penalty amount.
   */
  public calculatePenalty(daysLate: number): number {
    if (daysLate <= 0) {
      return 0;
    }
    const penaltyPerDay = 5000; // Example: 5000 units per day
    return daysLate * penaltyPerDay;
  }
}
