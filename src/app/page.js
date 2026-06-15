import Link from 'next/link'
import { dataBerita, dataLayanan } from '@/data/data'

export const metadata = {
  title: 'Beranda | Kelurahan Pondok Pucung',
}

export default function HomePage() {
  // Ambil hanya 3 berita terbaru untuk ditampilkan di home
  const beritaTerbaru = dataBerita.slice(0, 3)

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">🏛️ Website Resmi Kelurahan</div>
          <h1>
            Selamat Datang di <br />
            <span>Pondok Pucung</span>
          </h1>
          <p>
            Kelurahan Pondok Pucung melayani masyarakat dengan penuh
            dedikasi di Kecamatan Pondok Aren, Kota Tangerang Selatan.
          </p>
          <div className="hero-buttons">
            <Link href="/profil" className="btn btn-primer">
              Profil Kelurahan →
            </Link>
            <Link href="/kontak" className="btn btn-sekunder">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATISTIK ===== */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-angka">24.500+</div>
            <div className="stat-label">Jumlah Penduduk</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏘️</div>
            <div className="stat-angka">12 RW</div>
            <div className="stat-label">Rukun Warga</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-angka">48 RT</div>
            <div className="stat-label">Rukun Tetangga</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📐</div>
            <div className="stat-angka">3,2 km²</div>
            <div className="stat-label">Luas Wilayah</div>
          </div>
        </div>
      </section>

      {/* ===== LAYANAN UNGGULAN ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Pelayanan Publik</span>
            <h2>Layanan Kelurahan Pondok Pucung</h2>
            <p>Kami hadir untuk memudahkan urusan administratif warga dengan pelayanan yang cepat, mudah, dan transparan.</p>
          </div>

          <div className="layanan-grid">
            {dataLayanan.map((layanan, index) => (
              <div key={index} className="layanan-card">
                <div className="layanan-ikon">{layanan.ikon}</div>
                <h3>{layanan.judul}</h3>
                <p>{layanan.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BERITA TERBARU ===== */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="label-section">Info Terkini</span>
            <h2>Berita & Kegiatan Terbaru</h2>
            <p>Ikuti perkembangan kegiatan dan program Kelurahan Pondok Pucung.</p>
          </div>

          <div className="berita-grid">
            {beritaTerbaru.map((berita) => (
              <div key={berita.id} className="berita-card">
                <div className="berita-gambar">{berita.emoji}</div>
                <div className="berita-isi">
                  <span className="berita-kategori">{berita.kategori}</span>
                  <h3 className="berita-judul">{berita.judul}</h3>
                  <p className="berita-tanggal">📅 {berita.tanggal}</p>
                  <p className="berita-ringkasan">{berita.ringkasan}</p>
                  <Link href="/berita" className="berita-link">
                    Baca selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/berita" className="btn btn-outline">
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA (Call To Action) ===== */}
      <section className="section">
        <div className="section-inner">
          <div style={{
            background: 'linear-gradient(135deg, var(--hijau-tua), var(--hijau-medium))',
            borderRadius: 'var(--radius-besar)',
            padding: '56px 48px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
            <h2 style={{
              fontFamily: 'var(--font-judul)',
              fontSize: '30px',
              marginBottom: '12px'
            }}>
              Ada yang Bisa Kami Bantu?
            </h2>
            <p style={{ color: 'var(--hijau-terang)', marginBottom: '28px', fontSize: '16px' }}>
              Tim kelurahan siap melayani Anda pada hari kerja Senin–Jumat, pukul 08.00–16.00 WIB.
            </p>
            <Link href="/kontak" className="btn btn-primer">
              Hubungi Kami Sekarang →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
