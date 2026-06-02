# Sistem Manajemen Perpustakaan (Library Management System)

Proyek ini adalah **Sistem Manajemen Perpustakaan** yang dirancang sebagai bagian dari proyek sertifikasi kompetensi **BNSP (Badan Nasional Sertifikasi Profesi)** untuk Web Developer. Proyek ini memadukan konsep pemrograman berbasis objek (OOP), manipulasi struktur data secara manual, pencatatan log mandiri (*native file logging*), serta arsitektur modern menggunakan **NestJS** di sisi backend dan **Next.js** di sisi frontend.

---

## 📌 Fitur Utama

1. **Katalog Publik (Public Catalog)**
   - Menampilkan daftar koleksi buku yang tersedia di perpustakaan beserta statusnya (*Available* atau *Borrowed*).
   - Daftar diurutkan berdasarkan ID menggunakan **algoritma pengurutan manual (Bubble Sort)** di sisi backend sebelum dikirimkan ke frontend.

2. **Dashboard Petugas (Staff Dashboard)**
   - Antarmuka khusus bagi staf/petugas perpustakaan untuk mencatat transaksi peminjaman baru.
   - Petugas dapat memasukkan ID Anggota (*Member ID*) dan ID Buku (*Book/Item ID*).

3. **Aturan Bisnis & Validasi Transaksi**
   - Hanya anggota terdaftar yang aktif dan buku yang berstatus *Available* yang dapat diproses.
   - Tanggal jatuh tempo pengembalian dihitung secara otomatis tepat **7 hari** setelah tanggal peminjaman.
   - Mengubah status ketersediaan buku secara otomatis menjadi tidak tersedia (*isAvailable = false*).

4. **Pencatatan Log Mandiri (Native File I/O)**
   - Setiap transaksi peminjaman yang sukses maupun kegagalan sistem akan dicatat langsung ke file teks lokal (`backend/logs/system-logs.txt`) menggunakan modul bawaan (*native*) Node.js `fs` (Filesystem).

5. **Penerapan OOP & ORM tingkat lanjut**
   - **Inheritance & Polymorphism**: Menggunakan pola *Single Table Inheritance* (STI) pada TypeORM di mana kelas `Book` mewarisi properti dari kelas abstrak `LibraryItem`.
   - **Method Overloading & Encapsulation**: Penerapan fungsi khusus untuk penyaringan dan manipulasi array secara aman.

---

