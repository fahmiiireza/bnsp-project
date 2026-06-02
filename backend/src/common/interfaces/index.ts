export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILibraryItem extends IBaseEntity {
  title: string;
  isAvailable: boolean;
  getItemType(): string;
}

export interface IMember extends IBaseEntity {
  name: string;
  email: string;
  isActive: boolean;
}

export interface IBorrowRecord extends IBaseEntity {
  item: ILibraryItem;
  member: IMember;
  borrowDate: Date;
  expectedReturnDate: Date;
  actualReturnDate: Date | null;
  calculatePenalty(daysLate: number): number;
}
