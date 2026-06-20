'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API = 'https://pondok-pucung-api-production.up.railway.app/api';

export default function DashboardAtasan() {
  const router = useRouter();
  const [berita, setBerita] = useState([]);
  const [filter, setFilter] = useState('semua');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'atasan') { router.push('/admin/login'); return; }
    setUsername(localStorage.getItem('username') || 'Atasan');
    loadBerita();
  }, []);

  async function loadBerita() {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/berita`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setBerita(data);
    setLoading(false);
  }

  async function ubahStatus(id, status) {
    const label = status === 'approved' ? 'menyetujui' : 'menolak';
    if (!confirm(`Yakin ${label} berita ini?`)) return;
    const token = localStorage.getItem('token');
    await fetch(`${API}/berita/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    loadBerita();
  }

  function logout() {
    localStorage.clear();
    router.push('/admin/login');
  }

  const filtered = filter === 'semua' ? berita : berita.filter(b => b.status === filter);
  const pending = berita.filter(b => b.status === 'pending').length;
  const approved = berita.filter(b => b.status === 'approved').length;
  const rejected = berita.filter(b => b.status === 'rejected').length;

  const badgeStyle = (status) => {
    const map = {
      pending: { background: '#fff3cd', color: '#856404' },
      approved: { background: '#d4edda', color: '#155724' },
      rejected: { background: '#f8d7da', color: '#721c24' },
    };
    return { ...map[status], padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, display: 'inline-block' };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f0f7f6' }}>

      {/* Sidebar */}
      <div style={{
        width: '240px', background: '#065c52', color: '#fff',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontSize: '22px' }}>🏛️</div>
          <div style={{ fontWeight: 700, fontSize: '15px', marginTop: '6px' }}>Pondok Pucung</div>
          <div style={{ fontSize: '12px', opacity: .6 }}>Panel Atasan</div>
        </div>
        <div style={{ flex: 1, padding: '16px 0' }}>
          <div style={{
            padding: '12px 24px', display: 'flex', gap: '10px',
            alignItems: 'center', fontSize: '14px',
            background: 'rgba(255,255,255,.15)', color: '#fff'
          }}>📋 Persetujuan Berita</div>
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
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#065c52' }}>Dashboard Atasan</h1>
          <span style={{ fontSize: '13px', color: '#666' }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Menunggu Persetujuan', value: pending, color: '#b8860b' },
            { label: 'Sudah Disetujui', value: approved, color: '#155724' },
            { label: 'Ditolak', value: rejected, color: '#721c24' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#fff', borderRadius: '12px', padding: '20px',
              borderLeft: `4px solid ${s.color}`,
              boxShadow: '0 2px 12px rgba(0,0,0,.06)'
            }}>
              <strong style={{ display: 'block', fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</strong>
              <span style={{ fontSize: '13px', color: '#666' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px' }}>📋 Daftar Berita untuk Disetujui</h2>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { key: 'semua', label: 'Semua' },
              { key: 'pending', label: '⏳ Pending' },
              { key: 'approved', label: '✅ Disetujui' },
              { key: 'rejected', label: '❌ Ditolak' },
            ].map(t => (
              <button key={t.key} onClick={() => setFilter(t.key)} style={{
                padding: '8px 18px', borderRadius: '99px',
                border: `2px solid ${filter === t.key ? '#0a7c6e' : '#e0e0e0'}`,
                background: filter === t.key ? '#0a7c6e' : '#fff',
                color: filter === t.key ? '#fff' : '#333',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer'
              }}>{t.label}</button>
            ))}
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Memuat data...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Tidak ada berita</p>
          ) : (
            filtered.map(b => (
              <div key={b.id} style={{
                border: '1px solid #eee', borderRadius: '10px',
                padding: '18px', marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>{b.judul}</strong>
                  <span style={badgeStyle(b.status)}>{b.status}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '12px' }}>{b.isi}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888' }}>
                  <span>📅 {new Date(b.created_at).toLocaleDateString('id-ID')} · 🏷️ {b.kategori} · ✍️ {b.username || 'admin'}</span>
                  {b.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => ubahStatus(b.id, 'approved')} style={{
                        background: '#28a745', color: '#fff', border: 'none',
                        padding: '8px 16px', borderRadius: '6px',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                      }}>✅ Setujui</button>
                      <button onClick={() => ubahStatus(b.id, 'rejected')} style={{
                        background: '#dc3545', color: '#fff', border: 'none',
                        padding: '8px 16px', borderRadius: '6px',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                      }}>❌ Tolak</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}