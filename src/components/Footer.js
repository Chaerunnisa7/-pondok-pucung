import Link from 'next/link'

export default function Footer() {
  const tahun = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3>🏛️ Kelurahan Pondok Pucung</h3>
            <p>
              Melayani masyarakat dengan sepenuh hati.
              Kelurahan Pondok Pucung berkomitmen untuk memberikan
              pelayanan publik yang prima, transparan, dan berkeadilan.
            </p>
          </div>

          {/* Menu */}
          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/profil">Profil Kelurahan</Link></li>
              <li><Link href="/visi-misi">Visi & Misi</Link></li>
              <li><Link href="/struktur">Struktur Organisasi</Link></li>
              <li><Link href="/berita">Berita</Link></li>
              <li><Link href="/kontak">Kontak</Link></li>
            </ul>
          </div>

          {/* Kontak Cepat */}
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul>
              <li><a href="#">📍 Jl. Santunan Jaya RT. 001/003, Pondok Pucung</a></li>
              <li><a href="mailto:pondokpucungkel@gmail.com">✉️ Email Kami</a></li>
              <li><a href="#">🕐 Senin–Jumat, 08.00–16.00</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {tahun} Kelurahan Pondok Pucung. Hak Cipta Dilindungi. &nbsp;·&nbsp;
            Kecamatan Pondok Aren, Kota Tangerang Selatan
          </p>
        </div>
      </div>
    </footer>
  )
}
