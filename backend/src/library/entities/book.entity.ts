import { ChildEntity, Column } from 'typeorm';
import { LibraryItem } from './library-item.entity';

/**
 * Book class derived from LibraryItem.
 * Demonstrates inheritance and encapsulation.
 */
@ChildEntity()
export class Book extends LibraryItem {
  @Column({ type: 'varchar', length: 255, nullable: true })
  public author: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public isbn: string;

  /**
   * Implements the abstract method from LibraryItem.
   * Demonstrates polymorphism.
   * @returns {string} The type of the item.
   */
  public getItemType(): string {
    return 'Book';
  }
}
