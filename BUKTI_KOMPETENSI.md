# Pemenuhan Unit Kompetensi BNSP

Dokumen ini berisi pemetaan antara Unit Kompetensi dan implementasinya dalam project ini sebagai "Bukti yang relevan".

## Unit Kompetensi 1: Menggunakan Spesifikasi Program (J.620100.009.02)
- **1.1 & 1.2 Metode Pengembangan**: Project ini menggunakan pendekatan metodologi Agile (terlihat dari struktur modular, iterasi fitur, dan pembagian frontend/backend) yang didukung oleh IDE (Visual Studio Code).
- **2.1 & 2.2 Diagram & Pemodelan**: Terdapat pemodelan sistem berupa Entity-Relationship Diagram di `DATABASE_ERD.md` dan pemodelan class berbasis objek dengan NestJS `entities` (`backend/src/library/entities`).
- **3.1 & 3.2 Implementasi**: Pengembangan didukung oleh Node.js, Nest CLI, dan TypeScript yang memudahkan implementasi metodologi sesuai spesifikasi.

## Unit Kompetensi 2: Menulis Kode dengan Prinsip sesuai guidelines dan best practices (J.620100.016.02)
- **1.1 & 1.2 Coding Guidelines**: Menggunakan `ESLint` dan `Prettier` (lihat `backend/package.json`, `.prettierrc`, `eslint.config.mjs`) untuk menjaga format kode. Menerapkan paradigma Object-Oriented Programming (OOP) secara ketat di backend (NestJS).
- **1.3 Error Handling**: Menggunakan try-catch dan NestJS Exceptions (`NotFoundException`, `BadRequestException`) pada `backend/src/library/library.service.ts`.
- **2.1 Efisiensi**: Penerapan tipe data yang efisien, algoritma manual sorting/filtering array di `backend/src/common/utils/array-utils.ts`, dan penggunaan Indexing TypeORM (`@Index()` pada Entity).
- **2.2 Kemudahan Interaksi**: UI Dashboard dibangun dengan React/Next.js (dalam direktori `frontend/`) dengan desain modern dan user-friendly.

## Unit Kompetensi 3: Mengimplementasikan Pemrograman terstruktur (J.620100.017.02)
- **1.1 - 1.3 Control Program**: Penggunaan tipe data primitif dan object secara konsisten (TypeScript). Sintaks percabangan dan pengulangan digunakan.
- **2.1 - 2.2 Input/Output & Logic**: Input dari HTTP Requests di-handle oleh Controller (`library.controller.ts`), logic percabangan/pengulangan digunakan di `library.service.ts` dan Utils.
- **3.1 - 3.4 Prosedur & Fungsi**: Kode dibungkus dalam bentuk fungsi/method (contoh: `borrowItem()`, `returnItem()` di `LibraryService`) lengkap dengan JSDoc comments.
- **4.1 - 4.4 Array Processing**: Class `ArrayUtils` (`backend/src/common/utils/array-utils.ts`) menangani penentuan panjang, dimensi, filtering, dan pengurutan (sorting) array.
- **5.1 - 5.2 Akses File (I/O)**: Class `FileLoggerService` (`backend/src/common/file-logger/file-logger.service.ts`) menangani baca/tulis langsung ke file fisik (I/O log).
- **6.1 - 6.2 Kompilasi**: Error dan syntax dikoreksi melalui compiler TypeScript dan `npm run build`.

## Unit Kompetensi 4: Mengimplementasikan Pemrograman berorientasi objek (J.620100.018.02)
- **1.1 - 1.4 Class & Access Modifier**: Penggunaan kelas dan Access Modifiers (`private`, `public`, `protected`) diterapkan di seluruh sistem backend (contoh: `public async getAllBooks()`, `private readonly libraryItemRepository`).
- **2.1 - 2.3 Tipe Data Object**: Method operasi pada kelas menerima dan mereturn custom interface (contoh: `Promise<BorrowRecord>`).
- **3.1 - 3.3 Konsep OOP**: 
  - **Inheritance**: `Book` entity extend `LibraryItem` (`backend/src/library/entities/book.entity.ts`).
  - **Polymorphism**: Method `getItemType()` pada abstrak kelas `LibraryItem` di-override pada kelas turunannya `Book`.
