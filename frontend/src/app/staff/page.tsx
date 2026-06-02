'use client';

import { useEffect, useState, useCallback } from 'react';

const API = 'http://localhost:3000';

interface Member { id: number; name: string; email: string; isActive: boolean; }
interface Book { id: number; title: string; author?: string; isAvailable: boolean; }
interface BorrowRecord {
  id: number;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate: string | null;
  item: Book;
  member: Member;
}
interface Stats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeLoans: number;
}

type ActiveTab = 'borrow' | 'records' | 'members';

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('borrow');
  const [stats, setStats] = useState<Stats | null>(null);

  // Borrow form state
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [borrowStatus, setBorrowStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [borrowLoading, setBorrowLoading] = useState(false);

  // Records state
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [returningId, setReturningId] = useState<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/library/stats`);
      if (res.ok) setStats(await res.json());
    } catch {}
  }, []);

  const fetchDropdownData = useCallback(async () => {
    try {
      const [mRes, bRes] = await Promise.all([
        fetch(`${API}/library/members`),
        fetch(`${API}/library/catalog`),
      ]);
      if (mRes.ok) setMembers(await mRes.json());
      if (bRes.ok) setBooks(await bRes.json());
    } catch {}
  }, []);

  const fetchRecords = useCallback(async () => {
    setRecordsLoading(true);
    try {
      const res = await fetch(`${API}/library/borrow-records`);
      if (res.ok) setRecords(await res.json());
    } catch {}
    setRecordsLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
    fetchDropdownData();
    fetchRecords();
  }, [fetchStats, fetchDropdownData, fetchRecords]);

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    setBorrowStatus(null);
    setBorrowLoading(true);
    try {
      const res = await fetch(`${API}/library/borrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: Number(selectedMember), itemId: Number(selectedBook) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal meminjam buku');
      const retDate = new Date(data.expectedReturnDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      setBorrowStatus({ type: 'success', message: `✅ Peminjaman berhasil! Batas pengembalian: ${retDate}` });
      setSelectedMember('');
      setSelectedBook('');
      fetchDropdownData();
      fetchRecords();
      fetchStats();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setBorrowStatus({ type: 'error', message: `❌ ${msg}` });
    }
    setBorrowLoading(false);
  };

  const handleReturn = async (recordId: number) => {
    setReturningId(recordId);
    try {
      const res = await fetch(`${API}/library/return/${recordId}`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        alert(`Gagal mengembalikan: ${data.message}`);
      } else {
        fetchRecords();
        fetchStats();
        fetchDropdownData();
      }
    } catch {
      alert('Terjadi kesalahan saat mengembalikan buku');
    }
    setReturningId(null);
  };

  const availableBooks = books.filter((b) => b.isAvailable);
  const activeRecords = records.filter((r) => !r.actualReturnDate);
  const returnedRecords = records.filter((r) => r.actualReturnDate);

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>
          🛠️ Staff Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Kelola transaksi peminjaman dan pantau status koleksi perpustakaan.
        </p>
      </div>

      {/* Stats Row */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}>
          <DashStat label="Total Buku" value={stats.totalBooks} icon="📖" color="var(--accent-purple)" />
          <DashStat label="Tersedia" value={stats.availableBooks} icon="✅" color="var(--accent-green)" />
          <DashStat label="Dipinjam" value={stats.borrowedBooks} icon="📤" color="var(--accent-amber)" />
          <DashStat label="Anggota" value={stats.totalMembers} icon="👥" color="var(--accent-blue)" />
          <DashStat label="Pinjaman Aktif" value={stats.activeLoans} icon="⏳" color="var(--accent-red)" />
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)', marginBottom: '28px' }}>
        {([
          { id: 'borrow', label: '📝 Catat Peminjaman' },
          { id: 'records', label: `📋 Riwayat (${records.length})` },
          { id: 'members', label: `👥 Anggota (${members.length})` },
        ] as { id: ActiveTab; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent-blue)' : 'transparent'}`,
              marginBottom: '-1px',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Borrow Form */}
      {activeTab === 'borrow' && (
        <div style={{ maxWidth: '560px' }} className="fade-in">
          <div className="card">
            <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Catat Peminjaman Baru
            </h2>

            {borrowStatus && (
              <div className={`alert ${borrowStatus.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {borrowStatus.message}
              </div>
            )}

            <form onSubmit={handleBorrow}>
              <div className="form-group">
                <label className="form-label">Pilih Anggota</label>
                <select
                  className="form-input"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  required
                >
                  <option value="">-- Pilih anggota --</option>
                  {members.filter((m) => m.isActive).map((m) => (
                    <option key={m.id} value={m.id}>#{m.id} — {m.name} ({m.email})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pilih Buku</label>
                <select
                  className="form-input"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  required
                >
                  <option value="">-- Pilih buku tersedia --</option>
                  {availableBooks.map((b) => (
                    <option key={b.id} value={b.id}>#{b.id} — {b.title}{b.author ? ` · ${b.author}` : ''}</option>
                  ))}
                </select>
                {availableBooks.length === 0 && (
                  <p style={{ color: 'var(--accent-amber)', fontSize: '13px', marginTop: '6px' }}>
                    ⚠️ Tidak ada buku yang tersedia saat ini.
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  📅 Batas pengembalian otomatis: <strong style={{ color: 'var(--text-secondary)' }}>7 hari</strong>
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={borrowLoading || availableBooks.length === 0}
                >
                  {borrowLoading ? <><span className="spinner" /> Memproses...</> : '📤 Proses Peminjaman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Records */}
      {activeTab === 'records' && (
        <div className="fade-in">
          {/* Active loans */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <p className="section-title">Pinjaman Aktif</p>
                <p className="section-subtitle">{activeRecords.length} buku sedang dipinjam</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={fetchRecords}>🔄 Refresh</button>
            </div>
            {recordsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
              </div>
            ) : activeRecords.length === 0 ? (
              <div className="empty-state"><p>Tidak ada pinjaman aktif saat ini.</p></div>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th><th>Anggota</th><th>Buku</th><th>Tgl Pinjam</th><th>Jatuh Tempo</th><th>Status</th><th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRecords.map((r) => {
                      const isOverdue = new Date(r.expectedReturnDate) < new Date();
                      return (
                        <tr key={r.id}>
                          <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{r.id}</td>
                          <td>
                            <p style={{ fontWeight: 600 }}>{r.member?.name ?? '—'}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.member?.email ?? ''}</p>
                          </td>
                          <td>
                            <p style={{ fontWeight: 600 }}>{r.item?.title ?? '—'}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID #{r.item?.id}</p>
                          </td>
                          <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {new Date(r.borrowDate).toLocaleDateString('id-ID')}
                          </td>
                          <td style={{ fontSize: '13px', color: isOverdue ? 'var(--accent-red)' : 'var(--text-secondary)', fontWeight: isOverdue ? 700 : 400 }}>
                            {new Date(r.expectedReturnDate).toLocaleDateString('id-ID')}
                            {isOverdue && <span style={{ display: 'block', fontSize: '11px' }}>⚠ Terlambat!</span>}
                          </td>
                          <td>
                            <span className={`badge ${isOverdue ? 'badge-red' : 'badge-amber'}`}>
                              {isOverdue ? '⚠ Terlambat' : '⏳ Aktif'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              disabled={returningId === r.id}
                              onClick={() => handleReturn(r.id)}
                            >
                              {returningId === r.id ? <span className="spinner" /> : '↩ Kembalikan'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Return history */}
          {returnedRecords.length > 0 && (
            <div>
              <p className="section-title">Riwayat Pengembalian</p>
              <p className="section-subtitle">{returnedRecords.length} transaksi selesai</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th><th>Anggota</th><th>Buku</th><th>Tgl Pinjam</th><th>Tgl Kembali</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnedRecords.map((r) => (
                      <tr key={r.id} style={{ opacity: 0.7 }}>
                        <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{r.id}</td>
                        <td>{r.member?.name ?? '—'}</td>
                        <td>{r.item?.title ?? '—'}</td>
                        <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {new Date(r.borrowDate).toLocaleDateString('id-ID')}
                        </td>
                        <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {r.actualReturnDate ? new Date(r.actualReturnDate).toLocaleDateString('id-ID') : '—'}
                        </td>
                        <td><span className="badge badge-green">✓ Dikembalikan</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Members */}
      {activeTab === 'members' && (
        <div className="fade-in">
          <div style={{ marginBottom: '16px' }}>
            <p className="section-title">Daftar Anggota</p>
            <p className="section-subtitle">{members.length} anggota terdaftar</p>
          </div>
          {members.length === 0 ? (
            <div className="empty-state"><p>Belum ada anggota terdaftar.</p></div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Nama</th><th>Email</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{m.id}</td>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{m.email}</td>
                      <td>
                        <span className={`badge ${m.isActive ? 'badge-green' : 'badge-red'}`}>
                          {m.isActive ? '✓ Aktif' : '✗ Nonaktif'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DashStat({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <div style={{
        width: '42px', height: '42px',
        borderRadius: '10px',
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '24px', fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>{label}</p>
      </div>
    </div>
  );
}
