import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Library Management System',
  description: 'Public Catalog and Staff Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#f5f7fa', color: '#333' }}>
        <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Avelina Library</h1>
          <nav>
            <Link href="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Catalog</Link>
            <Link href="/staff" style={{ color: 'white', textDecoration: 'none' }}>Staff Dashboard</Link>
          </nav>
        </header>
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