- **4.1 - 4.2 Interface & Package**: Penggunaan Typescript `interface` (contoh: `ILibraryItem` di `backend/src/common/interfaces`) dan pembuatan package internal via module (contoh: `LibraryModule`).
- **5.1 - 5.2 Kompilasi**: Project 100% lolos typescript compilation checks.

## Unit Kompetensi 5: Menggunakan Library atau komponen pre-existing (J.620100.019.02)
- **1.1 - 1.3 Pemilihan & Identifikasi Component**: Menggunakan TypeORM, NestJS, MySQL2, dan React yang mempercepat iterasi (bisa dilihat di `package.json`).
- **2.1 - 2.3 Integrasi**: Komponen pre-existing dipasang secara dependency-injected. Tidak menggunakan library yang obsolete.
- **3.1 - 3.2 Pembaharuan**: Dependensi dimanage via NPM, sehingga mudah diperbaharui dengan `npm update`.

## Unit Kompetensi 6: Menerapkan akses basis data (J.620100.021.02)
- **1.1 - 1.3 Operasi Basis Data**: Melakukan query data buku, anggota, peminjaman menggunakan query builder & repository (TypeORM). **Indeks** dipergunakan pada Entity `LibraryItem` dan `Member` (kolom unique).
- **2.1 - 2.2 Prosedur DB**: Menyusun TypeORM module config di `app.module.ts`.
- **3.1 - 3.3 Koneksi**: Terkoneksi menggunakan driver `mysql2`. Struktur hak akses dan role dikonfigurasi melalui user system di database / modul.
- **4.1 - 4.3 Pengujian DB**: Logic akses database diuji dalam file unit tests `library.service.spec.ts` dengan mock TypeORM repository.

## Unit Kompetensi 7: Membuat kode dokumen program (J.620100.023.02)
- **1.1 - 1.4 Identifikasi Kode & Komentar**: Setiap fungsi penting, prosedur, dan class dilampirkan komentar JSDoc.
- **2.1 - 2.4 Dokumentasi Modul**: Tersedia README.md pada root project dan modul (frontend/backend).
- **3.1 - 3.3 Dokumentasi Eksepsi**: Semua error lemparan tercatat pada komentarnya dan menggunakan explicit exceptions (`NotFoundException`, dll).
- **4.1 - 4.2 Generate Dokumentasi**: Telah ditambahkan tool generator dokumentasi berupa Compodoc. Dapat dieksekusi dengan `npm run docs` di backend.

## Unit Kompetensi 8: Melakukan debugging (J.620100.025.02)
- **1.1 - 1.2 Persiapan Debugging**: Environment telah disiapkan dengan debugging scripts (`npm run start:debug` untuk NestJS) dan logger manual (`FileLoggerService`).
- **2.1 - 2.4 Analisis Eksekusi**: Hasil kompilasi dievaluasi (seperti build NestJS) menggunakan strict TypeScript checker.
- **3.1 - 3.2 Perbaikan Program**: Setiap kesalahan kompilasi langsung diperbaiki saat penulisan kode sumber.

## Unit Kompetensi 9: Melaksanakan pengujian unit program (J.620100.033.02)
- **1.1 - 1.3 Identifikasi Pengujian**: Tools uji coba ditentukan yaitu menggunakan **Jest**.
- **2.1 - 2.3 Skenario Pengujian**: Ditetapkan skenario di file `library.service.spec.ts`.
- **3.1 - 3.2 Data Uji**: Menggunakan stubbing & mocking data pada unit tests (misal, mock `Book` dan `Member`).
- **4.1 - 4.3 Pelaksanaan Pengujian**: Uji coba dieksekusi menggunakan `npm run test` di direktori backend.
- **5.1 - 5.4 Evaluasi**: Error diselesaikan dengan mereview test run log, evaluasi code coverage dapat dilihat melalui `npm run test:cov`.
