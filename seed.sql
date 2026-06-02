USE library_db;

-- Clear existing data to avoid duplicates if run multiple times
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE borrow_records;
TRUNCATE TABLE members;
TRUNCATE TABLE library_items;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Tambahkan Anggota (Members) - bisa dianggap pengunjung atau staf
INSERT INTO members (name, email, isActive) VALUES 
('Budi Santoso', 'budi@example.com', 1),
('Siti Aminah', 'siti@example.com', 1),
('Andi Wijaya', 'andi@example.com', 1),
('Joko Anwar', 'joko.staff@library.com', 1),
('Rina Nose', 'rina.staff@library.com', 1);

-- 2. Tambahkan Koleksi Buku (Library Items - Books)
-- Kolom 'type' digunakan oleh Single Table Inheritance untuk membedakan jenis item
INSERT INTO library_items (title, isAvailable, type, author, isbn) VALUES 
('Clean Code: A Handbook of Agile Software Craftsmanship', 1, 'Book', 'Robert C. Martin', '978-0132350884'),
('Refactoring: Improving the Design of Existing Code', 1, 'Book', 'Martin Fowler', '978-0134757599'),
('Design Patterns: Elements of Reusable Object-Oriented Software', 1, 'Book', 'Erich Gamma', '978-0201633610'),
('The Pragmatic Programmer: Your Journey to Mastery', 1, 'Book', 'David Thomas, Andrew Hunt', '978-0135957059'),
('Cracking the Coding Interview', 1, 'Book', 'Gayle Laakmann McDowell', '978-0984782857'),
('Head First Design Patterns', 1, 'Book', 'Eric Freeman, Elisabeth Robson', '978-0596007126'),
('Domain-Driven Design', 1, 'Book', 'Eric Evans', '978-0321125217'),
('Clean Architecture', 1, 'Book', 'Robert C. Martin', '978-0134494166');
