'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API = 'https://pondok-pucung-api-production.up.railway.app/api';

export default function DashboardAdmin() {
  const router = useRouter();
  const [tab, setTab] = useState('berita');
  const [berita, setBerita] = useState([]);
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formBerita, setFormBerita] = useState({ judul: '', kategori: 'Kegiatan', isi: '', foto: '' });
  const [formStruktur, setFormStruktur] = useState({ nama: '', jabatan: '', level: 'seksi', golongan: '', urutan: 0 });
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') { router.push('/admin/login'); return; }
    setUsername(localStorage.getItem('username') || 'Admin');
    loadBerita();
    loadStruktur();
  }, []);

  // ── BERITA ──
  async function loadBerita() {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/berita`, { headers: { Authorization: `Bearer ${token}` } });
    setBerita(await res.json());
    setLoading(false);
  }

  function openTambahBerita() {
    setEditData(null);
    setFormBerita({ judul: '', kategori: 'Kegiatan', isi: '', foto: '' });
    setShowModal('berita');
  }

  function openEditBerita(b) {
    setEditData(b);
    setFormBerita({ judul: b.judul, kategori: b.kategori, isi: b.isi, foto: b.foto || '' });
    setShowModal('berita');
  }

  async function simpanBerita() {
    if (!formBerita.judul || !formBerita.isi) return alert('Judul dan isi wajib diisi!');
    const token = localStorage.getItem('token');
    const method = editData ? 'PUT' : 'POST';
    const url = editData ? `${API}/berita/${editData.id}` : `${API}/berita`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formBerita),
    });
    setShowModal(false);
    loadBerita();
  }

  async function hapusBerita(id) {
    if (!confirm('Yakin hapus berita ini?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API}/berita/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    loadBerita();
  }

  // ── STRUKTUR ──
  async function loadStruktur() {
    const res = await fetch(`${API}/struktur`);
    setStruktur(await res.json());
  }

  function openTambahStruktur() {
    setEditData(null);
    setFormStruktur({ nama: '', jabatan: '', level: 'seksi', golongan: '', urutan: 0 });
    setShowModal('struktur');
  }

  function openEditStruktur(s) {
    setEditData(s);
    setFormStruktur({ nama: s.nama, jabatan: s.jabatan, level: s.level, golongan: s.golongan || '', urutan: s.urutan });
    setShowModal('struktur');
  }

  async function simpanStruktur() {
    if (!formStruktur.nama || !formStruktur.jabatan) return alert('Nama dan jabatan wajib diisi!');
    const token = localStorage.getItem('token');
    const method = editData ? 'PUT' : 'POST';
    const url = editData ? `${API}/struktur/${editData.id}` : `${API}/struktur`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formStruktur),
    });
    setShowModal(false);
    loadStruktur();
  }

  async function hapusStruktur(id) {
    if (!confirm('Yakin hapus jabatan ini?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API}/struktur/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    loadStruktur();
  }

  function logout() { localStorage.clear(); router.push('/admin/login'); }

  const badgeStyle = (status) => {
    const map = {
      pending: { background: '#fff3cd', color: '#856404' },
      approved: { background: '#d4edda', color: '#155724' },
      rejected: { background: '#f8d7da', color: '#721c24' },
    };
    return { ...map[status], padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, display: 'inline-block' };
  };

  const levelLabel = { pimpinan: '👑 Pimpinan', sekretaris: '📋 Sekretaris', seksi: '👤 Seksi' };

  const total = berita.length;
  const pending = berita.filter(b => b.status === 'pending').length;
  const approved = berita.filter(b => b.status === 'approved').length;
  const rejected = berita.filter(b => b.status === 'rejected').length;

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '2px solid #e0e0e0', borderRadius: '8px',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f0f7f6' }}>

      {/* Sidebar */}
      <div style={{
        width: '240px', background: '#065c52', color: '#fff',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontSize: '22px' }}>🏛️</div>
          <div style={{ fontWeight: 700, fontSize: '15px', marginTop: '6px' }}>Pondok Pucung</div>
          <div style={{ fontSize: '12px', opacity: .6 }}>Panel Admin</div>
        </div>
        <div style={{ flex: 1, padding: '16px 0' }}>
          {[
            { key: 'berita', icon: '📰', label: 'Berita & Kegiatan' },
            { key: 'struktur', icon: '👥', label: 'Struktur Organisasi' },
          ].map(m => (
            <div key={m.key} onClick={() => setTab(m.key)} style={{
              padding: '12px 24px', display: 'flex', gap: '10px',
              alignItems: 'center', fontSize: '14px', cursor: 'pointer',
              background: tab === m.key ? 'rgba(255,255,255,.15)' : 'transparent',
              color: tab === m.key ? '#fff' : 'rgba(255,255,255,.7)',
            }}>{m.icon} {m.label}</div>
          ))}
          <a href="/" target="_blank" style={{
            padding: '12px 24px', display: 'flex', gap: '10px',
            alignItems: 'center', fontSize: '14px',
            color: 'rgba(255,255,255,.7)', textDecoration: 'none'
          }}>🌐 Lihat Website</a>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontSize: '12px', opacity: .6, marginBottom: '8px' }}>
            Login sebagai: <strong>{username}</strong>
          </div>
          <button onClick={logout} style={{
            width: '100%', background: 'transparent',
            border: '1px solid rgba(255,255,255,.3)', color: '#fff',
            padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
          }}>← Keluar</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '240px', padding: '32px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#065c52' }}>Dashboard Admin</h1>
          <span style={{ fontSize: '13px', color: '#666' }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* ══ TAB BERITA ══ */}
        {tab === 'berita' && (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
              {[
                { label: 'Total Berita', value: total, color: '#0a7c6e' },
                { label: 'Menunggu Approve', value: pending, color: '#b8860b' },
                { label: 'Disetujui', value: approved, color: '#155724' },
                { label: 'Ditolak', value: rejected, color: '#721c24' },
              ].map(s => (
                <div key={s.label} style={{
                  background: '#fff', borderRadius: '12px', padding: '20px',
                  borderLeft: `4px solid ${s.color}`, boxShadow: '0 2px 12px rgba(0,0,0,.06)'
                }}>
                  <strong style={{ display: 'block', fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</strong>
                  <span style={{ fontSize: '13px', color: '#666' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Tabel berita */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700 }}>📋 Daftar Berita & Kegiatan</h2>
                <button onClick={openTambahBerita} style={{
                  background: '#0a7c6e', color: '#fff', border: 'none',
                  padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                }}>+ Tambah Berita</button>
              </div>
              {loading ? (
                <p style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Memuat data...</p>
              ) : berita.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Belum ada berita</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Judul', 'Kategori', 'Status', 'Tanggal', 'Aksi'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 12px', fontSize: '12px',
                          fontWeight: 700, textTransform: 'uppercase', color: '#666',
                          borderBottom: '2px solid #eee', letterSpacing: '.5px'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {berita.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ fontSize: '14px' }}>{b.judul}</strong><br />
                          <small style={{ color: '#888' }}>{b.isi.substring(0, 50)}...</small>
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px' }}>{b.kategori}</td>
                        <td style={{ padding: '12px' }}><span style={badgeStyle(b.status)}>{b.status}</span></td>
                        <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                          {new Date(b.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button onClick={() => openEditBerita(b)} style={{
                            background: '#e6f5f3', color: '#0a7c6e', border: 'none',
                            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginRight: '6px'
                          }}>Edit</button>
                          <button onClick={() => hapusBerita(b.id)} style={{
                            background: '#fdecea', color: '#c00', border: 'none',
                            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                          }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ══ TAB STRUKTUR ══ */}
        {tab === 'struktur' && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700 }}>👥 Struktur Organisasi</h2>
              <button onClick={openTambahStruktur} style={{
                background: '#0a7c6e', color: '#fff', border: 'none',
                padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
              }}>+ Tambah Jabatan</button>
            </div>
            {struktur.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Belum ada data struktur</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Nama', 'Jabatan', 'Level', 'Golongan', 'Urutan', 'Aksi'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '10px 12px', fontSize: '12px',
                        fontWeight: 700, textTransform: 'uppercase', color: '#666',
                        borderBottom: '2px solid #eee', letterSpacing: '.5px'
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {struktur.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px', fontSize: '14px', fontWeight: 600 }}>{s.nama}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{s.jabatan}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: s.level === 'pimpinan' ? '#065c52' : s.level === 'sekretaris' ? '#c9a84c' : '#e6f5f3',
                          color: s.level === 'pimpinan' ? '#fff' : s.level === 'sekretaris' ? '#fff' : '#0a7c6e',
                          padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700
                        }}>{levelLabel[s.level]}</span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{s.golongan || '-'}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{s.urutan}</td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => openEditStruktur(s)} style={{
                          background: '#e6f5f3', color: '#0a7c6e', border: 'none',
                          padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginRight: '6px'
                        }}>Edit</button>
                        <button onClick={() => hapusStruktur(s.id)} style={{
                          background: '#fdecea', color: '#c00', border: 'none',
                          padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                        }}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ══ MODAL BERITA ══ */}
      {showModal === 'berita' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#065c52' }}>
              {editData ? '✏️ Edit Berita' : '➕ Tambah Berita'}
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Judul Berita *</label>
              <input type="text" value={formBerita.judul} onChange={e => setFormBerita({ ...formBerita, judul: e.target.value })} placeholder="Judul berita" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Kategori *</label>
              <select value={formBerita.kategori} onChange={e => setFormBerita({ ...formBerita, kategori: e.target.value })} style={inputStyle}>
                {['Kegiatan', 'Pengumuman', 'Program', 'Sosial', 'Infrastruktur', 'Pendidikan', 'Kesehatan'].map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Isi Berita *</label>
              <textarea value={formBerita.isi} onChange={e => setFormBerita({ ...formBerita, isi: e.target.value })} placeholder="Tulis isi berita..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>URL Foto (opsional)</label>
              <input type="text" value={formBerita.foto} onChange={e => setFormBerita({ ...formBerita, foto: e.target.value })} placeholder="https://..." style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#f0f0f0', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Batal</button>
              <button onClick={simpanBerita} style={{ background: '#0a7c6e', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>💾 Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL STRUKTUR ══ */}
      {showModal === 'struktur' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#065c52' }}>
              {editData ? '✏️ Edit Jabatan' : '➕ Tambah Jabatan'}
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Nama *</label>
              <input type="text" value={formStruktur.nama} onChange={e => setFormStruktur({ ...formStruktur, nama: e.target.value })} placeholder="Nama lengkap" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Jabatan *</label>
              <input type="text" value={formStruktur.jabatan} onChange={e => setFormStruktur({ ...formStruktur, jabatan: e.target.value })} placeholder="Nama jabatan" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Level *</label>
              <select value={formStruktur.level} onChange={e => setFormStruktur({ ...formStruktur, level: e.target.value })} style={inputStyle}>
                <option value="pimpinan">👑 Pimpinan (Lurah)</option>
                <option value="sekretaris">📋 Sekretaris</option>
                <option value="seksi">👤 Seksi</option>
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Golongan</label>
              <input type="text" value={formStruktur.golongan} onChange={e => setFormStruktur({ ...formStruktur, golongan: e.target.value })} placeholder="Contoh: III/d" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Urutan tampil</label>
              <input type="number" value={formStruktur.urutan} onChange={e => setFormStruktur({ ...formStruktur, urutan: parseInt(e.target.value) })} placeholder="1, 2, 3..." style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#f0f0f0', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Batal</button>
              <button onClick={simpanStruktur} style={{ background: '#0a7c6e', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>💾 Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}