## 🛠️ Tech Stack (Teknologi)

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database ORM**: [TypeORM](https://typeorm.io/) dengan driver **MySQL** (`mysql2`)
- **Testing**: [Jest](https://jestjs.io/) untuk unit testing logic peminjaman dan penghitungan tanggal kembali.
- **Log System**: Native Node.js File System (`fs`).

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React, TypeScript)
- **Styling**: Vanilla CSS (Modular / Inline CSS untuk efisiensi render).

---

## 📂 Struktur Direktori Proyek

```text
bnsp-project/
├── backend/                  # Kode sumber backend (NestJS)
│   ├── src/
│   │   ├── common/           # Utilitas umum, interface, dan logger
│   │   │   ├── file-logger/  # Layanan logger menulis ke system-logs.txt
│   │   │   └── utils/        # Pengurutan manual Bubble Sort (ArrayUtils)
│   │   ├── library/          # Modul utama perpustakaan
│   │   │   ├── entities/     # Model database (Book, Member, BorrowRecord, dll.)
│   │   │   ├── library.controller.ts
│   │   │   └── library.service.ts
│   │   ├── app.module.ts     # Konfigurasi modul aplikasi & TypeORM
│   │   └── main.ts           # Titik masuk aplikasi backend (Port 3000)
│   ├── docker-compose.yml    # Konfigurasi container MySQL
│   └── package.json
│
├── frontend/                 # Kode sumber frontend (Next.js)
│   ├── src/
│   │   └── app/
│   │       ├── staff/        # Halaman dashboard petugas (/staff)
│   │       ├── page.tsx      # Halaman katalog publik (/)
│   │       └── layout.tsx    # Layout utama website
│   └── package.json
│
└── README.md                 # Dokumentasi proyek (Bahasa Indonesia)
```

---

## 🚀 Cara Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal Anda.

### Prasyarat
- **Node.js** (versi 18 ke atas disarankan)
- **Docker** & **Docker Compose** (opsional, untuk menjalankan MySQL dengan mudah)

---

### Langkah 1: Jalankan Database MySQL

Jika Anda menggunakan Docker, jalankan perintah berikut di dalam direktori `backend/` untuk menyalakan database MySQL:

```bash
cd backend
docker-compose up -d
```

Ini akan menginisialisasi kontainer database MySQL dengan detail sebagai berikut:
- **Host**: `localhost`
- **Port**: `3307`
- **Database**: `library_db`
- **Username**: `root`
- **Password**: `root`

> [!NOTE]
> Jika Anda menggunakan instalasi MySQL lokal di luar Docker, pastikan kredensial di file `backend/src/app.module.ts` disesuaikan dengan konfigurasi server MySQL Anda, dan buat database kosong bernama `library_db`.

---

### Langkah 2: Jalankan Server Backend (NestJS)

1. Masuk ke direktori `backend`:
   ```bash
   cd backend
   ```
2. Instal seluruh dependensi:
   ```bash
   npm install
   ```
3. Jalankan server dalam mode pengembangan:
   ```bash
   npm run start:dev
   ```
   Server backend akan berjalan di **`http://localhost:3000`**. 
   *TypeORM akan secara otomatis membuat tabel-tabel database jika koneksi ke MySQL berhasil.*

---

### Langkah 3: Jalankan Aplikasi Frontend (Next.js)

1. Buka terminal baru dan masuk ke direktori `frontend`:
   ```bash
   cd frontend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Next.js:
   ```bash
   npm run dev
   ```
   Aplikasi frontend dapat diakses melalui browser di alamat **`http://localhost:3001`** atau **`http://localhost:3000`** (Next.js akan mendeteksi otomatis jika port 3000 sudah digunakan oleh backend dan dialihkan ke port berikutnya, biasanya `http://localhost:3001` atau `http://localhost:3002`). Perhatikan output pada terminal Anda.

---

## 🧪 Mengisi Data Awal (Seeding)

Karena database MySQL Anda masih kosong saat pertama kali dijalankan, jalankan perintah SQL berikut di MySQL client Anda (seperti DBeaver, TablePlus, phpMyAdmin, atau MySQL CLI) untuk mengisi data buku dan anggota awal agar aplikasi dapat langsung dicoba:

```sql
USE library_db;

-- 1. Tambahkan Anggota (Members)
INSERT INTO members (name, email, isActive) VALUES 
('Budi Santoso', 'budi@example.com', 1),
('Siti Aminah', 'siti@example.com', 1),
('Andi Wijaya', 'andi@example.com', 1);

-- 2. Tambahkan Koleksi Buku (Library Items - Books)
-- Kolom 'type' digunakan oleh Single Table Inheritance untuk membedakan jenis item
INSERT INTO library_items (title, isAvailable, type, author, isbn) VALUES 
('Clean Code', 1, 'Book', 'Robert C. Martin', '978-0132350884'),
('Refactoring', 1, 'Book', 'Martin Fowler', '978-0134757599'),
('Design Patterns', 1, 'Book', 'Erich Gamma', '978-0201633610'),
('The Pragmatic Programmer', 1, 'Book', 'Andrew Hunt', '978-0135957059');
```

---

## 🧪 Menjalankan Unit Testing

Untuk memastikan logika penentuan tanggal pengembalian (7 hari) dan validasi ketersediaan buku berjalan dengan benar, jalankan unit testing pada backend:

```bash
cd backend
npm run test
```

---

## 📝 Alur Log Peminjaman (*Native File Logging*)

Setiap kali transaksi peminjaman berhasil diproses, program akan menulis log transaksi ke berkas:
`backend/logs/system-logs.txt`

**Format Contoh Log Berhasil:**
```text
[2026-06-02T13:45:00.123Z] Item 1 borrowed by member 2. Expected return: 2026-06-09T13:45:00.123Z
```

**Format Contoh Log Gagal:**
```text
[2026-06-02T13:46:12.456Z] Error borrowing item: Item is not available for borrowing
```
