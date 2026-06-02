import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'LibraryOS – Sistem Manajemen Perpustakaan',
  description: 'Katalog publik dan dashboard staf perpustakaan digital.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <header style={{
          background: 'rgba(15,17,23,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px',
              }}>📚</div>
              <span style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text-primary)' }}>LibraryOS</span>
            </Link>

            {/* Client-side Nav with active state & hover */}
            <NavBar />
          </div>
        </header>

        <main>{children}</main>

        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--text-muted)',
          marginTop: '60px',
        }}>
          LibraryOS · BNSP Project · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
