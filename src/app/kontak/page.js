'use client';
import React from 'react';
import PageHeader from '@/components/PageHeader';

const infoKontak = [
  {
    ikon: '📍',
    judul: 'Alamat Kantor',
    detail: 'Jl. Pondok Pucung Raya No.1, Pondok Pucung, Kec. Pondok Aren, Kota Tangerang Selatan, Banten 15229',
  },
  
  {
    ikon: '✉️',
    judul: 'Email',
    detail: 'pondokpucungkel@gmail.com',
  },

  {
    ikon: '🕐',
    judul: 'Jam Pelayanan',
    detail: 'Senin – Jumat: 08.00 – 16.00 WIB\nIstirahat: 12.00 – 13.00 WIB',
  },
]

export default function KontakPage() {
  const [form, setForm] = React.useState({ nama: '', telepon: '', email: '', keperluan: '', pesan: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${form.keperluan || 'Pesan'}] dari ${form.nama}`);
    const body = encodeURIComponent(
      `Nama: ${form.nama}\nTelepon: ${form.telepon || '-'}\nEmail: ${form.email}\nKeperluan: ${form.keperluan || '-'}\n\nPesan:\n${form.pesan}`
    );
    window.open(`mailto:pondokpucungkel@gmail.com?subject=${subject}&body=${body}`, '_blank');
  }

  return (
    <>
      <PageHeader
        judul="Kontak Kami"
        deskripsi="Hubungi kami untuk informasi dan pelayanan"
      />

      <section className="section">
        <div className="section-inner">
          <div className="kontak-grid">

            {/* Info Kontak */}
            <div>
              <div className="section-header">
                <span className="label-section">Informasi</span>
                <h2>Hubungi Kelurahan</h2>
                <p>Kami siap melayani pertanyaan dan keperluan administrasi Anda.</p>
              </div>

              <div className="kontak-info-list">
                {infoKontak.map((item, i) => (
                  <div key={i} className="kontak-info-item">
                    <div className="kontak-ikon">{item.ikon}</div>
                    <div className="kontak-detail">
                      <h4>{item.judul}</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sosial Media */}
              <div style={{ marginTop: '32px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--hijau-tua)', marginBottom: '12px' }}>
                  Media Sosial
                </h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['📸 Instagram'].map((sosmed, i) => (
                    <a
  key={i}
  href="https://www.instagram.com/pondokpucungkelurahan/"
  target="_blank"
  rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        background: 'var(--abu-terang)',
                        borderRadius: 'var(--radius-kecil)',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--teks-medium)',
                        transition: 'var(--transisi)',
                        border: '1px solid var(--abu-medium)'
                      }}
                    >
                      {sosmed}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Pesan */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-besar)', padding: '40px', boxShadow: 'var(--bayangan)' }}>
              <h3 style={{ fontFamily: 'var(--font-judul)', color: 'var(--hijau-tua)', fontSize: '22px', marginBottom: '24px' }}>
                Kirim Pesan
              </h3>

              {/* 
                CATATAN UNTUK PEMULA:
                Karena ini static site, form tidak bisa diproses langsung.
                Opsi: 
                1. Gunakan Formspree.io (gratis) - ganti action di form
                2. Gunakan mailto: link
                3. Arahkan ke WhatsApp
              */}
              <form onSubmit={handleSubmit}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
    <div className="form-group">
      <label>Nama Lengkap *</label>
      <input type="text" placeholder="Masukkan nama Anda" required
        value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
    </div>
    <div className="form-group">
      <label>Nomor Telepon</label>
      <input type="tel" placeholder="08xx-xxxx-xxxx"
        value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} />
    </div>
  </div>
  <div className="form-group">
    <label>Email *</label>
    <input type="email" placeholder="email@contoh.com" required
      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
  </div>
  <div className="form-group">
    <label>Keperluan</label>
    <select value={form.keperluan} onChange={e => setForm({ ...form, keperluan: e.target.value })}>
      <option value="">-- Pilih Keperluan --</option>
      <option>Surat Keterangan</option>
      <option>Administrasi Kependudukan</option>
      <option>Informasi Umum</option>
      <option>Pengaduan</option>
      <option>Lainnya</option>
    </select>
  </div>
  <div className="form-group">
    <label>Pesan *</label>
    <textarea placeholder="Tulis pesan atau pertanyaan Anda..." required rows={5}
      value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
  </div>
  <button type="submit" className="btn btn-primer" style={{ width: '100%', justifyContent: 'center' }}>
    Kirim Pesan ✉️
  </button>
</form>
            </div>
          </div>

         {/* Peta Lokasi */}
<div
  style={{
    marginTop: '48px',
    borderRadius: 'var(--radius-besar)',
    overflow: 'hidden',
    boxShadow: 'var(--bayangan)',
    background: 'white',
  }}
>
  <iframe
    src="https://www.google.com/maps?q=Kelurahan+Pondok+Pucung+Tangerang+Selatan&output=embed"
    width="100%"
    height="450"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
  />

  <div
    style={{
      padding: '24px',
      textAlign: 'center',
    }}
  >
    <p
      style={{
        fontWeight: '600',
        color: 'var(--teks-medium)',
      }}
    >
      Lokasi Kantor Kelurahan Pondok Pucung
    </p>

    <p>
      Jl. Pondok Pucung Raya No.1, Pondok Aren,
      Tangerang Selatan
    </p>

    <a
      href="https://maps.google.com/?q=Kelurahan+Pondok+Pucung"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline"
      style={{ marginTop: '8px' }}
    >
      Buka di Google Maps →
    </a>
  </div>
</div>

        </div>
      </section>
    </>
  )
}
