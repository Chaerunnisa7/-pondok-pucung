'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginAdmin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://pondok-pucung-api-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);

      if (data.role === 'admin') router.push('/admin/dashboard');
      else router.push('/admin/atasan');
    } catch {
      setError('Gagal terhubung ke server. Pastikan backend berjalan.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065c52, #0a7c6e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '48px 40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,.25)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '52px' }}>🏛️</div>
          <h1 style={{ fontSize: '20px', color: '#065c52', fontWeight: 700, marginTop: '8px' }}>
            Kelurahan Pondok Pucung
          </h1>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
            Panel Admin – Sistem Informasi
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee', border: '1px solid #fcc', color: '#c00',
            padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px'
          }}>{error}</div>
        )}

        {/* Form */}
        {[
          { label: 'Username', key: 'username', type: 'text', placeholder: 'Masukkan username' },
          { label: 'Password', key: 'password', type: 'password', placeholder: 'Masukkan password' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', padding: '12px 14px',
                border: '2px solid #e0e0e0', borderRadius: '8px',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
        ))}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', background: loading ? '#aaa' : '#0a7c6e',
            color: '#fff', padding: '14px', border: 'none', borderRadius: '8px',
            fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px'
          }}
        >
          {loading ? 'Memuat...' : '🔐 Masuk'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
          <a href="/" style={{ color: '#0a7c6e', textDecoration: 'none' }}>← Kembali ke Website</a>
        </p>
      </div>
    </div>
  );
}