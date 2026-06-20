'use client';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { dataBerita } from '@/data/data';

const KATEGORI_WARNA = {
  Kegiatan: '#0a7c6e',
  Pengumuman: '#856404',
  Program: '#155724',
  Sosial: '#1a6fa8',
  Infrastruktur: '#6f42c1',
  Pendidikan: '#e67e00',
  Kesehatan: '#dc3545',
  Ekonomi: '#b5520a',
  Lingkungan: '#2d7a3a',
  Pemerintahan: '#4a4a8a',
};

export default function BeritaPage() {
  const [beritaBackend, setBeritaBackend] = useState([]);
  const [filterAktif, setFilterAktif] = useState('Semua');

  useEffect(() => {
    fetch('https://pondok-pucung-api-production.up.railway.app/api/berita/publik')
      .then(res => res.json())
      .then(data => setBeritaBackend(data))
      .catch(() => setBeritaBackend([]));
  }, []);

  // Gabungkan: backend duluan (lebih baru), lalu data statis
  const beritaBackendFormatted = beritaBackend.map(b => ({
    id: 'db-' + b.id,
    judul: b.judul,
    tanggal: new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    kategori: b.kategori,
    ringkasan: b.isi.length > 120 ? b.isi.substring(0, 120) + '...' : b.isi,
    isi: b.isi,
    foto: b.foto || null,
    emoji: null,
    dariBackend: true,
  }));

  const dataStatisFormatted = dataBerita.map(b => ({
    ...b,
    foto: null,
    dariBackend: false,
  }));

  const semuaBerita = [...beritaBackendFormatted, ...dataStatisFormatted];
  const kategoriList = ['Semua', ...new Set(semuaBerita.map(b => b.kategori))];
  const tampil = filterAktif === 'Semua' ? semuaBerita : semuaBerita.filter(b => b.kategori === filterAktif);

  return (
    <>
      <PageHeader
        judul="Berita & Kegiatan"
        deskripsi="Informasi terkini seputar kegiatan dan program Kelurahan Pondok Pucung"
      />

      <section className="section">
        <div className="section-inner">

          {/* Filter Kategori */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {kategoriList.map(kat => (
              <span
                key={kat}
                onClick={() => setFilterAktif(kat)}
                style={{
                  padding: '8px 18px', borderRadius: '100px',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                  transition: 'all .2s',
                  background: filterAktif === kat ? 'var(--hijau-tua)' : 'var(--abu-medium)',
                  color: filterAktif === kat ? 'white' : 'var(--abu-gelap)',
                }}
              >{kat}</span>
            ))}
          </div>

          {/* Grid Berita */}
          <div className="berita-grid">
            {tampil.map(b => (
              <div key={b.id} className="berita-card">
                <div className="berita-gambar" style={{
                  height: '180px',
                  fontSize: '56px',
                  background: b.foto
                    ? `url(${b.foto}) center/cover no-repeat`
                    : 'linear-gradient(135deg, #e6f5f3, #c8ebe7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {!b.foto && (b.emoji || '📰')}
                </div>

                <div className="berita-isi">
                  <span className="berita-kategori" style={{
                    background: KATEGORI_WARNA[b.kategori] || '#0a7c6e',
                    color: '#fff',
                  }}>{b.kategori}</span>

                  <h3 className="berita-judul">{b.judul}</h3>
                  <p className="berita-tanggal">📅 {b.tanggal}</p>
                  <p className="berita-ringkasan">{b.ringkasan}</p>

                  <div style={{
                    marginTop: '12px', paddingTop: '12px',
                    borderTop: '1px solid var(--abu-medium)',
                    fontSize: '13px', color: 'var(--abu-gelap)', lineHeight: '1.6'
                  }}>
                    {b.isi}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}