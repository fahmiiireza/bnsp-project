'use client';

import { useEffect, useState } from 'react';

const API = 'http://localhost:3000';

interface Book {
  id: number;
  title: string;
  author?: string;
  isbn?: string;
  isAvailable: boolean;
}

interface Stats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeLoans: number;
}

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'borrowed'>('all');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksRes, statsRes] = await Promise.all([
        fetch(`${API}/library/catalog`, { cache: 'no-store' }),
        fetch(`${API}/library/stats`, { cache: 'no-store' }),
      ]);
      if (booksRes.ok) setBooks(await booksRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.author ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (b.isbn ?? '').includes(search);
    const matchFilter =
      filter === 'all' ? true :
      filter === 'available' ? b.isAvailable :
      !b.isAvailable;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page-content">
      {/* Hero */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>
          📚 Katalog Perpustakaan
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Temukan buku yang Anda butuhkan dari koleksi kami.
        </p>
      </div>

      {/* Stats Row */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}>
          <StatCard label="Total Buku" value={stats.totalBooks} color="var(--accent-purple)" icon="📖" />
          <StatCard label="Tersedia" value={stats.availableBooks} color="var(--accent-green)" icon="✅" />
          <StatCard label="Sedang Dipinjam" value={stats.borrowedBooks} color="var(--accent-amber)" icon="📤" />
          <StatCard label="Total Anggota" value={stats.totalMembers} color="var(--accent-blue)" icon="👥" />
        </div>
      )}

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }}>🔍</span>
          <input
            className="form-input"
            style={{ paddingLeft: '38px' }}
            type="text"
            placeholder="Cari judul, penulis, atau ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['all', 'available', 'borrowed'] as const).map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Semua' : f === 'available' ? '✅ Tersedia' : '📤 Dipinjam'}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={fetchData}>
          🔄 Refresh
        </button>
      </div>

      {/* Book count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        Menampilkan {filtered.length} dari {books.length} buku
      </p>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 16px', width: '36px', height: '36px' }} />
          <p>Memuat koleksi buku...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔎</div>
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>Tidak ada buku ditemukan</p>
          <p style={{ fontSize: '14px' }}>Coba ubah kata kunci pencarian atau filter Anda.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((book, i) => (
            <div
              key={book.id}
              className="card fade-in"
              style={{
                animationDelay: `${i * 40}ms`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Book colour strip */}
              <div style={{
                height: '4px',
                borderRadius: '4px',
                background: book.isAvailable
                  ? 'linear-gradient(90deg, #34d399, #059669)'
                  : 'linear-gradient(90deg, #f87171, #dc2626)',
                marginBottom: '4px',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                    ID #{book.id}
                  </p>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    {book.title}
                  </h3>
                </div>
                <span className={`badge ${book.isAvailable ? 'badge-green' : 'badge-red'}`} style={{ flexShrink: 0 }}>
                  {book.isAvailable ? '✓ Tersedia' : '✗ Dipinjam'}
                </span>
              </div>

              {book.author && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  ✍️ {book.author}
                </p>
              )}

              {book.isbn && (
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace' }}>
                  ISBN: {book.isbn}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <div style={{
        width: '44px', height: '44px',
        borderRadius: '10px',
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '26px', fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{label}</p>
      </div>
    </div>
  );
}
