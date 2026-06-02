import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { IMember } from '../../common/interfaces';
import { BorrowRecord } from './borrow-record.entity';

/**
 * Member entity representing library members.
 */
@Entity('members')
export class Member implements IMember {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  public email: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => BorrowRecord, (record) => record.member)
  public borrowRecords: BorrowRecord[];
}
