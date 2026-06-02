import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, TableInheritance, Index } from 'typeorm';
import { ILibraryItem } from '../../common/interfaces';

/**
 * Abstract base class for Library Items.
 * Demonstrates inheritance and polymorphism in database mapping using TypeORM Single Table Inheritance.
 */
@Entity('library_items')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class LibraryItem implements ILibraryItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  public title: string;

  @Column({ type: 'boolean', default: true })
  public isAvailable: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  /**
   * Abstract method representing polymorphism. Each derived class must implement it.
   */
  public abstract getItemType(): string;
}
