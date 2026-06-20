'use client';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';

// Data default — muncul walau backend mati
const dataStrukturDefault = [
  { id: 1, nama: 'Murdih, SE., MM.', jabatan: 'Lurah', level: 'pimpinan', golongan: 'III/d', urutan: 1 },
  { id: 2, nama: '–', jabatan: 'Sekretaris Lurah', level: 'sekretaris', golongan: 'III/c', urutan: 2 },
  { id: 3, nama: 'Desti Anggraeni, SH', jabatan: 'Kasi Pemerintahan, Ketentraman dan Ketertiban Umum', level: 'seksi', golongan: 'III/b', urutan: 3 },
  { id: 4, nama: 'Nurulhayati, S.Pi', jabatan: 'Kasi Kesejahteraan Sosial', level: 'seksi', golongan: 'III/b', urutan: 4 },
  { id: 5, nama: 'Tri Nurina Tristanti, SE', jabatan: 'Kasi Ekonomi dan Pembangunan', level: 'seksi', golongan: 'III/b', urutan: 5 },
  { id: 6, nama: 'Ade Hikmahtullah', jabatan: 'Kasi Pelayanan Umum', level: 'seksi', golongan: 'III/b', urutan: 6 },
];

function OrgCard({ nama, jabatan, isKepala = false }) {
  return (
    <div className={`org-card ${isKepala ? 'kepala' : ''}`}>
      <div className="org-avatar">{isKepala ? '👨‍💼' : '👤'}</div>
      <div className="org-nama">{nama}</div>
      <div className="org-jabatan">{jabatan}</div>
    </div>
  );
}

export default function StrukturPage() {
  const [data, setData] = useState(dataStrukturDefault);

  useEffect(() => {
    // Coba ambil dari backend, kalau gagal pakai data default
    fetch('https://pondok-pucung-api-production.up.railway.app/api/struktur')
      .then(res => res.json())
      .then(result => { if (result && result.length > 0) setData(result); })
      .catch(() => {}); // diam-diam pakai default
  }, []);

  const pimpinan = data.find(s => s.level === 'pimpinan');
  const sekretaris = data.find(s => s.level === 'sekretaris');
  const seksi = data.filter(s => s.level === 'seksi');

  return (
    <>
      <PageHeader
        judul="Struktur Organisasi"
        deskripsi="Susunan organisasi pemerintahan Kelurahan Pondok Pucung"
      />

      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Aparatur</span>
            <h2>Bagan Struktur Organisasi</h2>
            <p>Kelurahan Pondok Pucung, Kecamatan Pondok Aren, Kota Tangerang Selatan</p>
          </div>

          <div className="org-chart">
            {/* Lurah */}
            {pimpinan && (
              <div className="org-level">
                <OrgCard nama={pimpinan.nama} jabatan={pimpinan.jabatan} isKepala={true} />
              </div>
            )}

            <div className="org-connector">
              <div style={{ width: '2px', height: '24px', background: 'var(--hijau-muda)' }} />
            </div>

            {/* Sekretaris */}
            {sekretaris && (
              <div className="org-level">
                <OrgCard nama={sekretaris.nama} jabatan={sekretaris.jabatan} />
              </div>
            )}

            {/* Connector ke seksi */}
            {seksi.length > 0 && (
              <div style={{ position: 'relative', width: '100%', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', width: '2px', height: '24px', background: 'var(--hijau-muda)', transform: 'translateX(-50%)' }} />
                <div style={{ position: 'absolute', top: '24px', left: '15%', right: '15%', height: '2px', background: 'var(--hijau-muda)' }} />
                {seksi.map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute', top: '24px',
                    left: `calc(15% + ${i * (70 / (seksi.length - 1))}%)`,
                    width: '2px', height: '24px',
                    background: 'var(--hijau-muda)', transform: 'translateX(-50%)'
                  }} />
                ))}
              </div>
            )}

            {/* Seksi */}
            {seksi.length > 0 && (
              <div className="org-level" style={{ gap: '12px', flexWrap: 'wrap' }}>
                {seksi.map((s, i) => (
                  <OrgCard key={i} nama={s.nama} jabatan={s.jabatan} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabel ASN */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Data ASN</span>
            <h2>Daftar Aparatur Sipil Negara</h2>
          </div>

          <div style={{ background: 'white', borderRadius: 'var(--radius-medium)', overflow: 'hidden', boxShadow: 'var(--bayangan)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--hijau-tua)', color: 'white' }}>
                  {['No', 'Nama', 'Jabatan', 'Golongan'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((pegawai, i) => (
                  <tr key={pegawai.id} style={{ borderBottom: '1px solid var(--abu-medium)', background: i % 2 === 0 ? 'white' : 'var(--abu-terang)' }}>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--abu-gelap)' }}>{i + 1}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--teks-gelap)' }}>{pegawai.nama}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--teks-medium)' }}>{pegawai.jabatan}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--abu-gelap)' }}>{pegawai.golongan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}