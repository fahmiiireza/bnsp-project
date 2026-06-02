# Dokumentasi Pengujian (Testing Documentation)

Dokumen ini menjelaskan strategi pengujian, alat yang digunakan, serta panduan langkah demi langkah untuk menjalankan pengujian pada **Sistem Manajemen Perpustakaan** (BNSP Project). Pengujian saat ini difokuskan pada sisi **Backend** yang menggunakan framework NestJS dan *test runner* Jest.

---

## 🛠️ Alat Pengujian (Testing Tools)

- **Jest**: Framework pengujian JavaScript/TypeScript yang digunakan untuk menjalankan *Unit Test* maupun *End-to-End (E2E) Test*.
- **Supertest**: Digunakan di dalam pengujian E2E untuk melakukan simulasi permintaan HTTP (HTTP requests) ke aplikasi NestJS.
- **SQLite (In-Memory)**: Digunakan secara spesifik saat pengujian E2E berjalan (`NODE_ENV=test`) sebagai pengganti MySQL untuk menghindari ketergantungan pada server database eksternal dan mempercepat eksekusi tes.

---

## 🏗️ Struktur Pengujian

### 1. Unit Testing
*Unit testing* bertujuan untuk menguji masing-masing modul, layanan (service), atau fungsi secara mandiri (terisolasi) dengan memalsukan (mocking) dependensinya.

- **Lokasi Berkas**: Berada di dalam folder `backend/src/` dan memiliki akhiran `.spec.ts` (contoh: `library.service.spec.ts`).
- **Cakupan Pengujian Utama**:
  - `LibraryService` (`library.service.spec.ts`):
    - Menguji bahwa sistem menghitung dan menetapkan batas tanggal pengembalian (jatuh tempo) tepat **7 hari** sejak tanggal peminjaman.
    - Menguji mekanisme validasi yang memastikan sistem melempar pengecualian (error) apabila anggota mencoba meminjam buku yang sedang berstatus tidak tersedia (*isAvailable = false*).
    - Memastikan modul *File Logging* dipanggil dengan benar saat transaksi terjadi.
  - `AppController` (`app.controller.spec.ts`):
    - Menguji *endpoint* dasar (*health-check*).

### 2. End-to-End (E2E) Testing
*E2E testing* bertujuan untuk menguji sistem secara menyeluruh dari *endpoint* HTTP yang diekspos oleh *controller* hingga ke *database* atau layanan eksternal.

- **Lokasi Berkas**: Berada di dalam folder `backend/test/` dan memiliki akhiran `.e2e-spec.ts`.
- **Cakupan Pengujian**:
  - `AppController (e2e)`: Menguji respons *endpoint* `/ (GET)` untuk memastikan inisialisasi aplikasi, *routing*, dan modul-modul (termasuk TypeORM) berjalan sempurna.

---

## 🚀 Cara Menjalankan Pengujian

Seluruh skrip pengujian dijalankan dari dalam direktori `backend/`. Pastikan Anda sudah masuk ke direktori tersebut:
```bash
cd backend
```

### Menjalankan Seluruh Unit Test
Untuk menjalankan *unit test*, ketik perintah berikut:
```bash
npm run test
```
*Hasil yang diharapkan: Menampilkan `PASS` untuk setiap berkas `.spec.ts`.*

### Menjalankan Unit Test (Watch Mode)
Jika Anda sedang mengembangkan kode dan ingin tes dijalankan secara otomatis setiap kali ada perubahan pada berkas sumber, gunakan:
```bash
npm run test:watch
```

### Menjalankan E2E Test
Karena konfigurasi TypeORM pada `app.module.ts` sudah diadaptasi secara dinamis, perintah E2E akan otomatis menggunakan database **SQLite In-Memory** tanpa menyentuh *environment* MySQL asli Anda.
```bash
npm run test:e2e
```
*Catatan: Tes ini tidak akan memodifikasi data pada database `library_db` (MySQL) karena berjalan di memori virtual secara terisolasi.*

### Menjalankan Test Coverage
Untuk melihat laporan seberapa banyak kode Anda yang sudah tercakup oleh pengujian (persentase *code coverage*):
```bash
npm run test:cov
```
Laporan lengkap akan dihasilkan di dalam direktori `backend/coverage/`. Anda dapat membuka file `backend/coverage/lcov-report/index.html` pada browser untuk visualisasi kode per baris.

---

## 💻 Pengujian Frontend (Status Saat Ini)

Saat ini, sisi **Frontend** (Next.js) belum dilengkapi dengan tes otomatis. Proyek berbasis Next.js dapat diujikan menggunakan beberapa pustaka populer apabila fitur pengujian frontend dibutuhkan di masa mendatang:
- **React Testing Library & Jest**: Untuk pengujian *render component* UI, state lokal, dan simulasi aksi pengguna secara terisolasi (contoh: *klik tombol submit form staff dashboard*).
- **Cypress atau Playwright**: Untuk *End-to-End* testing di sisi *browser* (mengeklik tombol di UI, lalu memvalidasi perubahan pada antarmuka).

> [!NOTE]
> Pada standar pengembangan kompetensi (seperti BNSP), pengujian diutamakan pada stabilitas dan logika bisnis yang dikelola oleh *backend*. Seluruh implementasi kalkulasi durasi, manipulasi struktur *array*, dan OOP telah terlindungi oleh tes Jest di folder `backend`.
