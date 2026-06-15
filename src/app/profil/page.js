import React from 'react';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Profil | Kelurahan Pondok Pucung',
}

export default function ProfilPage() {
  return (
    <>
      <PageHeader
        judul="Profil Kelurahan"
        deskripsi="Mengenal lebih dekat Kelurahan Pondok Pucung"
      />

      {/* ===== SEJARAH & GAMBARAN UMUM ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="profil-grid">
            <div className="profil-teks">
              <span className="label-section">Tentang Kami</span>
              <h2>Gambaran Umum Kelurahan</h2>
              <p>
                Kelurahan Pondok Pucung adalah salah satu kelurahan yang berada di
                wilayah Kecamatan Pondok Aren, Kota Tangerang Selatan, Provinsi Banten.
                Nama Pondok Pucung diambil dari nama pohon Pucung yang di masa lalu
                tumbuh subur di wilayah ini. Pohon Pucung adalah pohon serba guna
                yang seluruh bagiannya dapat dimanfaatkan oleh masyarakat.
              </p>
              <p>
                Berdasarkan Peraturan Daerah Kabupaten Tangerang No. 3 Tahun 2005,
                Kelurahan Pondok Pucung resmi berubah status dari desa menjadi kelurahan.
                Wilayah ini terus berkembang seiring dengan pertumbuhan Kota Tangerang Selatan
                sebagai daerah penyangga Ibukota Negara.
              </p>
              <p>
                Kelurahan Pondok Pucung berkomitmen untuk meningkatkan kualitas
                pelayanan publik demi terwujudnya masyarakat yang sejahtera, aman,
                dan tertib sesuai visi dan misi kelurahan.
              </p>
            </div>
            <div className="profil-gambar-placeholder" style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
  <img
    src="/profil.jpeg"
    alt="Kantor Lurah Pondok Pucung"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '12px',
    }}
  />
</div>
          </div>
        </div>
      </section>

      {/* ===== DATA KELURAHAN ===== */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Data Administratif</span>
            <h2>Data Kelurahan Pondok Pucung</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-medium)', padding: '32px', boxShadow: 'var(--bayangan)' }}>
              <h3 style={{ fontFamily: 'var(--font-judul)', color: 'var(--hijau-tua)', marginBottom: '20px', fontSize: '20px' }}>
                📍 Identitas Wilayah
              </h3>
              <table className="info-table">
                <tbody>
                  <tr><td>Nama</td><td>Kelurahan Pondok Pucung</td></tr>
                  <tr><td>Kecamatan</td><td>Pondok Aren</td></tr>
                  <tr><td>Kota</td><td>Tangerang Selatan</td></tr>
                  <tr><td>Provinsi</td><td>Banten</td></tr>
                  <tr><td>Kode Pos</td><td>15424</td></tr>
                  <tr><td>Alamat Kantor</td><td>Jl. Santunan Jaya RT. 001/003</td></tr>
                  <tr><td>Lurah</td><td>Murdih, SE., MM.</td></tr>
                  <tr><td>NIP Lurah</td><td>197705052014121003</td></tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-medium)', padding: '32px', boxShadow: 'var(--bayangan)' }}>
              <h3 style={{ fontFamily: 'var(--font-judul)', color: 'var(--hijau-tua)', marginBottom: '20px', fontSize: '20px' }}>
                📊 Data Kependudukan
              </h3>
              <table className="info-table">
                <tbody>
                  <tr><td>Jumlah Penduduk</td><td>24.926 jiwa</td></tr>
                  <tr><td>Laki-laki</td><td>12.374 jiwa</td></tr>
                  <tr><td>Perempuan</td><td>12.552 jiwa</td></tr>
                  <tr><td>Jumlah KK</td><td>6.186 KK</td></tr>
                  <tr><td>Jumlah RW</td><td>17 RW</td></tr>
                  <tr><td>Jumlah RT</td><td>101 RT</td></tr>
                  <tr><td>Luas Wilayah</td><td>301.150 Ha</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BATAS WILAYAH ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Batas Wilayah</span>
            <h2>Letak Geografis</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { arah: '⬆️ Utara', batas: 'Kelurahan Pondok Jaya' },
              { arah: '⬇️ Selatan', batas: 'Kelurahan Jombang (Kec. Ciputat)' },
              { arah: '⬅️ Barat', batas: 'Kelurahan Parigi' },
              { arah: '➡️ Timur', batas: 'Kel. Pondok Jaya – Sawah Baru' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 'var(--radius-medium)',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--bayangan)',
                borderTop: '3px solid var(--hijau-muda)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.arah.split(' ')[0]}</div>
                <div style={{ fontSize: '12px', color: 'var(--abu-gelap)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {item.arah.split(' ')[1]}
                </div>
                <div style={{ fontWeight: '700', color: 'var(--hijau-tua)', fontSize: '14px' }}>{item.batas}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORBITASI ===== */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Jarak Wilayah</span>
            <h2>Orbitasi</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { tujuan: 'Ibukota Kecamatan', jarak: '4,5 km' },
              { tujuan: 'Ibukota Kota', jarak: '14,5 km' },
              { tujuan: 'Ibukota Provinsi', jarak: '85 km' },
              { tujuan: 'Ibukota Negara', jarak: '45 km' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 'var(--radius-medium)',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--bayangan)',
                borderTop: '3px solid var(--hijau-muda)'
              }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--hijau-tua)', marginBottom: '8px' }}>
                  {item.jarak}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--abu-gelap)' }}>{item.tujuan}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGAMA ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Keagamaan</span>
            <h2>Data Penduduk Berdasarkan Agama</h2>
          </div>
          <div style={{ background: 'white', borderRadius: 'var(--radius-medium)', overflow: 'hidden', boxShadow: 'var(--bayangan)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--hijau-tua)', color: 'white' }}>
                  {['No', 'Agama', 'Jumlah', 'Persentase'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { agama: 'Islam', jumlah: '21.519', persen: '86,33%' },
                  { agama: 'Kristen', jumlah: '2.010', persen: '8,06%' },
                  { agama: 'Katolik', jumlah: '1.224', persen: '4,91%' },
                  { agama: 'Hindu', jumlah: '80', persen: '0,32%' },
                  { agama: 'Buddha', jumlah: '93', persen: '0,37%' },
                  { agama: 'Kepercayaan', jumlah: '0', persen: '0%' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--abu-medium)', background: i % 2 === 0 ? 'white' : 'var(--abu-terang)' }}>
                    <td style={{ padding: '14px 20px', fontSize: '14px' }}>{i + 1}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600 }}>{row.agama}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px' }}>{row.jumlah} jiwa</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px' }}>{row.persen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== SARANA ===== */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Fasilitas</span>
            <h2>Sarana & Prasarana</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { kategori: '🎓 Pendidikan', items: ['Kelompok Bermain: 4', 'TK/PAUD: 9', 'SDN: 5', 'SLTP/Sederajat: 3'] },
              { kategori: '🕌 Ibadah', items: ['Masjid: 15', 'Mushola: 24', 'Gereja: 2', 'Majelis Ta\'lim: 32', 'TPA: 10'] },
              { kategori: '🏥 Kesehatan', items: ['Puskesmas: 1', 'Klinik Umum: 1', 'Rumah Bersalin: 1', 'Dokter Praktek: 2', 'Posyandu: 13'] },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 'var(--radius-medium)',
                padding: '24px', boxShadow: 'var(--bayangan)'
              }}>
                <h3 style={{ color: 'var(--hijau-tua)', marginBottom: '16px', fontSize: '16px' }}>{s.kategori}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map((item, j) => (
                    <li key={j} style={{
                      padding: '8px 0', borderBottom: '1px solid var(--abu-medium)',
                      fontSize: '14px', color: 'var(--teks-medium)'
                    }}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}